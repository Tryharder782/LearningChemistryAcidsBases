import { BoundEquation } from "./BoundEquation";
import { BoundInputEquation } from "./BoundInputEquation";

export interface EquationInterface {
  getValue(input: number): number;
}

class Equation implements EquationInterface {
  getValue(input: number): number {
    return input;
  }
  // within(min: number, max: number): Equation {
  //     return new BoundEquation(this, min, max);
  // }
  // inputWithin(min: number, max: number): Equation {
  //     return new BoundInputEquation(this, min, max);
  // }
}

export { Equation }