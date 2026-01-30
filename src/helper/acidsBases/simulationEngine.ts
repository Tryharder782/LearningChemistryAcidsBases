/**
 * Core simulation engine for pH calculations.
 * Ported from iOS AcidConcentration.swift and related files.
 */

import type { AcidOrBase, SpeciesCounts, TitrationPoint } from './types';
import { WATER_DISSOCIATION_CONSTANT } from './substances';

// ============================================
// pH CALCULATIONS
// ============================================

/**
 * Calculates pH for a given substance at a specific molarity.
 */
export function calculatePH(substance: AcidOrBase, molarity: number): number {
   if (molarity <= 0) return 7;

   switch (substance.type) {
      case 'strongAcid':
         // Strong acid: [H+] = molarity, pH = -log[H+]
         return Math.max(0, -Math.log10(molarity));

      case 'strongBase':
         // Strong base: [OH-] = molarity, pOH = -log[OH-], pH = 14 - pOH
         return Math.min(14, 14 + Math.log10(molarity));

      case 'weakAcid':
         return calculateWeakAcidPH(substance.kA, molarity);

      case 'weakBase':
         return calculateWeakBasePH(substance.kB, molarity);

      default:
         return 7;
   }
}

/**
 * Solves the quadratic for weak acid dissociation:
 * HA + H2O ⇌ H3O+ + A-
 * Ka = [H3O+][A-] / [HA] = x² / (M - x)
 * 
 * Quadratic: x² + Ka·x - Ka·M = 0
 * Solution: x = (-Ka + √(Ka² + 4·Ka·M)) / 2
 */
function calculateWeakAcidPH(kA: number, molarity: number): number {
   if (kA <= 0) return 7;

   const discriminant = kA * kA + 4 * kA * molarity;
   const x = (-kA + Math.sqrt(discriminant)) / 2;

   return Math.max(0, -Math.log10(x));
}

/**
 * Solves for weak base:
 * B + H2O ⇌ BH+ + OH-
 * Kb = [OH-][BH+] / [B] = x² / (M - x)
 */
function calculateWeakBasePH(kB: number, molarity: number): number {
   if (kB <= 0) return 7;

   const discriminant = kB * kB + 4 * kB * molarity;
   const x = (-kB + Math.sqrt(discriminant)) / 2;
   const pOH = -Math.log10(x);

   return Math.min(14, 14 - pOH);
}

// ============================================
// CONCENTRATION CALCULATIONS
// ============================================

/**
 * Calculates the concentration of H+ from pH.
 */
export function concentrationFromPH(pH: number): number {
   return Math.pow(10, -pH);
}

/**
 * Calculates complement concentration (e.g., OH- from H+).
 * Uses the relation: pH + pOH = 14
 */
export function complementConcentration(primaryConcentration: number): number {
   const pPrimary = -Math.log10(primaryConcentration);
   const pComplement = 14 - pPrimary;
   return Math.pow(10, -pComplement);
}

// ============================================
// SPECIES DISTRIBUTION
// ============================================

/**
 * Calculates how many molecules/ions of each type to display in the beaker.
 * Returns counts suitable for particle visualization.
 */
export function getSpeciesCounts(
   substance: AcidOrBase,
   molarity: number,
   maxParticles: number = 50
): SpeciesCounts {
   if (molarity <= 0) {
      return { substance: 0, primary: 0, secondary: 0 };
   }

   // Scale factor to convert concentration to particle count
   const scaleFactor = maxParticles / substance.concentrationAtMaxSubstance;
   const totalParticles = Math.min(maxParticles, Math.round(molarity * scaleFactor));

   // iOS logic from BufferWeakSubstanceComponents.swift:
   // finalIonCoordCount = Int(0.1 * substanceCoords.count)
   // minimumInitialIonCount = 2
   const INITIAL_ION_FRACTION = 0.1; // iOS: settings.initialIonMoleculeFraction
   const MIN_ION_COUNT = 2; // iOS: settings.minimumInitialIonCount

   const ionCount = Math.max(MIN_ION_COUNT, Math.floor(INITIAL_ION_FRACTION * totalParticles));

   const primaryCount = ionCount;
   const secondaryCount = ionCount;
   // For weak acid (HA <-> H+ + A-):
   // Total particles = [HA] + [A-] (conservation of A)
   // So substance (HA) = Total - A- (secondaryCount)
   const substanceCount = Math.max(0, totalParticles - secondaryCount);

   return {
      substance: substanceCount,
      primary: primaryCount,
      secondary: secondaryCount,
   };
}

/**
 * Calculates the fraction of each species for a weak acid/base.
 * Used for species distribution charts.
 */
export function getSpeciesFractions(substance: AcidOrBase, molarity: number): {
   neutral: number;
   ionized: number;
} {
   if (molarity <= 0) {
      return { neutral: 1, ionized: 0 };
   }

   // Strong substances are fully ionized
   if (substance.type === 'strongAcid' || substance.type === 'strongBase') {
      return { neutral: 0, ionized: 1 };
   }

   // Weak Acid
   if (substance.type === 'weakAcid') {
      const pH = calculatePH(substance, molarity);
      const h3o = concentrationFromPH(pH);
      // Alpha = [H+] / C
      const ionizationFraction = Math.min(1, h3o / molarity);
      return {
         neutral: 1 - ionizationFraction,
         ionized: ionizationFraction,
      };
   }

   // Weak Base
   // B + H2O <-> BH+ + OH-
   // Alpha = [OH-] / C
   const pH = calculatePH(substance, molarity);
   const pOH = 14 - pH;
   const oh = Math.pow(10, -pOH);
   const ionizationFraction = Math.min(1, oh / molarity);

   return {
      neutral: 1 - ionizationFraction,
      ionized: ionizationFraction,
   };
}

// ============================================
// TITRATION CALCULATIONS
// ============================================

/**
 * Calculates the equivalence point volume for a titration.
 * At equivalence point: moles of acid = moles of base
 * n1 = n2  →  M1·V1 = M2·V2  →  V2 = M1·V1 / M2
 */
export function calculateEquivalenceVolume(
   substanceMolarity: number,
   substanceVolume: number,
   titrantMolarity: number
): number {
   if (titrantMolarity <= 0) return 0;
   return (substanceMolarity * substanceVolume) / titrantMolarity;
}

/**
 * Calculates pH during a titration at a given titrant volume.
 */
export function calculateTitrationPH(
   substance: AcidOrBase,
   substanceMolarity: number,
   substanceVolume: number,
   titrantMolarity: number,
   titrantVolume: number
): number {
   // Total volume
   const totalVolume = substanceVolume + titrantVolume;
   if (totalVolume <= 0) return 7;

   // Moles
   const substanceMoles = substanceMolarity * substanceVolume;
   const titrantMoles = titrantMolarity * titrantVolume;

   // Equivalence point check
   const equivalenceVolume = calculateEquivalenceVolume(
      substanceMolarity, substanceVolume, titrantMolarity
   );

   const isAcid = substance.type === 'strongAcid' || substance.type === 'weakAcid';
   const isStrong = substance.type === 'strongAcid' || substance.type === 'strongBase';

   const excessMoles = substanceMoles - titrantMoles;
   const excessConcentration = excessMoles / totalVolume;
   const EPS_MOLES = 1e-9;
   const EPS_CONC = 1e-7;

   // Before equivalence point
   if (titrantVolume < equivalenceVolume) {

      if (isStrong) {
         if (Math.abs(excessMoles) <= EPS_MOLES || Math.abs(excessConcentration) <= EPS_CONC) {
            return 7;
         }
         // Strong acid/base: pH from excess concentration
         if (isAcid) {
            return -Math.log10(Math.max(EPS_CONC, excessConcentration));
         } else {
            return 14 + Math.log10(Math.max(EPS_CONC, excessConcentration));
         }
      } else {
         // Weak acid/base: use Henderson-Hasselbalch
         const saltMoles = titrantMoles;
         const saltConcentration = saltMoles / totalVolume;

         if (isAcid) {
            // pH = pKa + log([A-]/[HA])
            if (excessConcentration > 0 && saltConcentration > 0) {
               return substance.pKA + Math.log10(saltConcentration / excessConcentration);
            }
            return calculateWeakAcidPH(substance.kA, excessConcentration);
         } else {
            // pOH = pKb + log([BH+]/[B])
            if (excessConcentration > 0 && saltConcentration > 0) {
               const pOH = substance.pKB + Math.log10(saltConcentration / excessConcentration);
               return 14 - pOH;
            }
            return calculateWeakBasePH(substance.kB, excessConcentration);
         }
      }
   }

   // At equivalence point
   if (Math.abs(titrantVolume - equivalenceVolume) < 0.001) {
      if (isStrong) {
         return 7; // Strong acid + strong base = neutral
      }
      // Weak: pH depends on salt hydrolysis
      const saltConcentration = substanceMoles / totalVolume;
      if (isAcid) {
         // Salt of weak acid hydrolyzes, slightly basic
         const kB = WATER_DISSOCIATION_CONSTANT / substance.kA;
         return calculateWeakBasePH(kB, saltConcentration);
      } else {
         // Salt of weak base hydrolyzes, slightly acidic
         const kA = WATER_DISSOCIATION_CONSTANT / substance.kB;
         return calculateWeakAcidPH(kA, saltConcentration);
      }
   }

   // After equivalence point
   const excessTitrantMoles = titrantMoles - substanceMoles;
   const excessTitrantConcentration = excessTitrantMoles / totalVolume;

   if (Math.abs(excessTitrantMoles) <= EPS_MOLES || Math.abs(excessTitrantConcentration) <= EPS_CONC) {
      return 7;
   }

   if (isAcid) {
      // Excess base (OH-)
      return 14 + Math.log10(Math.max(EPS_CONC, excessTitrantConcentration));
   } else {
      // Excess acid (H+)
      return -Math.log10(Math.max(EPS_CONC, excessTitrantConcentration));
   }
}

/**
 * Generates a complete titration curve as an array of points.
 */
export function generateTitrationCurve(
   substance: AcidOrBase,
   substanceMolarity: number,
   substanceVolume: number,
   titrantMolarity: number,
   maxTitrantVolume: number,
   numPoints: number = 100
): TitrationPoint[] {
   const points: TitrationPoint[] = [];

   for (let i = 0; i <= numPoints; i++) {
      const volume = (i / numPoints) * maxTitrantVolume;
      const pH = calculateTitrationPH(
         substance,
         substanceMolarity,
         substanceVolume,
         titrantMolarity,
         volume
      );
      points.push({ volume, pH: Math.max(0, Math.min(14, pH)) });
   }

   return points;
}

// ============================================
// BUFFER CALCULATIONS
// ============================================

/**
 * Calculates pH of a buffer solution using Henderson-Hasselbalch.
 * Buffer = weak acid + its conjugate base (or vice versa)
 */
export function calculateBufferPH(
   substance: AcidOrBase,
   acidConcentration: number,
   baseConcentration: number
): number {
   if (acidConcentration <= 0 || baseConcentration <= 0) {
      return 7;
   }

   const isAcid = substance.type === 'weakAcid';

   if (isAcid) {
      // pH = pKa + log([A-]/[HA])
      return substance.pKA + Math.log10(baseConcentration / acidConcentration);
   } else {
      // pOH = pKb + log([BH+]/[B])
      const pOH = substance.pKB + Math.log10(acidConcentration / baseConcentration);
      return 14 - pOH;
   }
}

/**
 * Calculates buffer capacity - how much acid/base can be added before pH changes significantly.
 */
export function calculateBufferCapacity(
   totalConcentration: number,
   acidFraction: number
): number {
   // Buffer capacity is maximized when [HA] = [A-] (at pKa)
   // β = 2.303 * C * (Ka * [H+]) / (Ka + [H+])²
   // Simplified: capacity ∝ total concentration * fraction product
   const baseFraction = 1 - acidFraction;
   return totalConcentration * acidFraction * baseFraction * 4; // Scale factor
}
