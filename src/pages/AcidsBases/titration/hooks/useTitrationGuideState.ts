import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { GuideStep } from '../../../../components/AcidsBases/guide/types';
import { titrationGuideSteps } from '../../../../components/AcidsBases/guide/titrationGuideSteps';
import titrationGuideJson from '../../../../data/acidsBases/guide/titration.json';
import type { SubstanceType } from '../../../../helper/acidsBases/types';
import { getSubstancesByType } from '../../../../helper/acidsBases/substances';
import { calculateTitrationPH } from '../../../../helper/acidsBases/simulationEngine';
import type { TitrationModel } from './useTitrationModel';
import { resolveTitrationStatement } from '../../../../components/AcidsBases/guide/titrationStatements';

interface RawGuideStep {
   id?: string;
   actions?: string[];
   autoAdvanceAfterSeconds?: number;
   section?: string;
   state?: string;
   statementKey?: string;
}

const rawSteps = (titrationGuideJson.steps ?? []) as RawGuideStep[];

type UseTitrationGuideStateResult = {
   currentStep: GuideStep;
   currentStepIndex: number;
   setCurrentStepIndex: (value: number) => void;
   statement: string[];
   guideOverrides: {
      highlights: GuideStep['highlights'];
      inputState: GuideStep['inputState'];
      hasInteracted: boolean;
      onInteraction: () => void;
   };
   hasInteracted: boolean;
   markInteraction: () => void;
   handleNext: () => void;
   handleBack: () => void;
   canGoNext: () => boolean;
   substanceSelectorOpen: boolean;
   setSubstanceSelectorOpen: (value: boolean) => void;
};

const toSubstanceType = (raw?: string): SubstanceType | null => {
   if (!raw) return null;
   switch (raw) {
      case 'strongAcid':
      case 'strongBase':
      case 'weakAcid':
      case 'weakBase':
         return raw;
      default:
         return null;
   }
};

const parseAction = (action: string) => action.split('=').map(part => part.trim());

const WEAK_ACID_EQUIVALENCE_PH = 8.68;
const WEAK_BASE_EQUIVALENCE_PH = 5.32;
const WEAK_ACID_END_PH = 13.0;
const WEAK_BASE_END_PH = 1.0;

export const useTitrationGuideState = (model: TitrationModel): UseTitrationGuideStateResult => {
   const navigate = useNavigate();
   const [currentStepIndex, setCurrentStepIndex] = useState(0);
   const [hasInteracted, setHasInteracted] = useState(false);
   const [substanceSelectorOpen, setSubstanceSelectorOpen] = useState(false);
   const autoAdvanceRef = useRef(false);
   const suppressAutoAdvanceOnceRef = useRef(false);
   const prevStepIdRef = useRef<string>('');
   const stepEntryTitrantRef = useRef(0);
   const snapshotStepsRef = useRef(new Set(['titr-06', 'titr-11', 'titr-36', 'titr-56']));
   const snapshotRef = useRef<{
      stepId: string;
      rows: number;
      substanceAdded: number;
      titrantAdded: number;
      indicatorAdded: number;
      indicatorEmitted: number;
      titrantMolarity: number;
      phase: TitrationModel['phase'];
      weakTitrantLimit: TitrationModel['weakTitrantLimit'];
      beakerState: TitrationModel['beakerState'];
      macroBeakerState: TitrationModel['macroBeakerState'];
      showIndicatorFill: boolean;
      showTitrantFill: boolean;
      showPhString: boolean;
      substanceId: string;
   } | null>(null);

   const currentStep = titrationGuideSteps[currentStepIndex];
   const rawStep = rawSteps[currentStepIndex];

   const statement = useMemo(() => {
      const ctx = {
         substance: model.substance,
         pH: model.currentPH,
         substanceMoles: model.substanceMolarity * model.beakerVolume
      };
      return resolveTitrationStatement(rawStep?.statementKey, ctx) ?? currentStep.statement;
   }, [currentStep.statement, rawStep?.statementKey, model.substance, model.currentPH, model.substanceMolarity, model.beakerVolume]);

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

   const markInteraction = useCallback(() => setHasInteracted(true), []);

   const applyPhaseForState = useCallback((state?: string) => {
      if (!state) return;
      if (state === 'AddTitrantPreEP') {
         if (model.phase !== 'preEP') {
            model.resetTitrantAdded();
         }
         model.setPhase('preEP');
         return;
      }
      if (state === 'AddTitrantPostEP') {
         if (model.isStrong) {
            if (model.phase !== 'postEP') {
               model.resetTitrantAdded();
            }
            model.setPhase('postEP');
            return;
         }

         if (model.phase === 'postEP') {
            return;
         }

         if (model.titrantAdded >= model.maxPreEPTitrant) {
            model.resetTitrantAdded();
            model.setPhase('postEP');
            return;
         }

         model.setPhase('preEP');
         return;
      }
      if (state === 'SetTitrantMolarity') {
         if (model.phase !== 'preEP') {
            model.resetTitrantAdded();
         }
         model.setPhase('preEP');
         return;
      }
      if (state === 'PrepareNewSubstanceModel' || state === 'SetWaterLevel' || state === 'AddSubstance') {
         model.setPhase('preparation');
      }
   }, [model]);

   const applyStepActions = useCallback((step?: RawGuideStep) => {
      if (!step) return;

      applyPhaseForState(step.state);

      if (step.state === 'PrepareNewSubstanceModel' && step.section) {
         const sectionType = toSubstanceType(step.section);
         if (sectionType) {
            model.resetForNewSubstance(sectionType);
         }
      }

      if (step.state === 'AddTitrantToWeakSubstancePostMaxBufferCapacity' || step.state === 'AddTitrantPostEP') {
         model.setWeakTitrantLimit('equivalencePoint');
      } else if (step.state === 'AddTitrantPreEP' && !model.isStrong) {
         model.setWeakTitrantLimit('maxBufferCapacity');
      }

      step.actions?.forEach(action => {
         const [rawKey, rawValue] = parseAction(action);
         const key = rawKey.replace(/\s+/g, '');
         const value = rawValue?.replace(/\s+/g, '');

         if (key === 'substance' && value) {
            const type = toSubstanceType(value);
            if (type) {
               model.resetForNewSubstance(type);
               return;
            }
         }
         if (key === 'substanceSelectionIsToggled') {
            setSubstanceSelectorOpen(value === 'true');
            return;
         }
         if (key === 'macroBeakerState' && value) {
            if (value === 'indicator' || value === 'strongTitrant' || value === 'weakTitrant') {
               model.setMacroBeakerState(value);
            }
            return;
         }
         if (key === 'beakerState' && value) {
            model.setBeakerState(value === 'macroscopic' ? 'macroscopic' : 'microscopic');
            return;
         }
         if (key === 'showIndicatorFill') {
            model.setShowIndicatorFill(value === 'true');
            return;
         }
         if (key === 'showTitrantFill') {
            model.setShowTitrantFill(value === 'true');
            return;
         }
         if (key === 'showPhString') {
            model.setShowPhString(value !== 'false');
         }
      });
   }, [applyPhaseForState, model]);

   useEffect(() => {
      const prevStepId = prevStepIdRef.current;
      const nextStepId = currentStep.id;
      if (prevStepId === nextStepId) return;
      prevStepIdRef.current = nextStepId;
      setHasInteracted(false);
      stepEntryTitrantRef.current = model.titrantAdded;
      applyStepActions(rawStep);
      if (rawStep?.id && snapshotStepsRef.current.has(rawStep.id)) {
         snapshotRef.current = {
            stepId: rawStep.id,
            rows: model.rows,
            substanceAdded: model.substanceAdded,
            titrantAdded: model.titrantAdded,
            indicatorAdded: model.indicatorAdded,
            indicatorEmitted: model.indicatorEmitted,
            titrantMolarity: model.titrantMolarity,
            phase: model.phase,
            weakTitrantLimit: model.weakTitrantLimit,
            beakerState: model.beakerState,
            macroBeakerState: model.macroBeakerState,
            showIndicatorFill: model.showIndicatorFill,
            showTitrantFill: model.showTitrantFill,
            showPhString: model.showPhString,
            substanceId: model.substance.id
         };
      }
      if (currentStep.inputState.type === 'selectSubstance') {
         setSubstanceSelectorOpen(true);
      } else {
         setSubstanceSelectorOpen(false);
      }
   }, [currentStep.id, currentStep.inputState.type, rawStep, applyStepActions]);

   useEffect(() => {
      if (!rawStep?.autoAdvanceAfterSeconds) return;
      const timeout = window.setTimeout(() => {
         if (currentStepIndex < titrationGuideSteps.length - 1) {
            setCurrentStepIndex(currentStepIndex + 1);
         }
      }, rawStep.autoAdvanceAfterSeconds * 1000);

      return () => window.clearTimeout(timeout);
   }, [rawStep, currentStepIndex]);

   const handleNext = useCallback(() => {
      if (currentStep.inputState.type === 'selectSubstance' && !model.substance) {
         const list = getSubstancesByType(model.substanceType);
         if (list.length > 0) {
            model.setSelectedSubstance(list[0]);
         }
      }

      if (currentStepIndex >= titrationGuideSteps.length - 1) {
         navigate('/acids/titration/quiz');
         return;
      }

      if (currentStepIndex < titrationGuideSteps.length - 1) {
         setCurrentStepIndex(currentStepIndex + 1);
      }
   }, [currentStepIndex, currentStep.inputState.type, model, navigate]);

   const handleBack = useCallback(() => {
      if (currentStepIndex > 0) {
         const snapshotPairs: Record<string, string> = {
            'titr-07': 'titr-06',
            'titr-12': 'titr-11',
            'titr-37': 'titr-36',
            'titr-57': 'titr-56'
         };
         const targetSnapshotId = snapshotPairs[currentStep.id];
         if (targetSnapshotId && snapshotRef.current?.stepId === targetSnapshotId) {
            const snapshot = snapshotRef.current;
            suppressAutoAdvanceOnceRef.current = true;
            const substanceMatch = model.availableSubstances.find(item => item.id === snapshot.substanceId);
            if (substanceMatch) {
               model.setSelectedSubstance(substanceMatch);
            }
            model.setRows(snapshot.rows);
            model.setSubstanceAddedValue(snapshot.substanceAdded);
            model.setTitrantAddedValue(snapshot.titrantAdded);
            model.setIndicatorAddedValue(snapshot.indicatorAdded);
            model.setIndicatorEmittedValue(snapshot.indicatorEmitted);
            model.setTitrantMolarity(snapshot.titrantMolarity);
            model.setPhase(snapshot.phase);
            model.setWeakTitrantLimit(snapshot.weakTitrantLimit);
            model.setBeakerState(snapshot.beakerState);
            model.setMacroBeakerState(snapshot.macroBeakerState);
            model.setShowIndicatorFill(snapshot.showIndicatorFill);
            model.setShowTitrantFill(snapshot.showTitrantFill);
            model.setShowPhString(snapshot.showPhString);
         }
         setCurrentStepIndex(currentStepIndex - 1);
      }
   }, [currentStepIndex, currentStep.id, model]);

   const canGoNext = useCallback(() => {
      const inputType = currentStep.inputState.type;
      if (inputType === 'addSubstance') {
         return model.hasAddedEnoughSubstance;
      }
      if (inputType === 'addIndicator') {
         return model.indicatorAdded >= model.maxIndicator;
      }
      if (inputType === 'addTitrant') {
         const isWeakAcid = model.substance.type === 'weakAcid';
         const isWeakBase = model.substance.type === 'weakBase';
         const weakEquivalenceTarget = weakEquivalencePH
            ?? (isWeakAcid ? WEAK_ACID_EQUIVALENCE_PH : WEAK_BASE_EQUIVALENCE_PH);
         const isWeakEquivalenceStep = rawStep?.state === 'AddTitrantToWeakSubstancePostMaxBufferCapacity'
            && (isWeakAcid || isWeakBase);
         const reachedWeakEquivalence = isWeakEquivalenceStep
            && (isWeakAcid ? model.currentPH >= weakEquivalenceTarget : model.currentPH <= weakEquivalenceTarget);
         const reachedWeakEnd = rawStep?.state === 'AddTitrantPostEP'
            && (isWeakAcid || isWeakBase)
            && (isWeakAcid ? model.currentPH >= WEAK_ACID_END_PH : model.currentPH <= WEAK_BASE_END_PH);
         if (reachedWeakEquivalence) {
            return true;
         }
         if (reachedWeakEnd) {
            return true;
         }
         if (isWeakEquivalenceStep) {
            return false;
         }
         if (rawStep?.state === 'AddTitrantPostEP' && !model.isStrong && model.phase === 'preEP') {
            return false;
         }
         return model.hasAddedEnoughTitrant;
      }
      return true;
   }, [currentStep.inputState.type, model, rawStep?.state, weakEquivalencePH]);

   useEffect(() => {
      const inputType = currentStep.inputState.type;
      if (inputType !== 'addSubstance' && inputType !== 'addIndicator' && inputType !== 'addTitrant') {
         autoAdvanceRef.current = false;
         return;
      }
      if (!hasInteracted) {
         autoAdvanceRef.current = false;
         return;
      }
      if (suppressAutoAdvanceOnceRef.current) {
         suppressAutoAdvanceOnceRef.current = false;
         return;
      }

      const isWeakAcid = model.substance.type === 'weakAcid';
      const isWeakBase = model.substance.type === 'weakBase';
      const weakEquivalenceTarget = weakEquivalencePH
         ?? (isWeakAcid ? WEAK_ACID_EQUIVALENCE_PH : WEAK_BASE_EQUIVALENCE_PH);
      const isWeakEquivalenceStep = rawStep?.state === 'AddTitrantToWeakSubstancePostMaxBufferCapacity'
         && (isWeakAcid || isWeakBase);
      const reachedWeakEquivalence = isWeakEquivalenceStep
         && (isWeakAcid ? model.currentPH >= weakEquivalenceTarget : model.currentPH <= weakEquivalenceTarget);
      const reachedWeakEnd = rawStep?.state === 'AddTitrantPostEP'
         && (isWeakAcid || isWeakBase)
         && (isWeakAcid ? model.currentPH >= WEAK_ACID_END_PH : model.currentPH <= WEAK_BASE_END_PH);
      const hasAddedSinceStepEntry = model.titrantAdded > stepEntryTitrantRef.current;

      if (reachedWeakEquivalence && hasAddedSinceStepEntry && !autoAdvanceRef.current) {
         autoAdvanceRef.current = true;
         handleNext();
         return;
      }

      if (reachedWeakEnd && hasAddedSinceStepEntry && !autoAdvanceRef.current) {
         autoAdvanceRef.current = true;
         handleNext();
         return;
      }

      if (isWeakEquivalenceStep && !reachedWeakEquivalence) {
         autoAdvanceRef.current = false;
         return;
      }

      if (rawStep?.state === 'AddTitrantPostEP') {
         if (model.isStrong) {
            autoAdvanceRef.current = false;
            return;
         }
         if (model.phase === 'preEP') {
            autoAdvanceRef.current = false;
            return;
         }
      }

      if (inputType === 'addSubstance' && !model.canAddSubstance && !autoAdvanceRef.current) {
         autoAdvanceRef.current = true;
         handleNext();
      }
      if (inputType === 'addIndicator' && model.indicatorAdded >= model.maxIndicator && !autoAdvanceRef.current) {
         autoAdvanceRef.current = true;
         handleNext();
      }
      if (inputType === 'addTitrant' && !model.canAddTitrant && !autoAdvanceRef.current) {
         autoAdvanceRef.current = true;
         handleNext();
      }
   }, [currentStep.inputState.type, hasInteracted, model, handleNext, rawStep?.state]);

   useEffect(() => {
      if (rawStep?.state !== 'AddTitrantPostEP') return;
      if (model.isStrong) return;
      if (model.phase !== 'preEP') return;
      if (model.titrantAdded < model.maxPreEPTitrant) return;
      model.resetTitrantAdded();
      model.setPhase('postEP');
   }, [rawStep?.state, model]);

   const guideOverrides = useMemo(() => ({
      highlights: currentStep.highlights,
      inputState: currentStep.inputState,
      hasInteracted,
      onInteraction: markInteraction
   }), [currentStep, hasInteracted, markInteraction]);

   return {
      currentStep,
      currentStepIndex,
      setCurrentStepIndex,
      guideOverrides,
      statement,
      hasInteracted,
      markInteraction,
      handleNext,
      handleBack,
      canGoNext,
      substanceSelectorOpen,
      setSubstanceSelectorOpen
   };
};
