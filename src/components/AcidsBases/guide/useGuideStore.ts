/**
 * Zustand store for the guided tutorial system.
 * Manages step navigation, input states, and highlighted elements.
 */

import { create } from 'zustand';
import type { GuideStep, InputState, IntroScreenElement, SubstanceType } from './types';
import {
   introGuideSteps,
   getSetWaterLevelStatement,
   getAddSubstanceStatement,
   getShowPhVsMolesGraph,
   getExplainWeakAcid,
   getExplainDoubleArrow,
   getSetWeakBaseWaterLevel,
   getEndStatement,
   TOTAL_INTRO_STEPS,
} from './introGuideSteps';
import { getSubstancesByType } from '../../../helper/acidsBases/substances';
import type { AcidOrBase } from '../../../helper/acidsBases/types';
import { getChargedIonSymbol } from '../../../helper/acidsBases/ionSymbols';

// ============================================
// STORE STATE
// ============================================

interface GuideStore {
   // Navigation state
   currentStep: number;
   totalSteps: number;

   // Current step data (computed)
   currentStepData: GuideStep | null;
   statement: string[];
   inputState: InputState;
   highlights: IntroScreenElement[];

   // User selections
   selectedSubstances: Record<SubstanceType, AcidOrBase | null>;

   // Interaction tracking
   waterLevelSet: boolean;
   substanceAddedFraction: number;
   hasInteracted: boolean;  // True after user interacts with highlighted element
   waterLevel: number;      // Current water level (0-1)
   substanceSelectorOpen: boolean; // Is the substance selector dropdown open

   // Actions
   next: () => void;
   back: () => void;
   goToStep: (step: number) => void;

   // Substance selection
   selectSubstance: (type: SubstanceType, substance: AcidOrBase) => void;

   // Interaction handlers
   setWaterLevelDone: () => void;
   setWaterLevel: (level: number) => void;  // Update water level
   addSubstance: (fraction: number) => void;
   resetInteractionState: () => void;
   markInteraction: () => void;  // Mark that user has interacted
   setSubstanceSelectorOpen: (isOpen: boolean) => void;

   // Computed
   canGoNext: () => boolean;
   canGoBack: () => boolean;
   isElementHighlighted: (element: IntroScreenElement) => boolean;
   isInputAllowed: (inputType: InputState['type']) => boolean;
}

// ============================================
// HELPER: Get dynamic statement text
// ============================================

function getDynamicStatement(
   step: GuideStep,
   selectedSubstances: Record<SubstanceType, AcidOrBase | null>
): string[] {
   const substance = step.substanceType
      ? selectedSubstances[step.substanceType]
      : null;

   if (!step.dynamicTextId) {
      return step.statement;
   }

   switch (step.dynamicTextId) {
      case 'setWaterLevel':
         if (substance) {
            const primary = substance.primaryIon === 'hydrogen' ? 'H⁺' : 'OH⁻';
            const secondary = getChargedIonSymbol(substance.secondaryIon);
            return getSetWaterLevelStatement(substance.symbol, primary, secondary);
         }
         break;

      case 'addSubstance':
         if (step.substanceType) {
            const isAcid = step.substanceType === 'strongAcid' || step.substanceType === 'weakAcid';
            return getAddSubstanceStatement(isAcid);
         }
         break;

      case 'showPhVsMolesGraph':
         return getShowPhVsMolesGraph();

      case 'explainWeakAcid':
         if (substance) {
            return getExplainWeakAcid(substance.symbol, 'H', getChargedIonSymbol(substance.secondaryIon));
         }
         break;

      case 'explainDoubleArrow':
         if (substance) {
            return getExplainDoubleArrow(substance.symbol, 'H', getChargedIonSymbol(substance.secondaryIon));
         }
         break;

      case 'setWeakBaseWaterLevel':
         if (substance) {
            return getSetWeakBaseWaterLevel(substance.symbol, getChargedIonSymbol(substance.secondaryIon));
         }
         break;

      case 'end':
         return getEndStatement();
   }

   return step.statement;
}

// ============================================
// STORE IMPLEMENTATION
// ============================================

export const useGuideStore = create<GuideStore>((set, get) => {
   // Get initial step
   const initialStep = introGuideSteps[0];

   return {
      // Initial state
      currentStep: 0,
      totalSteps: TOTAL_INTRO_STEPS,

      currentStepData: initialStep,
      statement: initialStep.statement,
      inputState: initialStep.inputState,
      highlights: initialStep.highlights,

      selectedSubstances: {
         strongAcid: null,
         strongBase: null,
         weakAcid: null,
         weakBase: null,
      },

      waterLevelSet: false,
      substanceAddedFraction: 0,
      hasInteracted: false,
      waterLevel: 0.5,
      substanceSelectorOpen: false,

      // Navigation
      next: () => {
         const { currentStep, totalSteps, inputState, selectedSubstances, selectSubstance } = get();

         // Auto-select fallback for Step 7 (HCl) if nothing selected
         if (inputState.type === 'chooseSubstance') {
            const currentSelected = selectedSubstances[inputState.substanceType];
            if (!currentSelected) {
               const available = getSubstancesByType(inputState.substanceType);
               if (available.length > 0) {
                  selectSubstance(inputState.substanceType, available[0]);
               }
            }
         }

         if (currentStep >= totalSteps - 1) return;

         const nextStepIndex = currentStep + 1;
         const nextStep = introGuideSteps[nextStepIndex];

         // Need to get state AGAIN to ensure statement uses the newly selected substance
         const updatedState = get();

         // If we are moving to a NEW substance choice step, reset everything
         const isNewSubstanceSection = nextStep.inputState.type === 'chooseSubstance';

         set({
            currentStep: nextStepIndex,
            currentStepData: nextStep,
            statement: getDynamicStatement(nextStep, updatedState.selectedSubstances),
            inputState: nextStep.inputState,
            highlights: nextStep.highlights,
            waterLevelSet: false,
            hasInteracted: false,
            substanceSelectorOpen: nextStep.highlights.includes('reactionSelection'),
            ...(isNewSubstanceSection ? { waterLevel: 0.5, substanceAddedFraction: 0 } : {}),
         });
      },

      back: () => {
         const { currentStep, selectedSubstances } = get();
         if (currentStep <= 0) return;

         const prevStepIndex = currentStep - 1;
         const prevStep = introGuideSteps[prevStepIndex];

         // When going back, if the step is a setup step (water or substance choice),
         // we reset the beaker state to be "untouched and empty" as requested.
         const isSetupStep = prevStep.inputState.type === 'setWaterLevel' || prevStep.inputState.type === 'chooseSubstance' || prevStep.inputState.type === 'none';

         set({
            currentStep: prevStepIndex,
            currentStepData: prevStep,
            statement: getDynamicStatement(prevStep, selectedSubstances),
            inputState: prevStep.inputState,
            highlights: prevStep.highlights,
            waterLevelSet: false,
            hasInteracted: false,
            substanceSelectorOpen: prevStep.highlights.includes('reactionSelection'),
            ...(isSetupStep ? { waterLevel: 0.5, substanceAddedFraction: 0 } : {}),
         });
      },

      goToStep: (step: number) => {
         const { totalSteps, selectedSubstances, currentStep } = get();
         if (step < 0 || step >= totalSteps) return;

         const targetStep = introGuideSteps[step];

         // If jumping backwards to a setup step, or if jumping to a different substance section
         const isBackward = step < currentStep;
         const isSetupStep = targetStep.inputState.type === 'setWaterLevel' || targetStep.inputState.type === 'chooseSubstance';

         set({
            currentStep: step,
            currentStepData: targetStep,
            statement: getDynamicStatement(targetStep, selectedSubstances),
            inputState: targetStep.inputState,
            highlights: targetStep.highlights,
            waterLevelSet: false,
            substanceSelectorOpen: targetStep.highlights.includes('reactionSelection'),
            ...(isBackward && isSetupStep ? { waterLevel: 0.5, substanceAddedFraction: 0 } : {}),
         });
      },

      // Substance selection
      selectSubstance: (type, substance) => {
         const { selectedSubstances, currentStepData } = get();
         const newSelected = { ...selectedSubstances, [type]: substance };

         set({
            selectedSubstances: newSelected,
            // When a new substance is selected, we reset the beaker to be empty 
            // of the previous one (0 fraction) and default water level.
            substanceAddedFraction: 0,
            waterLevel: 0.5,
            statement: currentStepData
               ? getDynamicStatement(currentStepData, newSelected)
               : [],
         });
      },

      // Interaction handlers
      setWaterLevelDone: () => {
         set({ waterLevelSet: true, hasInteracted: true });
      },

      setWaterLevel: (level: number) => {
         set({ waterLevel: level, waterLevelSet: true, hasInteracted: true });
      },

      addSubstance: (fraction) => {
         const { substanceAddedFraction } = get();
         // Use the provided fraction or fall back to 1/14 (standard click)
         const increment = fraction || (1 / 14);
         set({ substanceAddedFraction: Math.min(1, substanceAddedFraction + increment), hasInteracted: true });
      },

      resetInteractionState: () => {
         set({
            waterLevelSet: false,
            substanceAddedFraction: 0,
            hasInteracted: false,
         });
      },

      markInteraction: () => {
         set({ hasInteracted: true });
      },

      setSubstanceSelectorOpen: (isOpen) => {
         set({ substanceSelectorOpen: isOpen });
      },

      // Computed values
      canGoNext: () => {
         const { inputState, substanceAddedFraction, currentStepData } = get();

         // If step requires action, check if it's done
         if (currentStepData?.requiresAction) {
            if (inputState.type === 'addSubstance') {
               return substanceAddedFraction >= 0.5; // Require 7 clicks (7/14 = 0.5)
            }
         }

         // For water level, check if adjusted
         if (inputState.type === 'setWaterLevel') {
            // Allow next after any water level change
            return true;
         }

         // For choose substance, check if selected
         if (inputState.type === 'chooseSubstance') {
            // Allow next always to support auto-select on "Next" click
            return true;
         }

         return true;
      },

      canGoBack: () => {
         return get().currentStep > 0;
      },

      isElementHighlighted: (element) => {
         return get().highlights.includes(element);
      },

      isInputAllowed: (inputType) => {
         const { inputState, substanceAddedFraction } = get();
         if (inputType === 'addSubstance' && substanceAddedFraction >= 1.0) {
            return false; // Disable bottle after 14 clicks (1.0 fraction)
         }
         return inputState.type === inputType;
      },
   };
});
