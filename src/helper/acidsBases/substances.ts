/**
 * All substances from the AcidsBases iOS app.
 * Ported from AcidOrBase.swift
 */

import type { AcidOrBase, SubstanceType, SecondaryIon } from './types';
import { ION_COLORS } from '../../theme/acidsBasesColors';
export { ION_COLORS };

export const WATER_DISSOCIATION_CONSTANT = 1e-14;

// Helper to convert K to pK
const toPK = (k: number): number => (k === 0 ? 0 : -Math.log10(k));

// ION COLORS are now imported from src/theme/acidsBasesColors.ts

// ============================================
// SUBSTANCE FACTORY FUNCTIONS
// ============================================

function createStrongAcid(
   id: string,
   symbol: string,
   secondaryIon: SecondaryIon,
   color: string,
   secondaryColor: string,
   saltName: string
): AcidOrBase {
   return {
      id,
      type: 'strongAcid',
      symbol,
      substanceAddedPerIon: 0,
      kA: 0,
      kB: 0,
      pKA: 0,
      pKB: 0,
      color,
      primaryColor: ION_COLORS.hydrogen,
      secondaryColor,
      concentrationAtMaxSubstance: 0.1,
      primaryIon: 'hydrogen',
      secondaryIon,
      saltName,
   };
}

function createStrongBase(
   id: string,
   symbol: string,
   secondaryIon: SecondaryIon,
   color: string,
   secondaryColor: string,
   saltName: string
): AcidOrBase {
   return {
      id,
      type: 'strongBase',
      symbol,
      substanceAddedPerIon: 0,
      kA: 0,
      kB: 0,
      pKA: 0,
      pKB: 0,
      color,
      primaryColor: ION_COLORS.hydroxide,
      secondaryColor,
      concentrationAtMaxSubstance: 0.1,
      primaryIon: 'hydroxide',
      secondaryIon,
      saltName,
   };
}

function createWeakAcid(
   id: string,
   symbol: string,
   secondaryIon: SecondaryIon,
   substanceAddedPerIon: number,
   color: string,
   secondaryColor: string,
   kA: number,
   saltName: string
): AcidOrBase {
   const kB = WATER_DISSOCIATION_CONSTANT / kA;
   return {
      id,
      type: 'weakAcid',
      symbol,
      substanceAddedPerIon,
      kA,
      kB,
      pKA: toPK(kA),
      pKB: toPK(kB),
      color,
      primaryColor: ION_COLORS.hydrogen,
      secondaryColor,
      concentrationAtMaxSubstance: 0.1 / substanceAddedPerIon,
      primaryIon: 'hydrogen',
      secondaryIon,
      saltName,
   };
}

function createWeakBase(
   id: string,
   symbol: string,
   secondaryIon: SecondaryIon,
   substanceAddedPerIon: number,
   color: string,
   secondaryColor: string,
   kB: number,
   saltName: string
): AcidOrBase {
   const kA = WATER_DISSOCIATION_CONSTANT / kB;
   return {
      id,
      type: 'weakBase',
      symbol,
      substanceAddedPerIon,
      kA,
      kB,
      pKA: toPK(kA),
      pKB: toPK(kB),
      color,
      primaryColor: ION_COLORS.hydroxide,
      secondaryColor,
      concentrationAtMaxSubstance: 0.1 / substanceAddedPerIon,
      primaryIon: 'hydroxide',
      secondaryIon,
      saltName,
   };
}

// ============================================
// ALL SUBSTANCES
// ============================================

// --- Strong Acids ---
export const hydrogenChloride = createStrongAcid(
   'HCl', 'HCl', 'Cl',
   ION_COLORS.hydrogenChloride, ION_COLORS.chlorine,
   'NaCl'
);

export const hydrogenIodide = createStrongAcid(
   'HI', 'HI', 'I',
   ION_COLORS.hydrogenIodide, ION_COLORS.iodine,
   'NaI'
);

export const hydrogenBromide = createStrongAcid(
   'HBr', 'HBr', 'Br',
   ION_COLORS.hydrogenBromide, ION_COLORS.bromine,
   'NaBr'
);

// --- Strong Bases ---
export const potassiumHydroxide = createStrongBase(
   'KOH', 'KOH', 'K',
   ION_COLORS.potassiumHydroxide, ION_COLORS.potassium,
   'KCl' // Irrelevant for strong bases usually
);

export const lithiumHydroxide = createStrongBase(
   'LiOH', 'LiOH', 'Li',
   ION_COLORS.lithiumHydroxide, ION_COLORS.lithium,
   'LiCl'
);

export const sodiumHydroxide = createStrongBase(
   'NaOH', 'NaOH', 'Na',
   ION_COLORS.sodiumHydroxide, ION_COLORS.sodium,
   'NaCl'
);

// --- Weak Acids ---
export const weakAcidHA = createWeakAcid(
   'HA', 'HA', 'A', 2,
   ION_COLORS.weakAcidHA, ION_COLORS.ionA,
   7.24e-5, // Ka
   'MA'
);

export const weakAcidHF = createWeakAcid(
   'HF', 'HF', 'F', 3,
   ION_COLORS.weakAcidHF, ION_COLORS.fluorine,
   4.5e-4, // Ka for HF
   'MF'
);

export const hydrogenCyanide = createWeakAcid(
   'HCN', 'HCN', 'CN', 4,
   ION_COLORS.hydrogenCyanide, ION_COLORS.cyanide,
   9e-5, // Ka for HCN - note: should be ~6.2e-10, using app value
   'MCN'
);

// --- Weak Bases ---
export const weakBaseB = createWeakBase(
   'B', 'B⁻', 'HB', 3,
   ION_COLORS.weakBaseB, ION_COLORS.ionB,
   4e-5, // Kb
   'HBX'
);

export const weakBaseF = createWeakBase(
   'F', 'F⁻', 'F', 4,
   ION_COLORS.weakBaseF, ION_COLORS.fluorine,
   1.3e-5, // Kb for F- (conjugate of HF)
   'HFCl'
);

export const weakBaseHS = createWeakBase(
   'HS', 'HS⁻', 'HS', 2,
   ION_COLORS.weakBaseHS, ION_COLORS.ionHS,
   1e-3, // Kb for HS-
   'H2SCl' // Same assumption
);

// ============================================
// GROUPED ACCESS
// ============================================

export const STRONG_ACIDS: AcidOrBase[] = [
   hydrogenChloride,
   hydrogenIodide,
   hydrogenBromide,
];

export const STRONG_BASES: AcidOrBase[] = [
   potassiumHydroxide,
   lithiumHydroxide,
   sodiumHydroxide,
];

export const WEAK_ACIDS: AcidOrBase[] = [
   weakAcidHA,
   weakAcidHF,
   hydrogenCyanide,
];

export const WEAK_BASES: AcidOrBase[] = [
   weakBaseB,
   weakBaseF,
   weakBaseHS,
];

export const ALL_SUBSTANCES: AcidOrBase[] = [
   ...STRONG_ACIDS,
   ...STRONG_BASES,
   ...WEAK_ACIDS,
   ...WEAK_BASES,
];

export function getSubstancesByType(type: SubstanceType): AcidOrBase[] {
   switch (type) {
      case 'strongAcid': return STRONG_ACIDS;
      case 'strongBase': return STRONG_BASES;
      case 'weakAcid': return WEAK_ACIDS;
      case 'weakBase': return WEAK_BASES;
   }
}

export function getSubstanceById(id: string): AcidOrBase | undefined {
   return ALL_SUBSTANCES.find(s => s.id === id);
}

// ============================================
// TITRANT DEFINITIONS
// ============================================

export interface Titrant {
   id: string;
   name: string;
   symbol: string;
   isAcid: boolean;
   color: string;
}

export const TITRANTS: Record<string, Titrant> = {
   potassiumHydroxide: {
      id: 'KOH',
      name: 'Potassium Hydroxide',
      symbol: 'KOH',
      isAcid: false,
      color: ION_COLORS.potassiumHydroxide,
   },
   hydrogenChloride: {
      id: 'HCl',
      name: 'Hydrogen Chloride',
      symbol: 'HCl',
      isAcid: true,
      color: ION_COLORS.hydrogenChloride,
   },
};

export function getTitrantForSubstance(substance: AcidOrBase): Titrant {
   // Acids are titrated with a strong base (KOH)
   // Bases are titrated with a strong acid (HCl)
   if (substance.type === 'strongAcid' || substance.type === 'weakAcid') {
      return TITRANTS.potassiumHydroxide;
   }
   return TITRANTS.hydrogenChloride;
}

// ============================================
// VISUAL HELPERS
// ============================================

/**
 * Helper to get color based on pH value.
 * Returns a color from red (acidic) to purple (basic).
 */
export function getPHColor(pH: number): string {
   if (pH < 2) return '#FF3B30';
   if (pH < 4) return '#FF9500';
   if (pH < 6) return '#FFCC00';
   if (pH < 8) return '#34C759';
   if (pH < 10) return '#007AFF';
   return '#AF52DE';
}
