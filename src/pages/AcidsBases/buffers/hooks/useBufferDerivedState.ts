import { useCallback, useMemo } from 'react';
import type { GuideStep } from '../../../../components/AcidsBases/guide/types';
import type { AcidOrBase } from '../../../../helper/acidsBases/types';
import { calculatePH } from '../../../../helper/acidsBases/simulationEngine';
import { GRID_COLS } from '../../../../helper/acidsBases/particles/types';
import { getGridRowsForWaterLevel, getModelLevelForWaterLevel } from '../../../../helper/acidsBases/beakerMath';
import { BufferSaltModel } from '../../../../helper/acidsBases/BufferSaltModel';

type SimulationPhase = 'adding' | 'equilibrium' | 'saltAdded';

type Concentrations = {
   substance: number;
   primary: number;
   secondary: number;
};

type UseBufferDerivedStateParams = {
   waterLevel: number;
   particleCount: number;
   selectedSubstance: AcidOrBase | null;
   displayedSaltShakes: number;
   simulationPhase: SimulationPhase;
   strongMaxSubstance: number;
   strongSubstanceAdded: number;
   currentStep: GuideStep;
   waterLevelMin: number;
   waterLevelMax: number;
};

type UseBufferDerivedStateResult = {
   currentRows: number; // Integer for grid
   rowsVisible: number; // Float for model
   totalSlots: number;
   modelLevel: number;
   currentMolarity: number;
   saltModel: BufferSaltModel | null;
   saltParticlesPerShake: number;
   displayedSaltSubstanceAdded: number;
   saltEquilibriumReached: boolean;
   strongConcentrations: Concentrations | null;
   pH: number;
   isStrongPhaseStep: boolean;
   saltPhasePhAt: (amount: number) => number;
};

export const useBufferDerivedState = ({
   waterLevel,
   particleCount,
   selectedSubstance,
   displayedSaltShakes,
   simulationPhase,
   strongMaxSubstance,
   strongSubstanceAdded,
   currentStep,
   waterLevelMin,
   waterLevelMax
}: UseBufferDerivedStateParams): UseBufferDerivedStateResult => {
   const modelLevel = getModelLevelForWaterLevel(waterLevel, waterLevelMin, waterLevelMax);
   const rowsVisible = modelLevel * 22; // GRID_ROWS_TOTAL
   const currentRows = Math.ceil(rowsVisible);

   const totalSlots = GRID_COLS * rowsVisible;
   const currentMolarity = Math.max(1e-10, particleCount / totalSlots);

   const isStrongPhaseStep =
      currentStep.id === 'instructToAddStrongAcid' ||
      currentStep.id === 'instructToAddStrongBase' ||
      currentStep.id === 'midAddingStrongBase' ||
      currentStep.id === 'acidBufferLimitReached' ||
      currentStep.id === 'baseBufferLimitReached';

   const saltModel = useMemo(() => {
      if (!selectedSubstance || particleCount === 0) return null;

      const initialSubstanceConc = particleCount / totalSlots;
      const Ka = Math.pow(10, -selectedSubstance.pKA);
      const discriminant = Ka * Ka + 4 * Ka * initialSubstanceConc;
      const deltaConc = (-Ka + Math.sqrt(discriminant)) / 2;

      const finalSubstanceConc = initialSubstanceConc - deltaConc;
      const finalIonConc = deltaConc;

      const INITIAL_ION_FRACTION = 0.1;
      const finalIonCoordCount = Math.floor(INITIAL_ION_FRACTION * particleCount);

      const equilibriumCounts = {
         substance: Math.max(0, particleCount - finalIonCoordCount * 2),
         primary: finalIonCoordCount,
         secondary: finalIonCoordCount
      };

      const equilibriumConcentrations = {
         equilibriumSubstance: finalSubstanceConc,
         initialSubstance: initialSubstanceConc,
         ionConcentration: finalIonConc
      };

      return new BufferSaltModel(
         equilibriumCounts,
         equilibriumConcentrations,
         selectedSubstance.pKA
      );
   }, [selectedSubstance, particleCount, totalSlots]);

   const saltParticlesPerShake = 5;
   const displayedSaltSubstanceAdded = displayedSaltShakes * saltParticlesPerShake;
   const saltEquilibriumReached = !!saltModel && displayedSaltSubstanceAdded >= saltModel.maxSubstance;

   const saltPhasePhAt = useCallback((amount: number) => {
      if (!selectedSubstance || !saltModel) return 7;
      const concs = saltModel.getConcentrations(amount);
      const ratio = concs.secondary / concs.substance;
      if (ratio <= 0 || concs.substance <= 1e-10 || concs.secondary <= 1e-10) {
         return 7;
      }
      if (selectedSubstance.type === 'weakBase') {
         const pOH = selectedSubstance.pKB + Math.log10(ratio);
         return 14 - pOH;
      }
      return selectedSubstance.pKA + Math.log10(ratio);
   }, [selectedSubstance, saltModel]);

   const strongConcentrations = useMemo<Concentrations | null>(() => {
      if (!selectedSubstance || !saltModel || strongMaxSubstance <= 0) return null;

      const baseConcs = saltModel.getConcentrations(saltModel.maxSubstance);
      const basePh = saltPhasePhAt(saltModel.maxSubstance);

      const isAcid = selectedSubstance.type === 'weakAcid';
      const pK = isAcid ? selectedSubstance.pKA : selectedSubstance.pKB;
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
      const finalPrimary = finalSecondary === 0 ? 0 : (selectedSubstance.kA * finalSubstance) / finalSecondary;
      const primary = finalPrimary * t;

      return { substance, primary, secondary };
   }, [selectedSubstance, saltModel, strongMaxSubstance, strongSubstanceAdded]);

   const pH = useMemo(() => {
      if (!selectedSubstance || particleCount === 0) return 7;

      if (isStrongPhaseStep && strongConcentrations) {
         const ratio = strongConcentrations.secondary / strongConcentrations.substance;
         if (ratio <= 0 || strongConcentrations.substance <= 1e-10 || strongConcentrations.secondary <= 1e-10) {
            return 7;
         }
         if (selectedSubstance.type === 'weakAcid') {
            return selectedSubstance.pKA + Math.log10(ratio);
         }
         const pOH = selectedSubstance.pKB + Math.log10(ratio);
         return 14 - pOH;
      }

      if (simulationPhase !== 'saltAdded') {
         return calculatePH(selectedSubstance, currentMolarity);
      }

      if (!saltModel) return 7;
      return saltPhasePhAt(displayedSaltSubstanceAdded);
   }, [
      selectedSubstance,
      particleCount,
      simulationPhase,
      currentMolarity,
      saltModel,
      displayedSaltSubstanceAdded,
      isStrongPhaseStep,
      strongConcentrations
   ]);

   return {
      currentRows, // Integer for grid
      rowsVisible,  // Float for model
      totalSlots,
      modelLevel,
      currentMolarity,
      saltModel,
      saltParticlesPerShake,
      displayedSaltSubstanceAdded,
      saltEquilibriumReached,
      strongConcentrations,
      pH,
      isStrongPhaseStep,
      saltPhasePhAt
   };
};
