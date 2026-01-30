import type { Particle, MoleculeType, GridPosition, ReactionRule } from './types';
import { GRID_ROWS_MIN, GRID_ROWS_MAX } from './types';
import { ParticleGrid } from './ParticleGrid';

export class ReactingBeakerModel {
   private particles: Particle[] = [];
   private grid: ParticleGrid;
   private listeners: (() => void)[] = [];
   private effectiveRows: number = 11; // Visible rows (subset of total)

   constructor() {
      this.grid = new ParticleGrid();
   }

   /**
    * Set the effective number of rows based on water level
    * @param waterLevel Fraction 0-1, where 1 = full beaker
    */
   setWaterLevel(waterLevel: number) {
      const rowsFloat = GRID_ROWS_MIN + (GRID_ROWS_MAX - GRID_ROWS_MIN) * waterLevel;
      const decimal = rowsFloat - Math.floor(rowsFloat);
      const availableRows = decimal > 0.4 ? Math.ceil(rowsFloat) : Math.floor(rowsFloat);
      this.effectiveRows = Math.max(GRID_ROWS_MIN, Math.min(GRID_ROWS_MAX, availableRows));
   }

   getParticles(): Particle[] {
      return [...this.particles];
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

         // 1) Existing consumed coords -> product (color transition)
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

         // 2) New reactant coords -> product (color transition)
         const reactantCoords = this.grid.getRandomAvailablePositions(
            reactionCount,
            this.particles.map(p => p.position),
            this.effectiveRows
         );
         const transitionedFromReactant = reactantCoords.map((pos, index) =>
            this.createParticleAt(
               pos,
               rule.producing,
               colors.reactant,
               colors.produced,
               durationMs,
               (index + transitionedFromConsumed.length) * staggerMs
            )
         );

         this.particles.push(...transitionedFromConsumed, ...transitionedFromReactant);
         this.scheduleColorTransition(
            [...transitionedFromConsumed, ...transitionedFromReactant].map(p => p.id),
            colors.produced,
            0
         );
      }

      // 3) Surplus reactant (no reaction)
      if (remainingCount > 0) {
         this.addDirectly(rule.reactant, remainingCount, colors.reactant, {
            initialColor: '#ADD8E6',
            transitionMs: durationMs,
            staggerMs
         });
      }

      this.notify();
   }

   /**
    * Add particles directly without reaction
    */
   addDirectly(
      type: MoleculeType,
      count: number,
      color: string,
      options?: { initialColor?: string; transitionMs?: number; staggerMs?: number }
   ) {
      const positions = this.grid.getRandomAvailablePositions(count, [], this.effectiveRows);
      const initialColor = options?.initialColor ?? color;
      const transitionMs = options?.transitionMs;
      const staggerMs = options?.staggerMs ?? 0;

      const transitionedIds: string[] = [];

      positions.forEach((pos, index) => {
         if (transitionMs && initialColor !== color) {
            const particle = this.createParticleAt(
               pos,
               type,
               initialColor,
               color,
               transitionMs,
               index * staggerMs
            );
            this.particles.push(particle);
            transitionedIds.push(particle.id);
         } else {
            this.addParticleAt(pos, type, color);
         }
      });

      if (transitionedIds.length > 0) {
         this.scheduleColorTransition(transitionedIds, color, 0);
      }

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
            const toRemove = current.slice(delta); // delta is negative
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

         // Add remaining as new particles
         if (deficit > 0) {
            const initialColor = options?.initialColors?.[type] ?? typeColors[type];
            const skipFadeIn = options?.skipFadeInTypes?.includes(type) ?? false;
            const transitionDelayMs = options?.transitionDelayMsByType?.[type] ?? 0;
            const perTypeStaggerMs = options?.staggerMsByType?.[type] ?? staggerMs;

            if (initialColor !== typeColors[type] || skipFadeIn) {
               const positions = this.grid.getRandomAvailablePositions(deficit, [], this.effectiveRows);
               const createdAt = skipFadeIn ? Date.now() - 1000 : Date.now();

               const createdIds: string[] = [];
               positions.forEach((pos, index) => {
                  const particle = this.createParticleAt(
                     pos,
                     type,
                     initialColor,
                     typeColors[type],
                     durationMs,
                     index * perTypeStaggerMs,
                     createdAt
                  );
                  this.particles.push(particle);
                  createdIds.push(particle.id);
               });

               if (createdIds.length > 0) {
                  this.scheduleColorTransition(createdIds, typeColors[type], transitionDelayMs);
               }
            } else {
               this.addDirectly(type, deficit, typeColors[type]);
            }
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
      this.particles = particles.map(p => ({ ...p }));
      this.grid.clear();
      this.particles.forEach(p => this.grid.occupy(p.position));
      this.notify();
   }

   /**
    * Helper to add single particle
    */
   private addParticleAt(pos: GridPosition, type: MoleculeType, color: string) {
      const particle: Particle = {
         id: Math.random().toString(36).substr(2, 9),
         position: pos,
         type,
         displayColor: color,
         targetColor: color,
         createdAt: Date.now()
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
         createdAt: createdAt ?? Date.now()
      };
      this.grid.occupy(pos);
      return particle;
   }

   private scheduleColorTransition(ids: string[], targetColor: string, delayMs: number = 0) {
      if (ids.length === 0) return;
      setTimeout(() => {
         let changed = false;
         this.particles.forEach(p => {
            if (ids.includes(p.id)) {
               p.displayColor = targetColor;
               p.targetColor = targetColor;
               changed = true;
            }
         });
         if (changed) this.notify();
      }, delayMs);
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
