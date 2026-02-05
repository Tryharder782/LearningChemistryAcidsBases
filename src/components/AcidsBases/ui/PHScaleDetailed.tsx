import { ACIDS_BASES_COLORS } from '../../../theme/acidsBasesColors';

interface PHScaleDetailedProps {
   /** Current pH value */
   pH: number;
   /** Width of the scale */
   width?: number | string;
   /** Optional className */
   className?: string;
   /** Display mode */
   mode: 'concentration' | 'ph';
}

export function PHScaleDetailed({
   pH,
   mode,
   width = '100%',
   className = '',
}: PHScaleDetailedProps) {

   // Clamp pH between 0 and 14
   const clampedPH = Math.max(0, Math.min(14, pH));
   const indicatorPosition = (clampedPH / 14) * 100;

   // Horizontal inset to prevent labels from clipping the rounded corners
   const hPadding = '24px';

   // --- DATA PREPARATION ---
   const hConcentration = Math.pow(10, -clampedPH);
   const ohConcentration = Math.pow(10, -(14 - clampedPH));

   // Format concentration in scientific notation
   const formatConc = (c: number) => {
      if (c >= 1) return c.toFixed(1);

      const exp = Math.floor(Math.log10(c));
      const mantissa = c / Math.pow(10, exp);

      // If mantissa is very close to 10, adjust (e.g. 9.99 -> 1.0 and exp++)
      let finalMantissa = mantissa;
      let finalExp = exp;
      if (finalMantissa >= 9.95) {
         finalMantissa = 1.0;
         finalExp += 1;
      }

      return `${finalMantissa.toFixed(1)}×10${toSuperscript(finalExp)}`;
   };

   // Helper for superscript exponents
   const symbols: Record<string, string> = {
      '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
      '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹'
   };
   const toSuperscript = (num: number) => {
      return String(num).split('').map(char => symbols[char] || char).join('');
   };

   // pH Mode Data
   const pOH = 14 - clampedPH;
   const formatPH = (val: number) => val.toFixed(1);

   // Labels based on mode
   const topLabels = mode === 'concentration'
      ? ['10⁻⁰', '10⁻¹', '10⁻²', '10⁻³', '10⁻⁴', '10⁻⁵', '10⁻⁶', '10⁻⁷', '10⁻⁸', '10⁻⁹', '10⁻¹⁰', '10⁻¹¹', '10⁻¹²', '10⁻¹³', '10⁻¹⁴']
      : ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'];

   const bottomLabels = mode === 'concentration'
      ? [...topLabels].reverse()
      : ['14', '13', '12', '11', '10', '9', '8', '7', '6', '5', '4', '3', '2', '1', '0'];

   return (
      <div className={`flex flex-col items-center select-none ${className}`} style={{ width }}>
         {/* HEADER AREA: Acid/Basic Labels Only */}
         <div className="flex items-center justify-between w-full mb-1 relative">
            <div className="w-14" />
            <div className="flex-1 flex justify-between relative" style={{ paddingLeft: hPadding, paddingRight: hPadding }}>
               <span className="text-xl font-semibold transform -translate-x-1" style={{ color: ACIDS_BASES_COLORS.ui.phScale.acidText }}>Acid</span>
               <span className="text-xl font-semibold transform translate-x-1" style={{ color: ACIDS_BASES_COLORS.ui.phScale.basicText }}>Basic</span>
            </div>
            <div className="w-14" />
         </div>

         {/* Scale Row */}
         <div className="flex items-center gap-1 w-full relative">
            {/* FAR LEFT LABEL */}
            <div className="w-14 flex items-start justify-center">
               <span className="text-xl font-medium transform -translate-y-2" style={{ color: ACIDS_BASES_COLORS.ui.phScale.acidLabel }}>
                  {mode === 'concentration' ? '[H⁺]' : 'pH'}
               </span>
            </div>

            {/* MAIN BAR CONTAINER */}
            <div className="flex-1 relative">
               {/* TOP INDICATOR */}
               <div className="absolute top-0 h-0 z-20" style={{ left: hPadding, right: hPadding }}>
                  <div
                     className="absolute bottom-[8px] transform -translate-x-1/2 transition-all duration-300 ease-out flex flex-col items-center"
                     style={{ left: `${indicatorPosition}%` }}
                  >
                     <div className="text-white px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap border border-white/20"
                        style={{ backgroundColor: ACIDS_BASES_COLORS.ui.phScale.acidIndicator }}>
                        {mode === 'concentration'
                           ? `[H⁺]: ${formatConc(hConcentration)}`
                           : `pH: ${formatPH(clampedPH)}`
                        }
                     </div>
                     <div
                        style={{
                           width: 14,
                           height: 9,
                           marginTop: -1,
                           background: ACIDS_BASES_COLORS.ui.phScale.acidIndicator,
                           clipPath: 'polygon(50% 100%, 0 0, 100% 0)',
                        }}
                     />
                  </div>
               </div>

               {/* ACTUAL SCALE BAR */}
               <div
                  className="h-[85px] rounded-[10px] relative bg-white overflow-visible shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
                  style={{ border: '2.5px solid black' }}
               >
                  <div
                     className="absolute inset-0 rounded-[7px]"
                     style={{
                        background: `linear-gradient(to right, ${ACIDS_BASES_COLORS.ui.phScale.gradientStart} 0%, ${ACIDS_BASES_COLORS.ui.phScale.gradientMiddle} 50%, ${ACIDS_BASES_COLORS.ui.phScale.gradientEnd} 100%)`
                     }}
                  />

                  {/* Unified Ticks and Labels Layer */}
                  <div className="absolute inset-y-[2px] overflow-visible" style={{ left: hPadding, right: hPadding }}>
                     {topLabels.map((_, i) => (
                        <div
                           key={i}
                           className="absolute top-0 bottom-0 flex flex-col justify-between items-center transform -translate-x-1/2"
                           style={{ left: `${(i / 14) * 100}%` }}
                        >
                           <div className="flex flex-col items-center">
                              <div className="w-[1.5px] h-[6px] bg-black mb-[1px]" />
                              <span className="text-[10px] font-bold text-gray-800 leading-none">{topLabels[i]}</span>
                           </div>
                           <div className="flex flex-col-reverse items-center">
                              <div className="w-[1.5px] h-[6px] bg-black mt-[1px]" />
                              <span className="text-[10px] font-bold text-gray-800 leading-none">{bottomLabels[i]}</span>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* BOTTOM INDICATOR */}
               <div className="absolute bottom-0 h-0 z-20" style={{ left: hPadding, right: hPadding }}>
                  <div
                     className="absolute top-[8px] transform -translate-x-1/2 transition-all duration-300 ease-out flex flex-col-reverse items-center"
                     style={{ left: `${indicatorPosition}%` }}
                  >
                     <div className="text-white px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap border border-white/20"
                        style={{ backgroundColor: ACIDS_BASES_COLORS.ui.phScale.basicIndicator }}>
                        {mode === 'concentration'
                           ? `[OH⁻]: ${formatConc(ohConcentration)}`
                           : `pOH: ${formatPH(pOH)}`
                        }
                     </div>
                     <div
                        style={{
                           width: 14,
                           height: 9,
                           marginBottom: -1,
                           background: ACIDS_BASES_COLORS.ui.phScale.basicIndicator,
                           clipPath: 'polygon(50% 0, 0 100%, 100% 100%)',
                        }}
                     />
                  </div>
               </div>
            </div>

            {/* FAR RIGHT LABEL */}
            <div className="w-14 flex items-end justify-center pb-2 h-[85px]">
               <span className="text-xl font-medium" style={{ color: ACIDS_BASES_COLORS.ui.phScale.basicText }}>
                  {mode === 'concentration' ? '[OH⁻]' : 'pOH'}
               </span>
            </div>
         </div>
      </div>
   );
}

export default PHScaleDetailed;
