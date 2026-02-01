import { Equation } from "./Equation"

class BoundInputEquation extends Equation {
  underlying: Equation
  min: number
  max: number

  constructor(underlying: Equation, min: number, max: number) {
    super()
    this.underlying = underlying
    this.min = min
    this.max = max
  }
}

export { BoundInputEquation }