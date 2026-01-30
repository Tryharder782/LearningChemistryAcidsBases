import { useEffect, useState } from 'react';

export const useWaterLineOffset = (
   beakerContainerRef: React.RefObject<HTMLDivElement | null>,
   bottlesContainerRef: React.RefObject<HTMLDivElement | null>,
   waterLevel: number
) => {
   const [waterLineOffset, setWaterLineOffset] = useState<number | null>(null);

   useEffect(() => {
      const updateWaterLineOffset = () => {
         const beakerEl = beakerContainerRef.current;
         const bottlesEl = bottlesContainerRef.current;
         if (!beakerEl || !bottlesEl) return;

         const beakerRect = beakerEl.getBoundingClientRect();
         const bottlesRect = bottlesEl.getBoundingClientRect();
         const waterLineY = beakerRect.top + (1 - waterLevel) * beakerRect.height;
         setWaterLineOffset(waterLineY - bottlesRect.top);
      };

      updateWaterLineOffset();
      window.addEventListener('resize', updateWaterLineOffset);
      return () => window.removeEventListener('resize', updateWaterLineOffset);
   }, [waterLevel, beakerContainerRef, bottlesContainerRef]);

   return waterLineOffset;
};
