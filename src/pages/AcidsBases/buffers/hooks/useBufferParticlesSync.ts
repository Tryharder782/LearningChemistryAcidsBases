import { useEffect } from 'react';
import type { AcidOrBase } from '../../../../helper/acidsBases/types';
import type { ReactingBeakerModel } from '../../../../helper/acidsBases/particles/ReactingBeakerModel';
import { getSpeciesCounts } from '../../../../helper/acidsBases/simulationEngine';

type SimulationPhase = 'adding' | 'equilibrium' | 'saltAdded';

type UseBufferParticlesSyncParams = {
   modelRef: React.RefObject<ReactingBeakerModel>;
   rowsVisible: number;
   selectedSubstance: AcidOrBase | null;
   simulationPhase: SimulationPhase;
   particleCount: number;
   saltShakes: number;
   currentMolarity: number;
   saltModel?: any; // BufferSaltModel | null
   displayedSaltSubstanceAdded?: number;
};

export const useBufferParticlesSync = ({
   modelRef,
   rowsVisible,
   selectedSubstance,
   simulationPhase,
   particleCount,
   saltShakes,
   currentMolarity,
   saltModel,
   displayedSaltSubstanceAdded = 0
}: UseBufferParticlesSyncParams) => {
   useEffect(() => {
      modelRef.current?.setWaterLevel(rowsVisible);
   }, [rowsVisible, modelRef]);

   useEffect(() => {
      if (!selectedSubstance) {
         modelRef.current?.initialize(
            { substance: 0, primary: 0, secondary: 0 },
            { substance: '', primaryIon: '', secondaryIon: '' }
         );
         return;
      }

      const colors = {
         substance: selectedSubstance.color,
         primaryIon: selectedSubstance.primaryColor,
         secondaryIon: selectedSubstance.secondaryColor
      };

      // In iOS, salt and strong-substance phases mutate the beaker through explicit
      // reaction actions per shake. Keep those coordinates untouched here.
      if (simulationPhase === 'saltAdded') {
         return;
      }

      if (simulationPhase === 'adding') {
         modelRef.current?.updateParticles({ substance: particleCount, primary: 0, secondary: 0 }, colors);
         return;
      }

      if (simulationPhase === 'equilibrium' && saltShakes === 0) {
         // Initial weak-equilibrium display:
         // ions are carved out from weak-substance coordinates.
         const ionFraction = 0.1;
         const minIons = 2;
         const ions = Math.max(minIons, Math.floor(particleCount * ionFraction));
         modelRef.current?.updateParticles(
            {
               substance: Math.max(0, particleCount - ions * 2),
               primary: ions,
               secondary: ions
            },
            colors
         );
         return;
      }

      if (simulationPhase === 'equilibrium') {
         if (saltModel) {
            const concs = saltModel.getConcentrations(displayedSaltSubstanceAdded);
            const totalParticles = particleCount + displayedSaltSubstanceAdded;
            const sum = concs.substance + concs.primary + concs.secondary;
            const scale = sum > 0 ? totalParticles / sum : 0;

            const pCount = Math.floor(concs.primary * scale);
            const sCount = Math.floor(concs.secondary * scale);
            modelRef.current?.updateParticles(
               {
                  substance: Math.max(0, totalParticles - pCount - sCount),
                  primary: pCount,
                  secondary: sCount
               },
               colors
            );
            return;
         }

         const counts = getSpeciesCounts(selectedSubstance, currentMolarity, particleCount);
         modelRef.current?.updateParticles(counts, colors);
      }
   }, [
      modelRef,
      selectedSubstance,
      simulationPhase,
      particleCount,
      saltShakes,
      currentMolarity,
      saltModel,
      displayedSaltSubstanceAdded
   ]);
};
