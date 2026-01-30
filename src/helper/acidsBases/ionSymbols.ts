/**
 * Helper functions for formatting ion symbols with charges.
 * Provides charged representations of ions for display in guide text.
 */

import type { SecondaryIon } from './types';

/**
 * Get charged symbol for a secondary ion.
 * Adds appropriate superscript charge (⁺ or ⁻) to the ion symbol.
 * 
 * @param ion - The secondary ion identifier
 * @returns The ion symbol with charge (e.g., 'Cl⁻', 'Na⁺')
 */
export function getChargedIonSymbol(ion: SecondaryIon): string {
   // Anions (negative charge)
   const anions: Record<string, string> = {
      'Cl': 'Cl⁻',
      'I': 'I⁻',
      'Br': 'Br⁻',
      'F': 'F⁻',
      'A': 'A⁻',
      'CN': 'CN⁻',
      'HS': 'HS⁻',
   };

   // Cations (positive charge)
   const cations: Record<string, string> = {
      'Na': 'Na⁺',
      'K': 'K⁺',
      'Li': 'Li⁺',
      'HB': 'HB⁺',
   };

   // Neutral base (no charge)
   if (ion === 'B') {
      return 'B';
   }

   return anions[ion] || cations[ion] || ion;
}
