import { TurTextType } from "../../../helper/types"

export const tur_Text: TurTextType = [
  // display.reactant.name; A
  // display.product.name;  B
  [ // 0
    `This is a first order reaction.`,
    `Why don't you set the <span>initial concentration of A [A__0__]</span>, the reactant?.`,
  ],
  [ // 1
    `Great! Now you can set the <span>concentration of A at the end of the reaction [A<span class='sm-botom'>t</span>]</span> and the <span>time the reaction will last (t)</span>.`,
  ],
  [ // 2
    `The rate constant <span>k</span> is a value on which the <span>rate</span> depends. This dependency is often represented with the rate law or the rate equation.`,
  ],
  [ // 3
    (val: string[]) => `Rate laws or rate equations are mathematical expressions that describe the relationship \
    between the <span>rate</span> of a chemical reaction and the concentration of its reactants. \
    For this reaction, <span>k=${val[0]}</span>.`,
  ],
  [ // 4
    `<p>For a reaction with one reactant it's usually written as <span>rate=k[A]</span><span class='sm-top'>order</span>.`,
    `For this reaction then, <span>rate=k[A]</span><span class='sm-top'>1</span>.</p>`,
  ],
  [ // 5 here goes next step automatically after action
    `<p style='font-size: 17px'><span>Half-life (t<span class='sm-botom'>1/2</span>)</span> is an expression to easily calculate the point in time at which the concentration of the reactant, in this case <span>A</span>, is half of what the \
    initial concentration was. For this reaction,</p>`,
    (val: string[]) => `<p style='font-size: 17px'> <span>t<span class='sm-botom'>1/2</span>=\
    In(1)/k=${val[1]}</span>.</p>`,
  ],
  [ // 6
    `<p>Let's watch how all the molecules are all changing!</p>`,
    `<p>As A disappears, B is being produced.</p>`,
    `<p>This happens at a variable <span>rate (in units of M/s)</span>, which is dependent on <span>k</span> and <span>[A]</span>.</p>`,
  ],
  [ // 7
    `For the previous zero order reaction, <span>rate</span> was constant because it was independent \
    of <span>[A]</span>, since <span>rate=k[A]<span class='sm-top'>0</span></span> is equivalent to <span>rate=k</span>, which is the rate constant.`,
  ],
  [ // 8
    `For this first order reaction, <span>rate=k[A]<span class='sm-top'>1</span></span>. That's why a graph plotting \
    \([A] vs t]) is a curve, given how the <span>rate</span> is proportional to the concentration \
    of <span>A</span>`,
  ],
  [ // 9
    `<p style='font-size: 17px'>Notice how <span>[A]</span> drops faster at the beginning because there's more of <span>A</span> present, making \
    the <span>rate</span> higher.</p>`,
    `<p style='font-size: 17px'>Towards the end of the reaction there's much less <span>[A]</span> present, so the <span>rate</span> of the \
    reaction is lower, making <span>[A]</span> drop slower.</p>`,
  ],
  [ // 10
    `<p style='font-size: 17px'>For simplification purposes, when integrating the rate law or the rate equation, we get \
    the <span>integrated rate law</span>.</p>`,
    `<p style='font-size: 17px'>This is a form of the rate law that makes it simpler to make calculations and graphs from \
    the original rate law equation.</p>`,
  ],
  [ // 11
    `Amazing! Let's take a snapshot!`,
    `Try <span>changing the time indicator</span> to scrub through the reaction time.`,
  ],
  [ // 12
    `Now, let's try choosing a different reaction, which has a fixed rate constant, <span>k</span>.`,
    `<span>Choose a reaction above</span>.`,
  ],
  [ // 13
    (val: string[]) => `Great! You picked a reaction with a rate constant ${val[2]}.`,
    `Why don't you <span>set the initial concentration and initial time</span>?`,
  ],
  [ // 14
    `Awesome! Now set the time the reaction ends.`,
    `Notice how the final concentration varies as you adjust the final time.`,
  ],
  [ // 15
    `<p>Let's watch how all the molecules are all changing!</p>`,
    `<p>As C disappears, D is being produced.</p>`,
    `<p>This happens at a variable <span>rate (in units of M/s)</span>, which is dependent on <span>k</span> and <span>[C]</span>.</p>`,
  ],
  [ // 16
    `Amazing! Let's take a snapshot!`,
    `Try <span>changing the time indicator</span> to scrub through the reaction time.`,
  ],
  [ // 17
    `Now, let's try choosing a different reaction, which has a fixed rate constant, <span>k</span>.`,
    `<span>Choose a reaction above</span>.`,
  ],
  [ // 18
    (val: string[]) => `Great! You picked a reaction with a rate constant ${val[2]}.`,
    `Why don't you <span>set the initial concentration and initial time</span>?`,
  ],
  [ // 19
    `Awesome! Now set the time the reaction ends.`,
    `Notice how the final concentration varies as you adjust the final time.`,
  ],
  [ // 20
    `<p>Let's watch how all the molecules are all changing!</p>`,
    `<p>As E disappears, F is being produced.</p>`,
    `<p>This happens at a variable <span>rate (in units of M/s)</span>, which is dependent on <span>k</span> and <span>[E]</span>.</p>`,
  ],
  [ // 21
    `Amazing! Let's take a snapshot!`,
    `Try <span>changing the time indicator</span> to scrub through the reaction time.`,
    `Then, let's take a quiz to review what we've learnt.`,
  ],
  // open Quiz
]

export const tur_Hightlights = [
  // 0   This is a first...
  [],

  // 1   Great! Now you ...
  [],

  // 2   The rate constant...
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_math1', 'tur_math2'],

  // 3   Rate laws or rate ...
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_math1', 'tur_math2'],

  // 4   For a reaction...
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_math4', 'tur_canvasTime'],

  // 5   Half-life t1/2 ...
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_math3'], // +

  // 6   Let's watch how all....
  [], // Choose reaction 'C to D'

  // 7   For the previous zero...
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_canvasTime'],

  // 8   For this first order...
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_canvasTime'],

  // 9   Notice how [A] drops...
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton'],

  // 10   For simplification purposes ...
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_canvasTime'],

  // 11   Amazing! Let's take...
  [],

  // 12   Now, let's try choosing...
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_chooseMenuIcon'],

  // 13   Great! You picked a... CD
  [],

  // 14   Awesome! Now set the ...
  [],

  // 15   Let's watch how ...
  [],

  // 16   Amazing! Let's take ...
  [],

  // 17   Now, let's try choosing ...
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_chooseMenuIcon'],

  // 18   Great! You picked a ...
  [],

  // 19   Awesome! Now set the ...
  [],

  // 20   Let's watch how all ...
  [],

  // 21   Amazing! Let's take a ...
  [],
  // here goes to Quiz
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

  // 0   This is a first...
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
    canvaTimeSliderT: [2, 0],
    canvaTimeState: 0,
    canvaBarState: 0,
    canvaBeakerState: 1,
  },
  // 2   The rate constant...
  { // 2
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 0],
    canvaTimeState: 1,
    canvaBarState: 0,
    canvaBeakerState: 1,
  },
  // 3   Rate laws or rate ...
  { // 3
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 0],
    canvaTimeState: 1,
    canvaBarState: 0,
    canvaBeakerState: 1,
  },
  // 4   For a reaction...
  { // 4
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 0],
    canvaTimeState: 1,
    canvaBarState: 0,
    canvaBeakerState: 1,
  },
  // 5   Half-life t1/2 ...
  { // 5
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 0],
    canvaTimeState: 1,
    canvaBarState: 0,
    canvaBeakerState: 1,
  },
  // 6   Let's watch how all....
  { // 6
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 0],
    canvaTimeState: 2,
    canvaBarState: 1,
    canvaBeakerState: 2,
  },
  // 7   For the previous zero...
  { // 7
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 1],
    canvaTimeState: 3,
    canvaBarState: 2,
    canvaBeakerState: 3,
  },
  // 8   For this first order...
  { // 8
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 0],
    canvaTimeState: 3,
    canvaBarState: 2,
    canvaBeakerState: 3,
  },
  // 9   Notice how [A] drops...
  { // 9
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 0],
    canvaTimeState: 3,
    canvaBarState: 2,
    canvaBeakerState: 3,
  },
  // 10   For simplification purposes ...
  { // 10
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 0],
    canvaTimeState: 3,
    canvaBarState: 2,
    canvaBeakerState: 3,
  },
  // 11   Amazing! Let's take...
  { // 11
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 0],
    canvaTimeState: 3,
    canvaBarState: 2,
    canvaBeakerState: 3,
    isEnableChooseMenu: false,
  },
  // 12   Now, let's try choosing...
  { // 12
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 0],
    canvaTimeState: 3,
    canvaBarState: 2,
    canvaBeakerState: 3,
    activeDotIndex: 0,
    saveDotIndex: 0,
    isEnableChooseMenu: true,
  },
  // 13   Great! You picked a... CD
  { // 13
    canvaTimeSliderC: [2, 0],
    canvaTimeSliderT: [2, 0],
    canvaTimeState: 0,
    canvaBarState: 0,
    canvaBeakerState: 1,
    activeDotIndex: 1,
    isEnableChooseMenu: false,
  },
  // 14   Awesome! Now set the ...
  { // 14
    canvaTimeSliderC: [1, 0],
    canvaTimeSliderT: [1, 2],
    canvaTimeState: 1,
    canvaBarState: 0,
    canvaBeakerState: 1,
  },
  // 15   Let's watch how ...
  { // 15
    canvaTimeSliderC: [1, 0],
    canvaTimeSliderT: [1, 1],
    canvaTimeState: 2,
    canvaBarState: 1,
    canvaBeakerState: 2,
  },
  // 16   Amazing! Let's take ...
  { // 16
    canvaTimeSliderC: [1, 0],
    canvaTimeSliderT: [1, 1],
    canvaTimeState: 3,
    canvaBarState: 2,
    canvaBeakerState: 3,
    isEnableChooseMenu: false,
  },
  // 17   Now, let's try choosing ...
  { // 17
    canvaTimeSliderC: [1, 0],
    canvaTimeSliderT: [1, 1],
    canvaTimeState: 3,
    canvaBarState: 2,
    canvaBeakerState: 3,
    activeDotIndex: 1,
    saveDotIndex: 1,
    isEnableChooseMenu: true,
  },
  // 18   Great! You picked a ... EF
  { // 18
    canvaTimeSliderC: [2, 0],
    canvaTimeSliderT: [2, 0],
    canvaTimeState: 0,
    canvaBarState: 0,
    canvaBeakerState: 1,
    activeDotIndex: 2,
    isEnableChooseMenu: false,
  },
  // 19   Awesome! Now set the ...
  { // 19
    canvaTimeSliderC: [1, 2],
    canvaTimeSliderT: [0, 2],
    canvaTimeState: 1,
    canvaBarState: 0,
    canvaBeakerState: 1,
  },
  // 20   Let's watch how all ...
  { // 20
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [0, 2],
    canvaTimeState: 2,
    canvaBarState: 1,
    canvaBeakerState: 2,
  },
  // 21   Amazing! Let's take a ...
  { // 21
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
      nths: [0, 2],
    },
    {
      query: '#tur_math3_2 mjx-math mjx-mn',
      nths: [0, 2],
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
  [],
  [],
  [],
  [],

  [
    {
      query: '#tur_math2>span mjx-mn',
      nths: [2, 3],
    },
    {
      query: '#tur_math4_2 mjx-math mjx-mn',
      nths: [0, 2],
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
      nths: [2, 3],
    },
    {
      query: '#tur_math4_2 mjx-math mjx-mn',
      nths: [0, 2],
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
    { left: 0, top: 94, width: 32 }, //0
    { left: 148, top: 81, width: 48 }, //1
    { left: 0, top: 180, width: 42 }, //2
    { left: 106, top: 180, width: 42 }, //3
    { left: 0, top: 248, width: 36 }, //4
    { left: 57, top: 248, width: 41 }, //5
    { left: 105, top: 248, width: 32 }, //6
  ],
  [
    { left: 0, top: 248, width: 36 }, //4
    { left: 105, top: 248, width: 32 }, //6
  ],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],

  // 13
  [
    { left: 148, top: 81, width: 48 }, //1
    { left: 110, top: 111, width: 48 }, //1-1
    { left: 0, top: 248, width: 36 }, //4
    { left: 105, top: 248, width: 32 }, //6
  ],
  [
    { left: 0, top: 248, width: 36 }, //4
    { left: 105, top: 248, width: 32 }, //6
  ],
  [],
  [],
  [],

  // 18
  [
    { left: 148, top: 81, width: 48 }, //1
    { left: 110, top: 111, width: 48 }, //1-1
    { left: 0, top: 248, width: 36 }, //4
    { left: 105, top: 248, width: 32 }, //6
  ],
  [
    { left: 0, top: 248, width: 36 }, //4
    { left: 105, top: 248, width: 32 }, //6
  ],
  [],
  [],
  [],
  [],
]



export const tur_MathText: any[] = [
  { // 0
    blanks: [0, 2, 4, 5, 6, 7, 8, 9],
    txtRed: [1, 3],
  },
  { // 1
    blanks: [7, 9],
    txtRed: [0, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  {},
  {},
  {},
  { // 5
  },
  { // 6
    txtRed: [7, 9],
  },
  { // 7
    txtRed: [7, 9],
  },
  { // 8
    txtRed: [7, 9],
  },

  { // 9
    txtRed: [7, 9],
  },
  { // 10
    txtRed: [7, 9],
  },
  { // 11
    txtRed: [7, 9],
  },
  { // 12
    txtRed: [7, 9],
  },
  { // 13
    blanks: [2, 3, 7 ,9],
    txtRed: [0, 1, 2, 3, 4, 6, 7, 8, 9],
  },
  { // 14
    blanks: [7 ,9],
    txtRed: [0, 2, 3, 4, 6, 7, 8, 9],
  },
  { // 15
    txtRed: [7, 9],
  },
  { // 16
    txtRed: [7, 9],
  },
  { // 17
    txtRed: [7, 9],
  },
  { // 18
    blanks: [2, 3, 7 ,9],
    txtRed: [0, 1, 2, 3, 4, 6, 7, 8, 9],
  },
  { // 19
    blanks: [7 ,9],
    txtRed: [0, 2, 3, 4, 6, 7, 8, 9],
  },
  { // 20
    txtRed: [7, 9],
  },
  { // 21
    txtRed: [7, 9],
  },
]




export const maxStep_First = tur_Text.length // 22 steps
