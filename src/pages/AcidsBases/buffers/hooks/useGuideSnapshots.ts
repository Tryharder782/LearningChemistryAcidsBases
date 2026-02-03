import { useEffect, useRef } from 'react';
import type { Particle } from '../../../../helper/acidsBases/particles/types';
import type { ReactingBeakerModel } from '../../../../helper/acidsBases/particles/ReactingBeakerModel';

export type SimulationPhase = 'adding' | 'equilibrium' | 'saltAdded';

type BeakerSnapshot = {
   particleCount: number;
   saltShakes: number;
   displayedSaltShakes: number;
   simulationPhase: SimulationPhase;
   particles: Particle[];
};

type UseGuideSnapshotsParams = {
   snapshotStepIds: readonly string[];
   currentStepId: string;
   particleCount: number;
   saltShakes: number;
   displayedSaltShakes: number;
   simulationPhase: SimulationPhase;
   modelRef: React.RefObject<ReactingBeakerModel>;
   setParticleCount: (value: number) => void;
   setSaltShakes: (value: number) => void;
   setDisplayedSaltShakes: (value: number) => void;
   setSimulationPhase: (value: SimulationPhase) => void;
   setActiveBottleIndex: (value: number | null) => void;
   resetKey: unknown;
};

type UseGuideSnapshotsResult = {
   saveSnapshotForStep: (stepId: string) => void;
   restoreSnapshotForStep: (stepId: string) => void;
};

export const useGuideSnapshots = ({
   snapshotStepIds,
   currentStepId,
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
}: UseGuideSnapshotsParams): UseGuideSnapshotsResult => {
   const stepSnapshotsRef = useRef<Record<string, BeakerSnapshot>>({});

   const saveSnapshotForStep = (stepId: string) => {
      // Allow overwriting to ensure we capture the most recent state (e.g. after adding particles)
      stepSnapshotsRef.current[stepId] = {
         particleCount,
         saltShakes,
         displayedSaltShakes,
         simulationPhase,
         particles: modelRef.current?.getParticles() || [],
      };
   };

   const restoreSnapshotForStep = (stepId: string) => {
      const snapshot = stepSnapshotsRef.current[stepId];
      if (!snapshot) return;
      setParticleCount(snapshot.particleCount);
      setSaltShakes(snapshot.saltShakes);
      setDisplayedSaltShakes(snapshot.displayedSaltShakes);
      setSimulationPhase(snapshot.simulationPhase);
      setActiveBottleIndex(null);
      modelRef.current?.setParticles(snapshot.particles);
   };

   useEffect(() => {
      stepSnapshotsRef.current = {};
   }, [resetKey]);

   return {
      saveSnapshotForStep,
      restoreSnapshotForStep
   };
};
