import { useEffect, useMemo, useRef, useState } from 'react';
import { getSubstancesByType, hydrogenChloride, potassiumHydroxide } from '../../../helper/acidsBases/substances';
import type { AcidOrBase } from '../../../helper/acidsBases/types';

// Core
import { ReactingBeakerModel } from '../../../helper/acidsBases/particles/ReactingBeakerModel';
import { useParticleAnimation } from '../../../hooks/useParticleAnimation';
import type { Particle } from '../../../helper/acidsBases/particles/types';
import { usePouringParticles } from './hooks/usePouringParticles';

// Components
import { bufferGuideSteps } from '../../../components/AcidsBases/guide/bufferGuideSteps';
import { HighlightOverlay } from '../../../components/AcidsBases/guide';
import AcidsBasesNav from '../../../layout/AcidsBasesNav';

import { BufferTopRow } from './components/BufferTopRow';
import { BufferBottomRow } from './components/BufferBottomRow';
import { BufferSidePanel } from './components/BufferSidePanel';
import { BufferDevOverlay } from './components/BufferDevOverlay';
import { useBufferBottles } from './hooks/useBufferBottles';
import { useGuideNavigation } from './hooks/useGuideNavigation';
import { useWaterLineOffset } from './hooks/useWaterLineOffset';
import { useBufferStatement } from './hooks/useBufferStatement';
import { useScientificConcentrations } from './hooks/useScientificConcentrations';
import { useBufferDerivedState } from './hooks/useBufferDerivedState';
import { useBufferAutoAdvance } from './hooks/useBufferAutoAdvance';
import { useBufferParticlesSync } from './hooks/useBufferParticlesSync';

import { useBufferGuideState } from './hooks/useBufferGuideState';
import NavMenu from '../../../components/AcidsBases/navigation/NavMenu';
import AcidsHomeButton from '../../../components/AcidsBases/navigation/AcidsHomeButton';
import AcidsBasesLayout from '../../../layout/AcidsBasesLayout';
import { SubstanceSelector } from '../../../components/AcidsBases/interactive/SubstanceSelector';
import { Blockable } from '../../../components/AcidsBases/guide';
import { shouldShowAcidsChapterTabs } from '../shared/debugUi';
import { ACIDS_BASES_INNER_GRID, ACIDS_BASES_LAYOUT_PADDING_PX, ACIDS_BASES_MAIN_GRID, ACIDS_BASES_STABLE_ROW_SLOTS } from '../shared/layoutPresets';

export function BufferScreen() {
   const showChapterTabs = useMemo(() => shouldShowAcidsChapterTabs(), []);
   // Local State
   const [waterLevel, setWaterLevel] = useState(0.5);
   const [particleCount, setParticleCount] = useState(0); // Exact particle count (5 per shake)
   const [simulationPhase, setSimulationPhase] = useState<'adding' | 'equilibrium' | 'saltAdded'>('adding');
   const [saltShakes, setSaltShakes] = useState(0); // Logical counter: immediate, for limit checking
   const [displayedSaltShakes, setDisplayedSaltShakes] = useState(0); // Visual counter: delayed, for animations
   const [saltAutoAdvanced, setSaltAutoAdvanced] = useState(false);
   const [strongSubstanceAdded, setStrongSubstanceAdded] = useState(0);
   const [strongMaxSubstance, setStrongMaxSubstance] = useState(0);
   const [strongMidAutoAdvanced, setStrongMidAutoAdvanced] = useState(false);
   const [strongAutoAdvanced, setStrongAutoAdvanced] = useState(false);
   const [selectedSubstance, setSelectedSubstance] = useState<AcidOrBase | null>(null);
   const [chartMode, setChartMode] = useState<'bars' | 'curve' | 'neutralization'>('bars');

   const beakerContainerRef = useRef<HTMLDivElement>(null);
   const bottlesContainerRef = useRef<HTMLDivElement>(null);
   const waterLineOffset = useWaterLineOffset(beakerContainerRef, bottlesContainerRef, waterLevel);

   const snapshotStepIds = [
      'instructToAddWeakAcid',
      'instructToAddSalt',
      'instructToAddWeakBase',
      'instructToAddSaltToBase',
      'instructToAddStrongAcid',
      'instructToAddStrongBase',
      'acidBufferLimitReached',
      'baseBufferLimitReached'
   ] as const;

   // Particle System Model
   // Using useRef to persist the model instance across renders
   const modelRef = useRef<ReactingBeakerModel>(new ReactingBeakerModel());
   const [particles, setParticles] = useState<Particle[]>([]);

   // Subscribe to model updates
   useEffect(() => {
      const unsubscribe = modelRef.current?.subscribe(() => {
         setParticles(modelRef.current?.getParticles());
      });
      return unsubscribe;
   }, []);

   // Animated particles for display
   const displayParticles = useParticleAnimation(particles);

   // Sync legacy animatedCounts for charts
   const animatedCounts = (() => {
      const counts = { substance: 0, primary: 0, secondary: 0 };
      displayParticles.forEach(p => {
         if (p.type === 'substance') counts.substance++;
         else if (p.type === 'primaryIon') counts.primary++;
         else if (p.type === 'secondaryIon') counts.secondary++;
      });
      return counts;
   })();

   // Guide State
   const {
      currentStep,
      currentStepIndex,
      setCurrentStepIndex,
      guideOverrides,
      highlights,
      selectorOpen,
      setSelectorOpen,
      activeBottleIndex,
      setActiveBottleIndex,
      markInteraction,
      saveSnapshotForStep,
      restoreSnapshotForStep,
      hasInteracted
   } = useBufferGuideState({
      snapshotStepIds,
      particleCount,
      saltShakes,
      displayedSaltShakes,
      simulationPhase,
      modelRef,
      setParticleCount,
      setSaltShakes,
      setDisplayedSaltShakes,
      setSimulationPhase,
      resetKey: selectedSubstance?.id
   });

   const [isMobile, setIsMobile] = useState(false);
   useEffect(() => {
      const check = () => setIsMobile(window.innerWidth < 768);
      check();
      window.addEventListener('resize', check);
      return () => window.removeEventListener('resize', check);
   }, []);

   const {
      pouringParticles,
      createPour,
      registerBottle
   } = usePouringParticles(waterLineOffset, bottlesContainerRef, beakerContainerRef, {
      offsets: isMobile ? { 0: { x: 0 } } : { 0: { x: 0 } }
   });

   // Sync visual counter with logical counter with animation delay (~600ms for particle animation)
   useEffect(() => {
      if (displayedSaltShakes !== saltShakes) {
         const delay = setTimeout(() => {
            setDisplayedSaltShakes(saltShakes);
         }, 600);
         return () => clearTimeout(delay);
      }
   }, [saltShakes]);

   const availableSubstances = useMemo(() => {
      const stepType = currentStep.substanceType ?? (selectedSubstance?.type === 'weakBase' ? 'weakBase' : 'weakAcid');
      return getSubstancesByType(stepType === 'weakBase' ? 'weakBase' : 'weakAcid');
   }, [currentStep.substanceType, selectedSubstance?.type]);

   // Constants for particle system (matching iOS BufferScreen)
   const WATER_LEVEL_MIN = 0.31818;
   const WATER_LEVEL_MAX = 0.681818;
   const FINAL_SECONDARY_ION_COUNT = 3;
   const MIN_FINAL_PRIMARY_ION_COUNT = 7;
   const MAX_PARTICLES = 43;

   const {
      currentRows,
      totalSlots: TOTAL_SLOTS,
      modelLevel,
      rowsVisible,
      currentMolarity,
      saltModel,
      saltParticlesPerShake,
      displayedSaltSubstanceAdded,
      saltEquilibriumReached,
      strongConcentrations,
      pH,
      isStrongPhaseStep,
      saltPhasePhAt
   } = useBufferDerivedState({
      waterLevel,
      particleCount,
      selectedSubstance,
      displayedSaltShakes,
      simulationPhase,
      strongMaxSubstance,
      strongSubstanceAdded,
      currentStep,
      waterLevelMin: WATER_LEVEL_MIN,
      waterLevelMax: WATER_LEVEL_MAX
   });

   useBufferParticlesSync({
      modelRef,
      rowsVisible,
      selectedSubstance,
      simulationPhase,
      particleCount,
      saltShakes,
      currentMolarity,
      saltModel,
      displayedSaltSubstanceAdded
   });
   const scientificConcentrations = useScientificConcentrations({
      pH,
      particleCount,
      totalSlots: TOTAL_SLOTS,
      isStrongPhaseStep,
      strongConcentrations,
      simulationPhase,
      saltModel,
      displayedSaltSubstanceAdded,
      currentStep,
      selectedSubstance
   });

   const curveMeta = saltModel ? {
      currentPh: pH,
      initialPh: saltPhasePhAt(0),
      finalPh: saltPhasePhAt(saltModel.maxSubstance)
   } : undefined;

   const statement = useBufferStatement(
      currentStep,
      selectedSubstance,
      currentMolarity,
      particleCount,
      strongSubstanceAdded
   );

   const devSections = [
      {
         title: 'Guide',
         rows: [
            { label: 'Step', value: `${currentStepIndex + 1} / ${bufferGuideSteps.length}` },
            { label: 'Step id', value: currentStep.id },
            { label: 'Input type', value: currentStep.inputState.type },
            { label: 'Has interacted', value: hasInteracted ? 'yes' : 'no' },
            { label: 'Selector open', value: selectorOpen ? 'yes' : 'no' },
            { label: 'Active bottle', value: activeBottleIndex ?? 'none' }
         ]
      },
      {
         title: 'Particles',
         rows: [
            { label: 'Particle count', value: particleCount },
            { label: 'Total slots', value: TOTAL_SLOTS },
            { label: 'Animated substance', value: animatedCounts.substance },
            { label: 'Animated primary', value: animatedCounts.primary },
            { label: 'Animated secondary', value: animatedCounts.secondary }
         ]
      },
      {
         title: 'Salt',
         rows: [
            { label: 'Salt shakes', value: saltShakes },
            { label: 'Displayed shakes', value: displayedSaltShakes },
            { label: 'Per shake', value: saltParticlesPerShake },
            { label: 'Added', value: displayedSaltSubstanceAdded },
            { label: 'Max', value: saltModel?.maxSubstance ?? 'n/a' },
            { label: 'Equilibrium', value: saltEquilibriumReached ? 'yes' : 'no' }
         ]
      },
      {
         title: 'Strong',
         rows: [
            { label: 'Strong added', value: strongSubstanceAdded },
            { label: 'Strong max', value: strongMaxSubstance },
            { label: 'Phase step', value: isStrongPhaseStep ? 'yes' : 'no' }
         ]
      },
      {
         title: 'Chemistry',
         rows: [
            { label: 'Water level', value: waterLevel.toFixed(3) },
            { label: 'Model level', value: modelLevel.toFixed(3) },
            { label: 'Molarity', value: currentMolarity.toExponential(2) },
            { label: 'pH', value: pH.toFixed(2) },
            { label: 'Phase', value: simulationPhase }
         ]
      },
      {
         title: 'Substance',
         rows: [
            { label: 'Selected', value: selectedSubstance?.symbol ?? 'none' },
            { label: 'Type', value: selectedSubstance?.type ?? 'n/a' },
            { label: 'pK', value: selectedSubstance ? (selectedSubstance.type === 'weakAcid' ? selectedSubstance.pKA : selectedSubstance.pKB) : 'n/a' }
         ]
      }
   ];

   const bottles = useBufferBottles({
      selectedSubstance,
      currentStep,
      activeBottleIndex,
      setActiveBottleIndex,
      saltModel,
      saltParticlesPerShake,
      saltShakes,
      setSaltShakes,
      strongSubstanceAdded,
      strongMaxSubstance,
      setStrongSubstanceAdded,
      simulationPhase,
      setSimulationPhase,
      markInteraction,
      modelRef,
      createPour,
      registerBottle,
      maxParticles: MAX_PARTICLES,
      minFinalPrimaryIonCount: MIN_FINAL_PRIMARY_ION_COUNT,
      hydrogenChloride,
      potassiumHydroxide,
      setParticleCount
   });

   const { handleNext, handleBack, canGoNext } = useGuideNavigation({
      currentStep,
      currentStepIndex,
      totalSteps: bufferGuideSteps.length,
      steps: bufferGuideSteps,
      snapshotStepIds,
      restoreSnapshotForStep,
      saveSnapshotForStep,
      availableSubstances,
      selectedSubstance,
      setSelectedSubstance,
      setParticleCount,
      setWaterLevel,
      setSimulationPhase,
      setCurrentStepIndex,
      saltEquilibriumReached,
      strongMaxSubstance,
      strongSubstanceAdded,
      particleCount,
      onBackToStrongBase: () => setStrongMidAutoAdvanced(true)
   });

   useBufferAutoAdvance({
      currentStepId: currentStep.id,
      saltEquilibriumReached,
      saltAutoAdvanced,
      setSaltAutoAdvanced,
      strongMidAutoAdvanced,
      setStrongMidAutoAdvanced,
      strongAutoAdvanced,
      setStrongAutoAdvanced,
      strongMaxSubstance,
      setStrongMaxSubstance,
      strongSubstanceAdded,
      setStrongSubstanceAdded,
      setActiveBottleIndex,
      handleNext,
      modelRef,
      finalSecondaryIonCount: FINAL_SECONDARY_ION_COUNT,
      minFinalPrimaryIonCount: MIN_FINAL_PRIMARY_ION_COUNT
   });


   const acidSubstanceRef = useRef<AcidOrBase | null>(null);

   // Initial setup - select a Weak Acid by default (often used for Buffers)
   useEffect(() => {
      if (!selectedSubstance) {
         const weakAcids = getSubstancesByType('weakAcid');
         if (weakAcids.length > 0) {
            setSelectedSubstance(weakAcids[0]);
         }
      }
   }, []);

   useEffect(() => {
      if (currentStep.id === 'instructToChooseWeakBase') {
         if (selectedSubstance?.type === 'weakAcid') {
            acidSubstanceRef.current = selectedSubstance;
         }
         const weakBases = getSubstancesByType('weakBase');
         if (weakBases.length > 0) {
            setSelectedSubstance(weakBases[0]);
         }
         setParticleCount(0);
         setSaltShakes(0);
         setDisplayedSaltShakes(0);
         setStrongSubstanceAdded(0);
         setStrongMaxSubstance(0);
         setStrongMidAutoAdvanced(false);
         setSaltAutoAdvanced(false);
         setStrongAutoAdvanced(false);
         setSimulationPhase('adding');
         setWaterLevel(0.5);
      }

      if (currentStep.substanceType === 'weakAcid' && selectedSubstance?.type === 'weakBase' && acidSubstanceRef.current) {
         setSelectedSubstance(acidSubstanceRef.current);
      }
   }, [
      currentStep.id,
      currentStep.substanceType,
      selectedSubstance,
      setDisplayedSaltShakes,
      setParticleCount,
      setSaltAutoAdvanced,
      setSaltShakes,
      setSelectedSubstance,
      setSimulationPhase,
      setStrongAutoAdvanced,
      setStrongMidAutoAdvanced,
      setStrongMaxSubstance,
      setStrongSubstanceAdded,
      setWaterLevel
   ]);

   useEffect(() => {
      if (currentStep.chartMode) {
         setChartMode(currentStep.chartMode);
      }
   }, [currentStep.chartMode]);

   // Beaker ref for potential future use or just container ref
   // beakerContainerRef and bottlesContainerRef declared above



   // DOM IDs for highlights
   const elementIds = {
      'reactionSelection': 'guide-element-reactionSelection',
      'waterSlider': 'guide-element-waterSlider',
      'beakerTools': 'guide-element-beakerTools-target',
      'reactionEquation': 'guide-element-reactionEquation',
      'pHScale': 'ph-scale',
      'phChart': 'guide-element-phChart',
      'concentrationChart': 'concentration-chart',
      'kEquation': 'guide-element-kEquation',
      'kWEquation': 'guide-element-kWEquation',
      'pKEquation': 'guide-element-pKEquation',
      'hasselbalchEquation': 'guide-element-hasselbalchEquation',
      'bottom-chart-container': 'bottom-chart-container'
   };

   const isChooseSubstanceStep = currentStep.highlights?.includes('reactionSelection');

   return (
      <AcidsBasesLayout>
         <HighlightOverlay
            elementIds={elementIds}
            highlights={highlights}
            active={!hasInteracted}
         >
            <div className="h-full bg-white flex flex-col items-center" style={{ overflowY: 'hidden', overflowX: 'hidden' }}>
               {/* Main Content Wrapper */}
               <div
                  className="w-full relative h-full flex-1 flex flex-col"
                  style={{ overflowX: 'hidden', padding: `${ACIDS_BASES_LAYOUT_PADDING_PX}px` }}
               >

                  {/* Main Grid Content */}
                  <main className="flex-1 w-full grid gap-8"
                     style={{ gridTemplateColumns: ACIDS_BASES_MAIN_GRID.buffers, overflowX: 'hidden' }}
                  >
                     {/* LEFT COLUMN: Simulation Area */}
                     <div
                        className="grid pt-0 h-full"
                        style={{
                           gridTemplateColumns: ACIDS_BASES_INNER_GRID.buffers.columns,
                           gridTemplateRows: `${ACIDS_BASES_STABLE_ROW_SLOTS.buffers.topRowHeightPx}px ${ACIDS_BASES_STABLE_ROW_SLOTS.buffers.bottomRowHeightPx}px`,
                           columnGap: `${ACIDS_BASES_INNER_GRID.buffers.gapPx}px`,
                           rowGap: `${ACIDS_BASES_STABLE_ROW_SLOTS.buffers.rowGapPx}px`
                        }}
                     >
                        {/* Top-left / Top-right */}
                        <BufferTopRow
                           guideOverrides={guideOverrides}
                           selectedSubstance={selectedSubstance}
                           defaultSubstance={hydrogenChloride}
                           bottles={bottles}
                           pouringParticles={pouringParticles}
                           bottlesContainerRef={bottlesContainerRef}
                           saltModel={saltModel}
                           strongMaxSubstance={strongMaxSubstance}
                           strongSubstanceAdded={strongSubstanceAdded}
                           isStrongPhaseStep={isStrongPhaseStep}
                        />

                        {/* Bottom-left / Bottom-right */}
                        <BufferBottomRow
                           guideOverrides={guideOverrides}
                           waterLevel={waterLevel}
                           waterLevelMin={WATER_LEVEL_MIN}
                           waterLevelMax={WATER_LEVEL_MAX}
                           onWaterLevelChange={(level) => {
                              setWaterLevel(level);
                              markInteraction();
                           }}
                           beakerContainerRef={beakerContainerRef}
                           selectedSubstance={selectedSubstance}
                           pH={pH}
                           currentRows={currentRows}
                           displayParticles={displayParticles}
                           concentrations={scientificConcentrations}
                           curveMeta={curveMeta}
                           animatedCounts={animatedCounts}
                           maxParticles={MAX_PARTICLES}
                           forcedChartMode={currentStep.chartMode}
                           chartMode={chartMode}
                           onChartModeChange={setChartMode}
                        />
                     </div>

                     {/* RIGHT COLUMN: Theory & Guide */}
                     <BufferSidePanel
                        guideOverrides={guideOverrides}
                        availableSubstances={availableSubstances}
                        selectedSubstance={selectedSubstance}
                        onSelectSubstance={(s) => {
                           setSelectedSubstance(s);
                           setParticleCount(0);
                           setSimulationPhase('adding');
                           setWaterLevel(0.5);
                           setSelectorOpen(false);
                           markInteraction();
                        }}
                        selectorOpen={selectorOpen}
                        setSelectorOpen={setSelectorOpen}
                        equationState={currentStep.equationState as any}
                        pH={pH}
                        concentrations={scientificConcentrations}
                        statement={statement}
                        onNext={handleNext}
                        onBack={handleBack}
                        canGoNext={canGoNext()}
                        canGoBack={currentStepIndex > 0}
                        currentStepIndex={currentStepIndex}
                        totalSteps={bufferGuideSteps.length}
                        isChooseSubstanceStep={currentStep.highlights?.includes('reactionSelection')}
                        controls={
                           <>
                              <Blockable element="reactionSelection" overrides={guideOverrides} className="relative">
                                 <div className={isChooseSubstanceStep ? 'w-full max-w-xs' : 'w-fit'}>
                                    <SubstanceSelector
                                       substances={availableSubstances}
                                       selected={selectedSubstance}
                                       onSelect={(s) => {
                                          setSelectedSubstance(s);
                                          setParticleCount(0);
                                          setSimulationPhase('adding');
                                          setWaterLevel(0.5);
                                          setSelectorOpen(false);
                                          markInteraction();
                                       }}
                                       placeholder="Choose a substance"
                                       enabled={isChooseSubstanceStep}
                                       isOpen={selectorOpen}
                                       onOpenChange={setSelectorOpen}
                                       staticMenu={false}
                                       compact={true}
                                       align="right"
                                    />
                                 </div>
                              </Blockable>
                              {showChapterTabs && <AcidsBasesNav />}
                              <AcidsHomeButton />
                              <NavMenu />
                           </>
                        }
                     />
                  </main>
               </div>

               {/* {process.env.NODE_ENV !== 'production' && (
               <BufferDevOverlay sections={devSections} />
            )} */}
            </div>
         </HighlightOverlay>
      </AcidsBasesLayout>
   );
}
