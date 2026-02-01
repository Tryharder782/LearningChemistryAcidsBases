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
  reactantColor: [
    "rgb(8,168,232)",
    "rgb(255,19,19)",
    "rgb(255,132,19)",
  ],
  productColor: [
    "rgb(213,111,62)",
    "rgb(99,105,209)",
    "rgb(84,35,68)",
  ]
}