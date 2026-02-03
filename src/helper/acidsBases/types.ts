/**
 * Core types for the AcidsBases simulation.
 * Ported from iOS Swift types.
 */

// ============================================
// SUBSTANCE TYPES
// ============================================

export type SubstanceType = 'strongAcid' | 'strongBase' | 'weakAcid' | 'weakBase';

export type SubstancePart = 'substance' | 'primaryIon' | 'secondaryIon';

export type PrimaryIon = 'hydrogen' | 'hydroxide';

export type SecondaryIon = 'Cl' | 'A' | 'Na' | 'I' | 'Br' | 'K' | 'Li' | 'F' | 'CN' | 'HS' | 'B' | 'HB' | 'X';

// ============================================
// CORE INTERFACES
// ============================================

export interface GridCoordinate {
   col: number;
   row: number;
}

export interface RGB {
   r: number;
   g: number;
   b: number;
}

/**
 * Represents an acid or base substance with all its chemical properties.
 */
export interface AcidOrBase {
   id: string;
   type: SubstanceType;
   symbol: string;

   /**
    * Number of substance molecules added for each pair of ions produced.
    * - 0: Strong - substance fully ionizes immediately
    * - 1+: Weak - only fraction ionizes
    */
   substanceAddedPerIon: number;

   // Equilibrium constants
   kA: number;
   kB: number;
   pKA: number;
   pKB: number;

   // Colors (hex strings)
   color: string;           // Color of the neutral molecule
   primaryColor: string;    // Color of primary ion (H+ or OH-)
   secondaryColor: string;  // Color of secondary ion

   // Maximum concentration when beaker is full
   concentrationAtMaxSubstance: number;

   // Ion identifiers
   primaryIon: PrimaryIon;
   secondaryIon: SecondaryIon;
   saltName: string;
}

// ============================================
// REACTION PHASES
// ============================================

export type ReactionPhase = 'preparation' | 'preEP' | 'postEP';

// ============================================
// SIMULATION STATE
// ============================================

export interface SimulationState {
   substance: AcidOrBase | null;
   phase: ReactionPhase;
   volume: number;           // mL of solution in beaker
   titrantVolume: number;    // mL of titrant added
   molarity: number;         // Molarity of substance
   titrantMolarity: number;  // Molarity of titrant
}

// ============================================
// PARTICLE VISUALIZATION
// ============================================

export interface Particle {
   id: string;
   type: SubstancePart;
   x: number;
   y: number;
   color: string;
}

export interface SpeciesCounts {
   substance: number;   // Neutral molecules
   primary: number;     // H3O+ or OH-
   secondary: number;   // Anions or cations
}

// ============================================
// CHART DATA
// ============================================

export interface TitrationPoint {
   volume: number;
   pH: number;
}

export interface SpeciesFraction {
   label: string;
   fraction: number;
   color: string;
}

// ============================================
// QUIZ TYPES
// ============================================

export type QuizCategory =
   | 'Titration'
   | 'pH Scale'
   | 'Buffer'
   | 'Equilibrium: Aqueous'
   | 'Equilibrium: Gaseous'
   | 'Equilibrium: Solubility';

export interface QuizQuestion {
   id: string;
   category: QuizCategory;
   question: string;
   options: string[];
   correctAnswer: number;
   explanation: string;
   imageName?: string;
}

export interface QuizSession {
   topic: QuizCategory;
   questions: QuizQuestion[];
   currentIndex: number;
   answers: (number | null)[];
   isComplete: boolean;
}

export interface QuizResult {
   topic: QuizCategory;
   totalQuestions: number;
   correctAnswers: number;
   incorrectAnswers: number;
   details: {
      questionId: string;
      userAnswer: number;
      correctAnswer: number;
      isCorrect: boolean;
   }[];
}

// ============================================
// UTILITY TYPES
// ============================================

export interface ScreenLayout {
   width: number;
   height: number;
   beakerWidth: number;
   chartWidth: number;
   rightStackWidth: number;
}
