/**
 * Pipette component with dynamic liquid level.
 */
import { useId } from 'react';

interface PipetteProps {
   /** Liquid fill level (0-1) */
   liquidLevel?: number;
   /** Liquid color */
   liquidColor?: string;
   /** Width in pixels */
   width?: number;
   /** Height in pixels */
   height?: number;
   /** Optional className */
   className?: string;
   /** Whether the pipette is disabled (inactive look) */
   disabled?: boolean;
}

export function Pipette({
   liquidLevel = 1,
   liquidColor = '#6F64C8',
   width = 40,
   height = 64,
   className = '',
   disabled = false,
}: PipetteProps) {
   const clipId = useId();
   const viewBoxWidth = 85;
   const viewBoxHeight = 168.01;
   const tubeTop = 68.51;
   const tubeHeight = viewBoxHeight - tubeTop;
   const clampedLevel = Math.max(0, Math.min(1, liquidLevel));
   const fillHeight = tubeHeight * clampedLevel;
   const fillTop = tubeTop + (tubeHeight - fillHeight);

   return (
      <svg
         width={width}
         height={height}
         viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
         className={className}
         aria-label="Pipette"
      >
         <defs>
            <clipPath id={clipId}>
               <path d="m57,68.51h-29v79c3.07,5.57,5.91,9.95,8,13,4,5.84,5.43,7.04,7,7,1.88-.05,3.22-1.87,7-8,3-4.88,5.36-9.02,7-12v-79Z" />
            </clipPath>
         </defs>

         {!disabled && (
            <rect
               x={0}
               y={fillTop}
               width={viewBoxWidth}
               height={fillHeight}
               fill={liquidColor}
               opacity={0.7}
               clipPath={`url(#${clipId})`}
               style={{ transition: 'y 200ms ease, height 200ms ease' }}
            />
         )}

         <rect x=".5" y="47.01" width="84" height="21" fill="none" stroke={disabled ? "#9ca3af" : "#000"} strokeMiterlimit="10" />
         <path d="m57,68.51h-29v79c3.07,5.57,5.91,9.95,8,13,4,5.84,5.43,7.04,7,7,1.88-.05,3.22-1.87,7-8,3-4.88,5.36-9.02,7-12v-79Z" fill="none" stroke={disabled ? "#9ca3af" : "#000"} strokeMiterlimit="10" />
         <path d="m63,15.51C60.04,6.4,51.45.29,42,.51c-9.09.21-17.16,6.24-20,15v31h41V15.51Z" fill="none" stroke={disabled ? "#9ca3af" : "#000"} strokeMiterlimit="10" />
         {/* Bulb fill */}
         <path
            d="m63,15.51C60.04,6.4,51.45.29,42,.51c-9.09.21-17.16,6.24-20,15v31h41V15.51Z"
            fill={disabled ? "#808080" : "#000"}
            opacity={disabled ? 1 : 0.3}
         />

         {/* Stripes */}
         <g fill={disabled ? "#d1d5db" : "#000"} opacity={disabled ? 1 : 0.3}>
            <rect x=".5" y="47.01" width="16" height="21" />
            <rect x="22.5" y="47.01" width="5" height="21" />
            <rect x="32.5" y="47.01" width="5" height="21" />
            <rect x="42.5" y="47.01" width="5" height="21" />
            <rect x="52.5" y="47.01" width="5" height="21" />
            <rect x="63.5" y="47.01" width="5" height="21" />
            <rect x="73.5" y="47.01" width="5" height="21" />
         </g>

         {!disabled && (
            <circle cx="42.5" cy="23.01" r="15" fill="#f15a24" opacity={0.7} />
         )}
      </svg>
   );
}

export default Pipette;
