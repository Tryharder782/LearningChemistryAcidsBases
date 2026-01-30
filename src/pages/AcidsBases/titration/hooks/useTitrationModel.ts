import { useCallback, useMemo, useState } from 'react';
import type { AcidOrBase, ReactionPhase, SubstanceType, TitrationPoint } from '../../../../helper/acidsBases/types';
import { GRID_COLS, GRID_ROWS_DEFAULT, GRID_ROWS_MAX, GRID_ROWS_MIN } from '../../../../helper/acidsBases/particles/types';
import { LinearEquation } from '../../../../helper/acidsBases/equations';
import { calculatePH, calculateTitrationPH, generateTitrationCurve, calculateEquivalenceVolume } from '../../../../helper/acidsBases/simulationEngine';
import { getSubstancesByType, hydrogenChloride, potassiumHydroxide } from '../../../../helper/acidsBases/substances';

export type MacroBeakerState = 'indicator' | 'strongTitrant' | 'weakTitrant';
export type BeakerViewState = 'microscopic' | 'macroscopic';
export type WeakTitrantLimit = 'maxBufferCapacity' | 'equivalencePoint';

const MIN_TITRANT_MOLARITY = 0.2;
const MAX_TITRANT_MOLARITY = 0.5;
const INITIAL_TITRANT_MOLARITY = (MIN_TITRANT_MOLARITY + MAX_TITRANT_MOLARITY) / 2;
const MAX_INDICATOR = 25;
const SUBSTANCE_PARTICLES_PER_SHAKE = 5;
const MIN_SUBSTANCE_SHAKES = 6;
const MAX_SUBSTANCE_SHAKES = 21;

const beakerVolumeFromRows = new LinearEquation(
   GRID_ROWS_MIN,
   0.1,
   GRID_ROWS_MAX,
   0.6
);

const getDefaultSubstance = (type: SubstanceType): AcidOrBase => {
   const list = getSubstancesByType(type);
   return list[0] ?? hydrogenChloride;
};

export type TitrationModel = ReturnType<typeof useTitrationModel>;

export const useTitrationModel = () => {
   const [rows, setRows] = useState(GRID_ROWS_DEFAULT);
   const [substanceType, setSubstanceType] = useState<SubstanceType>('strongAcid');
   const [availableSubstances, setAvailableSubstances] = useState<AcidOrBase[]>(() => getSubstancesByType('strongAcid'));
   const [substance, setSubstance] = useState<AcidOrBase>(() => getDefaultSubstance('strongAcid'));

   const [phase, setPhase] = useState<ReactionPhase>('preparation');
   const [substanceAdded, setSubstanceAdded] = useState(0);
   const [titrantAdded, setTitrantAdded] = useState(0);
   const [indicatorAdded, setIndicatorAdded] = useState(0);
   const [indicatorEmitted, setIndicatorEmitted] = useState(0);
   const [titrantMolarity, setTitrantMolarityState] = useState(INITIAL_TITRANT_MOLARITY);

   const [showIndicatorFill, setShowIndicatorFill] = useState(false);
   const [showTitrantFill, setShowTitrantFill] = useState(false);
   const [showPhString, setShowPhString] = useState(true);
   const [beakerState, setBeakerState] = useState<BeakerViewState>('microscopic');
   const [macroBeakerState, setMacroBeakerState] = useState<MacroBeakerState>('indicator');
   const [weakTitrantLimit, setWeakTitrantLimit] = useState<WeakTitrantLimit>('maxBufferCapacity');

   const gridSize = useMemo(() => GRID_COLS * rows, [rows]);
   const isStrong = substance.type === 'strongAcid' || substance.type === 'strongBase';
   const isAcid = substance.type === 'strongAcid' || substance.type === 'weakAcid';

   const maxSubstance = useMemo(() => MAX_SUBSTANCE_SHAKES * SUBSTANCE_PARTICLES_PER_SHAKE, []);

   const minSubstance = useMemo(() => MIN_SUBSTANCE_SHAKES * SUBSTANCE_PARTICLES_PER_SHAKE, []);

   const maxPreEPTitrant = Math.max(0, substanceAdded);
   const maxPostEPTitrant = isStrong ? maxPreEPTitrant : maxPreEPTitrant * 2;
   const titrantAtMaxBufferCapacity = Math.max(0, Math.round(maxPreEPTitrant * 0.5));

   const maxTitrantForPhase = useMemo(() => {
      if (phase === 'postEP') return maxPostEPTitrant;
      if (!isStrong && weakTitrantLimit === 'maxBufferCapacity') {
         return titrantAtMaxBufferCapacity;
      }
      return maxPreEPTitrant;
   }, [phase, maxPostEPTitrant, isStrong, weakTitrantLimit, titrantAtMaxBufferCapacity, maxPreEPTitrant]);

   const canAddSubstance = substanceAdded < maxSubstance;
   const hasAddedEnoughSubstance = substanceAdded >= minSubstance;
   const canAddTitrant = titrantAdded < maxTitrantForPhase;
   const hasAddedEnoughTitrant = !canAddTitrant;

   const beakerVolume = useMemo(() => beakerVolumeFromRows.getValue(rows), [rows]);
   const substanceMolarity = useMemo(() => {
      if (gridSize <= 0) return 0;
      return substanceAdded / gridSize;
   }, [gridSize, substanceAdded]);

   const equivalenceVolume = useMemo(() => {
      if (substanceMolarity <= 0) return 0;
      return calculateEquivalenceVolume(substanceMolarity, beakerVolume, titrantMolarity);
   }, [substanceMolarity, beakerVolume, titrantMolarity]);

   const titrantVolume = useMemo(() => {
      if (phase === 'preparation' || maxPreEPTitrant <= 0) return 0;
      if (phase === 'preEP') {
         return equivalenceVolume * (titrantAdded / maxPreEPTitrant);
      }
      if (maxPostEPTitrant <= 0) return equivalenceVolume;
      return equivalenceVolume + equivalenceVolume * (titrantAdded / maxPostEPTitrant);
   }, [phase, titrantAdded, equivalenceVolume, maxPreEPTitrant, maxPostEPTitrant]);

   const currentPH = useMemo(() => {
      if (phase === 'preparation') {
         return calculatePH(substance, Math.max(1e-7, substanceMolarity));
      }
      return calculateTitrationPH(
         substance,
         Math.max(1e-7, substanceMolarity),
         beakerVolume,
         titrantMolarity,
         titrantVolume
      );
   }, [phase, substance, substanceMolarity, beakerVolume, titrantMolarity, titrantVolume]);

   const titrationCurve = useMemo<TitrationPoint[]>(() => {
      if (substanceMolarity <= 0) return [];
      const maxVolume = Math.max(equivalenceVolume * 2, beakerVolume + equivalenceVolume * 2);
      return generateTitrationCurve(substance, substanceMolarity, beakerVolume, titrantMolarity, maxVolume);
   }, [substance, substanceMolarity, beakerVolume, titrantMolarity, equivalenceVolume]);

   const addedFraction = useMemo(() => {
      if (phase === 'preparation') {
         return maxSubstance > 0 ? substanceAdded / maxSubstance : 0;
      }
      return maxTitrantForPhase > 0 ? titrantAdded / maxTitrantForPhase : 0;
   }, [phase, substanceAdded, maxSubstance, titrantAdded, maxTitrantForPhase]);

   const waterLevel = useMemo(() => {
      const range = GRID_ROWS_MAX - GRID_ROWS_MIN;
      if (range <= 0) return 0.5;
      return Math.min(1, Math.max(0, (rows - GRID_ROWS_MIN) / range));
   }, [rows]);

   const resetForNewSubstance = useCallback((type: SubstanceType) => {
      const list = getSubstancesByType(type);
      setSubstanceType(type);
      setAvailableSubstances(list);
      setSubstance(list[0] ?? getDefaultSubstance(type));
      setSubstanceAdded(0);
      setTitrantAdded(0);
      setIndicatorAdded(0);
      setIndicatorEmitted(0);
      setPhase('preparation');
      setWeakTitrantLimit('maxBufferCapacity');
      setShowIndicatorFill(false);
      setShowTitrantFill(false);
      setShowPhString(true);
      setBeakerState('microscopic');
      setMacroBeakerState('indicator');
   }, []);

   const incrementSubstance = useCallback((count: number) => {
      setSubstanceAdded(prev => Math.min(maxSubstance, prev + count));
   }, [maxSubstance]);

   const incrementIndicator = useCallback((count: number) => {
      setIndicatorEmitted(prev => Math.min(MAX_INDICATOR, prev + count));
      setIndicatorAdded(prev => Math.min(MAX_INDICATOR, prev + count));
   }, []);

   const incrementTitrant = useCallback((count: number) => {
      setTitrantAdded(prev => Math.min(maxTitrantForPhase, prev + count));
   }, [maxTitrantForPhase]);

   const resetTitrantAdded = useCallback(() => {
      setTitrantAdded(0);
   }, []);

   const resetIndicatorAdded = useCallback(() => {
      setIndicatorAdded(0);
      setIndicatorEmitted(0);
   }, []);

   const setTitrantMolarity = useCallback((value: number) => {
      const clamped = Math.min(MAX_TITRANT_MOLARITY, Math.max(MIN_TITRANT_MOLARITY, value));
      setTitrantMolarityState(clamped);
   }, []);

   const setWaterLevel = useCallback((level: number) => {
      const clamped = Math.min(1, Math.max(0, level));
      const computedRows = GRID_ROWS_MIN + (GRID_ROWS_MAX - GRID_ROWS_MIN) * clamped;
      setRows(Math.min(GRID_ROWS_MAX, Math.max(GRID_ROWS_MIN, computedRows)));
   }, []);

   const setSelectedSubstance = useCallback((next: AcidOrBase) => {
      setSubstance(next);
   }, []);

   const setSubstanceAddedValue = useCallback((value: number) => {
      const clamped = Math.min(maxSubstance, Math.max(0, Math.round(value)));
      setSubstanceAdded(clamped);
   }, [maxSubstance]);

   const setTitrantAddedValue = useCallback((value: number) => {
      const clamped = Math.min(maxTitrantForPhase, Math.max(0, Math.round(value)));
      setTitrantAdded(clamped);
   }, [maxTitrantForPhase]);

   const setIndicatorAddedValue = useCallback((value: number) => {
      const clamped = Math.min(MAX_INDICATOR, Math.max(0, Math.round(value)));
      setIndicatorAdded(clamped);
   }, []);

   const setIndicatorEmittedValue = useCallback((value: number) => {
      const clamped = Math.min(MAX_INDICATOR, Math.max(0, Math.round(value)));
      setIndicatorEmitted(clamped);
   }, []);

   const titrantLabel = useMemo(() => (isAcid ? potassiumHydroxide.symbol : hydrogenChloride.symbol), [isAcid]);

   return {
      rows,
      waterLevel,
      setRows,
      setWaterLevel,
      substanceType,
      availableSubstances,
      substance,
      setSelectedSubstance,
      resetForNewSubstance,
      phase,
      setPhase,
      substanceAdded,
      titrantAdded,
      indicatorAdded,
      indicatorEmitted,
      maxIndicator: MAX_INDICATOR,
      minSubstanceShakes: MIN_SUBSTANCE_SHAKES,
      maxSubstanceShakes: MAX_SUBSTANCE_SHAKES,
      substanceParticlesPerShake: SUBSTANCE_PARTICLES_PER_SHAKE,
      substanceShakes: Math.floor(substanceAdded / SUBSTANCE_PARTICLES_PER_SHAKE),
      maxSubstance,
      maxPreEPTitrant,
      maxPostEPTitrant,
      maxTitrantForPhase,
      titrantAtMaxBufferCapacity,
      weakTitrantLimit,
      setWeakTitrantLimit,
      canAddSubstance,
      hasAddedEnoughSubstance,
      canAddTitrant,
      hasAddedEnoughTitrant,
      titrantMolarity,
      setTitrantMolarity,
      showIndicatorFill,
      setShowIndicatorFill,
      showTitrantFill,
      setShowTitrantFill,
      showPhString,
      setShowPhString,
      beakerState,
      setBeakerState,
      macroBeakerState,
      setMacroBeakerState,
      incrementSubstance,
      incrementIndicator,
      incrementTitrant,
      resetTitrantAdded,
      resetIndicatorAdded,
      setSubstanceAddedValue,
      setTitrantAddedValue,
      setIndicatorAddedValue,
      setIndicatorEmittedValue,
      beakerVolume,
      substanceMolarity,
      equivalenceVolume,
      titrantVolume,
      currentPH,
      addedFraction,
      titrationCurve,
      titrantLabel,
      isStrong,
      isAcid,
   };
};
