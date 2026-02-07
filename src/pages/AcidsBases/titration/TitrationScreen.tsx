import { useMemo, useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Beaker, Burette, Pipette, VerticalSlider } from '../../../components/AcidsBases/ui';
import { BufferCharts } from '../buffers/BufferCharts';
import { calculateTitrationPH } from '../../../helper/acidsBases/simulationEngine';
import { ION_COLORS, potassiumHydroxide, hydrogenChloride } from '../../../helper/acidsBases/substances';
import { Blockable, GuideBubble, HighlightOverlay } from '../../../components/AcidsBases/guide';
import { ReactionEquation, PHMeter, SubstanceSelector, ReagentBottle } from '../../../components/AcidsBases/interactive';
import AcidsBasesNav from '../../../layout/AcidsBasesNav';
import AcidsBasesLayout from '../../../layout/AcidsBasesLayout';
import NavMenu from '../../../components/AcidsBases/navigation/NavMenu';
import AcidsHomeButton from '../../../components/AcidsBases/navigation/AcidsHomeButton';
import { TitrationGraph } from './components/TitrationGraph';
import { TitrationMathPanel } from './components/TitrationMathPanel';
import { useTitrationModel } from './hooks/useTitrationModel';
import { useTitrationGuideState } from './hooks/useTitrationGuideState';
import { titrationGuideSteps } from '../../../components/AcidsBases/guide/titrationGuideSteps';
import { ReactingBeakerModel } from '../../../helper/acidsBases/particles/ReactingBeakerModel';
import { useParticleAnimation } from '../../../hooks/useParticleAnimation';
import type { Particle, MoleculeType } from '../../../helper/acidsBases/particles/types';
import { GRID_ROWS_DEFAULT, GRID_ROWS_TOTAL } from '../../../helper/acidsBases/particles/types';
import { useWaterLineOffset } from '../buffers/hooks/useWaterLineOffset';
import { usePouringParticles } from '../buffers/hooks/usePouringParticles';
import type { AcidOrBase } from '../../../helper/acidsBases';
import titrationGuideJson from '../../../data/acidsBases/guide/titration.json';
import { BufferDevOverlay } from '../buffers/components/BufferDevOverlay';
import { ACIDS_BASES_COLORS } from '../../../theme/acidsBasesColors';
import { getGridRowsForWaterLevel } from '../../../helper/acidsBases/beakerMath';
import { shouldShowAcidsChapterTabs } from '../shared/debugUi';
import { ACIDS_BASES_GRAPH_ANCHOR, ACIDS_BASES_INNER_GRID, ACIDS_BASES_LAYOUT_PADDING_PX, ACIDS_BASES_MAIN_GRID, ACIDS_BASES_RIGHT_PANEL_SLOTS, ACIDS_BASES_STABLE_ROW_SLOTS } from '../shared/layoutPresets';
import { AnchoredBeakerBlock } from '../shared/AnchoredBeakerBlock';
import { AnchoredBottomGraphSlot } from '../shared/AnchoredBottomGraphSlot';

const WATER_LEVEL_MIN = 0.31818;
const WATER_LEVEL_MAX = 0.681818;

export function TitrationScreen() {
   const toolScale = 1;
   const showChapterTabs = useMemo(() => shouldShowAcidsChapterTabs(), []);
   const model = useTitrationModel();
   const guide = useTitrationGuideState(model);
   const [activeBottleIndex, setActiveBottleIndex] = useState<number | null>(null);
   const lastBuretteClickRef = useRef(0);
   const buretteRapidUntilRef = useRef(0);
   const buretteRapidTimerRef = useRef<number | null>(null);
   const beakerContainerRef = useRef<HTMLDivElement>(null);
   const bottlesContainerRef = useRef<HTMLDivElement>(null);
   const beakerModelRef = useRef(new ReactingBeakerModel());
   const [particles, setParticles] = useState<Particle[]>([]);

   const [bottleTranslation, setBottleTranslation] = useState<{ x: number; y: number } | undefined>(undefined);
   const reagentBottleInteractRef = useRef<HTMLDivElement | null>(null);
   const [beakerBounds, setBeakerBounds] = useState({ x: 0, y: 0, width: 0, height: 0, liquidLevel: 0 });

   useEffect(() => {
      const unsubscribe = beakerModelRef.current?.subscribe(() => {
         setParticles(beakerModelRef.current?.getParticles());
      });
      return unsubscribe;
   }, []);

   // Update beaker bounds for pH meter collision detection
   useEffect(() => {
      const updateBounds = () => {
         if (beakerContainerRef.current) {
            const rect = beakerContainerRef.current.getBoundingClientRect();
            // Using global coordinates for the meter
            setBeakerBounds({
               x: rect.left,
               y: rect.top,
               width: rect.width,
               height: rect.height,
               liquidLevel: model.waterLevel
            });
         }
      };

      updateBounds();
      window.addEventListener('resize', updateBounds);
      window.addEventListener('scroll', updateBounds); // Critical for absolute positioning
      return () => {
         window.removeEventListener('resize', updateBounds);
         window.removeEventListener('scroll', updateBounds);
      };
   }, [model.waterLevel]);

   const liquidLevel = WATER_LEVEL_MIN + (WATER_LEVEL_MAX - WATER_LEVEL_MIN) * model.waterLevel;
   const waterLineOffset = useWaterLineOffset(beakerContainerRef, bottlesContainerRef, liquidLevel);
   const [isMobile, setIsMobile] = useState(false);
   useEffect(() => {
      const check = () => setIsMobile(window.innerWidth < 1024);
      check();
      window.addEventListener('resize', check);
      return () => window.removeEventListener('resize', check);
   }, []);

   const {
      pouringParticles,
      createPour,
      registerBottle
   } = usePouringParticles(
      waterLineOffset,
      bottlesContainerRef,
      beakerContainerRef,
      {
         particlesPerPour: { 1: 1, 2: 1 },
         offsets: isMobile ? { 2: { x: -10 } } : { 2: { x: -25 } }
      }
   );


   const startRapidStream = (
      untilRef: React.MutableRefObject<number>,
      timerRef: React.MutableRefObject<number | null>,
      substance: AcidOrBase,
      bottleIndex: 1 | 2,
      onEmit: (count: number) => void
   ) => {
      const now = Date.now();
      untilRef.current = Math.max(untilRef.current, now + 400);

      const emit = () => {
         if (Date.now() >= untilRef.current) {
            if (timerRef.current !== null) {
               window.clearInterval(timerRef.current);
               timerRef.current = null;
            }
            return;
         }
         createPour(substance, bottleIndex, { speedMultiplier: 1, particleCount: 1 });
         onEmit(1);
      };

      if (timerRef.current === null) {
         emit();
         timerRef.current = window.setInterval(emit, 40);
      }
   };

   useEffect(() => {
      return () => {
         if (buretteRapidTimerRef.current !== null) {
            window.clearInterval(buretteRapidTimerRef.current);
         }
      };
   }, []);

   const canSetWater = guide.currentStep.inputState.type === 'setWaterLevel';
   const canAddSubstance = guide.currentStep.inputState.type === 'addSubstance';
   const canAddIndicator = guide.currentStep.inputState.type === 'addIndicator';
   const weakEquivalencePH = useMemo(() => {
      if (model.substance.type !== 'weakAcid' && model.substance.type !== 'weakBase') return null;
      if (model.substanceMolarity <= 0 || model.equivalenceVolume <= 0) return null;
      const pH = calculateTitrationPH(
         model.substance,
         Math.max(1e-7, model.substanceMolarity),
         model.beakerVolume,
         model.titrantMolarity,
         model.equivalenceVolume
      );
      return Number.isFinite(pH) ? pH : null;
   }, [model.substance, model.substanceMolarity, model.beakerVolume, model.titrantMolarity, model.equivalenceVolume]);
   const stopAtWeakEquivalence = (
      (guide.currentStep.id === 'titr-43' && model.substance.type === 'weakAcid' && model.currentPH >= (weakEquivalencePH ?? 8.68))
      || (guide.currentStep.id === 'titr-63' && model.substance.type === 'weakBase' && model.currentPH <= (weakEquivalencePH ?? 5.32))
   );
   const canAddTitrant = guide.currentStep.inputState.type === 'addTitrant'
      && model.canAddTitrant
      && !stopAtWeakEquivalence;
   const canSetTitrantMolarity = guide.currentStep.inputState.type === 'setTitrantMolarity';

   const elementIds = useMemo(() => ({
      reactionSelection: 'guide-element-reactionSelection',
      waterSlider: 'guide-element-waterSlider',
      container: 'guide-element-container',
      indicator: 'guide-element-indicator',
      burette: 'guide-element-burette',
      macroscopicBeaker: 'guide-element-macroscopicBeaker',
      phChart: 'guide-element-phChart'
   }), []);

   const sectionSteps = useMemo(() => {
      const steps = (titrationGuideJson.steps ?? []) as Array<{ section?: string }>;
      const order: Array<{ section: string; index: number }> = [];
      steps.forEach((step, index) => {
         if (!step.section) return;
         if (order.find(item => item.section === step.section)) return;
         order.push({ section: step.section, index });
      });
      return order;
   }, []);

   const devSections = useMemo(() => [
      {
         title: 'Guide',
         rows: [
            { label: 'Step', value: `${guide.currentStepIndex + 1} / ${titrationGuideSteps.length}` },
            { label: 'Step id', value: guide.currentStep.id },
            { label: 'Input', value: guide.currentStep.inputState.type }
         ]
      },
      {
         title: 'Sections',
         rows: sectionSteps.map((section) => ({
            label: section.section,
            value: (
               <button
                  className="rounded border border-white/30 px-2 py-0.5 text-[10px] hover:bg-white/10"
                  onClick={() => guide.setCurrentStepIndex(section.index)}
               >
                  Go
               </button>
            )
         }))
      }
   ], [guide.currentStep.id, guide.currentStep.inputState.type, guide.currentStepIndex, sectionSteps]);

   const indicatorColor = '#6F64C8';
   const toolSizes = {
      pipetteWidth: 60 * toolScale,
      pipetteHeight: 90 * toolScale,
      buretteWidth: 120 * toolScale,
      buretteHeight: 140 * toolScale,
      sliderHeight: 280,
      beakerWidth: 280,
      beakerHeight: 350,
      toolsMinHeight: 120 * toolScale,
   };
   const macroscopicPink = '#F2A3AE';
   const baseWaterColor = '#ADD8E6';
   const blendColor = (from: string, to: string, t: number) => {
      const clamp = Math.min(1, Math.max(0, t));
      const parse = (hex: string) => hex.replace('#', '').match(/.{2}/g)?.map(v => parseInt(v, 16)) ?? [0, 0, 0];
      const [r1, g1, b1] = parse(from);
      const [r2, g2, b2] = parse(to);
      const r = Math.round(r1 + (r2 - r1) * clamp).toString(16).padStart(2, '0');
      const g = Math.round(g1 + (g2 - g1) * clamp).toString(16).padStart(2, '0');
      const b = Math.round(b1 + (b2 - b1) * clamp).toString(16).padStart(2, '0');
      return `#${r}${g}${b}`;
   };
   const indicatorProgress = model.maxIndicator > 0 ? model.indicatorAdded / model.maxIndicator : 0;
   const phProgress = model.isAcid
      ? Math.min(1, Math.max(0, model.currentPH / 7))
      : Math.min(1, Math.max(0, (14 - model.currentPH) / 7));
   const indicatorTint = blendColor(indicatorColor, macroscopicPink, phProgress);
   const macroLiquidColor = blendColor(baseWaterColor, indicatorTint, indicatorProgress);
   const liquidColor = model.beakerState === 'macroscopic' ? macroLiquidColor : baseWaterColor;

   const effectiveTitrantAddedForParticles = useMemo(() => {
      if (model.phase === 'postEP') {
         return model.maxPreEPTitrant + model.titrantAdded;
      }
      return model.titrantAdded;
   }, [model.phase, model.maxPreEPTitrant, model.titrantAdded]);

   const particleCounts = useMemo(() => {
      const diff = model.substanceAdded - effectiveTitrantAddedForParticles;
      if (model.isStrong) {
         return { substance: 0, primary: Math.max(0, Math.abs(diff)), secondary: 0 };
      }

      if (model.phase === 'preparation') {
         return { substance: model.substanceAdded, primary: 0, secondary: 0 };
      }

      if (model.phase === 'preEP') {
         if (model.titrantAdded === 0) {
            return { substance: model.substanceAdded, primary: 0, secondary: 0 };
         }
         const substanceCount = Math.max(0, model.substanceAdded - model.titrantAdded);
         const secondaryCount = Math.max(0, model.titrantAdded * 2);
         return { substance: substanceCount, primary: 0, secondary: secondaryCount };
      }

      if (model.phase === 'postEP') {
         const secondaryCount = Math.max(0, model.substanceAdded * 2);
         const primaryCount = Math.max(0, model.titrantAdded);
         return { substance: 0, primary: primaryCount, secondary: secondaryCount };
      }

      const primaryCount = Math.max(0, diff);
      const secondaryCount = primaryCount;
      const substanceCount = Math.max(0, model.substanceAdded - secondaryCount);
      return { substance: substanceCount, primary: primaryCount, secondary: secondaryCount };
   }, [model.substanceAdded, model.isStrong, effectiveTitrantAddedForParticles, model.phase, model.titrantAdded]);

   const strongPrimaryColor = useMemo(() => {
      if (!model.isStrong) return model.substance.primaryColor;
      if (model.isAcid) {
         return effectiveTitrantAddedForParticles > model.substanceAdded ? ION_COLORS.hydroxide : ION_COLORS.hydrogen;
      }
      return effectiveTitrantAddedForParticles > model.substanceAdded ? ION_COLORS.hydrogen : ION_COLORS.hydroxide;
   }, [model.isStrong, model.isAcid, effectiveTitrantAddedForParticles, model.substanceAdded, model.substance.primaryColor]);

   const weakPrimaryColor = useMemo(() => {
      if (model.isStrong) return model.substance.primaryColor;
      if (model.phase !== 'postEP') return model.substance.primaryColor;
      return model.isAcid ? ION_COLORS.hydroxide : ION_COLORS.hydrogen;
   }, [model.isStrong, model.phase, model.isAcid, model.substance.primaryColor]);

   const weakPreEPTitrantOptions = useMemo(() => {
      if (model.isStrong) return undefined;
      if (model.phase !== 'preEP') return undefined;
      if (model.titrantAdded === 0) return undefined;

      const incomingColor = model.isAcid ? ION_COLORS.hydroxide : ION_COLORS.hydrogen;
      return {
         initialColors: { secondaryIon: incomingColor },
         skipFadeInTypes: ['secondaryIon'] as MoleculeType[],
         transitionDelayMsByType: { secondaryIon: 0 },
         staggerMsByType: { secondaryIon: 0 }
      };
   }, [model.isStrong, model.phase, model.titrantAdded, model.isAcid]);

   // Synchronization logic for particles
   // Exactly calculated based on pixels visible in Beaker
   const rowsVisible = liquidLevel * GRID_ROWS_TOTAL;

   useEffect(() => {
      beakerModelRef.current?.setWaterLevel(rowsVisible);
      beakerModelRef.current?.updateParticles(
         particleCounts,
         {
            substance: model.substance.color,
            primaryIon: model.isStrong ? strongPrimaryColor : weakPrimaryColor,
            secondaryIon: model.substance.secondaryColor
         },
         weakPreEPTitrantOptions
      );
   }, [rowsVisible, model.substance, particleCounts, strongPrimaryColor, weakPrimaryColor, weakPreEPTitrantOptions]);

   const displayParticles = useParticleAnimation(particles);

   const chartCounts = useMemo(() => {
      const counts = { substance: 0, primary: 0, secondary: 0 };
      displayParticles.forEach(p => {
         if (p.type === 'substance') counts.substance++;
         else if (p.type === 'primaryIon') counts.primary++;
         else if (p.type === 'secondaryIon') counts.secondary++;
      });
      return counts;
   }, [displayParticles]);

   const strongIonCounts = useMemo(() => {
      const maxParticles = 43;
      const neutralHeight = 0.15;
      const threshold = 1e-12;

      const concentrationToBar = (value: number) => {
         if (!Number.isFinite(value) || value <= 0) return 0;
         if (value <= threshold) {
            return (value / threshold) * neutralHeight;
         }
         const clamped = Math.min(1, value);
         const slope = (1 - neutralHeight) / (1 - threshold);
         return neutralHeight + (clamped - threshold) * slope;
      };

      const hydrogen = Math.pow(10, -model.currentPH);
      const hydroxide = Math.pow(10, -(14 - model.currentPH));

      return {
         substance: 0,
         primary: concentrationToBar(hydrogen) * maxParticles,
         secondary: concentrationToBar(hydroxide) * maxParticles
      };
   }, [model.currentPH]);

   const strongChartCounts = useMemo(() => {
      return {
         substance: 0,
         primary: strongIonCounts.secondary,
         secondary: strongIonCounts.primary
      };
   }, [strongIonCounts]);

   const titrantCountToVolume = useMemo(() => {
      return (count: number) => {
         if (model.maxPreEPTitrant <= 0) return 0;
         if (count <= model.maxPreEPTitrant) {
            return model.equivalenceVolume * (count / model.maxPreEPTitrant);
         }
         const postCount = count - model.maxPreEPTitrant;
         if (model.maxPostEPTitrant <= 0) return model.equivalenceVolume;
         return model.equivalenceVolume + model.equivalenceVolume * (postCount / model.maxPostEPTitrant);
      };
   }, [model.maxPreEPTitrant, model.maxPostEPTitrant, model.equivalenceVolume]);

   const weakCheckpoints = useMemo(() => {
      if (model.isStrong) return [] as number[];
      if (model.phase === 'preparation') return [] as number[];
      const maxBuffer = model.titrantAtMaxBufferCapacity;
      const equivalence = model.maxPreEPTitrant;
      const maximum = model.maxPreEPTitrant + model.maxPostEPTitrant;
      return [
         titrantCountToVolume(maxBuffer),
         titrantCountToVolume(equivalence),
         titrantCountToVolume(maximum)
      ];
   }, [model.isStrong, model.phase, model.titrantAtMaxBufferCapacity, model.maxPreEPTitrant, model.maxPostEPTitrant, titrantCountToVolume]);

   const graphMaxVolume = useMemo(() => {
      if (model.titrationCurve.length === 0) return null;
      const targetPH = model.isAcid ? 13 : 1;
      const curve = model.titrationCurve;
      for (let i = 1; i < curve.length; i += 1) {
         const prev = curve[i - 1];
         const curr = curve[i];
         const crossed = model.isAcid ? curr.pH >= targetPH : curr.pH <= targetPH;
         if (!crossed) continue;
         const prevDelta = targetPH - prev.pH;
         const currDelta = curr.pH - prev.pH;
         const t = currDelta !== 0 ? prevDelta / currDelta : 0;
         const volume = prev.volume + (curr.volume - prev.volume) * Math.max(0, Math.min(1, t));
         return Math.max(0, Math.round(volume * 10) / 10);
      }
      const lastVolume = curve[curve.length - 1].volume;
      return Math.round(lastVolume * 10) / 10;
   }, [model.titrationCurve, model.isAcid]);

   const graphData = useMemo(() => {
      if (!graphMaxVolume) return model.titrationCurve;
      return model.titrationCurve.filter(point => point.volume <= graphMaxVolume);
   }, [model.titrationCurve, graphMaxVolume]);

   const graphCheckpoints = useMemo(() => {
      if (!graphMaxVolume) return weakCheckpoints;
      return weakCheckpoints.filter(point => point <= graphMaxVolume);
   }, [weakCheckpoints, graphMaxVolume]);
   const concentrationToBar = (value: number) => {
      const neutralHeight = 0.15;
      const threshold = 1e-12;
      if (!Number.isFinite(value) || value <= 0) return 0;
      let height = 0;
      if (value <= threshold) {
         height = (value / threshold) * neutralHeight;
      } else {
         const clamped = Math.min(1, value);
         const slope = (1 - neutralHeight) / (1 - threshold);
         height = neutralHeight + (clamped - threshold) * slope;
      }
      return Math.min(1, Math.max(0, height));
   };

   const weakChartCounts = useMemo(() => {
      if (model.isStrong) return chartCounts;
      const hydrogen = Math.pow(10, -model.currentPH);
      const hydroxide = Math.pow(10, -(14 - model.currentPH));
      const primaryValue = model.substance.type === 'weakAcid' ? hydrogen : hydroxide;
      return {
         substance: chartCounts.substance,
         primary: concentrationToBar(primaryValue) * 43,
         secondary: chartCounts.secondary
      };
   }, [model.isStrong, model.substance.type, model.currentPH, chartCounts]);

   const weakExtraBars = useMemo(() => {
      if (model.isStrong) return [];
      if (model.substance.type === 'weakAcid') {
         return [{
            label: 'OH⁻',
            color: ION_COLORS.hydroxide,
            value: concentrationToBar(Math.pow(10, -(14 - model.currentPH)))
         }];
      }
      if (model.substance.type === 'weakBase') {
         return [{
            label: 'H⁺',
            color: ION_COLORS.hydrogen,
            value: concentrationToBar(Math.pow(10, -model.currentPH))
         }];
      }
      return [];
   }, [model.isStrong, model.substance.type, model.currentPH]);

   const barsConfig = model.isStrong ? {
      showSubstance: false,
      primaryLabel: 'OH⁻',
      secondaryLabel: 'H⁺',
      primaryColor: ION_COLORS.hydroxide,
      secondaryColor: ION_COLORS.hydrogen
   } : {
      extraBars: weakExtraBars
   };

   const indicatorSubstance: AcidOrBase = {
      ...model.substance,
      id: 'indicator',
      symbol: 'IND',
      color: indicatorColor,
      primaryColor: indicatorColor,
      secondaryColor: indicatorColor
   };

   const titrantSubstance: AcidOrBase = {
      ...model.substance,
      id: 'titrant',
      symbol: model.titrantLabel,
      color: model.isAcid ? ACIDS_BASES_COLORS.substances.titrant.acid : ACIDS_BASES_COLORS.substances.titrant.base,
      primaryColor: model.substance.primaryColor,
      secondaryColor: model.substance.primaryColor,
      secondaryIon: model.isAcid ? potassiumHydroxide.secondaryIon : hydrogenChloride.secondaryIon
   };

   const dismissHighlightOnClick = guide.currentStep.id === 'titr-07';

   useEffect(() => {
      setActiveBottleIndex(null);
   }, [guide.currentStep.id]);

   const mathValues = useMemo(() => {
      const substanceVolume = model.beakerVolume;
      const titrantVolume = model.titrantVolume;
      const totalVolume = substanceVolume + titrantVolume;

      // Ensure molarities respect auto-ionization threshold for display
      const displaySubstanceMolarity = Math.max(1e-7, model.substanceMolarity);
      const displayTitrantMolarity = Math.max(1e-7, model.titrantMolarity);

      // Recalculate moles using threshold molarities
      const substanceMoles = substanceVolume * displaySubstanceMolarity;
      const titrantMoles = titrantVolume > 0 ? titrantVolume * displayTitrantMolarity : 0;

      const numerator = model.isAcid ? substanceMoles - titrantMoles : titrantMoles - substanceMoles;
      const concentrationFromMoles = totalVolume > 0 ? Math.max(0, numerator) / totalVolume : 0;

      // Use reported pH to derive the concentration if moles calculation is too close to zero
      const equilibriumConc = Math.pow(10, -model.currentPH);
      const hydrogenConcentration = concentrationFromMoles > 1e-12 ? concentrationFromMoles : equilibriumConc;

      return {
         substanceLabel: model.substance.symbol,
         titrantLabel: model.titrantLabel,
         substanceMoles,
         substanceVolume,
         substanceMolarity: displaySubstanceMolarity,
         titrantMoles,
         titrantVolume,
         titrantMolarity: displayTitrantMolarity,
         hydrogenConcentration,
         pH: model.currentPH
      };
   }, [model]);

   return (
      <AcidsBasesLayout>
         <HighlightOverlay elementIds={elementIds} highlights={guide.guideOverrides.highlights} active={!guide.hasInteracted}>
            <div className="absolute top-4 right-4 flex items-center gap-4 z-[100]">
               <Blockable element="reactionSelection" overrides={guide.guideOverrides} className="relative z-50">
                  <div
                     id="guide-element-reactionSelection"
                     className={guide.currentStep.inputState.type === 'selectSubstance' ? 'w-full max-w-xs' : 'w-fit'}
                  >
                     <SubstanceSelector
                        substances={model.availableSubstances}
                        selected={model.substance}
                        onSelect={model.setSelectedSubstance}
                        placeholder="Choose a substance"
                        enabled={guide.currentStep.inputState.type === 'selectSubstance'}
                        isOpen={guide.substanceSelectorOpen}
                        onOpenChange={guide.setSubstanceSelectorOpen}
                        staticMenu={false}
                        compact={true}
                        align="right"
                     />
                  </div>
               </Blockable>
               {showChapterTabs && <AcidsBasesNav />}
               <AcidsHomeButton />
               <NavMenu />
            </div>
            <div
               className="h-full bg-white flex flex-col items-center"
               style={{ overflowY: 'hidden', overflowX: 'hidden' }}
               onClick={() => {
                  if (dismissHighlightOnClick && !guide.hasInteracted) {
                     guide.markInteraction();
                  }
               }}
            >
               <div
                  className="w-full relative h-full flex-1 flex flex-col"
                  style={{ overflowX: 'hidden', padding: `${ACIDS_BASES_LAYOUT_PADDING_PX}px` }}
               >
                  <main className="flex-1 w-full grid gap-8" style={{ gridTemplateColumns: ACIDS_BASES_MAIN_GRID.titration, overflowX: 'hidden' }}>
                     {/* LEFT COLUMN */}
                     <div
                        className="grid h-full"
                        style={{
                           gridTemplateColumns: ACIDS_BASES_INNER_GRID.titration.columns,
                           gridTemplateRows: `${ACIDS_BASES_STABLE_ROW_SLOTS.titration.topRowHeightPx}px ${ACIDS_BASES_STABLE_ROW_SLOTS.titration.bottomRowHeightPx}px`,
                           columnGap: `${ACIDS_BASES_INNER_GRID.titration.gapPx}px`,
                           rowGap: `${ACIDS_BASES_STABLE_ROW_SLOTS.titration.rowGapPx}px`
                        }}
                     >
                        {/* Top-left: tools */}
                           <div className="flex flex-col items-start justify-end gap-4">
                              {/* Tools in same container as menu */}
                              <div
                                 ref={bottlesContainerRef}
                                 className="relative flex items-end justify-end w-full mb-8 gap-2"
                                 style={{ minHeight: toolSizes.toolsMinHeight }}
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
                                       currentPH={model.currentPH}
                                       beakerBounds={beakerBounds}
                                       initialPosition={{ x: 10, y: 5 }}
                                       className="z-50"
                                    />
                                 </div>


                                 <Blockable element="indicator" overrides={guide.guideOverrides}>
                                    <div ref={(el) => registerBottle(1, el)}>
                                       <button
                                          id="guide-element-indicator"
                                          className="flex flex-col items-center gap-2 bg-transparent border-0 p-0"
                                          style={{ touchAction: 'manipulation' }}
                                          onClick={() => {
                                             if (!canAddIndicator) return;
                                             createPour(indicatorSubstance, 1, { speedMultiplier: isMobile ? 0.5 : 1, particleCount: 5 });
                                             model.incrementIndicator(5);
                                          }}
                                       >
                                          <Pipette
                                             liquidLevel={1 - indicatorProgress}
                                             liquidColor={indicatorColor}
                                             width={toolSizes.pipetteWidth}
                                             height={toolSizes.pipetteHeight}
                                             disabled={!canAddIndicator}
                                          />

                                       </button>
                                    </div>
                                 </Blockable>

                                 <Blockable element="burette" overrides={guide.guideOverrides}>
                                    <div
                                       id="guide-element-burette"
                                       className={`flex flex-col items-center gap-2 ${canSetTitrantMolarity ? 'relative' : ''}`}
                                       ref={(el) => registerBottle(2, el)}
                                    >
                                       <button
                                          className="rounded-md flex justify-center bg-transparent border-0 p-0 relative"
                                          style={{ touchAction: 'manipulation' }}
                                          onClick={() => {
                                             if (!canAddTitrant) return;
                                             const now = Date.now();
                                             const delta = now - lastBuretteClickRef.current;
                                             lastBuretteClickRef.current = now;
                                             if (delta < 400) {
                                                startRapidStream(buretteRapidUntilRef, buretteRapidTimerRef, titrantSubstance, 2, (count) => {
                                                   model.incrementTitrant(count);
                                                });
                                                return;
                                             }
                                             createPour(titrantSubstance, 2, { speedMultiplier: isMobile ? 0.5 : 1, particleCount: 1 });
                                             model.incrementTitrant(1);
                                          }}
                                       >
                                          <Burette
                                             liquidLevel={1}
                                             liquidColor={model.showTitrantFill ? (model.isAcid ? ACIDS_BASES_COLORS.substances.titrant.acid : ACIDS_BASES_COLORS.substances.titrant.base) : 'transparent'}
                                             liquidOpacity={model.showTitrantFill ? 1 : 0.55}
                                             width={toolSizes.buretteWidth}
                                             height={toolSizes.buretteHeight}
                                             isDripping={canAddTitrant}
                                          />
                                       </button>
                                       {canSetTitrantMolarity && (
                                          <div className="absolute -top-16 left-1/2 w-[140px] h-[60px] flex items-center justify-center z-50" style={{ transform: 'translateX(-50%) translateY(20px)' }}>
                                             {/* Bubble Background */}
                                             <img
                                                src="/source-images/SliderBubble.svg"
                                                alt=""
                                                className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-md"
                                             />

                                             {/* Slider Area */}
                                             <div className="relative w-[100px] h-[20px] mb-2 flex items-center">
                                                {/* Track */}
                                                <div className="absolute w-full top-1/2 -translate-y-1/2 h-1 bg-gray-300 rounded-full" />
                                                <div
                                                   className="absolute top-1/2 -translate-y-1/2 h-1 rounded-full"
                                                   style={{
                                                      width: `${((model.titrantMolarity - 0.2) / (0.5 - 0.2)) * 100}%`,
                                                      backgroundColor: ACIDS_BASES_COLORS.ui.primary
                                                   }}
                                                />

                                                {/* Handle Visual */}
                                                <div
                                                   className="absolute top-1/2 -translate-y-1/2 pointer-events-none w-3 h-6 rounded-sm shadow"
                                                   style={{
                                                      left: `${((model.titrantMolarity - 0.2) / (0.5 - 0.2)) * 100}%`,
                                                      transform: 'translate(-50%, -50%)',
                                                      backgroundColor: ACIDS_BASES_COLORS.ui.primary
                                                   }}
                                                />

                                                {/* Interactive Input */}
                                                <input
                                                   type="range"
                                                   min={0.2}
                                                   max={0.5}
                                                   step={0.01}
                                                   value={model.titrantMolarity}
                                                   onChange={(event) => model.setTitrantMolarity(Number(event.target.value))}
                                                   className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                />
                                             </div>
                                          </div>
                                       )}

                                    </div>
                                 </Blockable>
                                 <Blockable element="container" overrides={guide.guideOverrides}>
                                    <div id="guide-element-container" className="flex flex-col items-center gap-2">
                                       <ReagentBottle
                                          substance={model.substance}
                                          state={canAddSubstance ? (activeBottleIndex === 0 ? 'ready' : 'active') : 'unlocked'}
                                          forceGreyedOut={!canAddSubstance}
                                          scale={1}
                                          customTranslation={bottleTranslation}
                                          onRegister={(el) => {
                                             registerBottle(0, el);
                                             reagentBottleInteractRef.current = el;
                                          }}
                                          onClick={() => {
                                             if (!canAddSubstance) return;

                                             if (activeBottleIndex !== 0 && reagentBottleInteractRef.current && beakerContainerRef.current) {
                                                const bottleRect = reagentBottleInteractRef.current.getBoundingClientRect();
                                                const beakerRect = beakerContainerRef.current.getBoundingClientRect();
                                                const bottleCenterX = bottleRect.left + bottleRect.width / 2;
                                                const bottleTopY = bottleRect.top;
                                                const targetCenterX = beakerRect.left + beakerRect.width / 2;
                                                const targetTopY = beakerRect.top - 80;
                                                setBottleTranslation({
                                                   x: targetCenterX - bottleCenterX + 20,
                                                   y: targetTopY - bottleTopY + (isMobile ? 120 : 70)
                                                });
                                             }

                                             setActiveBottleIndex(0);
                                             if (dismissHighlightOnClick && !guide.hasInteracted) {
                                                guide.markInteraction();
                                             }
                                          }}
                                          onPouringStart={() => createPour(model.substance, 0, { speedMultiplier: isMobile ? 0.5 : 1 })}
                                          onPourComplete={() => {
                                             if (!canAddSubstance) return;
                                             model.incrementSubstance(model.substanceParticlesPerShake);
                                             if (dismissHighlightOnClick && !guide.hasInteracted) {
                                                guide.markInteraction();
                                             }
                                          }}
                                       />
                                    </div>
                                 </Blockable>
                                 {/* Pouring particles */}
                                 {/* Pouring particles - Rendered in Portal for global coordinates */}
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
                           </div>

                           <Blockable element="phChart" overrides={guide.guideOverrides} className="flex flex-col justify-center items-start">
                              <div
                                 id="guide-element-phChart"
                                 style={{
                                    border: '1px solid black',
                                    width: `${ACIDS_BASES_GRAPH_ANCHOR.squareSizePx}px`,
                                    height: `${ACIDS_BASES_GRAPH_ANCHOR.squareSizePx}px`,
                                    marginLeft: `${ACIDS_BASES_GRAPH_ANCHOR.leftOffsetPx}px`
                                 }}
                              >
                                 <TitrationGraph
                                    data={graphData}
                                    currentVolume={model.titrantVolume}
                                    currentPH={model.currentPH}
                                    checkpoints={graphCheckpoints}
                                    maxVolume={graphMaxVolume ?? undefined}
                                 />
                              </div>
                           </Blockable>
                        {/* Bottom-left: beaker */}
                           <AnchoredBeakerBlock
                              slider={(
                                 <Blockable element="waterSlider" overrides={guide.guideOverrides}>
                                    <div id="guide-element-waterSlider" style={{ height: toolSizes.sliderHeight }}>
                                       <VerticalSlider
                                          value={liquidLevel}
                                          min={WATER_LEVEL_MIN}
                                          max={WATER_LEVEL_MAX}
                                          onChange={(value) => {
                                             if (!canSetWater) return;
                                             // Convert absolute level (min..max) back to relative (0..1) for model
                                             const relative = (value - WATER_LEVEL_MIN) / (WATER_LEVEL_MAX - WATER_LEVEL_MIN);
                                             model.setWaterLevel(relative);
                                             guide.markInteraction();
                                          }}
                                          height={toolSizes.sliderHeight}
                                          scale={1}
                                          enabled={canSetWater}
                                       />
                                    </div>
                                 </Blockable>
                              )}
                              beaker={(
                                 <div
                                    ref={beakerContainerRef}
                                    className="relative"
                                    id="guide-element-macroscopicBeaker"
                                    style={{ width: toolSizes.beakerWidth, height: toolSizes.beakerHeight }}
                                 >
                                    <Beaker
                                       liquidLevel={liquidLevel}
                                       liquidColor={liquidColor}
                                       pH={model.currentPH}
                                       width={toolSizes.beakerWidth}
                                       height={toolSizes.beakerHeight}
                                       gridRows={rowsVisible}
                                       visualizationMode={model.beakerState === 'macroscopic' ? 'macro' : 'micro'}
                                       particles={model.beakerState === 'microscopic' ? displayParticles : []}
                                    />
                                 </div>
                              )}
                              footer={(
                                 <>
                                    <button
                                       onClick={() => model.setBeakerState('microscopic')}
                                       className={`bg-transparent border-0 px-2 py-1 text-xs font-semibold transition-colors ${model.beakerState !== 'microscopic' ? 'text-slate-400 hover:text-slate-600' : ''}`}
                                       style={{ color: model.beakerState === 'microscopic' ? ACIDS_BASES_COLORS.ui.primary : undefined, touchAction: 'manipulation' }}
                                    >
                                       Microscopic
                                    </button>
                                    <button
                                       onClick={() => model.setBeakerState('macroscopic')}
                                       className={`bg-transparent border-0 px-2 py-1 text-xs font-semibold transition-colors ${model.beakerState !== 'macroscopic' ? 'text-slate-400 hover:text-slate-600' : ''}`}
                                       style={{ color: model.beakerState === 'macroscopic' ? ACIDS_BASES_COLORS.ui.primary : undefined, touchAction: 'manipulation' }}
                                    >
                                       Macroscopic
                                    </button>
                                 </>
                              )}
                           />

                           <div className="w-full h-full">
                              <AnchoredBottomGraphSlot>
                                    <BufferCharts
                                       substance={model.substance}
                                       pH={model.currentPH}
                                       animatedCounts={model.isStrong ? strongChartCounts : weakChartCounts}
                                       maxParticles={43}
                                       showCurveToggle={false}
                                       barsConfig={barsConfig}
                                       variant="titration"
                                       graphSizePx={ACIDS_BASES_GRAPH_ANCHOR.squareSizePx}
                                       graphAnchorLeftPx={ACIDS_BASES_GRAPH_ANCHOR.leftOffsetPx}
                                       controlsPosition="bottom"
                                       className="h-full"
                                    />
                              </AnchoredBottomGraphSlot>
                           </div>
                     </div>

                     {/* RIGHT COLUMN */}
                     <div
                        className="grid relative min-h-0"
                        style={{
                           gridTemplateRows: `${ACIDS_BASES_RIGHT_PANEL_SLOTS.titration.reactionHeightPx}px ${ACIDS_BASES_RIGHT_PANEL_SLOTS.titration.mathHeightPx}px minmax(0, 1fr)`,
                           rowGap: `${ACIDS_BASES_RIGHT_PANEL_SLOTS.titration.panelGapPx}px`
                        }}
                     >
                        {/* Reaction Equation */}
                        <div className="flex items-center justify-start ml-10 w-full min-h-0">
                           <ReactionEquation substance={model.substance} titrant={titrantSubstance} />
                        </div>

                        <div className="px-2 min-h-0 overflow-hidden">
                           <TitrationMathPanel {...mathValues} />
                        </div>

                        <div className="pl-4 overflow-y-auto overflow-x-hidden pr-8 min-h-0">
                           <GuideBubble
                              position="relative"
                              statement={guide.statement}
                              onNext={guide.handleNext}
                              onBack={guide.handleBack}
                              canGoForwards={guide.canGoNext()}
                              canGoBackwards={guide.currentStepIndex > 0}
                              currentStep={guide.currentStepIndex}
                              totalSteps={titrationGuideSteps.length}
                              className="shadow-none !bg-transparent scale-90 origin-top-left"
                           />
                        </div>
                     </div>
                     {/* End of Right Column */}
                  </main>
               </div>
               {/* <BufferDevOverlay sections={devSections} /> */}
            </div>
         </HighlightOverlay >
      </AcidsBasesLayout >
   );
}
