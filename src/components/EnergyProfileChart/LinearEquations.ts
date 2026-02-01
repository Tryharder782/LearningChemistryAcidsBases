import { Equation } from "./Equation";

class LinearEquation extends Equation {
  m: number
  c: number

  constructor() {
    super()
    this.m = 0
    this.c = 0
  }

  init3Params(m: number, x1: number, y1: number) {
    this.m = m
    this.c = y1 - (m * x1)
  }

  /// Creates a new instance which passes through the points (`x1`, `y1`) and (`x2`, `y2`).
  ///
  /// - Note: When `x1 == x2`, the resulting equation will have a constant value of `y1`.
  init4Params(x1: number, y1: number, x2: number, y2: number) {
    const denom = x2 - x1
    const m = denom === 0 ? 0 : (y2 - y1) / denom
    this.m = m
    this.c = y1 - (m * x1)
  }

  /// Returns a `LinearEquation` which varies with some fractional input - i.e., an input between 0 and 1.
  ///
  /// - Parameters:
  ///   - valueAtMin: The value returned for inputs of  0.
  ///   - valueAtMax: The value returned for inputs of 1.
  fractioned(valueAtMin: number, valueAtMax: number) {
    this.init4Params(0, valueAtMin, 1, valueAtMax)
  }

  getValue(input: number): number {
    return (this.m * input) + this.c
  }

  getX(y: number): number {
    return this.m === 0 ? 0 : (y - this.c) / this.m
  }

  intersectionWith(other: LinearEquation) {
    const numer = other.c - this.c
    const denom = this.m - other.m
    if (denom === 0) {
      return null
    }

    const xIntersect = numer / denom
    const yIntersect = this.getValue(xIntersect)
    return { x: xIntersect, y: yIntersect }
  }
}

export { LinearEquation }