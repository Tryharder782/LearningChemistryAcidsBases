import { useEffect, useMemo, useRef } from 'react';
import type { GuideStep } from '../../../../components/AcidsBases/guide/types';
import type { AcidOrBase } from '../../../../helper/acidsBases/types';
import type { BottleConfig } from '../../../../components/AcidsBases/interactive/ReagentBottles';
import type { BufferSaltModel } from '../../../../helper/acidsBases/BufferSaltModel';
import type { ReactingBeakerModel } from '../../../../helper/acidsBases/particles/ReactingBeakerModel';
import { ACIDS_BASES_COLORS } from '../../../../theme/acidsBasesColors';

type UseBufferBottlesParams = {
   selectedSubstance: AcidOrBase | null;
   currentStep: GuideStep;
   activeBottleIndex: number | null;
   setActiveBottleIndex: (index: number | null) => void;
   saltModel: BufferSaltModel | null;
   saltParticlesPerShake: number;
   saltShakes: number;
   setSaltShakes: (updater: (prev: number) => number) => void;
   strongSubstanceAdded: number;
   strongMaxSubstance: number;
   setStrongSubstanceAdded: (value: number) => void;
   simulationPhase: 'adding' | 'equilibrium' | 'saltAdded';
   setSimulationPhase: (value: 'adding' | 'equilibrium' | 'saltAdded') => void;
   markInteraction: () => void;
   modelRef: React.RefObject<ReactingBeakerModel>;
   createPour: (substance: AcidOrBase, bottleIndex: 0 | 1 | 2, options?: { speedMultiplier?: number; particleCount?: number }) => void;
   registerBottle: (bottleIndex: 0 | 1 | 2, element: HTMLDivElement | null) => void;
   maxParticles: number;
   minFinalPrimaryIonCount: number;
   hydrogenChloride: AcidOrBase;
   potassiumHydroxide: AcidOrBase;
   setParticleCount: (updater: (prev: number) => number) => void;
   beakerContainerRef?: React.RefObject<HTMLDivElement | null>;
};

type BottleIndex = 0 | 1 | 2;

type BottleFactoryParams = {
   bottleIndex: BottleIndex;
   substance: AcidOrBase;
   state: BottleConfig['state'];
   isActive: boolean;
   onPourComplete: () => void;
};

export const useBufferBottles = ({
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
   maxParticles,
   minFinalPrimaryIonCount,
   hydrogenChloride,
   potassiumHydroxide,
   setParticleCount,
   beakerContainerRef = undefined
}: UseBufferBottlesParams): BottleConfig[] => {
   const saltShakesRef = useRef(saltShakes);
   const strongSubstanceAddedRef = useRef(strongSubstanceAdded);

   const buildBottleConfig = ({
      bottleIndex,
      substance,
      state,
      isActive,
      onPourComplete
   }: BottleFactoryParams): BottleConfig => ({
      substance,
      state,
      forceGreyedOut: state === 'locked' || state === 'unlocked',
      onClick: () => {
         if (!isActive) return;
         setActiveBottleIndex(bottleIndex);
      },
      onRegister: (element: HTMLDivElement | null) => { registerBottle(bottleIndex, element); },
      onPouringStart: () => {
         if (!isActive) return;
         const isMobile = window.innerWidth < 768;
         createPour(substance, bottleIndex, { speedMultiplier: isMobile ? 0.5 : 1.5 });
      },
      onPourComplete: () => {
         if (!isActive) return;
         // Delay to match particle travel time
         const delay = window.innerWidth < 1024 ? 400 : 280;
         setTimeout(() => onPourComplete(), delay);
      }
   });

   useEffect(() => {
      saltShakesRef.current = saltShakes;
   }, [saltShakes]);

   useEffect(() => {
      strongSubstanceAddedRef.current = strongSubstanceAdded;
   }, [strongSubstanceAdded]);

   return useMemo(() => {
      if (!selectedSubstance) return [];

      const bottles: BottleConfig[] = [];
      const s = selectedSubstance;
      const isWeakAcid = s.type === 'weakAcid';

      const needsAction = currentStep.requiresAction;
      const inputType = currentStep.inputState.type;
      const requiredType = inputType === 'addSubstance' ? currentStep.inputState.substanceType : undefined;

      // 1. Weak Substance Bottle
      const isWeakActive = Boolean(needsAction && inputType === 'addSubstance' &&
         ((isWeakAcid && requiredType === 'weakAcid') || (!isWeakAcid && requiredType === 'weakBase')));

      const isOnSaltStep = currentStep.id === 'instructToAddSalt' || currentStep.id === 'instructToAddSaltToBase';
      const weakState = isOnSaltStep ? 'locked' :
         (isWeakActive ? (activeBottleIndex === 0 ? 'ready' : 'active') : 'unlocked');

      const weakBottle = buildBottleConfig({
         bottleIndex: 0,
         substance: s,
         state: weakState,
         isActive: isWeakActive,
         onPourComplete: () => {
            const amount = 5;
            setParticleCount(prev => Math.min(maxParticles, prev + amount));
            markInteraction();
            if (modelRef.current) {
               modelRef.current?.addDirectly('substance', amount, s.color);
            }
         }
      });
      bottles.push(weakBottle);

      // 2. Salt Bottle
      const saltSubstance: AcidOrBase = {
         ...s,
         id: `${s.id}-salt`,
         symbol: s.saltName || 'Salt',
         color: s.secondaryColor,
      };

      const isSaltStep = currentStep.id === 'instructToAddSalt' || currentStep.id === 'instructToAddSaltToBase';
      const saltMaxReachedLogical = !!saltModel && (saltShakes * saltParticlesPerShake) >= saltModel.maxSubstance;
      const canAddSalt = !saltMaxReachedLogical;
      const isSaltActive = Boolean(needsAction && isSaltStep && canAddSalt);
      const saltState = isSaltActive ? (activeBottleIndex === 1 ? 'ready' : 'active') : (isSaltStep && !canAddSalt ? 'locked' : 'unlocked');

      const saltBottle = buildBottleConfig({
         bottleIndex: 1,
         substance: saltSubstance,
         state: saltState,
         isActive: isSaltActive,
         onPourComplete: () => {
            if (!saltModel) return;
            const addedBefore = saltShakesRef.current * saltParticlesPerShake;
            const remaining = saltModel.maxSubstance - addedBefore;
            const amount = Math.max(0, Math.min(saltParticlesPerShake, remaining));
            if (amount <= 0) return;
            setSaltShakes(prev => prev + 1);
            const simColors = {
               reactant: s.secondaryColor,
               reactingWith: s.primaryColor,
               produced: s.color
            };

            if (modelRef.current) {
               modelRef.current?.addWithReaction({
                  reactant: 'secondaryIon',
                  reactingWith: 'primaryIon',
                  producing: 'substance'
               }, amount, simColors);
            }

            if (simulationPhase !== 'saltAdded') setSimulationPhase('saltAdded');
            markInteraction();
         }
      });
      bottles.push(saltBottle);

      // 3. Strong Substance Bottle
      const strongSubstance = isWeakAcid
         ? hydrogenChloride
         : potassiumHydroxide;

      const isStrongStep = inputType === 'addSubstance' && (requiredType === 'strongAcid' || requiredType === 'strongBase');
      const isStrongActive = Boolean(needsAction && isStrongStep && !(strongMaxSubstance > 0 && strongSubstanceAdded >= strongMaxSubstance));
      const strongState = isStrongActive ? (activeBottleIndex === 2 ? 'ready' : 'active') : 'unlocked';

      const strongBottle = buildBottleConfig({
         bottleIndex: 2,
         substance: strongSubstance,
         state: strongState,
         isActive: isStrongActive,
         onPourComplete: () => {
            if (strongMaxSubstance > 0 && strongSubstanceAdded >= strongMaxSubstance) return;
            const addedBefore = strongSubstanceAddedRef.current;
            const maxAllowed = strongMaxSubstance > 0 ? strongMaxSubstance : Number.POSITIVE_INFINITY;
            const remaining = maxAllowed - addedBefore;
            const amount = Math.max(0, Math.min(5, remaining));
            if (amount <= 0) return;
            const nextAdded = addedBefore + amount;

            const frequency = Math.max(1, Math.floor((strongMaxSubstance > 0 ? strongMaxSubstance : nextAdded) / minFinalPrimaryIonCount));
            const currentPrimary = Math.floor(addedBefore / frequency);
            const targetPrimary = Math.floor(nextAdded / frequency);
            const primaryToAdd = Math.max(0, targetPrimary - currentPrimary);
            const moleculesToReact = Math.max(0, amount - primaryToAdd);

            if (primaryToAdd > 0) {
               modelRef.current?.addDirectly(
                  'primaryIon',
                  primaryToAdd,
                  selectedSubstance?.primaryColor || '#ED64A6'
               );
            }

            if (moleculesToReact > 0) {
               modelRef.current?.addWithReaction(
                  {
                     reactant: 'primaryIon',
                     reactingWith: 'secondaryIon',
                     producing: 'substance'
                  },
                  moleculesToReact,
                  {
                     reactant: selectedSubstance?.primaryColor || ACIDS_BASES_COLORS.ions.hydrogen,
                     reactingWith: selectedSubstance?.secondaryColor || ACIDS_BASES_COLORS.ui.primary, // Red/Pink fallback
                     produced: selectedSubstance?.color || ACIDS_BASES_COLORS.substances.beakerLiquid // Blue/Liquid fallback
                  }
               );
            }

            setStrongSubstanceAdded(nextAdded);
            markInteraction();
         }
      });
      bottles.push(strongBottle);

      return bottles;
   }, [
      selectedSubstance,
      currentStep,
      activeBottleIndex,
      saltModel,
      saltParticlesPerShake,
      saltShakes,
      strongSubstanceAdded,
      strongMaxSubstance,
      simulationPhase,
      markInteraction,
      modelRef,
      createPour,
      registerBottle,
      maxParticles,
      minFinalPrimaryIonCount,
      hydrogenChloride,
      potassiumHydroxide,
      setActiveBottleIndex,
      setSaltShakes,
      setStrongSubstanceAdded,
      setSimulationPhase,
      setParticleCount
   ]);
};
