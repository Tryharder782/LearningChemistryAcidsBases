/**
 * Centralized color definitions for the Acids & Bases module.
 * Extracted from the original AcidsBasesWebApp and CogSciKit sources.
 */

export const ACIDS_BASES_COLORS = {
   // ============================================
   // ION & SUBSTANCE COLORS
   // ============================================
   ions: {
      // Primary ions
      hydrogen: '#F89880',      // H+ (Soft Salmon/Orange-Pink)
      hydroxide: '#A6ABD9',     // OH- (Lavender Blue)

      // Secondary ions
      chlorine: '#614066',      // Cl- (Dark Purple)
      iodine: '#5856D6',        // I-
      bromine: '#FF9500',       // Br-
      potassium: '#5E203B',     // K+ (Dark Burgundy)
      lithium: '#FF2D55',       // Li+
      sodium: '#FFCC00',        // Na+
      fluorine: '#0B5D3E',      // F- (Dark Teal Green)
      cyanide: '#72AC79',       // CN- (Sage Green)
      ionA: '#B20D30',          // A- (Crimson Red)
      ionB: '#2D2D2D',          // HB (Dark Gray/Black)
      ionHS: '#FF9F0A',         // HS-
   },

   substances: {
      // Molecule before ionization
      hydrogenChloride: '#5C8660', // HCl (Muted Green)
      hydrogenIodide: '#DAA520', // HI (Yellow/Goldenrod - corrected from reference screenshot)
      hydrogenBromide: '#FFE8E0',
      potassiumHydroxide: '#DAA520', // KOH (Goldenrod)
      lithiumHydroxide: '#FFE8F0',
      sodiumHydroxide: '#FFF8E0',
      weakAcidHA: '#2D3E4E',        // HA (Dark Gray-Blue)
      weakAcidHF: '#5A1F5F',        // HF (Dark Purple)
      hydrogenCyanide: '#011627',   // HCN (Very Dark Blue/Navy)
      weakBaseB: '#EDC032',         // B- (Goldenrod/Yellow)
      weakBaseF: '#00C7BE',
      weakBaseHS: '#FF9F0A',

      beakerLiquid: '#ADD8E6',  // Light blue for water

      titrant: {
         acid: '#DDB14D',       // Yellow-ish for acid titrant
         base: '#80A080',       // Green-ish for base titrant
      }
   },

   // ============================================
   // UI INTERFACE COLORS
   // ============================================
   ui: {
      primary: '#DD523A',       // Used in VerticalSlider, general primary actions
      disabled: '#6b7280',      // Generic disabled state

      phScale: {
         acidText: '#a56550',        // "Acid" header
         basicText: '#8489c0',       // "Basic" header
         acidLabel: '#ED5A3B',       // "[H+]" / "pH" label
         acidIndicator: '#ba796e',   // Indicator box for Acid
         basicIndicator: '#8489c0',  // Indicator box for Base (pOH)
         gradientStart: '#e79883',
         gradientMiddle: '#e1efbf',
         gradientEnd: '#a6abd9',
      }
   }
};

// Re-export specific groups for backward compatibility if needed, 
// or just direct access.
export const ION_COLORS = {
   ...ACIDS_BASES_COLORS.ions,
   ...ACIDS_BASES_COLORS.substances
};
