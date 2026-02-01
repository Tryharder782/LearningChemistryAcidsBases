const inputMinC = 0.1
const inputMinCRange = 0.05
const inputMaxT = 20
const inputMinTRange = 2
export const ReactionSettings = {
  Axis: {
    minC: 0,
    maxC: 1,
    minT: 0,
    maxT: 20,
    minLogC: -4,
    maxLogC: 0,
    minInverseC: 0,
    maxInverseC: 10,
  },
  Input: {
    minC: inputMinC,
    maxC: 1,

    /// The minimum C for second order reaction B
    minCForSecondOrderReactionB: 0.4,

    /// The smallest input range the user should be given to adjust C by.
    /// This in turn will impact limits of other coupled limits (such as the other concentration value being set), to ensure
    /// this range is provided
    minCRange: inputMinCRange,

    /// The smallest C2 input the user can be given. i.e., the range of C2 the user can select will be at least `minC` to `minC2Input`
    minC2Input: inputMinC + inputMinCRange,

    minT1: 0,
    minT2: 3,
    maxT: inputMaxT,
    minTRange: inputMinTRange,
    minT2Input: inputMaxT - inputMinTRange,
  },
  initialC: 0.7,
  initialT: 10,

  /// Fixed rate constant for B reactions (i.e., the second reaction type which can be chosen on parts 1-3)
  reactionBRateConstant: 0.04,

  /// Fixed rate constant for C reactions (i.e., the third reaction type which can be chosen on parts 1-3)
  reactionCRateConstant: 0.07,
}

export const ReactionType = {
  reactantName: {
    A: "A",
    B: "C",
    C: "E",
  },
  productName: {
    A: "B",
    B: "D",
    C: "F",
  },
  reactantColor: {
    A: "rgb(8,168,232)",
    B: "rgb(255,19,19)",
    C: "rgb(255,132,19)",
  },
  productColor: {
    A: "rgb(213,111,62)",
    B: "rgb(99,105,209)",
    C: "rgb(84,35,68)",
  }
}

export const ReactionOrder = [
  // Zero
  {
    peak: 0.9,
    leftAsymptote: 0.5,
    rightAsymptote: 0.2,
    maxReducedPeak: 0.8,
    minReducedPeak: 0.65,
    minTempEnergy: 0.6,
    maxTempEnergy: 0.95
  },
  // First
  {
    peak: 0.85,
    leftAsymptote: 0.2,
    rightAsymptote: 0.4,
    maxReducedPeak: 0.75,
    minReducedPeak: 0.6,
    minTempEnergy: 0.5,
    maxTempEnergy: 0.9
  },
  // Second
  {
    peak: 0.7,
    leftAsymptote: 0.35,
    rightAsymptote: 0.25,
    maxReducedPeak: 0.62,
    minReducedPeak: 0.5,
    minTempEnergy: 0.45,
    maxTempEnergy: 0.85
  }
]
