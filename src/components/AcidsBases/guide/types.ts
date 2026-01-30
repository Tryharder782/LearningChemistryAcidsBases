/**
 * Guide types for the step-by-step tutorial system.
 * Ported from iOS IntroNavigationModel.swift and IntroScreenElement.swift
 */

import type { SubstanceType } from '../../../helper/acidsBases/types';
import type { GuideEquationState } from './equationStates';

// Re-export for convenience
export type { SubstanceType };

// ============================================
// INPUT STATE — What interaction is allowed
// ============================================

export type InputState =
   | { type: 'none' }
   | { type: 'chooseSubstance'; substanceType: SubstanceType }
   | { type: 'selectSubstance' }
   | { type: 'setWaterLevel' }
   | { type: 'addSubstance'; substanceType?: SubstanceType }
   | { type: 'addIndicator' }
   | { type: 'setTitrantMolarity' }
   | { type: 'addTitrant' };

// ============================================
// SCREEN ELEMENTS — For highlighting
// ============================================

export type IntroScreenElement =
   | 'reactionSelection'  // Substance selector (HCl, HI, HBr...)
   | 'reactionEquation'   // The chemical equation display at top
   | 'pHScale'            // pH scale 0-14
   | 'pHEquation'         // Formula: pH = -log[H+]
   | 'pOHEquation'        // Formula: pOH = -log[OH-]
   | 'pHSumEquation'      // Formula: pH + pOH = 14
   | 'pHFormula'          // Specific line: pH = ...
   | 'pOHFormula'         // Specific line: pOH = ...
   | 'waterSlider'        // Water level slider
   | 'beakerTools'        // Pipettes above beaker
   | 'phChart'            // pH vs moles chart
   | 'concentrationGraph' // Concentration bars or pH graph container
   | 'bottom-chart-container'
   | 'kEquation'          // Ka = [H+][A-]/[HA]
   | 'kWEquation'         // Kw = Ka * Kb
   | 'pKEquation'         // pKa = -log(Ka)
   | 'hasselbalchEquation' // pH = pKa + log(...)
   | 'container'
   | 'indicator'
   | 'burette'
   | 'macroscopicBeaker';

// ============================================
// TEXT LINE — With formatting markers
// ============================================

/**
 * Text with formatting markers:
 * - *bold* → <strong>
 * - _subscript_ → <sub>
 * - ^superscript^ → <sup>
 * - $formula$ → special formula styling
 */
export type TextLine = string;

// ============================================
// GUIDE STEP — Single step in the tutorial
// ============================================

export interface GuideStep {
   id: string;
   /** Array of text lines to show in the bubble */
   statement: TextLine[];
   /** What interaction is allowed on this step */
   inputState: InputState;
   /** Which elements to highlight */
   highlights: IntroScreenElement[];
   /** Substance type if this step involves a specific one */
   substanceType?: SubstanceType;
   /** If true, next button only enabled after condition is met */
   requiresAction?: boolean;
   /** Callback ID for dynamic text generation */
   dynamicTextId?: string;
   /** State of the equation view (blank, filled, summary etc) */
   equationState?: GuideEquationState;
   chartMode?: 'bars' | 'curve' | 'neutralization';
}

// ============================================
// GUIDE STATE — Current tutorial state
// ============================================

export interface GuideState {
   /** Current step index */
   currentStep: number;
   /** Total number of steps */
   totalSteps: number;
   /** Can proceed to next step */
   canGoNext: boolean;
   /** Can go back to previous step */
   canGoBack: boolean;
   /** Selected substances by type */
   selectedSubstances: Record<SubstanceType, string | null>;
   /** Current water level (0-1) */
   waterLevel: number;
   /** Substance added fraction (0-1) */
   substanceAddedFraction: number;
}
