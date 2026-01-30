import { useEffect } from 'react';
import type { AcidOrBase } from '../../../../helper/acidsBases/types';
import type { ReactingBeakerModel } from '../../../../helper/acidsBases/particles/ReactingBeakerModel';
import { getSpeciesCounts } from '../../../../helper/acidsBases/simulationEngine';

type SimulationPhase = 'adding' | 'equilibrium' | 'saltAdded';

type UseBufferParticlesSyncParams = {
   modelRef: React.RefObject<ReactingBeakerModel>;
   modelLevel: number;
   selectedSubstance: AcidOrBase | null;
   simulationPhase: SimulationPhase;
   particleCount: number;
   saltShakes: number;
   currentMolarity: number;
};

export const useBufferParticlesSync = ({
   modelRef,
   modelLevel,
   selectedSubstance,
   simulationPhase,
   particleCount,
   saltShakes,
   currentMolarity
}: UseBufferParticlesSyncParams) => {
   useEffect(() => {
      modelRef.current?.setWaterLevel(modelLevel);
   }, [modelLevel, modelRef]);

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

      if (simulationPhase === 'adding') {
         modelRef.current?.updateParticles({ substance: particleCount, primary: 0, secondary: 0 }, colors);
      } else if (simulationPhase === 'equilibrium' && saltShakes === 0) {
         const counts = getSpeciesCounts(selectedSubstance, currentMolarity, particleCount);
         modelRef.current?.updateParticles(counts, colors);
      }
   }, [
      modelRef,
      selectedSubstance,
      simulationPhase,
      particleCount,
      saltShakes,
      currentMolarity
   ]);
};
