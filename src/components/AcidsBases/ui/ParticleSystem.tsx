/**
 * Particle system for visualizing molecules and ions in the beaker.
 * Uses a grid layout where "solvent" (water) particles are replaced by ions/molecules.
 */

import { useState, useEffect, useRef } from 'react';
import type { SpeciesCounts } from '../../../helper/acidsBases/types';

interface ParticleSystemProps {
   /** Counts of each species to display */
   counts: SpeciesCounts;
   /** Color for neutral molecules */
   substanceColor: string;
   /** Color for primary ions (H+ or OH-) */
   primaryColor: string;
   /** Color for secondary ions */
   secondaryColor: string;
   /** Container width */
   width: number;
   /** Max container height (static) - used for grid generation */
   maxHeight: number;
   /**
    * Current liquid height (dynamic) - used for calculating visible rows
    */
   liquidHeight: number;
   /** Callback to report current particle counts */
   onCountsChange?: (counts: SpeciesCounts) => void;
}

type SlotType = 'water' | 'substance' | 'primaryIon' | 'secondaryIon';

interface ParticleSlot {
   index: number;
   x: number;
   bottom: number;
   type: SlotType;
   color: string;
}

const PARTICLE_SIZE = 14.3; // 272px / 19 cols = ~14.31
const PARTICLE_RADIUS = 6;

export function ParticleSystem({
   counts,
   substanceColor,
   primaryColor,
   secondaryColor,
   width,
   maxHeight,
   liquidHeight,
   onCountsChange,
}: ParticleSystemProps) {
   const [slots, setSlots] = useState<ParticleSlot[]>([]);
   const isInitialized = useRef(false);

   // Initialize STATIC grid based on MAX dimensions
   // This only runs when max dimensions change, avoiding layout thrashing during resize
   useEffect(() => {
      // Grid configuration
      const cols = Math.floor(width / PARTICLE_SIZE);
      const rows = Math.ceil(maxHeight / PARTICLE_SIZE);

      const offsetX = (width - cols * PARTICLE_SIZE) / 2;
      const offsetStart = 0; // Relative to whichever side we're anchoring to

      const newSlots: ParticleSlot[] = [];
      const totalSlots = cols * rows;

      for (let i = 0; i < totalSlots; i++) {
         const r = Math.floor(i / cols);
         const c = i % cols;

         newSlots.push({
            index: i,
            x: offsetX + c * PARTICLE_SIZE + PARTICLE_SIZE / 2,
            bottom: offsetStart + r * PARTICLE_SIZE + PARTICLE_SIZE / 2, // We'll use this value as 'top' or 'bottom' in render
            type: 'water',
            color: '#E0F2FE',
         });
      }

      setSlots(newSlots);
      isInitialized.current = true;
   }, [width, maxHeight]);

   // 1. Sync effect for clipping (runs immediately on height change)
   useEffect(() => {
      if (!isInitialized.current || slots.length === 0) return;

      const visibleRows = Math.ceil(liquidHeight / PARTICLE_SIZE);
      const cols = Math.floor(width / PARTICLE_SIZE);
      const maxActiveIndex = visibleRows * cols;

      setSlots(prev => {
         let changed = false;
         const nextSlots = prev.map(s => {
            if (s.index >= maxActiveIndex && s.type !== 'water') {
               changed = true;
               return { ...s, type: 'water' as const, color: '#E0F2FE' };
            }
            return s;
         });
         return changed ? nextSlots : prev;
      });
   }, [liquidHeight, width]);

   // Report counts whenever slots change
   useEffect(() => {
      if (!onCountsChange || slots.length === 0) return;

      const visibleRows = Math.ceil(liquidHeight / PARTICLE_SIZE);
      const cols = Math.floor(width / PARTICLE_SIZE);
      const maxActiveIndex = visibleRows * cols;

      const current = { substance: 0, primary: 0, secondary: 0 };
      slots.forEach((s) => {
         if (s.index < maxActiveIndex) {
            if (s.type === 'substance') current.substance++;
            else if (s.type === 'primaryIon') current.primary++;
            else if (s.type === 'secondaryIon') current.secondary++;
         }
      });
      onCountsChange(current);
   }, [slots, liquidHeight, width, onCountsChange]);

   const prevCounts = useRef(counts);
   const prevColor = useRef(substanceColor);

   // 2. Incremental effect for coloring/species changes (one by one)
   useEffect(() => {
      if (!isInitialized.current || slots.length === 0) return;

      const visibleRows = Math.ceil(liquidHeight / PARTICLE_SIZE);
      const cols = Math.floor(width / PARTICLE_SIZE);
      const maxActiveIndex = visibleRows * cols;

      const totalRequested = counts.substance + counts.primary + counts.secondary;
      const prevTotal = prevCounts.current.substance + prevCounts.current.primary + prevCounts.current.secondary;

      // INSTANT RESET / MAJOR CHANGE DETECTION
      // Only reset instantly if we go to EMPTY.
      const isResetToEmpty = totalRequested === 0 && prevTotal > 0;

      if (isResetToEmpty) {
         setSlots((currentSlots) => {
            const next = [...currentSlots];
            for (let i = 0; i < maxActiveIndex; i++) {
               next[i] = { ...next[i], type: 'water', color: '#E0F2FE' };
            }
            return next;
         });
         prevCounts.current = counts;
         prevColor.current = substanceColor;
         return;
      }

      // Count current species in active slots to determine deltas
      const current = { substance: 0, primary: 0, secondary: 0 };
      slots.forEach((s) => {
         if (s.index < maxActiveIndex) {
            if (s.type === 'substance') current.substance++;
            else if (s.type === 'primaryIon') current.primary++;
            else if (s.type === 'secondaryIon') current.secondary++;
         }
      });

      const diffs = {
         substance: counts.substance - current.substance,
         primaryIon: counts.primary - current.primary,
         secondaryIon: counts.secondary - current.secondary,
      };

      if (diffs.substance === 0 && diffs.primaryIon === 0 && diffs.secondaryIon === 0) {
         prevCounts.current = counts;
         prevColor.current = substanceColor;
         return;
      }

      // Flip particles logic
      const timer = setTimeout(() => {
         setSlots((prev) => {
            const next = [...prev];
            let updates = 0;
            const MAX_UPDATES = 2; // Process 2 changes per tick (100ms)

            while (updates < MAX_UPDATES) {
               // Calculate current state in 'next' inside the loop
               const loopCurrent = { substance: 0, primary: 0, secondary: 0 };
               next.forEach((s) => {
                  if (s.index < maxActiveIndex) {
                     if (s.type === 'substance') loopCurrent.substance++;
                     else if (s.type === 'primaryIon') loopCurrent.primary++;
                     else if (s.type === 'secondaryIon') loopCurrent.secondary++;
                  }
               });

               const loopDiffs = {
                  substance: counts.substance - loopCurrent.substance,
                  primaryIon: counts.primary - loopCurrent.primary,
                  secondaryIon: counts.secondary - loopCurrent.secondary,
               };

               if (loopDiffs.substance === 0 && loopDiffs.primaryIon === 0 && loopDiffs.secondaryIon === 0) {
                  break;
               }

               let changedFn = false;
               const types = ['primaryIon', 'secondaryIon', 'substance'] as const;

               for (const type of types) {
                  const diff = type === 'substance' ? loopDiffs.substance :
                     type === 'primaryIon' ? loopDiffs.primaryIon : loopDiffs.secondaryIon;

                  if (diff > 0) {
                     // Adding Logic with Strict Transition Rules
                     let candidates: number[] = [];

                     if (type === 'primaryIon' || type === 'secondaryIon') {
                        // Ions should come from Substance (HA) dissolution
                        candidates = next
                           .filter(s => s.type === 'substance' && s.index < maxActiveIndex)
                           .map(s => s.index);

                        // Fallback to Water if no Substance (should rarely happen if counts are correct)
                        if (candidates.length === 0) {
                           candidates = next
                              .filter(s => s.type === 'water' && s.index < maxActiveIndex)
                              .map(s => s.index);
                        }
                     } else {
                        // Adding Substance comes from Water (e.g. pouring)
                        candidates = next
                           .filter(s => s.type === 'water' && s.index < maxActiveIndex)
                           .map(s => s.index);
                     }

                     if (candidates.length > 0) {
                        const idx = candidates[Math.floor(Math.random() * candidates.length)];
                        const color = type === 'substance' ? substanceColor :
                           type === 'primaryIon' ? primaryColor : secondaryColor;

                        next[idx] = { ...next[idx], type, color };
                        updates++;
                        changedFn = true;
                        break;
                     }
                  } else if (diff < 0) {
                     // Removing Logic - convert back to water (or generic removal)
                     const typeIndices = next
                        .filter((s) => s.type === type && s.index < maxActiveIndex)
                        .map((s) => s.index);

                     if (typeIndices.length > 0) {
                        const idx = typeIndices[Math.floor(Math.random() * typeIndices.length)];
                        next[idx] = { ...next[idx], type: 'water', color: '#E0F2FE' };
                        updates++;
                        changedFn = true;
                        break;
                     }
                  }
               }

               if (!changedFn) break; // Could not find any valid move
            }

            return updates > 0 ? next : prev;
         });
      }, 100); // 100ms per tick

      return () => clearTimeout(timer);
   }, [counts, slots, liquidHeight, width, substanceColor, primaryColor, secondaryColor]);

   return (
      <div
         className="absolute top-0 left-0 w-full overflow-hidden"
         style={{ height: maxHeight }}
      >
         {slots.map((slot) => (
            <div
               key={slot.index}
               className={`absolute rounded-full transition-colors duration-300`}
               style={{
                  left: slot.x - PARTICLE_RADIUS,
                  top: slot.bottom - PARTICLE_RADIUS,
                  width: PARTICLE_RADIUS * 2,
                  height: PARTICLE_RADIUS * 2,
                  backgroundColor: slot.color,
                  opacity: slot.type === 'water' ? 0.3 : 1,
                  transform: `scale(${slot.type !== 'water' ? 1.1 : 1})`,
                  boxShadow: slot.type === 'primaryIon' ? `0 0 5px ${primaryColor}` : 'none',
                  transitionProperty: 'background-color, transform, opacity, box-shadow',
               }}
            />
         ))}
      </div>
   );
}

export default ParticleSystem;
