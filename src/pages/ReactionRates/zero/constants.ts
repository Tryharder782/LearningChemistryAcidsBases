import { TurTextType } from "../../../helper/types"

export const tur_Text: TurTextType = [
  // display.reactant.name; A
  // display.product.name;  B
  [ // 0
    `This is a zero order reaction in which a reactant A turns into the product B. But what does it mean? Let's find out!`,
    '',
    `<span>Set the initial concentration of A (c<span class='sm-botom'>1</span>) and the initial time at which it'll start (t<span class='sm-botom'>1</span>)</span>.`,
  ],
  [ // 1
    `Great! Now you can set the <span>concentration of A at the end of the reaction (c<span class='sm-botom'>2</span>)</span> and the <span>time the reaction will end (t<span class='sm-botom'>2</span>)</span>.`,
  ],
  [ // 2
    (val: string[]) => `The order of a reaction has to do with the rate of it. <span>Rate</span> is the rate of \
      change in the concentration per unit time. The rate constant <span>k</span> is a value on \
      which the <span>rate</span> depends. For this reaction, k=${val[0]}M/s.`,
  ],
  [ // 3
    (val: string[]) => `<span>Half-life (t<span class='sm-botom'>1/2</span>)</span> is an expression to easily calculate the point in time at \
      which the concentration of the reactant, in this case <span>A</span>, is half of what the \
      initial concentration was. For this reaction, <span>t<span class='sm-botom'>1/2</span>=\
      ${val[1]}s</span>.`,
  ],
  [ // 4
    `<p>Let's watch how all the molecules are all changing! As \
    A disappears, B is being produced.</p>`,
    `<p>This happens at a variable <span>rate (in units of M/s)</span>, which is dependent on <span>k</span>.</p>`,
  ],
  [ // 5 here goes next step automatically after action
    `<p style='font-size: 17px'>For this zero order reaction, <span>rate</span> is constant and it's equal to <span>k</span>, that's why a graph plotting \([A] vs t) is a straight line.</p>`,
    `<p style='font-size: 17px'>[A]<span>(y)</span>=-kt<span>(mx)</span>+[A0]<span>(b)</span></p>`,
    `<span style='font-size: 17px'>Where -k is the slope</span>`,
  ],
  [ // 6
    `You can click the button in the top right corner to see the initial and final concentration and time for this reaction.`,
    `<span>Try clicking the toggle to see your results</span>.`,
  ],
  [ // 7
    `Amazing! Let's take a snapshot!`,
    `Try <span>changing the time indicator</span> to scrub through the reaction time.`,
  ],
  [ // 8
    `Now, let's try choosing a different reaction, which has a fixed rate constant, <span>k</span>.`,
    `<span>Choose a reaction above</span>.`,
  ],
  [ // 9
    (val: string[]) => `Great! You picked a reaction with a rate constant ${val[2]}.`,
    `Why don't you <span>set the initial concentration and initial time</span>?`,
  ],
  [ // 10
    `Awesome! Now set the time the reaction ends.`,
    `Notice how the final concentration varies as you adjust the final time.`,
  ],
  [ // 11
    `<p>Let's watch how all the molecules are all changing! As \
    C disappears, D is being produced.</p>`,
    `<p>This happens at a variable <span>rate (in units of M/s)</span>, which is dependent on <span>k</span>.</p>`,
  ],
  [ // 12
    `Amazing! Let's take a snapshot!`,
    `Try <span>changing the time indicator</span> to scrub through the reaction time.`,
  ],
  [ // 13
    `Now, let's try choosing a different reaction, which has a fixed rate constant, <span>k</span>.`,
    `<span>Choose a reaction above</span>.`,
  ],
  [ // 14
    (val: string[]) => `Great! You picked a reaction with a rate constant \ ${val[2]}.`,
    `Why don't you <span>set the initial concentration and initial time</span>?`,
  ],
  [ // 15
    `Awesome! Now set the final concentration of the reaction.`,
    `Notice how the final time varies as you adjust the final concentration.`,
  ],
  [ // 16
    `Let's watch how all the molecules changing! As \ E disappears, \ F is being produced.`,
    `This happens at a variable <span>rate (in units of M/s)</span>, which is dependent on <span>k</span>.`,
  ],
  [ // 17
    `Amazing, let's take another snapshot!`,
    `Try <span>changing the time indicator</span> to scrub through the reaction time.`,
    `Then, let's take a quiz to review what we've learnt.`,
  ],
  // open Quiz
]

export const tur_Hightlights = [
  // 0   This is zero...
  [],

  // 1   Great! Now you ...
  [],

  // 2   The order of a ...
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_math1', 'tur_math2'],

  // 3   Half-lie (t12) ...
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_math3'],

  // 4   Let's watch how all...
  // ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_canvasTime'],
  [],

  // 5   For this zero order ...
  // ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_canvasTime'], // +
  [],

  // 6   You can click the....
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_watchMenuIcon'], // Choose reaction 'C to D'

  // 7   Amazing! Let's take...
  [],

  // 8   Now, let's try choosing...
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_chooseMenuIcon'],

  // 9   Great! You picked a...
  [],

  // 10   Awesome! Now set ...
  [],

  // 11   Let's watch how all the...
  [],

  // 12   Amazing, let's take...
  [],

  // 13   Now, let's try choosing... EF
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_chooseMenuIcon'],

  // 14   Great! You picked a ...
  [],

  // 15   Awesome! Now set the ...
  [],

  // 16   Let's watch how all ...
  [],

  // 17   Amazing, let's take ...
  [],
  // here goes to Quiz
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

  // 0   This is zero...
  { // 0
    canvaTimeSliderC: [2, 0],
    canvaTimeSliderT: [2, 0],
    canvaTimeState: 0,
    canvaBarState: 0,
    canvaBeakerState: 1,
    isEnableChooseMenu: false,
  },
  // 1   Great! Now you ...
  { // 1
    canvaTimeSliderC: [1, 2],
    canvaTimeSliderT: [1, 2],
    canvaTimeState: 0,
    canvaBarState: 0,
    canvaBeakerState: 1,
  },
  // 2   The order of a ...
  { // 2
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 1],
    canvaTimeState: 1,
    canvaBarState: 0,
    canvaBeakerState: 1,
  },
  // 3   Half-lie (t12) ...
  { // 3
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 1],
    canvaTimeState: 1,
    canvaBarState: 0,
    canvaBeakerState: 1,
  },
  // 4   Let's watch how all...
  { // 4
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 1],
    canvaTimeState: 2,
    canvaBarState: 1,
    canvaBeakerState: 2,
  },
  // 5   For this zero order ...
  { // 5
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 1],
    canvaTimeState: 3,
    canvaBarState: 2,
    canvaBeakerState: 3,
  },
  // 6   You can click the....
  { // 6
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 1],
    canvaTimeState: 3,
    canvaBarState: 2,
    canvaBeakerState: 3,
  },
  // 7   Amazing! Let's take...
  { // 7
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 1],
    canvaTimeState: 3,
    canvaBarState: 2,
    canvaBeakerState: 3,
    isEnableChooseMenu: false,
  },
  // 8   Now, let's try choosing...
  { // 8
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 1],
    canvaTimeState: 3,
    canvaBarState: 2,
    canvaBeakerState: 3,
    activeDotIndex: 0,
    saveDotIndex: 0,
    isEnableChooseMenu: true,
  },
  // 9   Great! You picked a...
  { // 9
    canvaTimeSliderC: [2, 0],
    canvaTimeSliderT: [2, 0],
    canvaTimeState: 0,
    canvaBarState: 0,
    canvaBeakerState: 1,
    activeDotIndex: 1,
    isEnableChooseMenu: false,
  },
  // 10   Awesome! Now set ...
  { // 10
    canvaTimeSliderC: [1, 0],
    canvaTimeSliderT: [1, 2],
    canvaTimeState: 1,
    canvaBarState: 0,
    canvaBeakerState: 1,
  },
  // 11   Let's watch how all the...
  { // 11
    canvaTimeSliderC: [1, 0],
    canvaTimeSliderT: [1, 1],
    canvaTimeState: 2,
    canvaBarState: 1,
    canvaBeakerState: 2,
  },
  // 12   Amazing, let's take...
  { // 12
    canvaTimeSliderC: [1, 0],
    canvaTimeSliderT: [1, 1],
    canvaTimeState: 3,
    canvaBarState: 2,
    canvaBeakerState: 3,
    isEnableChooseMenu: false,
  },
  // 13   Now, let's try choosing... EF
  { // 13
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 1],
    canvaTimeState: 3,
    canvaBarState: 2,
    canvaBeakerState: 3,
    activeDotIndex: 1,
    saveDotIndex: 1,
    isEnableChooseMenu: true,
  },
  // 14   Great! You picked a ...
  { // 14
    canvaTimeSliderC: [2, 0],
    canvaTimeSliderT: [2, 0],
    canvaTimeState: 0,
    canvaBarState: 0,
    canvaBeakerState: 1,
    activeDotIndex: 2,
    isEnableChooseMenu: false,
  },
  // 15   Awesome! Now set the ...
  { // 15
    canvaTimeSliderC: [1, 2],
    canvaTimeSliderT: [0, 2],
    canvaTimeState: 1,
    canvaBarState: 0,
    canvaBeakerState: 1,
  },
  // 16   Let's watch how all ...
  { // 16
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [0, 2],
    canvaTimeState: 2,
    canvaBarState: 1,
    canvaBeakerState: 2,
  },
  // 17   Amazing, let's take ...
  { // 17
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [0, 1],
    canvaTimeState: 3,
    canvaBarState: 2,
    canvaBeakerState: 3,
    saveDotIndex: 2,
  },
]

export const tur_MathBlankArr = [
  [
    {
      query: '#tur_math2>span mjx-mn',
      nths: [0, 3, 5],
    },
    {
      query: '#tur_math2>span mjx-num',
      nths: [0],
    },
    {
      query: '#tur_math2>span mjx-den',
      nths: [0],
    },
    {
      query: '#tur_math3_2 mjx-math mjx-mn',
      nths: [0, 1, 3],
    },
    {
      query: '#tur_math4_2 mjx-math mjx-mn',
      nths: [0, 1, 2],
    },
  ],
  [
    {
      query: '#tur_math4_2 mjx-math mjx-mn',
      nths: [0, 2],
    },
  ],
  [],
  [],
  [],
  [],
  [],
  [],
  [],

  [
    {
      query: '#tur_math2>span mjx-mn',
      nths: [3, 5],
    },
    {
      query: '#tur_math2>span mjx-num',
      nths: [0],
    },
    {
      query: '#tur_math2>span mjx-den',
      nths: [0],
    },
    {
      query: '#tur_math4_2 mjx-math mjx-mn',
      nths: [0, 1, 2],
    },
  ],
  [
    {
      query: '#tur_math4_2 mjx-math mjx-mn',
      nths: [0, 2],
    },
  ],

  [],
  [],
  [],

  [
    {
      query: '#tur_math2>span mjx-mn',
      nths: [3, 5],
    },
    {
      query: '#tur_math2>span mjx-num',
      nths: [0],
    },
    {
      query: '#tur_math2>span mjx-den',
      nths: [0],
    },
    {
      query: '#tur_math4_2 mjx-math mjx-mn',
      nths: [0, 1, 2],
    },
  ],
  [
    {
      query: '#tur_math4_2 mjx-math mjx-mn',
      nths: [0, 2],
    },
  ],
]

// old one
export const tur_MathBlanks = [
  [
    { left: 73, top: 115, width: 50 }, //0
    { left: 169, top: 98, width: 60 }, //1
    { left: 287, top: 98, width: 55 }, //2
    { left: 169, top: 136, width: 60 }, //3
    { left: 287, top: 136, width: 55 }, //4
    { left: 201, top: 185, width: 50 }, //5
    { left: 278, top: 185, width: 45 }, //6
    { left: 363, top: 185, width: 43 }, //7
    { left: 212, top: 237, width: 43 }, //8
    { left: 284, top: 237, width: 52 }, //9
    { left: 344, top: 237, width: 41 }, //10
  ],
  [
    { left: 212, top: 237, width: 43 }, //8
    { left: 344, top: 237, width: 41 }, //10
  ],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [
    // { left: 73, top: 115, width: 50 }, //0
    { left: 169, top: 98, width: 60 }, //1
    { left: 287, top: 98, width: 55 }, //2
    { left: 169, top: 136, width: 60 }, //3
    { left: 287, top: 136, width: 55 }, //4
    // { left: 201, top: 185, width: 50 }, //5
    // { left: 278, top: 185, width: 45 }, //6
    // { left: 363, top: 185, width: 43 }, //7
    { left: 212, top: 237, width: 43 }, //8
    // { left: 284, top: 237, width: 52 }, //9
    { left: 344, top: 237, width: 41 }, //10
  ],

  // 10
  [
    { left: 212, top: 237, width: 43 }, //8
    { left: 344, top: 237, width: 41 }, //10
  ],
  [],
  [],
  [],

  // 14
  [
    { left: 169, top: 98, width: 60 }, //1
    { left: 287, top: 98, width: 55 }, //2
    { left: 169, top: 136, width: 60 }, //3
    { left: 287, top: 136, width: 55 }, //4
    { left: 212, top: 237, width: 43 }, //8
    { left: 344, top: 237, width: 41 }, //10
  ],
  [
    { left: 212, top: 237, width: 43 }, //8
    { left: 344, top: 237, width: 41 }, //10
  ],
  [],
  [],
  [],
  [],
  [],
]


export const tur_MathText: any[] = [
  { // 0
    blanks: [0, 1, 2, 3, 4, 7, 8, 9, 10, 11, 12],
    txtRed: [5, 6],
  },
  { // 1
    blanks: [10, 12],
    txtRed: [0, 1, 2, 3, 4, 7, 8, 9, 11],
  },
  {},
  {},
  {},
  { // 5
    txtRed: [10, 12],
  },
  { // 6
    txtRed: [10, 12],
  },
  { // 7
    txtRed: [10, 12],
  },
  { // 8
    txtRed: [10, 12],
  },

  { // 9
    blanks: [1, 2, 3, 4, 10, 12],
    txtRed: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  { // 10
    blanks: [10, 12],
    txtRed: [0, 1, 2, 3, 4, 7, 8, 9, 10, 11, 12],
  },
  { // 11
    txtRed: [10, 12],
  },
  { // 12
    txtRed: [10, 12],
  },
  { // 13
    txtRed: [10, 12],
  },
  { // 14
    blanks: [1, 2, 3, 4, 10, 12],
    txtRed: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  { // 15
    blanks: [10, 12],
    txtRed: [0, 1, 2, 3, 4, 7, 8, 9, 10, 11, 12],
  },
  { // 16
    txtRed: [10, 12],
  },
  { // 17
    txtRed: [10, 12],
  },
]



export const maxStep_Zero = tur_Text.length // 18 steps
