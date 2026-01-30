export type MoleculeType = 'substance' | 'primaryIon' | 'secondaryIon';

export interface GridPosition {
   col: number;
   row: number;
}

export interface Particle {
   id: string;
   position: GridPosition;
   type: MoleculeType;

   // Animation properties
   displayColor: string;    // Current visual color (e.g. during transition)
   targetColor: string;     // Final color the particle is animating towards
   transitionMs?: number;   // Color transition duration
   transitionDelayMs?: number; // Optional stagger delay before color transition
   opacity?: number;        // Appearance animation (0..1)
   scale?: number;          // Appearance animation scale

   // Metadata
   createdAt: number;
}

export interface ReactionRule {
   reactant: MoleculeType;       // The incoming molecule type (e.g., A-)
   reactingWith: MoleculeType;   // The existing molecule it reacts with (e.g., H+)
   producing: MoleculeType;      // The resulting molecule (e.g., HA)
}

export interface ParticleCounts {
   substance: number;
   primary: number;
   secondary: number;
}

// Configuration constants
export const GRID_COLS = 19;
export const GRID_ROWS_TOTAL = 22; // Total rows in the grid (100% water)
export const GRID_ROWS_MIN = 7;
export const GRID_ROWS_MAX = 15;
export const GRID_ROWS_DEFAULT = 11;
export const TOTAL_SLOTS = GRID_COLS * GRID_ROWS_DEFAULT;
export const MAX_PARTICLES = 43;
