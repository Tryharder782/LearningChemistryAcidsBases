import { useMemo } from 'react';
import type { GuideStep } from '../../../../components/AcidsBases/guide/types';
import type { AcidOrBase } from '../../../../helper/acidsBases/types';
import type { BufferSaltModel } from '../../../../helper/acidsBases/BufferSaltModel';
import { complementConcentration } from '../../../../helper/acidsBases/simulationEngine';

type Concentrations = {
   substance: number;
   primary: number;
   secondary: number;
};

type UseScientificConcentrationsParams = {
   pH: number;
   particleCount: number;
   totalSlots: number;
   isStrongPhaseStep: boolean;
   strongConcentrations: Concentrations | null;
   simulationPhase: 'adding' | 'equilibrium' | 'saltAdded';
   saltModel: BufferSaltModel | null;
   displayedSaltSubstanceAdded: number;
   currentStep: GuideStep;
   selectedSubstance: AcidOrBase | null;
};

export const useScientificConcentrations = ({
   pH,
   particleCount,
   totalSlots,
   isStrongPhaseStep,
   strongConcentrations,
   simulationPhase,
   saltModel,
   displayedSaltSubstanceAdded,
   currentStep,
   selectedSubstance
}: UseScientificConcentrationsParams) => {
   return useMemo<Concentrations>(() => {
      const hConcentration = Math.pow(10, -pH);
      const isBase = selectedSubstance?.type === 'weakBase' || selectedSubstance?.type === 'strongBase';
      const primaryConcentration = isBase ? complementConcentration(hConcentration) : hConcentration;

      if (isStrongPhaseStep && strongConcentrations) {
         return {
            substance: strongConcentrations.substance,
            primary: strongConcentrations.primary,
            secondary: strongConcentrations.secondary
         };
      }

      if (simulationPhase === 'saltAdded' && saltModel) {
         const concs = saltModel.getConcentrations(displayedSaltSubstanceAdded);
         return {
            substance: concs.substance,
            primary: concs.primary,
            secondary: concs.secondary
         };
      }

      const totalMolarity = particleCount / totalSlots;
      const aConcentration = primaryConcentration;

      const isEquilibrium = currentStep.equationState === 'acidFilled' ||
         currentStep.equationState === 'acidSummary' ||
         currentStep.equationState === 'baseFilled' ||
         currentStep.equationState === 'baseSummary';

      const haConcentration = isEquilibrium
         ? Math.max(0, totalMolarity - primaryConcentration)
         : totalMolarity;

      return {
         substance: haConcentration,
         primary: primaryConcentration,
         secondary: aConcentration
      };
   }, [
      pH,
      particleCount,
      totalSlots,
      isStrongPhaseStep,
      strongConcentrations,
      simulationPhase,
      saltModel,
      displayedSaltSubstanceAdded,
      currentStep.equationState,
      selectedSubstance?.type
   ]);
};
