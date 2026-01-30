/**
 * ConcentrationBarChart - Vertical bar chart showing species concentrations
 * Displays HCl, H+, Cl- (or equivalent) concentration bars
 */
import { useEffect, useMemo, useState } from 'react';
import type { AcidOrBase } from '../../../helper/acidsBases/types';
import { calculatePH } from '../../../helper/acidsBases/simulationEngine';
import { hydrogenChloride } from '../../../helper/acidsBases/substances';

interface ConcentrationBarChartProps {
   substance: AcidOrBase | null;
   molarity: number;
   addedFraction: number;
   pH: number;
   height?: number;
   className?: string;
   mode?: 'concentration' | 'ph';
   onModeChange?: (mode: 'concentration' | 'ph') => void;
   customRatios?: { substance: number; primary: number; secondary: number };
}

export function ConcentrationBarChart({
   substance,
   molarity,
   addedFraction,
   pH,
   height = 180,
   className = '',
   mode,
   onModeChange,
   customRatios,
}: ConcentrationBarChartProps) {
   const [internalMode, setInternalMode] = useState<'concentration' | 'ph'>('concentration');
   const currentMode = mode ?? internalMode;

   const handleModeChange = (nextMode: 'concentration' | 'ph') => {
      if (mode === undefined) {
         setInternalMode(nextMode);
      }
      onModeChange?.(nextMode);
   };

   const [animFraction, setAnimFraction] = useState(addedFraction);
   const [animMolarity, setAnimMolarity] = useState(molarity);
   const [animPH, setAnimPH] = useState(pH);

   useEffect(() => {
      let animationFrame: number;
      let startTime: number | null = null;
      const startFraction = animFraction;
      const startMolarity = animMolarity;
      const startPH = animPH;
      const duration = 300;

      const animate = (time: number) => {
         if (startTime === null) startTime = time;
         const elapsed = time - startTime;
         const progress = Math.min(elapsed / duration, 1);
         const ease = 1 - Math.pow(1 - progress, 3);

         setAnimFraction(startFraction + (addedFraction - startFraction) * ease);
         setAnimMolarity(startMolarity + (molarity - startMolarity) * ease);
         setAnimPH(startPH + (pH - startPH) * ease);

         if (progress < 1) {
            animationFrame = requestAnimationFrame(animate);
         }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
   }, [addedFraction, molarity, pH]);

   const isPHMode = currentMode === 'ph';
   const activeSubstance = substance ?? hydrogenChloride;

   const barData = useMemo(() => {
      if (isPHMode) return [] as Array<{ label: string; height: number; color: string }>;

      const nSubstance = activeSubstance.substanceAddedPerIon;
      const totalParts = nSubstance + 2;

      const neutralShare = customRatios ? customRatios.substance : nSubstance / totalParts;
      const ionSharePrimary = customRatios ? customRatios.primary : 1 / totalParts;
      const ionShareSecondary = customRatios ? customRatios.secondary : 1 / totalParts;

      const substanceLimit = neutralShare * 100;
      const primaryLimit = ionSharePrimary * 100;
      const secondaryLimit = ionShareSecondary * 100;

      const secondaryCharge = activeSubstance.primaryIon === 'hydrogen' ? '⁻' : '⁺';

      return [
         { label: activeSubstance.symbol, height: substanceLimit * animFraction, color: activeSubstance.color },
         { label: activeSubstance.primaryIon === 'hydrogen' ? 'H⁺' : 'OH⁻', height: primaryLimit * animFraction, color: activeSubstance.primaryColor },
         { label: `${activeSubstance.secondaryIon}${secondaryCharge}`, height: secondaryLimit * animFraction, color: activeSubstance.secondaryColor }
      ];
   }, [isPHMode, activeSubstance, animFraction, customRatios]);

   const GRAPH_PADDING = 10;

   const phPolyline = useMemo(() => {
      if (!substance) return '';
      const safeFraction = Math.max(addedFraction, 0.0001);
      const pts: Array<[number, number]> = [];
      const steps = 60;
      for (let i = 0; i <= steps; i++) {
         const xRatio = i / steps;
         const x = xRatio * safeFraction;
         const mTotal = molarity / safeFraction;
         const mAtX = mTotal * x;
         const phAtX = calculatePH(substance, Math.max(mAtX, 1e-10));

         // Map to padded space
         const px = GRAPH_PADDING + (xRatio * addedFraction) * (100 - GRAPH_PADDING * 2);
         const py = (100 - GRAPH_PADDING) - ((phAtX / 14) * (100 - GRAPH_PADDING * 2));
         pts.push([px, py]);
      }
      return pts.map(point => `${point[0]},${point[1]}`).join(' ');
   }, [substance, addedFraction, molarity, GRAPH_PADDING]);

   const phDot = useMemo(() => {
      const x = GRAPH_PADDING + animFraction * (100 - GRAPH_PADDING * 2);
      const y = (100 - GRAPH_PADDING) - ((animPH / 14) * (100 - GRAPH_PADDING * 2));
      return { x, y };
   }, [animFraction, animPH, GRAPH_PADDING]);

   return (
      <div className={`${className} w-[250px] min-h-[300px] flex flex-col h-full`} style={{ height }}>
         <div className="flex gap-4 ml-6 mb-2 text-[30px] font-semibold">
            <button
               type="button"
               onClick={() => handleModeChange('concentration')}
               className={currentMode === 'concentration' ? 'text-[#ED5A3B] text-[22px]' : 'text-[#c0c0c0] hover:text-gray-400 text-[22px]'}
               style={{ 
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
               }}
            >
               Concentration
            </button>
            <button
               type="button"
               onClick={() => handleModeChange('ph')}
               className={currentMode === 'ph' ? 'text-[#ED5A3B] text-[22px]' : 'text-[#c0c0c0] hover:text-gray-400 text-[22px]'}
               style={{ 
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer'
               }}
            >
               pH
            </button>
         </div>

         {currentMode === 'concentration' ? (
            <>
               <div 
                  className="flex-1 relative mx-auto w-full max-w-[210px] rounded-sm overflow-hidden"
                  style={{ 
                     border: '3px solid black',
                     borderTop: 'none'
                  }}
               >
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                     <div key={i} className="absolute left-0 right-0 flex items-center" style={{ bottom: `${(i + 1) * 10}%` }}>
                        <div className="w-[13px] h-[3px] bg-black absolute -left-[2px]" />
                        <div className="flex-1" style={{ borderTop: '1px solid #8D8D8C' }} />
                     </div>
                  ))}

                  <div className="absolute mb-5 inset-0 flex justify-around items-end px-4 pb-[1px]">
                     {barData.map((bar, idx) => (
                        <div key={idx} className="flex flex-col items-center justify-end h-full flex-1">
                           <div
                              className="w-8 transition-all duration-300 ease-out rounded-t-sm"
                              style={{
                                 height: `${Math.max(bar.height, 2)}%`,
                                 backgroundColor: bar.color
                              }}
                           />
                        </div>
                     ))}
                  </div>
               </div>

               <div className="flex justify-around mt-2 w-full max-w-[240px] mx-auto px-4">
                  {barData.map((bar, idx) => (
                     <div key={idx} className="flex flex-col items-center gap-1">
                        <div className="w-5 h-5 rounded-full" style={{ backgroundColor: bar.color }} />
                        <span className="text-[16px] text-600">{bar.label}</span>
                     </div>
                  ))}
               </div>
            </>
         ) : (
            <div className="flex-1 flex flex-col items-center mt-2 px-6">
               <div 
                  className="relative w-full aspect-square bg-white"
                  style={{ border: '2px solid black' }}
               >
                  <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                     {/* Y-axis ticks */}
                     {[1, 2.3, 3.6, 4.9, 6.2, 7.5, 8.8, 10.1, 11.4, 12.7, 14].map((phTick) => (
                        <line
                           key={`y-${phTick}`}
                           x1={0}
                           y1={(100) - (phTick / 14) * (100 - GRAPH_PADDING * 2)}
                           x2={3}
                           y2={(100) - (phTick / 14) * (100 - GRAPH_PADDING * 2)}
                           stroke="black"
                           strokeWidth={1}
                        />
                     ))}

                     {/* X-axis ticks (0 to 100% of molarity added) */}
                     {[0.1, 0.22, 0.33, 0.44, 0.55, 0.66, 0.77, 0.88, 0.99, 1.1].map((frac) => (
                        <line
                           key={`x-${frac}`}
                           x1={ frac * (100 - GRAPH_PADDING * 3)}
                           y1={100 - GRAPH_PADDING + 8}
                           x2={frac * (100 - GRAPH_PADDING * 3)}
                           y2={100 - GRAPH_PADDING + 11}
                           stroke="black"
                           strokeWidth={1}
                        />
                     ))}

                     {/* pH curve */}
                     {phPolyline && (
                        <polyline
                           points={phPolyline}
                           fill="none"
                           stroke="#4682B4"
                           strokeWidth={1.5}
                        />
                     )}

                     {/* Animated dot at current state */}
                     <circle
                        cx={phDot.x}
                        cy={phDot.y}
                        r={2.5}
                        fill="#4682B4"
                        className="transition-all duration-300"
                     />

                     {/* Y-axis label (pH) */}
                     <text
                        x={GRAPH_PADDING / 2}
                        y={40}
                        fontSize={8}
                        textAnchor="middle"
                        className="fill-black "
                        transform={`rotate(-90, ${GRAPH_PADDING / 2}, 50)`}
                     >
                        pH
                     </text>

                     {/* X-axis label (Moles added) */}
                     <text
                        x={50}
                        y={115}
                        fontSize={8}
                        textAnchor="middle"
                        className="fill-black"
                     >
                        Moles added
                     </text>
                  </svg>
               </div>
            </div>
         )}
      </div>
   );
}
