import { TurTextType } from "../../../helper/types"

export const tur_Text: TurTextType = [
  // display.reactant.name; A
  // display.product.name;  B
  [ // 0
    `Do you know the difference between the reaction orders?`,
    `**Let's dig in!**`,
  ],
  [ // 1
    `<p style='font-size: 17px'>These equations on the top seem pretty familiar right? They are the same equations we've encountered before, just solved for **[A]** which is a very useful form. Notice how the constants **k** are the ones we already got from the **previous reactions**.</p>`,
  ],
  [ // 2
    `On the left, we have 3 beakers with a reaction of **A** to **B** taking place in each one, all paired to an ([A] vs t) graph. Each reaction will represent an order: zero order, first order, and second order.`,
  ],
  [ // 3
    // `<p style='font-size: 16px'>Let's try something out now! We know that plotting an \([A] vs t) graph for each order results in different types of line (straight line, curved line and more accentuated curve). When the reaction starts running, **try dragging the right equations and dropping them into the proper graphs**.</p>`,
    `<p style='font-size: 19px'>We know that plotting an \([A] vs t) graph for each order results in different types of line (straight line, curved line and more accentuated curve).</p>`,
  ],
  [ // 4
    // `Tap next or press play on any of the graphs to start the reactions.`,
    // `Let's see how long it takes you to guess!`,
    `Play the button.`,
    `Let's see how long it takes you to guess!`,
  ],
  [ // 5
    // `Let's see how long it takes you to guess!`,
    // `**Drag and drop the equations to the graph of the corresponding order**.`,
    `Can you guess what order the reactions are in?`,
    // `**Click the orders of reactions**.`,
  ],
  [ // 6
    `Awesome!`,
    `Try scrubbing the animation for each beaker one after another, and see visually how these reaction rates differ.`,
  ],
  [ // 7
    `Took you a while didn't it?`,
    `Let's see how to make things faster.`,
  ],
  // open Quiz
]

export const tur_Hightlights = [
  // 0   Do you know the ...
  [],

  // 1   These equations on the...
  [
    'tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton',
    'tur_orderCardItem0', 'tur_orderCardItem1', 'tur_orderCardItem2'
  ],

  // 2   On the left, we have...
  [
    'tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton',
    'tur_energyProfile0', 'tur_energyProfile1', 'tur_energyProfile2',
    'chartTimeItem0', 'chartTimeItem1', 'chartTimeItem2'],
  // ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_math1', 'tur_math2'],

  // 3   Let's try something...
  [
    'tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton',
    'tur_orderCardItem0', 'tur_orderCardItem1', 'tur_orderCardItem2',
    'chartTimeItem0', 'chartTimeItem1', 'chartTimeItem2',
    'tur_handDragOrderItem'
  ],
  // ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_canvasTime', 'tur_math4'],

  // 4   Tap next or press play...
  [
    'tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton',
    'chartTimeItem0', 'chartTimeItem1', 'chartTimeItem2'
  ],
  // ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_math3'],

  // 5   Let's see how long...
  [], // +

  // 6   Awesome!...
  [],
  // ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_canvasTime'], // Choose reaction 'C to D'

  // 7   Took you a while...
  [],
  // ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_canvasTime'],

  // here goes to Quiz
]

export const stepsActions = [
  // energyAB;          (A - 0, B - 1), (C - 2, D - 3), (E - 4, F - 5)
  // canvaTimeSliderT;  0 - hidden, 1 - disabled, 2 - active
  // valuesC;           0 ~ 100
  // valuesT;           0 ~ 20
  // beakerState;       0 - show empty dots, 1 - show A dots,
  //                    2 - Animation,       3 - AB dots
  // canvaTimeState;    0 - show Frame only, 1 - show Graph
  //                    2 - Animation,       3 - show End

  // 0   Do you know the ...
  { // 0
    canvaTimeState: 0,
    canvaBeakerState: 1,
    isEnableChooseMenu: false,
    orderItemMove: false,
    playButtonStatus: 1,
    draggableOrder: [0, 0, 0],
    isDisableNextButton: false,
  },
  // 1   These equations on the...
  { // 1
    canvaTimeState: 0,
    canvaBeakerState: 1,
    isEnableChooseMenu: false,
    orderItemMove: false,
    playButtonStatus: 1,
    draggableOrder: [0, 0, 0],
    isDisableNextButton: false,
  },
  // 2   On the left, we have...
  { // 2
    canvaTimeState: 0,
    canvaBeakerState: 1,
    isEnableChooseMenu: false,
    orderItemMove: false,
    playButtonStatus: 1,
    draggableOrder: [0, 0, 0],
    isDisableNextButton: false,
  },
  // 3   Let's try something...
  { // 3
    canvaTimeState: 0,
    canvaBeakerState: 1,
    isEnableChooseMenu: false,
    orderItemMove: true,
    playButtonStatus: 1,
    draggableOrder: [0, 0, 0],
    isDisableNextButton: false,
  },
  // 4   Tap next or press play...
  { // 4
    canvaTimeState: 0,
    canvaBeakerState: 1,
    isEnableChooseMenu: false,
    orderItemMove: false,
    playButtonStatus: 2,
    draggableOrder: [0, 0, 0],
    isDisableNextButton: false,
  },
  // 5   Let's see how long...
  { // 5
    canvaTimeState: 2,
    canvaBeakerState: 2,
    isEnableChooseMenu: false,
    orderItemMove: false,
    playButtonStatus: 0,
    draggableOrder: [1, 1, 1],
    isDisableNextButton: false,
  },
  // 6   Awesome!...
  { // 6
    canvaTimeState: 3,
    canvaBeakerState: 3,
    isEnableChooseMenu: false,
    orderItemMove: false,
    playButtonStatus: 0,
    isDisableNextButton: false,
  },
  // 7   Took you a while...
  { // 7
    canvaTimeState: 3,
    canvaBeakerState: 3,
    isEnableChooseMenu: false,
    orderItemMove: false,
    playButtonStatus: 0,
    isDisableNextButton: false,
  },
]

export const tur_MathBlanks = [
]

export const maxStep_Second = tur_Text.length // 8 steps
