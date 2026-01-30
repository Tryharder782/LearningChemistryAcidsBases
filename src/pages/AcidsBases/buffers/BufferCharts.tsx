import React, { useState, useEffect, useMemo, useRef } from 'react';
import type { AcidOrBase } from '../../../helper/acidsBases/types';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell, LineChart, Line, ReferenceLine, ReferenceArea } from 'recharts';
import { ACIDS_BASES_COLORS } from '../../../theme/acidsBasesColors';

type ChartMode = 'bars' | 'curve' | 'neutralization';

const getPrimaryLabel = (substance: AcidOrBase) => (
   substance.type === 'strongBase' || substance.type === 'weakBase' ? 'OH⁻' : 'H⁺'
);

const getSecondaryLabel = (substance: AcidOrBase) => (
   substance.type === 'strongBase' || substance.type === 'weakBase'
      ? `${substance.secondaryIon}⁺`
      : `${substance.secondaryIon}⁻`
);

const fallbackSubstance: AcidOrBase = {
   id: 'fallback',
   type: 'weakAcid',
   symbol: 'HA',
   substanceAddedPerIon: 1,
   kA: 1e-5,
   kB: 1e-9,
   pKA: 4.2,
   pKB: 9.8,
   color: ACIDS_BASES_COLORS.ions.hydrogen,
   primaryColor: ACIDS_BASES_COLORS.ions.hydrogen,
   secondaryColor: ACIDS_BASES_COLORS.ions.ionA,
   concentrationAtMaxSubstance: 1,
   primaryIon: 'hydrogen',
   secondaryIon: 'A',
   saltName: 'NaA'
};

interface BufferChartsProps {
   substance: AcidOrBase | null;
   pH: number;
   concentrations?: {
      substance: number; // [HA]
      primary: number;   // [H+]
      secondary: number; // [A-]
   };
   curveMeta?: {
      currentPh: number;
      initialPh: number;
      finalPh: number;
   };
   animatedCounts?: {
      substance: number;
      primary: number;
      secondary: number;
   };
   maxParticles?: number;
   forcedMode?: ChartMode;
   showCurveToggle?: boolean;
   barsConfig?: {
      showSubstance?: boolean;
      substanceLabel?: string;
      primaryLabel?: string;
      secondaryLabel?: string;
      substanceColor?: string;
      primaryColor?: string;
      secondaryColor?: string;
      extraBars?: Array<{ label: string; value: number; color: string }>;
   };
   variant?: 'default' | 'titration';
   barsStyle?: 'default' | 'titration';
   className?: string;
}

export const BufferCharts: React.FC<BufferChartsProps> = ({
   substance,
   curveMeta,
   animatedCounts,
   maxParticles = 43,
   forcedMode,
   showCurveToggle = true,
   barsConfig,
   variant = 'default',
   barsStyle,
   className = ''
}) => {
   const [mode, setMode] = useState<ChartMode>('bars');
   const isTitration = variant === 'titration';

   // Auto-switch mode if forcedMode prop changes
   useEffect(() => {
      if (forcedMode) {
         setMode(forcedMode);
      }
   }, [forcedMode]);

   useEffect(() => {
      if (showCurveToggle) return;
      if (mode === 'curve') {
         setMode('bars');
      }
   }, [mode, showCurveToggle]);

   return (
      <div
         className={`flex flex-col h-full ${isTitration ? 'bg-transparent shadow-none p-0' : 'bg-white rounded-lg shadow-sm p-2'} ${className}`}
      >
         {/* Toggle Headers - Top for non-titration */}
         {!isTitration && (
            <div className={`flex gap-6 mb-2 text-lg font-medium`}>
               <button
                  onClick={() => setMode('bars')}
                  className={`${mode === 'bars' ? 'text-orange-500 text-[16px]' : 'text-gray-400 text-[16px]'}`}
                  style={{ background: 'none', border: 'none', padding: 0 }}
               >
                  Bars
               </button>
               {showCurveToggle && (
                  <button
                     onClick={() => setMode('curve')}
                     className={`${mode === 'curve' ? 'text-orange-500 text-[16px]' : 'text-gray-400 text-[16px]'}`}
                     style={{ background: 'none', border: 'none', padding: 0 }}
                  >
                     Curve
                  </button>
               )}
               <button
                  onClick={() => setMode('neutralization')}
                  className={`${mode === 'neutralization' ? 'text-orange-500 text-[16px]' : 'text-gray-400 text-[16px]'}`}
                  style={{ background: 'none', border: 'none', padding: 0 }}
               >
                  Neutralization
               </button>
            </div>
         )}

         {/* Chart Content */}
         <div className="flex-1 w-full min-h-0 relative">
            {mode === 'bars' && (
               <BarsView
                  substance={substance}
                  counts={animatedCounts}
                  max={maxParticles}
                  barsConfig={barsConfig}
                  variant={variant}
                  barsStyle={barsStyle}
               />
            )}
            {mode === 'curve' && (
               <CurveView
                  substance={substance}
                  curveMeta={curveMeta}
               />
            )}
            {mode === 'neutralization' && (
               <NeutralizationView
                  substance={substance}
                  counts={animatedCounts}
                  barsConfig={barsConfig}
               />
            )}
         </div>

         {/* Toggle Headers - Bottom for titration */}
         {isTitration && (
            <div className={`flex gap-6 mt-4  font-semibold justify-center`}>
               <button
                  onClick={() => setMode('bars')}
                  className={`${mode === 'bars' ? 'text-orange-500' : 'text-gray-400'}`}
                  style={{ background: 'none', border: 'none', padding: 0 }}
               >
                  Bars
               </button>
               {showCurveToggle && (
                  <button
                     onClick={() => setMode('curve')}
                     className={`text-[16px] ${mode === 'curve' ? 'text-orange-500 text-[16px]' : 'text-gray-400'}`}
                     style={{ background: 'none', border: 'none', padding: 0 }}
                  >
                     Curve
                  </button>
               )}
               <button
                  onClick={() => setMode('neutralization')}
                  className={`${mode === 'neutralization' ? 'text-orange-500' : 'text-gray-400'}`}
                  style={{ background: 'none', border: 'none', padding: 0 }}
               >
                  Neutralization
               </button>
            </div>
         )}
      </div>
   );
};

// ----------------------------------------------------------------------------
// BARS VIEW (Particles Ratio Logic)
// ----------------------------------------------------------------------------
const BarsView = ({ substance, counts, max, barsConfig, variant, barsStyle }: {
   substance: AcidOrBase | null,
   counts?: { substance: number, primary: number, secondary: number },
   max: number,
   barsConfig?: BufferChartsProps['barsConfig'],
   variant?: BufferChartsProps['variant'],
   barsStyle?: BufferChartsProps['barsStyle']
}) => {
   const isTitration = (barsStyle ?? (variant === 'titration' ? 'titration' : 'default')) === 'titration';
   const data = useMemo(() => {
      if (!substance || !counts) return [];

      const showSubstance = barsConfig?.showSubstance ?? true;
      const primaryLabel = barsConfig?.primaryLabel ?? getPrimaryLabel(substance);
      const secondaryLabel = barsConfig?.secondaryLabel ?? getSecondaryLabel(substance);
      const substanceLabel = barsConfig?.substanceLabel ?? substance.symbol;
      const substanceColor = barsConfig?.substanceColor ?? substance.color;
      const primaryColor = barsConfig?.primaryColor ?? substance.primaryColor;
      const secondaryColor = barsConfig?.secondaryColor ?? substance.secondaryColor;
      const extraBars = barsConfig?.extraBars ?? [];

      // Logic restored: Bar height is % of component capacity (MAX_PARTICLES)
      const entries = [] as Array<{ name: string; label: string; value: number; fill: string }>;

      if (showSubstance) {
         entries.push({
            name: substanceLabel,
            label: substanceLabel,
            value: Math.min(1, counts.substance / max),
            fill: substanceColor
         });
      }

      entries.push({
         name: primaryLabel,
         label: primaryLabel,
         value: Math.min(1, counts.primary / max),
         fill: primaryColor
      });

      entries.push({
         name: secondaryLabel,
         label: secondaryLabel,
         value: Math.min(1, counts.secondary / max),
         fill: secondaryColor
      });

      extraBars.forEach((bar, index) => {
         entries.push({
            name: `${bar.label}-${index}`,
            label: bar.label,
            value: Math.min(1, bar.value),
            fill: bar.color
         });
      });

      return entries;
   }, [substance, counts, max, barsConfig]);

   const chartGrid = isTitration
      ? { stroke: '#9CA3AF', strokeDasharray: '0', vertical: false }
      : { strokeDasharray: '3 3', vertical: false };
   const axisStyle = isTitration
      ? { stroke: '#111827', strokeWidth: 2 }
      : { strokeWidth: 2 };
   const tickCount = 11;
   const axisWidth = 2;
   const axisBottomPaddingPercent = 100 / (tickCount - 1);

   return (
      <div className="w-full h-full flex flex-col">
         {/* Main content: Y-label spacer + Chart */}
         <div className="flex flex-1 min-h-0">
            {/* Left spacer to match "Fraction of species" width */}
            <div className={`flex items-center justify-center flex-shrink-0 ${isTitration ? 'w-2' : 'w-5'}`}>
               {/* Empty spacer - matches CurveView Y-label width */}
            </div>

            {/* Chart Area */}
            <div
               className={isTitration ? 'w-full max-w-[280px] aspect-square' : 'flex-1'}
               style={isTitration
                  ? {
                     border: '3px solid #000',
                     borderTop: '0',
                     borderRadius: 2,
                     background: '#fff',
                     overflow: 'hidden'
                  }
                  : {
                     border: '2px solid #000',
                     borderRadius: 2,
                     background: '#fff',
                     overflow: 'hidden'
                  }
               }
            >
               <div className={`relative ${isTitration ? 'w-full h-full' : 'flex-1'}`}>
                  {isTitration && (
                     <svg
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                     >
                        {(() => {
                           const plotBottom = 100 - axisBottomPaddingPercent;
                           const tickLengthPct = 3; // ~6px on 200px+ width
                           const lineStroke = '#9CA3AF';
                           const axisStroke = '#111827';
                           return (
                              <>
                                 {Array.from({ length: tickCount }).map((_, index) => {
                                    const y = (plotBottom * index) / (tickCount - 1);
                                    const isBottom = index === tickCount - 1;
                                    return (
                                       <g key={`tick-${index}`}>
                                          <line x1="0" y1={y} x2={tickLengthPct} y2={y} stroke={axisStroke} strokeWidth={axisWidth} />
                                          {!isBottom && (
                                             <line x1={tickLengthPct} y1={y} x2="100" y2={y} stroke={lineStroke} strokeWidth="1" />
                                          )}
                                       </g>
                                    );
                                 })}
                              </>
                           );
                        })()}
                     </svg>
                  )}
                  <div style={isTitration ? { height: `calc(100% - ${axisBottomPaddingPercent}%)` } : undefined}>
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                           data={data}
                           barCategoryGap={isTitration ? '35%' : '20%'}
                           margin={isTitration ? { top: 0, right: 0, bottom: 0, left: 0 } : { top: 8, right: 8, bottom: 10, left: 28 }}
                        >
                           <CartesianGrid {...chartGrid} />
                           {/* Domain [0, 1] ensures bars are relative to max capacity, not auto-scaled */}
                           {isTitration ? (
                              <YAxis
                                 domain={[0, 1]}
                                 tick={false}
                                 axisLine={axisStyle}
                                 tickLine={false}
                                 tickCount={tickCount}
                                 width={0}
                              />
                           ) : (
                              <YAxis hide domain={[0, 1]} />
                           )}
                           <XAxis
                              dataKey="label"
                              tick={isTitration ? false : { fontSize: 14, fontWeight: 600 }}
                              axisLine={isTitration ? false : axisStyle}
                              tickLine={false}
                              height={isTitration ? 0 : 20}
                           />
                           <Bar dataKey="value" isAnimationActive={false} radius={isTitration ? [2, 2, 0, 0] : undefined}>
                              {data.map((entry, index) => (
                                 <Cell key={`cell-${index}`} fill={entry.fill} />
                              ))}
                           </Bar>
                        </BarChart>
                     </ResponsiveContainer>
                  </div>
               </div>
            </div>
         </div>

         {/* Bottom legend - matches "pH" label position in CurveView */}
         <div className={`flex justify-around items-center py-1 ${isTitration ? 'w-full max-w-[280px] mx-auto px-6 justify-between' : ''}`}>
            {(barsConfig?.showSubstance ?? true) && (
               <div className={`flex ${isTitration ? 'flex-col items-center gap-1' : 'items-center gap-1'}`}>
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: barsConfig?.substanceColor ?? substance?.color ?? ACIDS_BASES_COLORS.substances.weakAcidHA }}></div>
                  <span className={`font-bold ${isTitration ? 'text-sm text-gray-900' : 'text-sm text-gray-700'}`}>{barsConfig?.substanceLabel ?? substance?.symbol ?? 'HA'}</span>
               </div>
            )}
            <div className={`flex ${isTitration ? 'flex-col items-center gap-1' : 'items-center gap-1'}`}>
               <div className="w-4 h-4 rounded-full" style={{ backgroundColor: barsConfig?.primaryColor ?? substance?.primaryColor ?? ACIDS_BASES_COLORS.ions.hydrogen }}></div>
               <span className={`font-bold ${isTitration ? 'text-sm text-gray-900' : 'text-sm text-gray-700'}`}>{barsConfig?.primaryLabel ?? (substance ? getPrimaryLabel(substance) : 'H⁺')}</span>
            </div>
            <div className={`flex ${isTitration ? 'flex-col items-center gap-1' : 'items-center gap-1'}`}>
               <div className="w-4 h-4 rounded-full" style={{ backgroundColor: barsConfig?.secondaryColor ?? substance?.secondaryColor ?? ACIDS_BASES_COLORS.ions.ionA }}></div>
               <span className={`font-bold ${isTitration ? 'text-sm text-gray-900' : 'text-sm text-gray-700'}`}>{barsConfig?.secondaryLabel ?? (substance ? getSecondaryLabel(substance) : 'A⁻')}</span>
            </div>
            {(barsConfig?.extraBars ?? []).map((bar, index) => (
               <div key={`${bar.label}-${index}`} className={`flex ${isTitration ? 'flex-col items-center gap-1' : 'items-center gap-1'}`}>
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: bar.color }}></div>
                  <span className={`font-bold ${isTitration ? 'text-sm text-gray-900' : 'text-sm text-gray-700'}`}>{bar.label}</span>
               </div>
            ))}
         </div>
      </div>
   );
};

// ----------------------------------------------------------------------------
// CURVE VIEW
// ----------------------------------------------------------------------------
const CurveView = ({
   substance,
   curveMeta
}: {
   substance: AcidOrBase | null;
   curveMeta?: { currentPh: number; initialPh: number; finalPh: number };
}) => {
   const safeSubstance = substance ?? fallbackSubstance;

   const secondaryLabel = getSecondaryLabel(safeSubstance);

   const pKa = safeSubstance.pKA || 4.2;

   const domainRef = useRef<{ id: string; minPH: number; maxPH: number } | null>(null);

   const minDelta = 1.5;
   const initialPh = Number.isFinite(curveMeta?.initialPh) ? curveMeta!.initialPh : pKa;
   const delta = Math.max(Math.abs(pKa - initialPh), minDelta);
   // Round to 1 decimal place as requested
   const computedMinPH = Number(Math.max(0, pKa - delta).toFixed(1));
   const computedMaxPH = Number(Math.min(14, pKa + delta).toFixed(1));

   if (!domainRef.current || domainRef.current.id !== safeSubstance.id) {
      domainRef.current = {
         id: safeSubstance.id,
         minPH: computedMinPH,
         maxPH: computedMaxPH
      };
   }

   const { minPH, maxPH } = domainRef.current!;

   const clampPh = (value: number) => Math.max(minPH, Math.min(maxPH, value));

   const currentPh = curveMeta ? clampPh(curveMeta.currentPh) : pKa;

   const fractionForPh = (ph: number) => {
      if (safeSubstance.type === 'weakBase') {
         const pOh = 14 - ph;
         const powTerm = Math.pow(10, safeSubstance.pKB - pOh);
         const denom = 1 + powTerm;
         const substanceFraction = denom === 0 ? 0 : 1 / denom;
         const secondaryFraction = denom === 0 ? 0 : powTerm / denom;
         return { substanceFraction, secondaryFraction };
      }

      const powTerm = Math.pow(10, ph - pKa);
      const denom = 1 + powTerm;
      const substanceFraction = denom === 0 ? 0 : 1 / denom;
      const secondaryFraction = denom === 0 ? 0 : powTerm / denom;
      return { substanceFraction, secondaryFraction };
   };

   // Generate curve data points
   const data = useMemo(() => {
      const points = [] as Array<{ ph: number; ha: number; a: number }>;
      const steps = 50;

      for (let i = 0; i <= steps; i++) {
         const ph = minPH + (maxPH - minPH) * (i / steps);
         const { substanceFraction, secondaryFraction } = fractionForPh(ph);

         points.push({
            ph: Number(ph.toFixed(2)),
            ha: substanceFraction,
            a: secondaryFraction
         });
      }
      return points;
   }, [minPH, maxPH, safeSubstance]);

   const currentFractions = fractionForPh(currentPh);
   const currentPointData = useMemo(() => ([{ ph: currentPh, ha: currentFractions.substanceFraction, a: currentFractions.secondaryFraction }]), [currentPh, currentFractions.substanceFraction, currentFractions.secondaryFraction]);

   if (!substance) return null;

   return (
      <div className="w-full h-full flex flex-col">
         {/* Main content: Y-label + Chart */}
         <div className="flex flex-1 min-h-0">
            {/* Y-Axis Label - Rotated on the left */}
            <div className="flex items-center justify-center w-5 flex-shrink-0">
               <span
                  className="text-[11px] text-gray-500 font-medium whitespace-nowrap"
                  style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
               >
                  Fraction of species
               </span>
            </div>

            {/* Chart Area */}
            <div
               className="flex-1 relative"
               style={{ borderRadius: 2, background: '#fff', overflow: 'hidden' }}
            >
               <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data} margin={{ top: 10, right: 10, bottom: 5, left: 0 }}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} />
                     <XAxis
                        dataKey="ph"
                        type="number"
                        domain={[minPH, maxPH] as [number, number]}
                        tickCount={7}
                        tick={{ fontSize: 10 }}
                        height={20}
                        interval="preserveStartEnd"
                     />
                     <YAxis
                        domain={[0, 1] as [number, number]}
                        tickCount={6}
                        width={28}
                        tick={{ fontSize: 10 }}
                     />

                     {/* Buffer range */}
                     <ReferenceArea x1={pKa - 1} x2={pKa + 1} fill="#e5e7eb" fillOpacity={0.4} />

                     {/* pKa Line (Vertical Dashed) */}
                     <ReferenceLine x={pKa} stroke="orange" strokeDasharray="5 5" />

                     <Line
                        type="monotone"
                        dataKey="ha"
                        stroke={substance.color}
                        strokeWidth={2}
                        dot={false}
                        isAnimationActive={false}
                     />
                     <Line
                        type="monotone"
                        dataKey="a"
                        stroke={substance.secondaryColor}
                        strokeWidth={2}
                        dot={false}
                        isAnimationActive={false}
                     />

                     {/* Moving points at current pH */}
                     <Line
                        data={currentPointData}
                        type="linear"
                        dataKey="ha"
                        stroke="transparent"
                        dot={{ r: 5, fill: substance.color, stroke: 'white', strokeWidth: 1.5 }}
                        isAnimationActive={true}
                        animationDuration={350}
                        animationEasing="ease-in-out"
                     />
                     <Line
                        data={currentPointData}
                        type="linear"
                        dataKey="a"
                        stroke="transparent"
                        dot={{ r: 5, fill: substance.secondaryColor, stroke: 'white', strokeWidth: 1.5 }}
                        isAnimationActive={true}
                        animationDuration={350}
                        animationEasing="ease-in-out"
                     />
                  </LineChart>
               </ResponsiveContainer>

               {/* Legend/Indicators - Floating inside graph */}
               <div className="absolute top-[20%] left-[30%] pointer-events-none">
                  <span className="font-bold text-xs bg-white/70 px-1 rounded" style={{ color: substance.color }}>
                     {substance.symbol}
                  </span>
               </div>
               <div className="absolute top-[45%] right-[25%] pointer-events-none">
                  <span className="font-bold text-xs bg-white/70 px-1 rounded" style={{ color: substance.secondaryColor }}>
                     {secondaryLabel}
                  </span>
               </div>
            </div>
         </div>

         {/* X-Axis Label - Bottom Center */}
         <div className="text-center pb-1">
            <span className="text-[11px] text-gray-500 font-medium">pH</span>
         </div>
      </div>
   );
};

// ----------------------------------------------------------------------------
// NEUTRALIZATION VIEW
// ----------------------------------------------------------------------------
const NeutralizationView = ({
   substance,
   counts,
   barsConfig
}: {
   substance: AcidOrBase | null;
   counts?: { substance: number, primary: number, secondary: number };
   barsConfig?: BufferChartsProps['barsConfig']
}) => {

   const MAX_DOTS = 10; // iOS: AcidAppSettings.maxReactionProgressMolecules = 10

   const getDotsData = (particleCount: number) => {
      // iOS logic: Each ~10 particles = 1 dot (rounded up)
      const count = Math.min(MAX_DOTS, Math.ceil(particleCount / 10));
      // Return array of indices [0, 1, 2...] as stable IDs
      return Array.from({ length: Math.max(0, count) }, (_, i) => i);
   };

   // Fallback if counts not passed
   const safeCounts = counts || { substance: 0, primary: 0, secondary: 0 };

   const showSubstance = barsConfig?.showSubstance ?? true;
   const cols = substance
      ? [
         ...(showSubstance ? [{ label: barsConfig?.substanceLabel ?? substance.symbol, color: barsConfig?.substanceColor ?? substance.color, dots: getDotsData(safeCounts.substance) }] : []),
         { label: barsConfig?.primaryLabel ?? getPrimaryLabel(substance), color: barsConfig?.primaryColor ?? substance.primaryColor, dots: getDotsData(safeCounts.primary) },
         { label: barsConfig?.secondaryLabel ?? getSecondaryLabel(substance), color: barsConfig?.secondaryColor ?? substance.secondaryColor, dots: getDotsData(safeCounts.secondary) },
      ]
      : [
         ...(showSubstance ? [{ label: barsConfig?.substanceLabel ?? 'HA', color: barsConfig?.substanceColor ?? ACIDS_BASES_COLORS.substances.weakAcidHA, dots: getDotsData(safeCounts.substance) }] : []),
         { label: barsConfig?.primaryLabel ?? 'H⁺', color: barsConfig?.primaryColor ?? ACIDS_BASES_COLORS.ions.hydrogen, dots: getDotsData(safeCounts.primary) },
         { label: barsConfig?.secondaryLabel ?? 'A⁻', color: barsConfig?.secondaryColor ?? ACIDS_BASES_COLORS.ions.ionA, dots: getDotsData(safeCounts.secondary) },
      ];

   return (
      <div className="w-full h-full flex flex-col">
         {/* Main content: Y-label spacer + Chart area */}
         <div className="flex flex-1 min-h-0">
            {/* Left spacer to match "Fraction of species" width */}
            <div className="w-2 flex-shrink-0"></div>

            {/* Chart Area - matches Bars/Curve canvas */}
            <div
               className="flex-1 relative"
               style={{ border: '2px solid #000', borderTop: '0', borderRadius: 2, background: '#fff', overflow: 'hidden' }}
            >
               <div className="w-full h-full flex items-end justify-around px-4 pb-2 pt-2">
                  {cols.map((col, idx) => (
                     <div key={idx} className="flex flex-col items-center justify-end h-full w-[30px]">
                        {/* Stack of dots (bottom up) */}
                        <div className="flex flex-col-reverse gap-1 items-center w-full min-h-[200px] justify-start">
                           {/* min-h and justify-start in flex-col-reverse keeps them at bottom */}
                           {col.dots.map((dotIndex) => (
                              <div
                                 key={dotIndex}
                                 className="w-4 h-4 rounded-full shadow-sm border border-black/10 shrink-0"
                                 style={{ backgroundColor: col.color }}
                              />
                           ))}
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Bottom legend - positioned under columns */}
         <div className="flex items-center py-1" style={{ marginLeft: 5 }}>
            <div className="flex-1 flex justify-around px-4">
               {cols.map((col, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                     <div className="w-4 h-4 rounded-full mt-0.5" style={{ backgroundColor: col.color }}></div>
                     <span className="font-bold text-sm text-gray-700">{col.label}</span>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};
