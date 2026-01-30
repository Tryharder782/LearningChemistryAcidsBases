/**
 * Burette placeholder component for titration.
 */

import { useId } from 'react';

interface BuretteProps {
   /** Current liquid level as fraction (0-1) */
   liquidLevel?: number;
   /** Color of the liquid */
   liquidColor?: string;
   /** Width in pixels */
   width?: number;
   /** Height in pixels */
   height?: number;
   /** Is currently dripping */
   isDripping?: boolean;
   /** Opacity of the liquid (0-1), defaults to 0.55 */
   liquidOpacity?: number;
}

export function Burette({
   liquidLevel = 0.8,
   liquidColor = '#ADD8E6',
   width = 120,
   height = 200,
   liquidOpacity = 0.55,
}: BuretteProps) {
   const clipId = useId();
   const viewBoxHeight = 248.56;
   const tube = { x: 39, y: 1, width: 24, height: 167 };
   const fillAreaHeight = viewBoxHeight - tube.y;
   const clampedLevel = Math.max(0, Math.min(1, liquidLevel));
   const liquidHeight = fillAreaHeight * clampedLevel;
   const liquidTop = tube.y + (fillAreaHeight - liquidHeight);

   return (
      <div className="relative" style={{ width, height }}>
         <svg
            viewBox="0 0 155.41 248.56"
            className="absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden="true"
         >
            <defs>
               <clipPath id={clipId}>
                  <rect x="39" y="1" width="24" height="167" />
                  <path d="m15.5,167.5c6,25.33,12,50.67,18,76,.07.34.63,2.81,3,4,2.21,1.11,4.33.26,5,0,2.69-1.07,3.81-3.58,4-4,0,0,.05-.11.1-.22.54-1.33,3.95-15.82,16.9-75.78v-39c0-15.33,0-30.67,0-46,0-11.87,0-30.93,0-31,0-11.97.02-29.25.07-50.5-15.69.17-31.38.33-47.07.5v141c.04,15.32.04,25,0,25,0,0,0-1.11,0-3.32,0-.16,0-3.16,0-3.31" />
               </clipPath>
            </defs>
            <rect
               x="0"
               y={liquidTop}
               width="155.41"
               height={liquidHeight}
               fill={liquidColor}
               opacity={liquidOpacity}
               clipPath={`url(#${clipId})`}
            />
         </svg>

         <img
            src="/source-images/burette-tool.svg"
            alt="Burette"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
            draggable={false}
         />
      </div>
   );
}

export default Burette;
