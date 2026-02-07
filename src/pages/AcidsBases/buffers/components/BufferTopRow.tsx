import { useMemo, useState, useEffect, type RefObject } from 'react';
import { createPortal } from 'react-dom';
import type { AcidOrBase } from '../../../../helper/acidsBases/types';
import type { BufferSaltModel } from '../../../../helper/acidsBases/BufferSaltModel';
import type { BottleConfig } from '../../../../components/AcidsBases/interactive/ReagentBottles';
import type { InputState, IntroScreenElement } from '../../../../components/AcidsBases/guide/types';
import type { PouringEntry } from '../hooks/usePouringParticles';
import { ReagentBottles, ReactionEquation } from '../../../../components/AcidsBases/interactive';
import { Blockable } from '../../../../components/AcidsBases/guide';
import { BufferPhMolesChart } from './BufferPhMolesChart';
import { ACIDS_BASES_COLORS } from '../../../../theme/acidsBasesColors';
import { ACIDS_BASES_GRAPH_ANCHOR } from '../../shared/layoutPresets';

type GuideOverrides = {
   highlights?: IntroScreenElement[];
   inputState?: InputState;
   hasInteracted?: boolean;
   onInteraction?: () => void;
};

type BufferTopRowProps = {
   guideOverrides: GuideOverrides;
   selectedSubstance: AcidOrBase | null;
   defaultSubstance: AcidOrBase;
   bottles: BottleConfig[];
   pouringParticles: PouringEntry[];
   bottlesContainerRef: RefObject<HTMLDivElement>;
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

export const BufferTopRow = ({
   guideOverrides,
   selectedSubstance,
   defaultSubstance,
   bottles,
   pouringParticles,
   bottlesContainerRef,
   saltModel,
   strongMaxSubstance,
   strongSubstanceAdded,
   isStrongPhaseStep,
   predictedStrongConfig
}: BufferTopRowProps) => {
   const [topView, setTopView] = useState<'graph' | 'table'>('graph');
   const [isMobile, setIsMobile] = useState(false);

   useEffect(() => {
      const check = () => setIsMobile(window.innerWidth < 1024);
      check();
      window.addEventListener('resize', check);
      return () => window.removeEventListener('resize', check);
   }, []);
   const displaySubstance = selectedSubstance ?? defaultSubstance;

   const tableData = useMemo(() => {
      if (!displaySubstance || !saltModel) {
         return null;
      }

      const baseConcs = saltModel.getConcentrations(saltModel.maxSubstance);

      if (strongMaxSubstance <= 0) {
         return {
            initial: baseConcs,
            current: baseConcs,
            change: {
               substance: 0,
               primary: 0,
               secondary: 0
            }
         };
      }

      const basePh = saltModel.getPH(saltModel.maxSubstance);
      const isAcid = displaySubstance.type === 'weakAcid';
      const pK = isAcid ? displaySubstance.pKA : displaySubstance.pKB;
      const targetP = isAcid ? basePh - 1.5 : (14 - basePh) - 1.5;

      const powerTerm = Math.pow(10, targetP - pK);
      const numer = baseConcs.secondary - (baseConcs.substance * powerTerm);
      const denom = 1 + powerTerm;
      const change = denom === 0 ? 0 : numer / denom;

      const t = Math.min(1, Math.max(0, strongSubstanceAdded / strongMaxSubstance));
      const substance = baseConcs.substance + change * t;
      const secondary = baseConcs.secondary - change * t;

      const finalSubstance = baseConcs.substance + change;
      const finalSecondary = baseConcs.secondary - change;
      const finalPrimary = finalSecondary === 0 ? 0 : (displaySubstance.kA * finalSubstance) / finalSecondary;
      const primary = finalPrimary * t;

      const current = { substance, primary, secondary };
      return {
         initial: baseConcs,
         current,
         change: {
            substance: current.substance - baseConcs.substance,
            primary: current.primary - baseConcs.primary,
            secondary: current.secondary - baseConcs.secondary
         }
      };
   }, [displaySubstance, saltModel, strongMaxSubstance, strongSubstanceAdded]);

   const formatValue = (value: number, withSign = false) => {
      const rounded = Number.isFinite(value) ? value : 0;
      const formatted = Math.abs(rounded) < 0.005 ? '0.00' : rounded.toFixed(2);
      if (!withSign) return formatted;
      if (formatted === '0.00') return '0.00';
      return `${rounded > 0 ? '+' : ''}${formatted}`;
   };

   const primaryLabel = displaySubstance.type === 'strongBase' || displaySubstance.type === 'weakBase' ? 'OH⁻' : 'H⁺';
   const secondaryLabel = displaySubstance.type === 'strongBase' || displaySubstance.type === 'weakBase'
      ? `${displaySubstance.secondaryIon}⁺`
      : `${displaySubstance.secondaryIon}⁻`;
   return (
      <>
         <div className="flex flex-col items-center gap-4 h-full">
            {/* Header: Menu Button + Reaction Equation */}
            <Blockable
               element="reactionEquation"
               overrides={guideOverrides}
               className="w-full flex items-center"
            >
               <div className="flex-1 flex justify-center">
                  <ReactionEquation
                     substance={selectedSubstance || defaultSubstance}
                     arrowType={selectedSubstance?.type.includes('weak') ? 'double' : 'single'}
                  />
               </div>
            </Blockable>

            {/* Tools Row (Bottles) */}
            <Blockable element="beakerTools" overrides={guideOverrides} className="w-full flex justify-center min-h-[100px]">
               <div
                  ref={bottlesContainerRef}
                  className="relative flex justify-center min-h-[100px] w-full overflow-visible"
               >
                  <div
                     id="guide-element-beakerTools-target"
                     className="inline-flex w-fit"
                  >
                     <ReagentBottles bottles={bottles} />
                  </div>

                  {/* Independent Pouring Particles - rendered outside bottle transforms */}
                  {/* Independent Pouring Particles - rendered outside bottle transforms */}
                  {createPortal(
                     <>
                        {pouringParticles.map(pour => (
                           <div
                              key={pour.id}
                              className="fixed pointer-events-none z-[9999]"
                              style={{
                                 top: `${pour.startY}px`,
                                 left: `${pour.startX}px`,
                                 transform: 'translateX(-50%)'
                              }}
                           >
                              {pour.particles.map((particle) => (
                                 <div
                                    key={particle.id}
                                    className={`absolute rounded-full ${isMobile ? 'w-1.5 h-1.5' : 'w-1.5 h-1.5 md:w-3 md:h-3'}`}
                                    style={{
                                       backgroundColor: pour.substance.color,
                                       opacity: 0,
                                       left: `${particle.offsetX}px`,
                                       top: 0,
                                       animationName: 'particleFall',
                                       animationDuration: `${particle.durationMs}ms`,
                                       animationTimingFunction: 'linear',
                                       animationFillMode: 'forwards',
                                       animationDelay: `${particle.delayMs}ms`,
                                       boxShadow: `0 0 ${isMobile ? '2px' : '5px'} ${pour.substance.color}aa`,
                                       ['--particle-distance' as string]: `${particle.distancePx}px`,
                                    }}
                                 />
                              ))}
                           </div>
                        ))}
                     </>,
                     document.body
                  )}
               </div>
            </Blockable>
         </div>

         {/* Top: Graph / Table */}
         <Blockable element="phChart" overrides={guideOverrides} className="flex flex-col items-start h-full">
            <div className="flex gap-4 mb-1 text-sm text-gray-400 font-medium">
               <button
                  type="button"
                  onClick={() => setTopView('graph')}
                  className={topView === 'graph' ? `text-[${ACIDS_BASES_COLORS.ui.phScale.acidIndicator}]` : 'text-gray-400'}
                  style={{ background: 'none', border: 'none', padding: 0 }}
               >
                  Graph
               </button>
               <button
                  type="button"
                  onClick={() => setTopView('table')}
                  className={topView === 'table' ? `text-[${ACIDS_BASES_COLORS.ui.phScale.acidIndicator}]` : 'text-gray-400'}
                  style={{ background: 'none', border: 'none', padding: 0 }}
               >
                  Table
               </button>
            </div>
            {topView === 'graph' ? (
               <div
                  id="ph-graph"
                  style={{
                     width: `${ACIDS_BASES_GRAPH_ANCHOR.squareSizePx}px`,
                     height: `${ACIDS_BASES_GRAPH_ANCHOR.squareSizePx}px`,
                     marginLeft: `${ACIDS_BASES_GRAPH_ANCHOR.leftOffsetPx}px`
                  }}
               >
                  <BufferPhMolesChart
                     substance={selectedSubstance}
                     saltModel={saltModel}
                     strongMaxSubstance={strongMaxSubstance}
                     strongSubstanceAdded={strongSubstanceAdded}
                     isStrongPhaseStep={isStrongPhaseStep}
                     predictedStrongConfig={predictedStrongConfig}
                  />
               </div>
            ) : (
               <div className="w-full aspect-[3/2] rounded-sm bg-white flex items-center justify-center" style={{ border: '2px solid black' }}>
                  <table className="w-full h-full border-collapse text-sm">
                     <thead>
                        <tr>
                           <th className="p-2 font-semibold" style={{ border: '2px solid black' }}>ICE</th>
                           <th className="p-2 font-semibold" style={{ border: '2px solid black' }}>{secondaryLabel}</th>
                           <th className="p-2 font-semibold" style={{ border: '2px solid black' }}>{primaryLabel}</th>
                           <th className="p-2 font-semibold" style={{ border: '2px solid black' }}>{displaySubstance.symbol}</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <td className="p-2 text-center font-medium" style={{ border: '2px solid black' }}>Initial</td>
                           <td className="p-2 text-center" style={{ border: '2px solid black' }}>{formatValue(tableData?.initial.secondary ?? 0)}</td>
                           <td className="p-2 text-center" style={{ border: '2px solid black' }}>{formatValue(tableData?.initial.primary ?? 0)}</td>
                           <td className="p-2 text-center" style={{ border: '2px solid black' }}>{formatValue(tableData?.initial.substance ?? 0)}</td>
                        </tr>
                        <tr>
                           <td className="p-2 text-center font-medium" style={{ border: '2px solid black' }}>Change</td>
                           <td className="p-2 text-center text-red-500 font-semibold" style={{ border: '2px solid black' }}>{formatValue(tableData?.change.secondary ?? 0, true)}</td>
                           <td className="p-2 text-center text-red-500 font-semibold" style={{ border: '2px solid black' }}>{formatValue(tableData?.change.primary ?? 0, true)}</td>
                           <td className="p-2 text-center text-red-500 font-semibold" style={{ border: '2px solid black' }}>{formatValue(tableData?.change.substance ?? 0, true)}</td>
                        </tr>
                        <tr>
                           <td className="p-2 text-center font-medium" style={{ border: '2px solid black' }}>Final</td>
                           <td className="p-2 text-center text-red-500 font-semibold" style={{ border: '2px solid black' }}>{formatValue(tableData?.current.secondary ?? 0)}</td>
                           <td className="p-2 text-center text-red-500 font-semibold" style={{ border: '2px solid black' }}>{formatValue(tableData?.current.primary ?? 0)}</td>
                           <td className="p-2 text-center text-red-500 font-semibold" style={{ border: '2px solid black' }}>{formatValue(tableData?.current.substance ?? 0)}</td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            )}
         </Blockable>
      </>
   );
};
