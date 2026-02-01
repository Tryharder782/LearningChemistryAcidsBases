import { LinearEquation } from "./LinearEquations"

type EnergyProfileShapeSettings = {
  peak: number,
  leftAsymptote: number,
  rightAsymptote: number,

  /// The largest value of peak, after it is reduced by the catalyst
  maxReducedPeak: number,

  /// The smallest value of peak, after it is reduced by the catalyst
  minReducedPeak: number,

  /// Energy at the minimum temperature input
  minTempEnergy: number,

  /// Energy at the maximum temperature input
  maxTempEnergy: number,

  // isExoThermic: boolean,
  // {
  //     leftAsymptote > rightAsymptote
  // }
}

enum Catalyst {
  A = 1,
  B,
  C,
}

class EnergyProfileChatInput {
  initialPeak: number
  reducedPeak: number
  leftAsymptote: number
  rightAsymptote: number
  currentEnergy: number
  shape: EnergyProfileShapeSettings
  temperature: number
  catalyst?: Catalyst
  minTemp = 400
  maxTemp = 600

  constructor(shape: EnergyProfileShapeSettings, temperature: number, catalyst?: Catalyst) {
    this.shape = shape
    this.initialPeak = shape.peak
    this.reducedPeak = catalyst ? this.getReducedPeak(shape, catalyst) : shape.peak
    this.leftAsymptote = shape.leftAsymptote
    this.rightAsymptote = shape.rightAsymptote
    this.temperature = temperature
    this.currentEnergy = this.getCurrentEnergy(shape, temperature)
  }

  get canReactToC() {
    return this.currentEnergy >= this.reducedPeak
  }

  getReducedPeak(shape: EnergyProfileShapeSettings, catalyst: Catalyst) {
    switch (catalyst) {
      case Catalyst.A: return this.shape.maxReducedPeak
      case Catalyst.B: return (this.shape.minReducedPeak + shape.maxReducedPeak) / 2
      case Catalyst.C: return shape.minReducedPeak
    }
  }

  getCurrentEnergy(shape: EnergyProfileShapeSettings, temp: number) {
    const equation = new LinearEquation()
    equation.init4Params(this.minTemp, shape.minTempEnergy, this.maxTemp, shape.maxTempEnergy)
    return equation.getValue(temp)
  }
}

export { EnergyProfileChatInput }