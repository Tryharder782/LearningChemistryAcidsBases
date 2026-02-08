import type { Particle, MoleculeType, GridPosition, ReactionRule } from './types';
import { GRID_ROWS_MAX } from './types';
import { ParticleGrid } from './ParticleGrid';

/** Stagger interval (ms) between individual particles within a single add batch */
const BATCH_STAGGER_MS = 50;

export class ReactingBeakerModel {
   private particles: Particle[] = [];
   private grid: ParticleGrid;
   private listeners: (() => void)[] = [];
   private effectiveRows: number = 11; // Visible rows (subset of total)

   constructor() {
      this.grid = new ParticleGrid();
   }

   /**
    * Set the effective number of rows based on absolute visibility
    * @param rows The floating-point number of rows currently visible on screen
    */
   setWaterLevel(rows: number) {
      const baseRows = Math.floor(rows);
      const fractionalPart = rows - baseRows;
      const nextRows = fractionalPart > 0.4 ? Math.ceil(rows) : baseRows;
      const clampedRows = Math.max(1, Math.min(GRID_ROWS_MAX, nextRows));
      if (clampedRows === this.effectiveRows) {
         return;
      }
      this.effectiveRows = clampedRows;

      // Remove particles that are now "above" the water line (out of new floor bounds)
      const keptParticles: Particle[] = [];
      const removedParticles: Particle[] = [];

      this.particles.forEach(p => {
         if (p.position.row < this.effectiveRows) {
            keptParticles.push(p);
         } else {
            removedParticles.push(p);
         }
      });

      if (removedParticles.length > 0) {
         this.particles = keptParticles;
         // Ensure grid is synced (release occupied slots)
         removedParticles.forEach(p => this.grid.release(p.position));
         this.notify();
      }
   }

   getParticles(): Particle[] {
      return [...this.particles];
   }

   getEffectiveRows(): number {
      return this.effectiveRows;
   }

   /**
    * Add particles with a reaction rule (e.g., A- + H+ -> HA)
    */
   addWithReaction(
      rule: ReactionRule,
      count: number,
      colors: { reactant: string; reactingWith: string; produced: string }
   ) {
      const durationMs = 1000;
      const staggerMs = 150;
      const consumables = this.particles.filter(p => p.type === rule.reactingWith);
      const reactionCount = Math.min(count, consumables.length);
      const remainingCount = count - reactionCount;

      if (reactionCount > 0) {
         // Consume from the end (matches iOS suffix behavior)
         const consumedParticles = consumables.slice(-reactionCount);
         const consumedIds = new Set(consumedParticles.map(p => p.id));

         // Remove consumed reactants
         this.particles = this.particles.filter(p => !consumedIds.has(p.id));

         // 1) Existing consumed coords -> product (color transition, NOT initial appearance)
         const transitionedFromConsumed = consumedParticles.map((p, index) =>
            this.createParticleAt(
               p.position,
               rule.producing,
               colors.reactingWith,
               colors.produced,
               durationMs,
               index * staggerMs
            )
         );

         // 2) New reactant coords -> product (instant appearance, staggered)
         const reactantCoords = this.grid.getRandomAvailablePositions(
            reactionCount,
            this.particles.map(p => p.position),
            this.effectiveRows
         );
         reactantCoords.forEach((pos, index) => {
            this.addParticleAt(pos, rule.producing, colors.produced, index * BATCH_STAGGER_MS);
         });

         this.particles.push(...transitionedFromConsumed);
         this.scheduleColorTransition(
            transitionedFromConsumed.map(p => p.id),
            colors.produced,
            0
         );
      }

      // 3) Surplus reactant (no reaction) — new particles, staggered
      if (remainingCount > 0) {
         this.addDirectly(rule.reactant, remainingCount, colors.reactant);
      }

      this.notify();
   }

   /**
    * Add particles directly without reaction.
    * All new particles appear instantly at target color, staggered within the batch.
    */
   addDirectly(
      type: MoleculeType,
      count: number,
      color: string,
      _options?: { initialColor?: string; transitionMs?: number; staggerMs?: number }
   ) {
      const positions = this.grid.getRandomAvailablePositions(count, [], this.effectiveRows);

      positions.forEach((pos, index) => {
         this.addParticleAt(pos, type, color, index * BATCH_STAGGER_MS);
      });

      this.notify();
   }

   /**
    * Update particles to match desired counts per type, minimizing churn.
    */
   updateParticles(
      targetCounts: { substance: number; primary: number; secondary: number },
      colors: { substance: string; primaryIon: string; secondaryIon: string },
      options?: {
         initialColors?: Partial<Record<MoleculeType, string>>;
         skipFadeInTypes?: MoleculeType[];
         transitionDelayMsByType?: Partial<Record<MoleculeType, number>>;
         staggerMsByType?: Partial<Record<MoleculeType, number>>;
      }
   ) {
      const durationMs = 800;
      const staggerMs = 150;
      const typeColors: Record<MoleculeType, string> = {
         substance: colors.substance,
         primaryIon: colors.primaryIon,
         secondaryIon: colors.secondaryIon
      };

      const counts = {
         substance: this.particles.filter(p => p.type === 'substance').length,
         primaryIon: this.particles.filter(p => p.type === 'primaryIon').length,
         secondaryIon: this.particles.filter(p => p.type === 'secondaryIon').length
      };

      const deltas: Record<MoleculeType, number> = {
         substance: targetCounts.substance - counts.substance,
         primaryIon: targetCounts.primary - counts.primaryIon,
         secondaryIon: targetCounts.secondary - counts.secondaryIon
      };

      const surplus: Particle[] = [];
      (Object.keys(deltas) as MoleculeType[]).forEach(type => {
         const delta = deltas[type];
         if (delta < 0) {
            const current = this.particles.filter(p => p.type === type);
            const toRemove = current.slice(0, -delta); // delta is negative
            surplus.push(...toRemove);
         }
      });

      // Remove surplus from particles list for now
      const surplusIds = new Set(surplus.map(p => p.id));
      this.particles = this.particles.filter(p => !surplusIds.has(p.id));

      // Convert surplus into deficit types (keep coords, animate color)
      (Object.keys(deltas) as MoleculeType[]).forEach(type => {
         let deficit = deltas[type];
         if (deficit <= 0) return;

         const fromSurplus = surplus.splice(0, deficit);
         const perTypeStaggerMs = options?.staggerMsByType?.[type] ?? staggerMs;
         fromSurplus.forEach((p, index) => {
            const newParticle = this.createParticleAt(
               p.position,
               type,
               typeColors[p.type],
               typeColors[type],
               durationMs,
               index * perTypeStaggerMs
            );
            this.particles.push(newParticle);
            this.scheduleColorTransition([newParticle.id], typeColors[type], 0);
         });
         deficit -= fromSurplus.length;

         // Add remaining as new particles (instant appearance, staggered)
         if (deficit > 0) {
            const positions = this.grid.getRandomAvailablePositions(deficit, [], this.effectiveRows);
            positions.forEach((pos, index) => {
               this.addParticleAt(pos, type, typeColors[type], index * BATCH_STAGGER_MS);
            });
         }
      });

      // Release any leftover surplus (removed from beaker)
      surplus.forEach(p => this.grid.release(p.position));

      // Recolor existing particles if type color changed
      (Object.keys(typeColors) as MoleculeType[]).forEach(type => {
         const current = this.particles.filter(p => p.type === type);
         const idsToUpdate: string[] = [];
         const perTypeStaggerMs = options?.staggerMsByType?.[type] ?? staggerMs;
         current.forEach((p, index) => {
            if (p.displayColor !== typeColors[type]) {
               p.transitionMs = durationMs;
               p.transitionDelayMs = index * perTypeStaggerMs;
               p.isInitialAppearance = false; // Enable CSS transition for recoloring
               idsToUpdate.push(p.id);
            }
         });
         if (idsToUpdate.length > 0) {
            this.scheduleColorTransition(idsToUpdate, typeColors[type], 0);
         }
      });

      this.notify();
   }


   /**
    * Initialize/Reset the beaker with a set of particles
    */
   initialize(counts: { substance: number; primary: number; secondary: number }, colors: Record<MoleculeType, string>) {
      this.particles = [];
      this.grid.clear();

      this.addDirectly('substance', counts.substance, colors.substance);
      this.addDirectly('primaryIon', counts.primary, colors.primaryIon);
      this.addDirectly('secondaryIon', counts.secondary, colors.secondaryIon);
      // notify called by addDirectly
   }

   /**
    * Restore an exact particle snapshot (positions/colors) and rebuild occupancy.
    */
   setParticles(particles: Particle[]) {
      this.particles = particles.map(p => ({ ...p, isInitialAppearance: false }));
      this.grid.clear();
      this.particles.forEach(p => this.grid.occupy(p.position));
      this.notify();
   }

   /**
    * Helper to add single particle with optional stagger delay.
    * New particles are marked as initial appearance (no fade-in).
    */
   private addParticleAt(pos: GridPosition, type: MoleculeType, color: string, staggerDelayMs: number = 0) {
      const particle: Particle = {
         id: Math.random().toString(36).substr(2, 9),
         position: pos,
         type,
         displayColor: color,
         targetColor: color,
         isInitialAppearance: true,
         createdAt: Date.now() + staggerDelayMs
      };

      this.particles.push(particle);
      this.grid.occupy(pos);
   }
   private createParticleAt(
      pos: GridPosition,
      type: MoleculeType,
      initialColor: string,
      targetColor: string,
      transitionMs: number,
      transitionDelayMs: number = 0,
      createdAt?: number
   ): Particle {
      const particle: Particle = {
         id: Math.random().toString(36).substr(2, 9),
         position: pos,
         type,
         displayColor: initialColor,
         targetColor,
         transitionMs,
         transitionDelayMs,
         isInitialAppearance: false, // Explicitly enable CSS transition
         createdAt: createdAt ?? Date.now()
      };
      this.grid.occupy(pos);
      return particle;
   }

   private scheduleColorTransition(ids: string[], targetColor: string, delayMs: number = 0) {
      if (ids.length === 0) return;
      
      // Add 16ms (1 frame) to ensure React renders with initial color before transition
      const minDelay = Math.max(delayMs, 16);
      
      setTimeout(() => {
         let changed = false;
         this.particles.forEach(p => {
            if (ids.includes(p.id)) {
               p.displayColor = targetColor;
               p.targetColor = targetColor;
               p.isInitialAppearance = false; // Enable CSS transition for future changes
               changed = true;
            }
         });
         if (changed) this.notify();
      }, minDelay);
   }

   subscribe(listener: () => void) {
      this.listeners.push(listener);
      return () => {
         this.listeners = this.listeners.filter(l => l !== listener);
      };
   }

   private notify() {
      this.listeners.forEach(l => l());
   }
}
