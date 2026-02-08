import { useEffect, useRef, useState } from 'react';
import type { Particle } from '../helper/acidsBases/particles/types';

export function useParticleAnimation(
   particles: Particle[],
   _duration: number = 400
): Particle[] {
   const [displayParticles, setDisplayParticles] = useState<Particle[]>(particles);
   const animationRef = useRef<number | null>(null);

   useEffect(() => {
      const tick = () => {
         const now = Date.now();
         const next = particles.map(p => {
            // Handle staggered appearance via createdAt
            if (p.isInitialAppearance && now < p.createdAt) {
               return { ...p, opacity: 0, scale: 1 };
            }
            // All visible particles: no fade-in, instant appearance
            return { ...p, opacity: 1, scale: 1 };
         });

         setDisplayParticles(next);

         // Continue animation only if some particles are still waiting to appear
         if (particles.some(p => p.isInitialAppearance && now < p.createdAt)) {
            animationRef.current = requestAnimationFrame(tick);
         }
      };

      tick();

      return () => {
         if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
         }
      };
   }, [particles]);

   return displayParticles;
}

