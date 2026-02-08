import { useMemo } from 'react';
import type { AcidOrBase } from '../../../../helper/acidsBases/types';
import type { BufferSaltModel } from '../../../../helper/acidsBases/BufferSaltModel';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ACIDS_BASES_COLORS } from '../../../../theme/acidsBasesColors';

type BufferPhMolesChartProps = {
   substance: AcidOrBase | null;
   saltModel: BufferSaltModel | null;
   strongMaxSubstance: number;
   strongSubstanceAdded: number;
   isStrongPhaseStep: boolean;
   predictedStrongConfig?: {
      maxMoles: number;
      initialPh: number;
      finalPh: number;
   } | null;
};

type ChartPoint = {
   moles: number;
   pH: number;
};

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const computeStrongPhasePh = (
   substance: AcidOrBase,
   saltModel: BufferSaltModel,
   strongMaxSubstance: number,
   molesAdded: number
): number => {
   if (strongMaxSubstance <= 0) return 7;

   const baseConcs = saltModel.getConcentrations(saltModel.maxSubstance);
   const basePh = saltModel.getPH(saltModel.maxSubstance);

   const isAcid = substance.type === 'weakAcid';
   const pK = isAcid ? substance.pKA : substance.pKB;
   const targetP = isAcid ? basePh - 1.5 : (14 - basePh) - 1.5;

   const powerTerm = Math.pow(10, targetP - pK);
   const numer = baseConcs.secondary - (baseConcs.substance * powerTerm);
   const denom = 1 + powerTerm;
   const change = denom === 0 ? 0 : numer / denom;

   const t = clamp(molesAdded / strongMaxSubstance, 0, 1);
   const substanceValue = baseConcs.substance + change * t;
   const secondaryValue = baseConcs.secondary - change * t;

   const ratio = secondaryValue / substanceValue;
   if (!Number.isFinite(ratio) || ratio <= 0 || substanceValue <= 1e-10 || secondaryValue <= 1e-10) {
      return 7;
   }

   if (substance.type === 'weakAcid') {
      return substance.pKA + Math.log10(ratio);
   }

   const pOH = substance.pKB + Math.log10(ratio);
   return 14 - pOH;
};

export const BufferPhMolesChart = ({
   substance,
   saltModel,
   strongMaxSubstance,
   strongSubstanceAdded,
   isStrongPhaseStep,
   predictedStrongConfig
}: BufferPhMolesChartProps) => {
   const showBufferLine = Boolean(isStrongPhaseStep && substance && saltModel && strongMaxSubstance > 0);
   const isAcidAddition = substance?.type === 'weakAcid';

   const { data, domain, currentPoint, ticks, maxMoles, waterLineData } = useMemo(() => {
      // Use predicted max if available, otherwise fallback
      // Ensure we have a stable max for the graph X-axis
      const maxMolesValue = Math.max(
         20,
         predictedStrongConfig?.maxMoles ?? 0,
         strongMaxSubstance || 0,
         saltModel?.maxSubstance ?? 0
      );

      let points: ChartPoint[] = [];

      // Domain stability: derive from predicted config when available
      let domainMin = 0;
      let domainMax = 14;

      if (predictedStrongConfig) {
         const padding = 1.0;
         const waterLow = 1.0;
         const waterHigh = 13.0;
         const predictedMin = Math.min(predictedStrongConfig.initialPh, predictedStrongConfig.finalPh);
         const predictedMax = Math.max(predictedStrongConfig.initialPh, predictedStrongConfig.finalPh);
         const globalMin = Math.min(predictedMin, waterLow);
         const globalMax = Math.max(predictedMax, waterHigh);

         domainMin = Math.max(0, Math.floor(globalMin - padding));
         domainMax = Math.min(14, Math.ceil(globalMax + padding));
      }

      let current: ChartPoint | null = null;
      let waterLine: ChartPoint[] = [];

      if (showBufferLine && substance && saltModel) {
         const pointCount = Math.min(60, Math.max(24, Math.ceil(maxMolesValue / 2)));
         // ... (rest of point generation same as before)
         for (let i = 0; i <= pointCount; i += 1) {
            const t = i / pointCount;
            // Use log distribution for points to make smooth curve on log scale
            const logMin = Math.log10(1);
            const logMax = Math.log10(maxMolesValue);
            const logVal = logMin + (logMax - logMin) * t;
            const moles = Math.pow(10, logVal);

            const pH = computeStrongPhasePh(substance, saltModel, strongMaxSubstance, moles);
            points.push({ moles, pH });
         }

         const phValues = points.map(point => point.pH);
         const minPh = Math.min(...phValues);
         const maxPh = Math.max(...phValues);

         if (!predictedStrongConfig) {
            const padding = 1.0;
            domainMin = Math.max(0, Math.floor(minPh - padding));
            domainMax = Math.min(14, Math.ceil(maxPh + padding));
         }

         const currentMoles = clamp(Math.max(1, strongSubstanceAdded), 1, maxMolesValue);
         const currentPh = computeStrongPhasePh(substance, saltModel, strongMaxSubstance, currentMoles);
         current = { moles: currentMoles, pH: currentPh };
      }

      // Always Calculate Water Line based on maxMolesValue and Domain
      // Diagonal Water Line: From (1, domainMax) to (maxMoles, domainMin)
      // isAcidAddition defined in outer scope
      if (isAcidAddition) {
         // Acid drops pH. Start High -> End Low.
         waterLine = [
            { moles: 1, pH: domainMax }, // Top-Left
            { moles: maxMolesValue, pH: domainMin } // Bottom-Right
         ];
      } else {
         // Base rises pH. Start Low -> End High.
         waterLine = [
            { moles: 1, pH: domainMin }, // Bottom-Left
            { moles: maxMolesValue, pH: domainMax } // Top-Right
         ];
      }

      // Ticks for Grid only, no labels
      const tickPowerMax = Math.ceil(Math.log10(maxMolesValue));
      const niceTicks = [];
      for (let p = 0; p <= tickPowerMax; p++) {
         const val = Math.pow(10, p);
         if (val <= maxMolesValue) niceTicks.push(val);
      }

      return {
         data: points,
         domain: [domainMin, domainMax] as [number, number],
         currentPoint: current,
         ticks: niceTicks.sort((a, b) => a - b),
         maxMoles: maxMolesValue,
         waterLineData: waterLine
      };
   }, [showBufferLine, substance, saltModel, strongMaxSubstance, strongSubstanceAdded, predictedStrongConfig]);

   return (
      <div
         className="w-full h-full relative"
         style={{ border: '2px solid #000', borderRadius: 2, background: '#fff', overflow: 'hidden' }}
      >
         {/* Labels */}
         <div className="absolute -left-7 top-1/2 -translate-y-1/2 -rotate-90 text-sm font-semibold text-gray-700 pointer-events-none">pH</div>
         <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-sm font-semibold text-gray-700 pointer-events-none">Moles added</div>

         {/* Graph Area: Occupy 100% of the box space. No margins inside the black border. */}
         <div className="absolute inset-0">
            <ResponsiveContainer width="100%" height="100%">
               <LineChart data={data} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                  <CartesianGrid vertical={false} horizontal={false} />
                  <XAxis
                     dataKey="moles"
                     type="number"
                     scale="log"
                     domain={[1, maxMoles]}
                     ticks={ticks}
                     tick={false}
                     tickLine={false}
                     axisLine={false}
                     hide={true}
                  />
                  <YAxis
                     type="number"
                     domain={domain}
                     tick={false}
                     tickLine={{ stroke: 'black', strokeWidth: 2, width: 6 }}
                     axisLine={{ stroke: 'black', strokeWidth: 0 }}
                     hide={false}
                     width={10}
                  />

                  {/* Black border is handled by outer div, but we want axes marks? 
                      Reference shows ticks on Y axis. 
                      Let's try to keep YAxis visible but simple. 
                  */}

                  <Line
                     data={waterLineData}
                     type="linear"
                     dataKey="pH"
                     stroke="black"
                     strokeWidth={1.5}
                     dot={false}
                     isAnimationActive={false}
                  />
                  {showBufferLine && (
                     <Line
                        type="monotone"
                        dataKey="pH"
                        stroke={ACIDS_BASES_COLORS.ui.primary}
                        strokeWidth={2}
                        dot={false}
                        isAnimationActive={false}
                     />
                  )}
                  {currentPoint && (
                     <Line
                        data={[currentPoint]}
                        type="linear"
                        dataKey="pH"
                        stroke="transparent"
                        dot={{ r: 5, fill: ACIDS_BASES_COLORS.ui.primary, stroke: 'none' }}
                        isAnimationActive={true}
                        animationDuration={350}
                        animationEasing="ease-in-out"
                     />
                  )}
               </LineChart>
            </ResponsiveContainer>

            {/* Custom Ticks Overlay (if Recharts axes are tricky without taking space) */}
            <div className="absolute left-0 top-0 bottom-0 w-2 flex flex-col justify-between py-[10px] pointer-events-none">
               {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-1.5 h-[2px] bg-black"></div>
               ))}
            </div>
            {/* Bottom X-axis ticks */}
            <div className="absolute left-0 right-0 -bottom-1 h-2 flex justify-between px-[10px] pointer-events-none">
               {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-1.5 w-[2px] bg-black"></div>
               ))}
            </div>

         </div>

         {/* Legend - Position based on graph direction to avoid overlap */}
         {/* Acid (Decreasing): Line TL->BR. Legend BL (Safe). */}
         {/* Base (Increasing): Line BL->TR. Legend TL (Safe). */}
         <div
            className={`absolute left-[15px] flex flex-col gap-0 text-xs font-semibold text-gray-800 bg-white/10 backdrop-blur-[0px] rounded p-1 pointer-events-none ${isAcidAddition ? 'bottom-[10px]' : 'top-[10px]'
               }`}
         >
            <div className="flex items-center gap-2">
               <div className="w-2.5 h-2.5 rounded-full bg-black"></div>
               <span>Water</span>
            </div>
            <div className="flex items-center gap-2">
               <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ACIDS_BASES_COLORS.ui.primary }}></div>
               <span>Buffer</span>
            </div>
         </div>
      </div>
   );
};
