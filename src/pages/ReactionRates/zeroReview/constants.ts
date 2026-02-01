import { TurTextType } from "../../../helper/types"

export const tur_Text: TurTextType = [
  // display.reactant.name; A
  // display.product.name;  B
  [ // 7
    `This is the zero order reaction you created earlier.`,
    `<span>Try changing the time indicator to scrub through the reaction time.</span>`,
    `Swipe left or press next to see another reaction type.`,
  ],
  [ // 8
    (val: string[]) => `This is the zero order reaction you created earlier, which has a fixed rate constant of ${val[0]}.`,
    `<span>Try changing the time indicator to scrub through the reaction time.</span>`,
    `Swipe left or press next to see another reaction type.`,
  ],
  [ // 9
    (val: string[]) => `This is the zero order reaction you created earlier, which has a fixed rate constant of ${val[0]}.`,
    `<span>Try changing the time indicator to scrub through the reaction time.</span>`,
  ],
]

export const tur_Hightlights = [
  [],
  [],
  [],
]

export const stepsActions = [
  // energyAB;          (A - 0, B - 1), (C - 2, D - 3), (E - 4, F - 5)
  // valuesC, canvaTimeSliderC, canvaTimeSliderT;
  //                    index-0: A index-1: B
  // canvaTimeSliderC;  0 - hidden, 1 - disabled, 2 - active
  // canvaTimeSliderT;  0 - hidden, 1 - disabled, 2 - active
  // valuesC;           0 ~ 100
  // valuesT;           0 ~ 20
  // beakerState;       0 - show empty dots, 1 - show A dots,
  //                    2 - Animation,       3 - AB dots
  // canvaTimeState;    0 - show Frame only, 1 - show Graph
  //                    2 - Animation,       3 - show End

  { // 7
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 1],
    canvaTimeState: 3,
    canvaBarState: 2,
    canvaBeakerState: 3,
    isEnableChooseMenu: false,
    valuesT: [1, 15],
    valuesC: [60, 30],
    activeDotIndex: 0,
  },
  { // 7
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 1],
    canvaTimeState: 3,
    canvaBarState: 2,
    canvaBeakerState: 3,
    isEnableChooseMenu: false,
    valuesT: [1, 15],
    valuesC: [60, 30],
    activeDotIndex: 1,
  },
  { // 7
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 1],
    canvaTimeState: 3,
    canvaBarState: 2,
    canvaBeakerState: 3,
    isEnableChooseMenu: false,
    valuesT: [1, 15],
    valuesC: [60, 30],
    activeDotIndex: 2,
  },
]

export const tur_MathBlankArr = [
  [],
  [],
  [],

]

// old one
export const tur_MathBlanks = [
  [],
  [],
  [],
]


export const tur_MathText: any[] = [
  { // 7
    txtRed: [10, 12],
  },
  { // 8
    txtRed: [10, 12],
  },
  { // 8
    txtRed: [10, 12],
  },

]



export const maxStep_Zero = tur_Text.length // 3 steps
