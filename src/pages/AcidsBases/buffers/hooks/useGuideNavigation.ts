import { useNavigate } from 'react-router-dom';
import type { GuideStep } from '../../../../components/AcidsBases/guide/types';
import type { AcidOrBase } from '../../../../helper/acidsBases/types';

type SimulationPhase = 'adding' | 'equilibrium' | 'saltAdded';

type UseGuideNavigationParams = {
   currentStep: GuideStep;
   currentStepIndex: number;
   totalSteps: number;
   steps: GuideStep[];
   snapshotStepIds: readonly string[];
   restoreSnapshotForStep: (stepId: string) => void;
   availableSubstances: AcidOrBase[];
   selectedSubstance: AcidOrBase | null;
   setSelectedSubstance: (substance: AcidOrBase) => void;
   setParticleCount: (value: number) => void;
   setWaterLevel: (value: number) => void;
   setSimulationPhase: (value: SimulationPhase) => void;
   setCurrentStepIndex: (value: number) => void;
   saltEquilibriumReached: boolean;
   strongMaxSubstance: number;
   strongSubstanceAdded: number;
   particleCount: number;
   onBackToStrongBase?: () => void;
};

type UseGuideNavigationResult = {
   handleNext: () => void;
   handleBack: () => void;
   canGoNext: () => boolean;
};

export const useGuideNavigation = ({
   currentStep,
   currentStepIndex,
   totalSteps,
   steps,
   snapshotStepIds,
   restoreSnapshotForStep,
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
   onBackToStrongBase
}: UseGuideNavigationParams): UseGuideNavigationResult => {
   const navigate = useNavigate();
   const handleNext = () => {
      if (currentStep.inputState.type === 'chooseSubstance' && !selectedSubstance) {
         if (availableSubstances.length > 0) {
            setSelectedSubstance(availableSubstances[0]);
            setParticleCount(0);
            setWaterLevel(0.5);
         }
      }

      if (currentStepIndex >= totalSteps - 1) {
         navigate('/acids/buffers/quiz');
         return;
      }

      if (currentStepIndex < totalSteps - 1) {
         const nextIndex = currentStepIndex + 1;
         const nextStep = steps[nextIndex];

         setCurrentStepIndex(nextIndex);

         if (
            nextStep.dynamicTextId === 'runningWeakAcidReaction' ||
            nextStep.dynamicTextId === 'runningWeakBaseReaction' ||
            nextStep.dynamicTextId === 'weakAcidEquilibriumReached' ||
            nextStep.dynamicTextId === 'reachedBaseEquilibrium'
         ) {
            setSimulationPhase('equilibrium');
         }

         if (nextStep.inputState.type === 'chooseSubstance') {
            setParticleCount(0);
            setSimulationPhase('adding');
            setWaterLevel(0.5);
         }
      }
   };

   const handleBack = () => {
      if (currentStep.id === 'baseBufferLimitReached') {
         const targetIndex = steps.findIndex(step => step.id === 'instructToAddStrongBase');
         if (targetIndex >= 0) {
            setCurrentStepIndex(targetIndex);
            restoreSnapshotForStep('instructToAddStrongBase');
            onBackToStrongBase?.();
            return;
         }
      }
      if (currentStepIndex > 0) {
         const prevIndex = currentStepIndex - 1;
         const prevStep = steps[prevIndex];
         setCurrentStepIndex(prevIndex);

         if (snapshotStepIds.includes(prevStep.id)) {
            restoreSnapshotForStep(prevStep.id);
         }

         const isSetup = prevStep.inputState.type === 'chooseSubstance' || prevStep.inputState.type === 'setWaterLevel';
         if (isSetup) {
            setParticleCount(0);
            setSimulationPhase('adding');
            setWaterLevel(0.5);
         }
      }
   };

   const canGoNext = () => {
      if (currentStep.requiresAction) {
         if (currentStep.inputState.type === 'addSubstance') {
            if (currentStep.id === 'instructToAddSalt' || currentStep.id === 'instructToAddSaltToBase') {
               return saltEquilibriumReached;
            }
            if (
               currentStep.id === 'instructToAddStrongAcid' ||
               currentStep.id === 'instructToAddStrongBase' ||
               currentStep.id === 'midAddingStrongBase'
            ) {
               return strongMaxSubstance > 0 && strongSubstanceAdded >= strongMaxSubstance;
            }
            return particleCount >= 20;
         }
      }
      return true;
   };

   return { handleNext, handleBack, canGoNext };
};
