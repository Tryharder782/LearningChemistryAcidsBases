import { Equation, EquationInterface } from "./Equation";

interface ConcentrationEquationInterface extends EquationInterface {
  a0: number
  rateConstant: number
  order: number
  halfLife?: number
  rateEquation?: Equation
  getConcentration(input: number): number
  time(concentration: number): number | undefined
  shiftWith(c: number, t: number): any
  getRateAt(time: number): number
}

class ZeroOrderConcentration extends Equation implements ConcentrationEquationInterface {
  getValue(x: number): number {
    return this.getConcentration(x)
  }

  getRateAt(time: number): number {
    return this.rateConstant * Math.pow(this.getConcentration(time), this.order)
  }

  a0: number = 0
  rateConstant: number = 0
  order: number = 0

  constructor() {
    super()
  }

  init2Params(a0: number, rateConstnat: number) {
    this.a0 = a0
    this.rateConstant = rateConstnat
  }

  init3Params(c1: number, t1: number, rateConstant: number) {
    const a0 = c1 + (rateConstant * t1)
    this.init2Params(a0, rateConstant)
  }

  init4Params(t1: number, c1: number, t2: number, c2: number) {
    // assert(t1 !== t2)
    // debugger
    this.rateConstant = this.getRate(t1, c1, t2, c2)
    let a0Numerator = (t1 * c2) - (t2 * c1)
    this.a0 = a0Numerator / (t1 - t2)
  }

  getConcentration(time: number): number {
    return this.a0 - (this.rateConstant * time)
  }

  time(concentration: number): number {
    return (this.a0 - concentration) / this.rateConstant
  }

  get halfLife(): number {
    return this.a0 / (2 * this.rateConstant)
  }

  shiftWith(c: number, t: number): ZeroOrderConcentration {
    const zeroOrderConcentration = new ZeroOrderConcentration()
    zeroOrderConcentration.init3Params(c, t, this.rateConstant)
    return zeroOrderConcentration
  }

  getRate(t1: number, c1: number, t2: number, c2: number): number {
    // assert(t1 != t2)
    let deltaT = t2 - t1
    let deltaC = c2 - c1
    return -deltaC / deltaT
  }
}

class FirstOrderConcentration extends Equation implements ConcentrationEquationInterface {
  getValue(x: number): number {
    return this.getConcentration(x)
  }

  getRateAt(time: number): number {
    return this.rateConstant * Math.pow(this.getConcentration(time), this.order)
  }

  a0: number = 0
  rateConstant: number = 0
  order: number = 1

  constructor() {
    super()
  }

  init2Params(a0: number, rateConstnat: number) {
    // assert(rateConstant != 0)
    this.a0 = a0
    this.rateConstant = rateConstnat
  }

  init3Params(c1: number, t1: number, rateConstant: number) {
    const a0 = c1 / Math.pow(Math.E, -(rateConstant * t1))
    // console.log({ a0, rateConstant })
    this.init2Params(a0, rateConstant)
  }

  getConcentration(time: number): number {
    return this.a0 * Math.pow(Math.E, -(this.rateConstant * time))
  }

  time(concentration: number): number | undefined {
    if (concentration > 0) {
      return -(1 / this.rateConstant) * Math.log(concentration / this.a0)
    }
  }

  get halfLife(): number {
    return Math.log(2) / this.rateConstant
  }

  shiftWith(c: number, t: number): FirstOrderConcentration {
    const firstOrderConcentration = new FirstOrderConcentration()
    firstOrderConcentration.init3Params(c, t, this.rateConstant)
    return firstOrderConcentration
  }

  getRate(t1: number, c1: number, t2: number, c2: number): number {
    // assert(c1 != 0)
    // assert(c2 != 0)
    // assert(t2 != t1)
    let numerator = Math.log(c2 / c1)
    let denominator = t1 - t2
    return numerator / denominator
  }
}

class SecondOrderConcentration extends Equation implements ConcentrationEquationInterface {
  getValue(x: number): number {
    return this.getConcentration(x)
  }

  getRateAt(time: number): number {
    return this.rateConstant * Math.pow(this.getConcentration(time), this.order)
  }

  a0: number = 0
  rateConstant: number = 0
  order: number = 2

  constructor() {
    super()
  }

  init2Params(a0: number, rateConstnat: number) {
    // assert(a0 != 0)
    this.a0 = a0
    this.rateConstant = rateConstnat
  }

  init3Params(c1: number, t1: number, rateConstant: number) {
    // assert(c1 != 0)
    const invC1 = 1 / c1
    const denominator = invC1 - (rateConstant * t1)
    // assert(denominator != 0)
    const a0 = 1 / denominator
    this.init2Params(a0, rateConstant)
  }

  getConcentration(time: number): number {
    // assert(a0 != 0)
    const invA1 = 1 / this.a0
    const kt = this.rateConstant * time
    return 1 / (invA1 + kt)
  }

  time(concentration: number): number | undefined {
    if (concentration > 0) {
      return (1 / (concentration * this.rateConstant)) - (1 / (this.a0 * this.rateConstant))
    }
  }

  get halfLife(): number {
    return Math.log(2) / this.rateConstant
  }

  shiftWith(c: number, t: number): SecondOrderConcentration {
    const secondOrderConcentration = new SecondOrderConcentration()
    secondOrderConcentration.init3Params(c, t, this.rateConstant)
    return secondOrderConcentration
  }

  getRate(t1: number, c1: number, t2: number, c2: number): number {
    // assert(c2 != 0)
    // assert(c1 != 0)
    // assert(t2 != t1)
    let invA2 = 1 / c2
    let invA1 = 1 / c1
    return (invA2 - invA1) / (t2 - t1)
  }
}

class InverseEquation extends Equation {
  underlying: ZeroOrderConcentration | FirstOrderConcentration | SecondOrderConcentration

  constructor(underlying: ZeroOrderConcentration | FirstOrderConcentration | SecondOrderConcentration) {
    super()
    this.underlying = underlying
  }

  getValue(x: number): number {
    const value = this.underlying.getConcentration(x)
    // assert(value != 0)
    return 1 / value
  }
}

class RateEquation extends Equation {
  concentration: ZeroOrderConcentration | FirstOrderConcentration | SecondOrderConcentration

  constructor(concentration: ZeroOrderConcentration | FirstOrderConcentration | SecondOrderConcentration) {
    super()
    this.concentration = concentration
  }

  getValue(x: number): number {
    const k = this.concentration.rateConstant
    const order = this.concentration.order
    const value = this.concentration.getConcentration(x)
    return k * Math.pow(value, order)
  }
}

class ConcentrationBEquation extends Equation {
  concentrationA: ZeroOrderConcentration | FirstOrderConcentration | SecondOrderConcentration
  initialAConcentration: number

  constructor(concentrationA: ZeroOrderConcentration | FirstOrderConcentration | SecondOrderConcentration, initialAConcentration: number) {
    super()
    this.concentrationA = concentrationA
    // debugger
    this.initialAConcentration = initialAConcentration
  }

  getValue(x: number): number {
    return this.initialAConcentration - this.concentrationA.getConcentration(x)
  }
}

export {
  ZeroOrderConcentration,
  FirstOrderConcentration,
  SecondOrderConcentration,
  InverseEquation,
  RateEquation,
  ConcentrationBEquation,
}