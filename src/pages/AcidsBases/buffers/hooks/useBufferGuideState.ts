import { useCallback, useEffect, useMemo, useRef, useState, type Dispatch, type RefObject, type SetStateAction } from 'react';
import type { ReactingBeakerModel } from '../../../../helper/acidsBases/particles/ReactingBeakerModel';
import { bufferGuideSteps } from '../../../../components/AcidsBases/guide/bufferGuideSteps';
import type { GuideStep } from '../../../../components/AcidsBases/guide/types';
import { useGuideSnapshots, type SimulationPhase } from './useGuideSnapshots';

type UseBufferGuideStateParams = {
   snapshotStepIds: readonly string[];
   particleCount: number;
   saltShakes: number;
   displayedSaltShakes: number;
   simulationPhase: SimulationPhase;
   modelRef: RefObject<ReactingBeakerModel>;
   setParticleCount: Dispatch<SetStateAction<number>>;
   setSaltShakes: Dispatch<SetStateAction<number>>;
   setDisplayedSaltShakes: Dispatch<SetStateAction<number>>;
   setSimulationPhase: Dispatch<SetStateAction<SimulationPhase>>;
   resetKey?: unknown;
};

type GuideHighlights = NonNullable<GuideStep['highlights']>;

type UseBufferGuideStateResult = {
   currentStep: GuideStep;
   currentStepIndex: number;
   setCurrentStepIndex: Dispatch<SetStateAction<number>>;
   guideOverrides: {
      highlights: GuideStep['highlights'];
      inputState: GuideStep['inputState'];
      hasInteracted: boolean;
      onInteraction: () => void;
   };
   highlights: GuideHighlights;
   hasInteracted: boolean;
   selectorOpen: boolean;
   setSelectorOpen: Dispatch<SetStateAction<boolean>>;
   activeBottleIndex: number | null;
   setActiveBottleIndex: Dispatch<SetStateAction<number | null>>;
   markInteraction: () => void;
   restoreSnapshotForStep: (stepId: string) => void;
};

export const useBufferGuideState = ({
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
   resetKey
}: UseBufferGuideStateParams): UseBufferGuideStateResult => {
   const [currentStepIndex, setCurrentStepIndex] = useState(0);
   const [selectorOpen, setSelectorOpen] = useState(false);
   const [activeBottleIndex, setActiveBottleIndex] = useState<number | null>(null);
   const [hasInteracted, setHasInteracted] = useState(false);
   const prevStepIdRef = useRef<string>('');

   const currentStep = bufferGuideSteps[currentStepIndex];
   const highlights = useMemo<GuideHighlights>(() => currentStep.highlights ?? [], [currentStep.highlights]);

   useEffect(() => {
      const prevStepId = prevStepIdRef.current;
      const nextStepId = currentStep.id;
      prevStepIdRef.current = nextStepId;

      setHasInteracted(false);

      const shouldKeepBottleActive =
         prevStepId === 'instructToAddStrongBase' && nextStepId === 'midAddingStrongBase';

      if (!shouldKeepBottleActive) {
         setActiveBottleIndex(null);
      }
   }, [currentStep.id, setActiveBottleIndex]);

   const markInteraction = useCallback(() => setHasInteracted(true), []);

   const { restoreSnapshotForStep } = useGuideSnapshots({
      snapshotStepIds,
      currentStepId: currentStep.id,
      particleCount,
      saltShakes,
      displayedSaltShakes,
      simulationPhase,
      modelRef,
      setParticleCount,
      setSaltShakes,
      setDisplayedSaltShakes,
      setSimulationPhase,
      setActiveBottleIndex,
      resetKey
   });

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
      highlights,
      hasInteracted,
      selectorOpen,
      setSelectorOpen,
      activeBottleIndex,
      setActiveBottleIndex,
      markInteraction,
      restoreSnapshotForStep
   };
};
