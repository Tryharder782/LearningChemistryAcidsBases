import { TurTextType } from "../../../helper/types"

export const tur_Text: TurTextType = [
  // display.reactant.name; A
  // display.product.name;  B
  [ // 0
    `This is the zero order reaction you completed earlier using <span>catalyst A</span>.`,
    `<p style='font-size: 20px'>Swipe left or tap next to see the reaction using the catalyst B.</p>`,
  ],
  [ // 0
    `This is the zero order reaction you completed earlier using <span>catalyst B</span>.`,
    `<p style='font-size: 20px'>Swipe left or tap next to see the reaction using the catalyst C.</p>`,
  ],
  [ // 0
    `This is the zero order reaction you completed earlier using <span>catalyst C</span>.`,
  ],
]

export const tur_Hightlights = [
  // 0   Not so fast! ...
  [],
  [],
  [],
]

export const stepsActions = [
  // energyAB;          (A - 0, B - 1), (C - 2, D - 3), (E - 4, F - 5)
  // valuesC, canvaTimeSliderC, canvaTimeSliderT;
  //                    index-0: A,  index-1: B
  // canvaTimeSliderC;  0 - hidden, 1 - disabled, 2 - active
  // canvaTimeSliderT;  0 - hidden, 1 - disabled, 2 - active
  // valuesC;           0 ~ 100
  // valuesT;           0 ~ 20
  // beakerState;       0 - show empty dots, 1 - show A dots,
  //                    2 - Animation,       3 - AB dots
  // canvaTimeState;    0 - show Frame only, 1 - show Graph
  //                    2 - Animation,       3 - show End
  // activeDotIndex;    Beaker Dot type
  //                    0 - A/B,   1 - C/D,  2 - E/F
  // catalystItemStates; Catalyst Menu/Item Showing State
  //                    0: menu item - hidden, 1: menu item - hidden(movable item will be shown only in this case),
  //                    2: menu item - disabled, 3: menu item - active, 4: menu item - active & clickable
  // xxx (don't use for now) shakeCompletedItemIndex; Order of completed shaking Catalyst Item Index. 0~2
  //                    ex: [1,0,2]
  // curCatShakingOrderIdx;  used history of Catalyst Item index list.

  // 0   Not so fast! ...
  { // 16
    canvaTimeState: 2,
    canvaBeakerState: 2,
    rateChartState: 2,
    isEnableChooseMenu: false,
    isBurnerActive: true,
    catalystItemStates: [0, 3, 3],
    curCatShakingOrderIdx: 1,
    showCatalystMoveItem: false,
    energyProfileChartState: 2,
    isDisableNextButton: false,
    initGasCounts: false,
    valueFire: 425,
  },
  { // 16
    canvaTimeState: 2,
    canvaBeakerState: 2,
    rateChartState: 2,
    isEnableChooseMenu: false,
    isBurnerActive: true,
    catalystItemStates: [3, 0, 3],
    curCatShakingOrderIdx: 2,
    showCatalystMoveItem: false,
    energyProfileChartState: 2,
    isDisableNextButton: false,
    initGasCounts: false,
    valueFire: 425,
  },
  { // 16
    canvaTimeState: 2,
    canvaBeakerState: 2,
    rateChartState: 2,
    isEnableChooseMenu: false,
    isBurnerActive: true,
    catalystItemStates: [3, 3, 0],
    curCatShakingOrderIdx: 3,
    showCatalystMoveItem: false,
    energyProfileChartState: 2,
    isDisableNextButton: false,
    initGasCounts: false,
    valueFire: 425,
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

export const tur_MathHighlights = [
  [],
  [],
  [],
]

export const tur_MathText: any[] = [
  {},
  {},
  {},
]


export const maxStep_Kinetics = tur_Text.length // 3 steps

export const chooseMenuItems = [
  { title: 'Zero Order Reactions' },
  { title: 'First Order Reactions' },
  { title: 'Second Order Reactions' },
]
