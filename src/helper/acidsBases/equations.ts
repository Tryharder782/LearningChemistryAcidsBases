/**
 * iOS Equation System Port
 * 
 * This module provides a composable equation system matching iOS ReactionsCore:
 * - Equation interface: getValue(x) -> number
 * - LinearEquation: Linear interpolation between two points
 * - ConstantEquation: Returns a constant value
 * - SwitchingEquation: Piecewise function that switches at a threshold
 */

// ============================================
// EQUATION INTERFACE
// ============================================

export interface Equation {
   getValue(x: number): number;
}

// ============================================
// CONSTANT EQUATION
// ============================================

/**
 * Returns the same value regardless of x.
 * iOS: ConstantEquation(value:)
 */
export class ConstantEquation implements Equation {
   private value: number;

   constructor(value: number) {
      this.value = value;
   }

   getValue(_x: number): number {
      return this.value;
   }
}

// ============================================
// LINEAR EQUATION
// ============================================

/**
 * Linear interpolation between two points (x1, y1) and (x2, y2).
 * iOS: LinearEquation(x1:y1:x2:y2:)
 * 
 * Formula: y = y1 + (x - x1) * (y2 - y1) / (x2 - x1)
 */
export class LinearEquation implements Equation {
   private slope: number;
   private intercept: number;

   constructor(x1: number, y1: number, x2: number, y2: number) {
      // Handle vertical line (x1 === x2)
      if (x2 === x1) {
         this.slope = 0;
         this.intercept = y1;
      } else {
         this.slope = (y2 - y1) / (x2 - x1);
         this.intercept = y1 - this.slope * x1;
      }
   }

   getValue(x: number): number {
      return this.slope * x + this.intercept;
   }
}

// ============================================
// SWITCHING EQUATION
// ============================================

/**
 * Piecewise function that switches between two equations at a threshold.
 * iOS: SwitchingEquation(thresholdX:underlyingLeft:underlyingRight:)
 * 
 * - If x < thresholdX: uses left equation
 * - If x >= thresholdX: uses right equation
 */
export class SwitchingEquation implements Equation {
   private thresholdX: number;
   private left: Equation;
   private right: Equation;

   constructor(thresholdX: number, left: Equation, right: Equation) {
      this.thresholdX = thresholdX;
      this.left = left;
      this.right = right;
   }

   getValue(x: number): number {
      if (x < this.thresholdX) {
         return this.left.getValue(x);
      }
      return this.right.getValue(x);
   }

   /**
    * Convenience factory for creating a simple linear switching equation.
    * iOS: SwitchingEquation.linear(...)
    */
   static linear(
      thresholdX: number,
      x1: number, y1: number,
      x2: number, y2: number,
      finalValue: number
   ): SwitchingEquation {
      return new SwitchingEquation(
         thresholdX,
         new LinearEquation(x1, y1, x2, y2),
         new ConstantEquation(finalValue)
      );
   }
}
