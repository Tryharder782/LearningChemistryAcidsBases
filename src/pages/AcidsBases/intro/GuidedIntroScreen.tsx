/**
 * GuidedIntroScreen - Main Introduction screen with step-by-step guide.
 * Layout matches iOS version with CSS Grid:
 * - 35% Left: pH Meter, Reagents, Beaker
 * - 65% Right: Equations, Scale, Graph, Guide
 */

import { useEffect, useState, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { ChevronUp } from 'lucide-react';
import { useGuideStore, GuideBubble, Blockable, HighlightOverlay } from '../../../components/AcidsBases/guide';
import ChapterMenu from '../../../layout/ChapterMenu';
import AcidsBasesLayout from '../../../layout/AcidsBasesLayout';
import { getSubstancesByType, hydrogenChloride } from '../../../helper/acidsBases/substances';
import { calculatePH } from '../../../helper/acidsBases/simulationEngine';
import type { SubstanceType } from '../../../helper/acidsBases/types';
import NavMenu from '../../../components/AcidsBases/navigation/NavMenu';

// Components
import { Beaker, VerticalSlider, PHScaleDetailed, EquationDisplay, createDynamicEquations } from '../../../components/AcidsBases/ui';
import { PHMeter, ReagentBottles, ReactionEquation, SubstanceSelector } from '../../../components/AcidsBases/interactive';
import { ConcentrationBarChart } from '../../../components/AcidsBases/charts/ConcentrationBarChart';
import { useWaterLineOffset } from '../buffers/hooks/useWaterLineOffset';
import { usePouringParticles } from '../buffers/hooks/usePouringParticles';
import { ReactingBeakerModel } from '../../../helper/acidsBases/particles/ReactingBeakerModel';
import { useParticleAnimation } from '../../../hooks/useParticleAnimation';
import type { Particle } from '../../../helper/acidsBases/particles/types';
import { getGridRowsForWaterLevel } from '../../../helper/acidsBases/beakerMath';
import { GRID_COLS, GRID_ROWS_MIN, GRID_ROWS_MAX, GRID_ROWS_TOTAL } from '../../../helper/acidsBases/particles/types';

const WATER_LEVEL_MIN = 0.31818;
const WATER_LEVEL_MAX = 0.681818;

export function GuidedIntroScreen() {
   const navigate = useNavigate();
   const {
      currentStep,
      currentStepData,
      totalSteps,
      inputState,
      selectedSubstances,
      selectSubstance,
      addSubstance,
      setWaterLevel,
      waterLevel,
      substanceAddedFraction,
      next,
      canGoNext,
      substanceSelectorOpen,
      setSubstanceSelectorOpen,
   } = useGuideStore();

   const isLastStep = currentStep >= totalSteps - 1 || currentStepData?.dynamicTextId === 'end';
   const handleNext = () => {
      if (isLastStep) {
         navigate('/acids/introduction/quiz');
         return;
      }
      next();
   };
   const canNext = isLastStep ? true : canGoNext();

   // Beaker ref for pH meter collision detection
   const beakerContainerRef = useRef<HTMLDivElement>(null);
   const bottlesContainerRef = useRef<HTMLDivElement>(null);
   const beakerModelRef = useRef(new ReactingBeakerModel());
   const [particles, setParticles] = useState<Particle[]>([]);
   const [beakerBounds, setBeakerBounds] = useState<{
      x: number; y: number; width: number; height: number; liquidLevel: number
   } | undefined>();

   // Update beaker bounds when beaker container mounts or resizes
   useEffect(() => {
      const updateBounds = () => {
         if (beakerContainerRef.current) {
            const rect = beakerContainerRef.current.getBoundingClientRect();
            setBeakerBounds({
               x: rect.left,
               y: rect.top,
               width: rect.width,
               height: rect.height,
               liquidLevel: waterLevel,
            });
         }
      };

      updateBounds();
      window.addEventListener('resize', updateBounds);
      return () => window.removeEventListener('resize', updateBounds);
   }, [waterLevel]);

   useEffect(() => {
      const unsubscribe = beakerModelRef.current?.subscribe(() => {
         setParticles(beakerModelRef.current?.getParticles());
      });
      return unsubscribe;
   }, []);

   // Get current substance type and available substances
   const currentSubstanceType =
      inputState.type === 'chooseSubstance' ? inputState.substanceType :
         inputState.type === 'addSubstance' ? inputState.substanceType :
            getCurrentSubstanceType(currentStep);

   const availableSubstances = currentSubstanceType
      ? getSubstancesByType(currentSubstanceType)
      : [];

   const selectedSubstance = currentSubstanceType
      ? selectedSubstances[currentSubstanceType]
      : null;

   // Calculate current pH
   // Molarity is the concentration of the solution IN THE BOTTLE (or target max concentration)
   // We set this to 0.1M so that at 50% addition (7 clicks), effective molarity is 0.051M -> pH 1.3
   // and at 100% addition (14 clicks), effective molarity is 0.1M -> pH 1.0
   const molarity = 0.1;

   // Effective molarity in beaker is molarity * substanceAddedFraction
   // calculatePH needs the effective molarity
   const effectiveMolarity = Math.max(1e-10, molarity * substanceAddedFraction);

   const pH = (selectedSubstance && substanceAddedFraction > 0)
      ? calculatePH(selectedSubstance, effectiveMolarity)
      : 7;

   // Synchronization logic for particles
   // Exactly calculated based on pixels visible in Beaker
   const rowsVisible = waterLevel * GRID_ROWS_TOTAL;

   const [isMobile, setIsMobile] = useState(false);
   useEffect(() => {
      const check = () => setIsMobile(window.innerWidth < 1024);
      check();
      window.addEventListener('resize', check);
      return () => window.removeEventListener('resize', check);
   }, []);

   // Scale particle counts
   // Dynamic limit matching CogSciKit: (cols * rows) / 3
   const maxParticles = Math.ceil((GRID_COLS * rowsVisible) / 3);

   useEffect(() => {
      beakerModelRef.current?.setWaterLevel(rowsVisible);
   }, [rowsVisible]);

   const speciesCounts = useMemo(() => {
      if (!selectedSubstance || substanceAddedFraction <= 0) {
         return { substance: 0, primary: 0, secondary: 0 };
      }

      // Treat maxParticles as "substance count" like iOS IntroScreenComponents.
      const substanceCount = Math.round(maxParticles * substanceAddedFraction);
      const perIon = selectedSubstance.substanceAddedPerIon;

      // iOS logic (AcidSubstanceBeakerCoords):
      // - strong substances (perIon <= 0): only ions, one of each per substance count
      // - weak substances (perIon > 0): perIon neutral molecules for each ion pair
      const ionCount = perIon <= 0 ? substanceCount : Math.floor(substanceCount / perIon);
      const neutralCount = perIon <= 0 ? 0 : substanceCount;

      return {
         substance: neutralCount,
         primary: ionCount,
         secondary: ionCount,
      };
   }, [selectedSubstance, substanceAddedFraction, maxParticles]);

   useEffect(() => {
      if (!selectedSubstance) {
         beakerModelRef.current?.initialize(
            { substance: 0, primary: 0, secondary: 0 },
            { substance: '', primaryIon: '', secondaryIon: '' }
         );
         return;
      }

      beakerModelRef.current?.updateParticles(
         {
            substance: speciesCounts.substance,
            primary: speciesCounts.primary,
            secondary: speciesCounts.secondary,
         },
         {
            substance: selectedSubstance.color,
            primaryIon: selectedSubstance.primaryColor,
            secondaryIon: selectedSubstance.secondaryColor,
         }
      );
   }, [selectedSubstance, speciesCounts]);

   const displayParticles = useParticleAnimation(particles);




   // Element ID mappings for highlight overlay
   const elementIds = {
      reactionSelection: 'guide-element-reactionSelection',
      waterSlider: 'guide-element-waterSlider',
      beakerTools: 'guide-element-beakerTools',
      pHScale: 'guide-element-pHScale',
      pHEquation: 'guide-element-pHEquation',
      pHFormula: 'guide-element-pHFormula', // Added
      pOHEquation: 'guide-element-pOHEquation', // Kept for backwards compatibility if needed, but redundant likely
      pOHFormula: 'guide-element-pOHFormula', // Added
      pHSumEquation: 'guide-element-pHSumEquation', // Added
      phChart: 'guide-element-phChart',
      topControls: 'guide-element-topControls', // New ID for highlighting the top area
   };

   const [activeBottleIndex, setActiveBottleIndex] = useState<number | null>(null);
   const [usedSubstanceTypes, setUsedSubstanceTypes] = useState<Set<SubstanceType>>(new Set());
   const [bottleTranslation, setBottleTranslation] = useState<{ x: number; y: number } | undefined>(undefined);
   const prevStepRef = useRef(currentStep);
   const prevInputStateRef = useRef(inputState);
   const reagentBottleRefs = useRef<(HTMLDivElement | null)[]>([]);

   // Track when a substance type was used - mark it as used when we move to the next step
   // This way, the substance can still be used during the current step
   useEffect(() => {
      if (prevStepRef.current !== currentStep && prevStepRef.current >= 0) {
         // Step changed - mark the previous step's substance type as used (if it was an addSubstance step)
         const prevInputState = prevInputStateRef.current;
         if (prevInputState.type === 'addSubstance' && prevInputState.substanceType) {
            setUsedSubstanceTypes(prev => {
               const newSet = new Set(prev);
               newSet.add(prevInputState.substanceType!);
               return newSet;
            });
         }
      }
      prevStepRef.current = currentStep;
      prevInputStateRef.current = inputState;
   }, [currentStep, inputState]);

   // Also track when substanceAddedFraction becomes > 0 for a substance type
   // This ensures we catch usage even if step transition logic doesn't fire
   useEffect(() => {
      if (substanceAddedFraction > 0 && currentSubstanceType && inputState.type === 'addSubstance') {
         // Mark as used, but only if we're not currently in an active addSubstance step for this type
         // (to allow continued use during the same step)
         const isCurrentlyActive = inputState.substanceType === currentSubstanceType;
         if (!isCurrentlyActive) {
            setUsedSubstanceTypes(prev => {
               const newSet = new Set(prev);
               newSet.add(currentSubstanceType);
               return newSet;
            });
         }
      }
   }, [substanceAddedFraction, currentSubstanceType, inputState]);

   // Derived state for the "Toggle" button vs Dropdown
   // We show the full selector ONLY when we are in the 'chooseSubstance' state (Step 7).
   // Otherwise, we show the disabled toggle button.
   const showFullSelector = inputState.type === 'chooseSubstance';
   const isToggleEnabled = false; // Always disabled unless active (which is handled by showFullSelector)

   // Selector "open" state - now controlled
   const [selectorOpen, setSelectorOpen] = useState(false);

   // Chart View Mode state (Concentration vs pH)
   const [chartMode, setChartMode] = useState<'concentration' | 'ph'>('concentration');
   const [scaleMode, setScaleMode] = useState<'concentration' | 'ph'>('concentration');

   // Auto-switch to pH mode on step 16 (index 15)
   useEffect(() => {
      if (currentStep === 15) {
         setChartMode('ph');
      }
   }, [currentStep]);

   // Auto-open logic for step 7
   useEffect(() => {
      if (inputState.type === 'chooseSubstance') {
         // Small delay to ensure it opens after render/transition
         const timer = setTimeout(() => {
            setSelectorOpen(true);
         }, 100);
         return () => clearTimeout(timer);
      } else {
         setSelectorOpen(false);
      }
   }, [inputState.type]);

   useEffect(() => {
      if (inputState.type !== 'addSubstance') {
         setActiveBottleIndex(null);
         setBottleTranslation(undefined);
         return;
      }
      if (substanceAddedFraction >= 1) {
         setActiveBottleIndex(null);
         setBottleTranslation(undefined);
      }
   }, [inputState.type, substanceAddedFraction]);

   const bottleSlots = useMemo(() => ([
      { type: 'strongAcid' as const, unlockStep: 7 },
      { type: 'strongBase' as const, unlockStep: 17 },
      { type: 'weakAcid' as const, unlockStep: 21 },
      { type: 'weakBase' as const, unlockStep: 26 },
   ]), []);

   const waterLineOffset = useWaterLineOffset(beakerContainerRef, bottlesContainerRef, waterLevel);
   const { pouringParticles, createPour, registerBottle } = usePouringParticles(
      waterLineOffset,
      bottlesContainerRef,
      beakerContainerRef,
      {
         particlesPerPour: { 0: 1, 1: 1, 2: 1, 3: 1 }
      }
   );

   const bottleConfigs = useMemo(() => bottleSlots.map((slot, index) => {
      const selected = selectedSubstances[slot.type];
      const isLocked = currentStep < slot.unlockStep;
      const isActiveType = inputState.type === 'addSubstance' && inputState.substanceType === slot.type;
      const isChooseType = inputState.type === 'chooseSubstance' && inputState.substanceType === slot.type;
      const isUsed = usedSubstanceTypes.has(slot.type) && !isActiveType && !isChooseType; // Only mark as used if not currently active

      let state: 'locked' | 'unlocked' | 'active' | 'ready' | 'used' = 'unlocked';
      if (isLocked) {
         state = 'locked';
      } else if (isActiveType && selected) {
         if (activeBottleIndex === index) state = 'ready';
         else if (activeBottleIndex !== null) state = 'unlocked';
         else state = 'active';
      } else if (isChooseType) {
         state = 'active';
      } else if (isUsed) {
         state = 'used';
      }

      const fallback = getSubstancesByType(slot.type)[0] ?? null;
      const substance = selected ?? fallback;

      return {
         substance,
         state,
         customTranslation: activeBottleIndex === index ? bottleTranslation : undefined,
         onRegister: (el: HTMLDivElement | null) => {
            registerBottle(index as 0 | 1 | 2 | 3, el);
            reagentBottleRefs.current[index] = el;
         },
         onClick: () => {
            if (!substance) return;
            // Allow clicking if active, or if used but currently active for this step
            if (state === 'active' || (state === 'used' && (isActiveType || isChooseType))) {
               if (inputState.type === 'chooseSubstance') {
                  selectSubstance(slot.type, substance);
               } else if (inputState.type === 'addSubstance') {
                  // Calculate position above beaker center when bottle is first clicked
                  if (activeBottleIndex !== index && reagentBottleRefs.current[index] && beakerContainerRef.current) {
                     const bottleRect = reagentBottleRefs.current[index]!.getBoundingClientRect();
                     const beakerRect = beakerContainerRef.current.getBoundingClientRect();
                     const bottleCenterX = bottleRect.left + bottleRect.width / 2;
                     const bottleTopY = bottleRect.top;
                     const targetCenterX = beakerRect.left + beakerRect.width / 2;
                     const targetTopY = beakerRect.top - 80; // Position above beaker
                     setBottleTranslation({
                        x: targetCenterX - bottleCenterX + 20,
                        y: targetTopY - bottleTopY + (isMobile ? 120 : 70)
                     });
                  }
                  setActiveBottleIndex(index);
               }
            }
         },
         onPouringStart: () => {
            if (!substance) return;
            createPour(substance, index as 0 | 1 | 2 | 3, { particleCount: 5, speedMultiplier: isMobile ? 0.5 : 1 });
         },
         onPourComplete: () => {
            if (!substance || inputState.type !== 'addSubstance') return;
            addSubstance(0);
         }
      };
   }), [bottleSlots, selectedSubstances, currentStep, inputState, activeBottleIndex, usedSubstanceTypes, bottleTranslation, selectSubstance, registerBottle, createPour, addSubstance]);

   // Auto-open logic (handled by the structure: if showFullSelector is true, we render the selector)
   // The HighlightOverlay needs to target the button/selector container.

   return (
      <AcidsBasesLayout>
         <HighlightOverlay elementIds={elementIds}>
            <div className="absolute top-4 right-4 flex items-center gap-4 z-[100]">
               <Blockable element="reactionSelection" overrides={{ highlights: currentStepData?.highlights }} className="relative z-50">
                  <div
                     id="guide-element-reactionSelection"
                     className={currentStepData?.highlights.includes('reactionSelection') ? 'w-full max-w-xs' : 'w-fit'}
                  >
                     <SubstanceSelector
                        substances={availableSubstances}
                        selected={selectedSubstance}
                        onSelect={(s) => {
                           selectSubstance(('substanceType' in inputState && inputState.substanceType) ? inputState.substanceType : 'strongAcid', s);
                           setSubstanceSelectorOpen(false);
                        }}
                        placeholder="Choose a substance"
                        enabled={inputState.type === 'chooseSubstance'}
                        isOpen={substanceSelectorOpen}
                        onOpenChange={setSubstanceSelectorOpen}
                        staticMenu={false}
                        compact={true}
                        align="right"
                     />
                  </div>
               </Blockable>
               <ChapterMenu />
               <NavMenu />
            </div>
            <div className="h-full bg-white flex flex-col items-center" style={{ overflowY: 'hidden', overflowX: 'hidden' }}>
               {/* Main Content Wrapper - Centered with max-width */}
               <div className="w-full relative px-8 py-4 h-full flex-1 flex flex-col" style={{ overflowX: 'hidden' }}>


                  {/* Main Grid Content */}
                  <main className="flex-1 w-full grid gap-8"
                     style={{ gridTemplateColumns: 'minmax(0, 40fr) minmax(0, 60fr)', overflowX: 'hidden' }}
                  >
                     {/* LEFT COLUMN: Equation, Tools, Beaker */}
                     <div className="flex flex-col gap-6 pt-0">
                        {/* Row 0: Reaction Equation */}
                        <div className="flex items-center justify-center">
                           {/* Reaction Equation */}
                           <div className="flex-1 flex justify-center pt-2 gap-4">
                              <Blockable element="reactionEquation">
                                 <ReactionEquation
                                    substance={selectedSubstance || hydrogenChloride}
                                    arrowType={currentSubstanceType?.startsWith('weak') ? 'double' : 'single'}
                                 />
                              </Blockable>

                              {/* Selector removed from here */}
                           </div>
                        </div>
                        {/* Top: Tools Row (pH Meter + Bottles) */}
                        <Blockable
                           element="beakerTools"
                           id="guide-element-beakerTools"
                           className="flex justify-center items-center gap-4 min-h-[100px] relative w-full"
                        >
                           {/* pH Meter Start Position */}
                           <div
                              className="inline-flex justify-center pr-2 relative"
                              style={{
                                 width: '120px',
                                 minHeight: '100px',
                              }}
                           >
                              <PHMeter
                                 currentPH={pH}
                                 beakerBounds={beakerBounds}
                                 initialPosition={{ x: 10, y: 5 }}
                                 className="z-50"
                              />
                           </div>

                           {/* Reagent Bottles */}
                           <div className="flex relative" ref={bottlesContainerRef}>
                              <ReagentBottles bottles={bottleConfigs} />

                              {/* Pouring particles - Rendered in Portal for global coordinates */}
                              {createPortal(
                                 <>
                                    {pouringParticles.map(pour => (
                                       <div
                                          key={pour.id}
                                          className="absolute pointer-events-none z-[9999]"
                                          style={{
                                             top: `${pour.startY + window.scrollY}px`,
                                             left: `${pour.startX + window.scrollX}px`,
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
                              )}            </div>
                        </Blockable>

                        {/* Bottom: Beaker + Slider */}
                        <div className="flex-1 flex items-start mt-[50px] justify-center gap-4 relative">
                           {/* Vertical Slider */}
                           <Blockable className='top-9' element="waterSlider" id="guide-element-waterSlider">
                              <VerticalSlider
                                 value={waterLevel}
                                 min={WATER_LEVEL_MIN}
                                 max={WATER_LEVEL_MAX}
                                 onChange={setWaterLevel}
                                 height={280}
                                 enabled={currentStepData?.highlights.includes('waterSlider')}
                              />
                           </Blockable>

                           {/* Beaker Container */}
                           <div ref={beakerContainerRef} className="relative w-[280px] h-[350px]">
                              <Beaker
                                 liquidLevel={waterLevel}
                                 liquidColor={selectedSubstance?.color || '#ADD8E6'}
                                 pH={pH}
                                 width={280}
                                 height={350}
                                 gridRows={rowsVisible}
                                 visualizationMode="micro"
                                 particles={displayParticles}
                              />
                           </div>
                        </div>
                     </div>

                     {/* RIGHT COLUMN: Equations, Scale, Graph, Guide */}
                     <div className="flex flex-col gap-6 pt-0" style={{ overflowX: 'hidden' }}>
                        {/* Row 1: Equations & Controls Combined */}
                        <div className="flex flex-row gap-2 relative">
                           {/* Controls (Relative Flow) */}

                           {/* Equation Display */}
                           <div className="pt-2 pb-4">
                              <EquationDisplay
                                 equations={createDynamicEquations(pH)}
                                 highlightedIndex={inputState.type === 'none' ? undefined : 0}
                              />
                           </div>
                           {/* Old selector location removed */}

                        </div>



                        {/* Row 2: pH Scale */}
                        <Blockable element="pHScale">
                           <div className="px-4 py-2">
                              {/* Mode Switcher Buttons */}
                              <div className="flex gap-6 mb-3">
                                 <button
                                    onClick={() => setScaleMode('concentration')}
                                    className={`text-[20px] te  transition-colors ${scaleMode === 'concentration' ? 'text-[#ED5A3B]' : 'text-gray-300 hover:text-gray-400'}`}
                                    style={{
                                       background: 'none',
                                       border: 'none',
                                       padding: 0,
                                       cursor: 'pointer'
                                    }}
                                 >
                                    Concentration
                                 </button>
                                 <button
                                    onClick={() => setScaleMode('ph')}
                                    className={`text-[20px] text-[#ED5A3B]  transition-colors ${scaleMode === 'ph' ? 'text-[#ED5A3B]' : 'text-gray-300 hover:text-gray-400'}`}
                                    style={{
                                       background: 'none',
                                       border: 'none',
                                       padding: 0,
                                       cursor: 'pointer'
                                    }}
                                 >
                                    pH Scale
                                 </button>
                              </div>
                              <PHScaleDetailed
                                 pH={pH}
                                 mode={scaleMode}
                              />
                           </div>
                        </Blockable>

                        {/* Row 3: Graph + Guide (Side by Side) */}
                        <div className="mt-[20px] flex-1 grid gap-6 min-h-[200px] items-start" style={{ gridTemplateColumns: 'minmax(0, 40fr) minmax(0, 60fr)', overflowX: 'hidden' }}>
                           {/* Concentration Chart */}
                           <div className="flex justify-center  items-start">

                              <Blockable element="phChart" id="guide-element-phChart">
                                 <ConcentrationBarChart
                                    substance={selectedSubstance}
                                    molarity={effectiveMolarity}
                                    addedFraction={substanceAddedFraction}
                                    pH={pH}
                                    height={200}
                                    mode={chartMode}
                                    onModeChange={setChartMode}
                                 />
                              </Blockable>
                           </div>

                           {/* Guide Bubble - Positioned relative to this cell */}
                           <div className="relative flex items-center justify-start overflow-visible pr-8">
                              <GuideBubble
                                 position="relative"
                                 className="bg-transparent shadow-none"
                                 onNext={handleNext}
                                 canGoForwards={canNext}
                              />
                           </div>
                        </div>
                     </div>
                  </main>

                  {/* Note: In previous version, pH Meter was outside. Now it is inside the left panel container. */}
               </div>
            </div>
         </HighlightOverlay>
      </AcidsBasesLayout>
   );
}

// Helper to determine current substance type based on step
function getCurrentSubstanceType(step: number): 'strongAcid' | 'strongBase' | 'weakAcid' | 'weakBase' | null {
   if (step <= 16) return 'strongAcid';
   if (step <= 19) return 'strongBase';
   if (step <= 25) return 'weakAcid';
   if (step <= 29) return 'weakBase';
   return null;
}

export default GuidedIntroScreen;
