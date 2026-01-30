import { useEffect, useRef, useState } from 'react';
import type { Particle } from '../helper/acidsBases/particles/types';

export function useParticleAnimation(
   particles: Particle[],
   duration: number = 400
): Particle[] {
   const [displayParticles, setDisplayParticles] = useState<Particle[]>(particles);
   const animationRef = useRef<number | null>(null);
   const startTimeRef = useRef<number>(Date.now());

   useEffect(() => {
      const start = Date.now();
      startTimeRef.current = start;

      const tick = () => {
         const now = Date.now();
         const next = particles.map(p => {
            const age = Math.max(0, now - p.createdAt);
            if (age < duration) {
               const t = Math.max(0, Math.min(1, age / duration));
               return {
                  ...p,
                  opacity: t,
                  scale: 0.8 + 0.2 * t
               };
            }
            return {
               ...p,
               opacity: 1,
               scale: 1
            };
         });

         setDisplayParticles(next);

         if (particles.some(p => now - p.createdAt < duration)) {
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
