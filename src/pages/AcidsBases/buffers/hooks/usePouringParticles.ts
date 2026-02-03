import { useEffect, useRef, useState } from 'react';
import type { AcidOrBase } from '../../../../helper/acidsBases/types';

type PouringParticle = {
   id: number;
   offsetX: number;
   delayMs: number;
   durationMs: number;
   distancePx: number;
   endTimeMs: number;
};

export type PouringEntry = {
   id: string;
   substance: AcidOrBase;
   startX: number;
   startY: number;
   particles: PouringParticle[];
};

type BottleIndex = 0 | 1 | 2 | 3;

type UsePouringParticlesResult = {
   pouringParticles: PouringEntry[];
   createPour: (substance: AcidOrBase, bottleIndex: BottleIndex, options?: { speedMultiplier?: number; particleCount?: number }) => void;
   bottlesContainerRef: React.RefObject<HTMLDivElement | null>;
   registerBottle: (bottleIndex: BottleIndex, element: HTMLDivElement | null) => void;
};

export const usePouringParticles = (
   waterLineOffset: number | null,
   bottlesContainerRef: React.RefObject<HTMLDivElement | null>,
   beakerContainerRef: React.RefObject<HTMLDivElement | null>,
   config: {
      particlesPerPour?: Partial<Record<BottleIndex, number>>;
      offsets?: Partial<Record<BottleIndex, { x?: number; y?: number }>>;
   } = {}
): UsePouringParticlesResult => {
   const [pouringParticles, setPouringParticles] = useState<PouringEntry[]>([]);
   const bottleRefs = useRef<Array<HTMLDivElement | null>>([]);
   const { particlesPerPour, offsets } = config;

   const registerBottle = (bottleIndex: BottleIndex, element: HTMLDivElement | null) => {
      bottleRefs.current[bottleIndex] = element;
   };

   const getBottleAnchor = (bottleIndex: BottleIndex) => {
      // Special case for Reagent Bottle (0): Anchor to Beaker if available
      // Using viewport coordinates for Portal rendering
      if (bottleIndex === 0 && beakerContainerRef && beakerContainerRef.current) {
         const beakerRect = beakerContainerRef.current.getBoundingClientRect();
         // const scrollX = window.scrollX || 0;
         // const scrollY = window.scrollY || 0;

         const spawnX = beakerRect.left + beakerRect.width / 2 + 20 + (offsets?.[bottleIndex]?.x ?? 0);
         const spawnY = beakerRect.top - 10 + (offsets?.[bottleIndex]?.y ?? 0);
         return { x: spawnX, y: spawnY };
      }

      const bottleEl = bottleRefs.current[bottleIndex];
      // Fallback relative logic removed/simplified for viewport alignment?
      // Actually we still need a fallback.
      if (!bottleEl) {
         // If no element, we can't really guess viewport coords well.
         // Fallback to center screen? Or keep old logic?
         // Let's rely on bottleEl being present.
         return { x: 0, y: 0 };
      }

      const bottleRect = bottleEl.getBoundingClientRect();
      const x = bottleRect.left + bottleRect.width / 2 + (offsets?.[bottleIndex]?.x ?? 0);
      const y = bottleRect.top + bottleRect.height + (offsets?.[bottleIndex]?.y ?? 0);
      return { x, y };
   };

   const createPour = (substance: AcidOrBase, bottleIndex: BottleIndex, options?: { speedMultiplier?: number; particleCount?: number }) => {
      const startTime = Date.now();
      const anchor = getBottleAnchor(bottleIndex);

      // Calculate Absolute Water Y
      let waterY = 0;

      // Try to reconstruct absolute water level from offset + container top
      if (bottlesContainerRef.current && waterLineOffset !== null) {
         const bottlesTop = bottlesContainerRef.current.getBoundingClientRect().top;
         waterY = bottlesTop + waterLineOffset;
      }
      // Fallback: Estimate from beaker position if available
      else if (beakerContainerRef && beakerContainerRef.current) {
         const beakerRect = beakerContainerRef.current.getBoundingClientRect();
         // Estimate water at ~60% height if unknown
         waterY = beakerRect.top + beakerRect.height * 0.6;
      }
      // Ultimate fallback
      else {
         waterY = anchor.y + 200;
      }

      // Safety: ensure waterY is below anchor (dropping down)
      // Clamp to at least 40px drop
      const distancePx = Math.max(40, waterY - anchor.y - 5); // -5 to stop slightly above/at line

      const speedPxPerMs = 0.15; // Slower speed (~150px/s)
      const speedMultiplier = Math.min(3, Math.max(1, options?.speedMultiplier ?? 1));
      const durationMs = Math.max(120, (distancePx / speedPxPerMs) / speedMultiplier);
      const particleCount = Math.max(1, options?.particleCount ?? particlesPerPour?.[bottleIndex] ?? 5);

      setPouringParticles(prev => [...prev, {
         id: `${substance.id}-${startTime}-${Math.random().toString(36).slice(2, 7)}`,
         substance,
         startX: anchor.x,
         startY: anchor.y,
         particles: Array.from({ length: particleCount }, (_, i) => i).map(i => ({
            id: i,
            offsetX: 0,
            delayMs: i * (80 / speedMultiplier),
            durationMs,
            distancePx,
            endTimeMs: startTime + (i * (80 / speedMultiplier)) + durationMs
         }))
      }]);
   };

   useEffect(() => {
      const interval = setInterval(() => {
         const now = Date.now();
         setPouringParticles(prev => prev
            .map(p => ({
               ...p,
               particles: p.particles.filter(particle => now < particle.endTimeMs)
            }))
            .filter(p => p.particles.length > 0)
         );
      }, 50);
      return () => clearInterval(interval);
   }, []);

   return {
      pouringParticles,
      createPour,
      bottlesContainerRef,
      registerBottle
   };
};
