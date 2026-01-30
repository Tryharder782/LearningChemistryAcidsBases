/**
 * BufferSaltModel - Port of iOS BufferSaltComponents
 * 
 * This model calculates concentrations for the salt addition phase of buffer solutions.
 * It uses the equation system (SwitchingEquation, LinearEquation, ConstantEquation)
 * to match iOS behavior exactly.
 * 
 * Key concept: When salt (MA) is added to a weak acid (HA) solution:
 * - MA ionizes completely: MA → M⁺ + A⁻
 * - A⁻ reacts with H⁺: A⁻ + H⁺ → HA
 * - Two phases:
 *   1. While H⁺ is available: [HA] increases, [H⁺] decreases, [A⁻] stays constant
 *   2. After H⁺ depleted: [HA] constant, [A⁻] starts to increase
 */

import { SwitchingEquation, LinearEquation, ConstantEquation } from './equations';
import type { Equation } from './equations';

/**
 * Integer-based particle counts at equilibrium (for thresholds and maxSubstance)
 * These match iOS BufferSaltComponents line 17-19
 */
export interface EquilibriumCounts {
   substance: number;     // HA particle count at equilibrium (integer)
   primary: number;       // H⁺ particle count at equilibrium (integer, used as threshold)
   secondary: number;     // A⁻ particle count at equilibrium (integer)
}

/**
 * Concentration values for equations (floats from quadratic equilibrium)
 * These are the actual [HA], [H⁺], [A⁻] values in molarity
 */
export interface EquilibriumConcentrations {
   equilibriumSubstance: number; // [HA] after equilibrium (initialSubstance - deltaConc)
   initialSubstance: number;     // Initial [HA] before any equilibrium (particleCount/gridSize)
   ionConcentration: number;     // [H⁺] = [A⁻] after equilibrium (deltaConc)
}

export interface SubstanceConcentrations {
   substance: number;
   primary: number;
   secondary: number;
}

/**
 * Model for salt addition phase in buffer solutions.
 * Port of iOS BufferSaltComponents.
 * 
 * Now accepts both integer counts (for iOS-accurate thresholds) and
 * concentration values (for iOS-accurate chemistry equations).
 */
export class BufferSaltModel {
   private readonly substanceEquation: Equation;
   private readonly primaryEquation: Equation;
   private readonly secondaryEquation: Equation;

   private readonly pKa: number;

   /**
    * Maximum amount of salt that can be added.
    * iOS: maxSubstance = (initialSubstance + initialPrimary) - initialSecondary
    */
   readonly maxSubstance: number;

   /**
    * @param counts Integer-based particle counts (for thresholds and maxSubstance)
    * @param concentrations Concentration values from equilibrium (for equation Y-values)
    * @param pKa -log10(Ka) for the weak acid
    */
   constructor(
      counts: EquilibriumCounts,
      concentrations: EquilibriumConcentrations,
      pKa: number
   ) {
      this.pKa = pKa;

      // Integer-based threshold (when H⁺ is depleted)
      const threshold = counts.primary;

      // Max substance calculation using integer counts (iOS line 29)
      this.maxSubstance = (counts.substance + counts.primary) - counts.secondary;

      // Concentration values for equations (match iOS BufferSaltComponents)
      // iOS uses equilibrium concentration at x=0 and initial concentration at x=threshold
      const initialSubstanceC = concentrations.equilibriumSubstance; // [HA] at equilibrium (x=0)
      const finalSubstanceC = concentrations.initialSubstance;       // [HA] before equilibrium (x=threshold)
      const initialSecondaryC = concentrations.ionConcentration;   // [A⁻] = [H⁺] after equilibrium
      const initialPrimaryC = concentrations.ionConcentration;     // [H⁺] after equilibrium

      // [HA] equation:
      // x < threshold: Linear from initialSubstanceC to finalSubstanceC
      // x >= threshold: Constant at finalSubstanceC
      this.substanceEquation = new SwitchingEquation(
         threshold,
         new LinearEquation(0, initialSubstanceC, threshold, finalSubstanceC),
         new ConstantEquation(finalSubstanceC)
      );

      // [A⁻] equation:
      // x < threshold: Constant at initialSecondaryC (all added A⁻ reacts with H⁺)
      // x >= threshold: Linear increase from initialSecondaryC to finalSubstanceC
      this.secondaryEquation = new SwitchingEquation(
         threshold,
         new ConstantEquation(initialSecondaryC),
         new LinearEquation(threshold, initialSecondaryC, this.maxSubstance, finalSubstanceC)
      );

      // [H⁺] equation:
      // x < threshold: Linear decrease from initialPrimaryC to 0
      // x >= threshold: Constant at 0
      this.primaryEquation = new SwitchingEquation(
         threshold,
         new LinearEquation(0, initialPrimaryC, threshold, 0),
         new ConstantEquation(0)
      );
   }

   /**
    * Get concentrations at a given amount of substance added.
    * @param substanceAdded Number of salt particles added
    */
   getConcentrations(substanceAdded: number): SubstanceConcentrations {
      return {
         substance: this.substanceEquation.getValue(substanceAdded),
         primary: this.primaryEquation.getValue(substanceAdded),
         secondary: this.secondaryEquation.getValue(substanceAdded)
      };
   }

   /**
    * Calculate pH using Henderson-Hasselbalch equation.
    * pH = pKa + log([A⁻]/[HA])
    */
   getPH(substanceAdded: number): number {
      const concs = this.getConcentrations(substanceAdded);

      if (concs.substance <= 1e-10 || concs.secondary <= 1e-10) {
         return 7; // Neutral if either is zero
      }

      const ratio = concs.secondary / concs.substance;
      return this.pKa + Math.log10(ratio);
   }
}
