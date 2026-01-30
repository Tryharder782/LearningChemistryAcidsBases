import { useEffect, useRef } from 'react';
import type { ReactingBeakerModel } from '../../../../helper/acidsBases/particles/ReactingBeakerModel';

type UseBufferAutoAdvanceParams = {
   currentStepId: string;
   saltEquilibriumReached: boolean;
   saltAutoAdvanced: boolean;
   setSaltAutoAdvanced: (value: boolean) => void;
   strongMidAutoAdvanced: boolean;
   setStrongMidAutoAdvanced: (value: boolean) => void;
   strongAutoAdvanced: boolean;
   setStrongAutoAdvanced: (value: boolean) => void;
   strongMaxSubstance: number;
   setStrongMaxSubstance: (value: number) => void;
   strongSubstanceAdded: number;
   setStrongSubstanceAdded: (value: number) => void;
   setActiveBottleIndex: (value: number | null) => void;
   handleNext: () => void;
   modelRef: React.RefObject<ReactingBeakerModel>;
   finalSecondaryIonCount: number;
   minFinalPrimaryIonCount: number;
};

export const useBufferAutoAdvance = ({
   currentStepId,
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
   finalSecondaryIonCount,
   minFinalPrimaryIonCount
}: UseBufferAutoAdvanceParams) => {
   const strongBaseEntryAddedRef = useRef(0);
   useEffect(() => {
      if (currentStepId === 'instructToAddSalt' && saltEquilibriumReached && !saltAutoAdvanced) {
         setActiveBottleIndex(null);
         setSaltAutoAdvanced(true);
         handleNext();
      }
      if (currentStepId !== 'instructToAddSalt' && saltAutoAdvanced) {
         setSaltAutoAdvanced(false);
      }
   }, [currentStepId, saltEquilibriumReached, saltAutoAdvanced, setActiveBottleIndex, setSaltAutoAdvanced, handleNext]);

   useEffect(() => {
      const isStrongInitStep = currentStepId === 'instructToAddStrongAcid' || currentStepId === 'instructToAddStrongBase';
      if (!isStrongInitStep) return;

      const secondaryCount = modelRef.current?.getParticles().filter(p => p.type === 'secondaryIon').length ?? 0;
      const computedMax = Math.max(0, secondaryCount - finalSecondaryIonCount + minFinalPrimaryIonCount);
      setStrongMaxSubstance(computedMax);
      setStrongSubstanceAdded(0);
      setStrongAutoAdvanced(false);
   }, [currentStepId, modelRef, finalSecondaryIonCount, minFinalPrimaryIonCount, setStrongMaxSubstance, setStrongSubstanceAdded, setStrongAutoAdvanced]);

   useEffect(() => {
      const isStrongBaseFlow =
         currentStepId === 'instructToAddStrongBase' ||
         currentStepId === 'midAddingStrongBase' ||
         currentStepId === 'baseBufferLimitReached';

      if (!isStrongBaseFlow) {
         if (strongMidAutoAdvanced) {
            setStrongMidAutoAdvanced(false);
         }
         return;
      }

      if (currentStepId !== 'instructToAddStrongBase') {
         return;
      }
      if (strongMaxSubstance <= 0) return;

      const threshold = strongMaxSubstance * 0.2;
      const hasAddedSinceEntry = strongSubstanceAdded > strongBaseEntryAddedRef.current;
      if (hasAddedSinceEntry && strongSubstanceAdded >= threshold && !strongMidAutoAdvanced) {
         setStrongMidAutoAdvanced(true);
         handleNext();
      }
   }, [
      currentStepId,
      strongSubstanceAdded,
      strongMaxSubstance,
      strongMidAutoAdvanced,
      setStrongMidAutoAdvanced,
      handleNext
   ]);

   useEffect(() => {
      if (currentStepId === 'instructToAddStrongBase') {
         strongBaseEntryAddedRef.current = strongSubstanceAdded;
      }
   }, [currentStepId, strongSubstanceAdded]);

   useEffect(() => {
      const isStrongAutoStep =
         currentStepId === 'instructToAddStrongAcid' ||
         currentStepId === 'instructToAddStrongBase' ||
         currentStepId === 'midAddingStrongBase';
      if (isStrongAutoStep && strongMaxSubstance > 0 && strongSubstanceAdded >= strongMaxSubstance && !strongAutoAdvanced) {
         setActiveBottleIndex(null);
         setStrongAutoAdvanced(true);
         handleNext();
      }
      if (!isStrongAutoStep && strongAutoAdvanced) {
         setStrongAutoAdvanced(false);
      }
   }, [currentStepId, strongSubstanceAdded, strongMaxSubstance, strongAutoAdvanced, setActiveBottleIndex, setStrongAutoAdvanced, handleNext]);
};
