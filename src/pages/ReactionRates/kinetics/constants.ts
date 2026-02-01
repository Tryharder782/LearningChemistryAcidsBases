import { TurTextType } from "../../../helper/types"

export const tur_Text: TurTextType = [
  // display.reactant.name; A
  // display.product.name;  B
  [ // 0
    `Not so fast!`,
    `Choose a reaction to work with for this experiment.`,
    `**Tap the right corner button to show the dropdown list.**`,
  ],
  [ // 1
    `We now know that the concentration can affect the **rate** of a reaction. \
    But there are other variables that can affect in one way or another the **rate** too. Let's first talk about **collision theory**.`,
  ],
  [ // 2
    `It states that the reaction rate is equal to the frequency of effective collisions between reactants. \
    For a collision to be effective, the molecules must collide with sufficient energy and in the proper orientation so that products can form.`,
  ],
  [ // 3
    `<p style='font-size: 18px'>This minimum amount of energy that is needed to initiate or start a chemical reaction is called **activation energy (E__a__).** \
    As long as the collision of the molecules orientated properly have enough energy to surpass the **E__a__**, the collision will be successful.</p>`,
  ],
  [ // 4
    `But how is the temperature related to the **rate**? Well, an equation that portrays this \
    more accurately is the **Arrhenius equation**. As you can see, the temperature \
    specifically affects the rate constant **k**.`,
  ],
  [ // 5
    `<p style='font-size: 18px'>**k** is the rate constant, **A** is a term called the frequency factor that accounts for molecular orientation, \
    **e** is the natural logarithm base, **R** is the universal gas constant 8.314 J mol^-1^ K^-1^, \
    **T** is the Kelvin temperature, and **E__a__** is the activation energy.</p>`,
  ],
  [ // 6
    `<p style='font-size: 18px'>As you can tell by the equation, the higher the temperature, the higher the rate constant will be, thus making the **rate** higher too. \
    In a more practical way, high temperatures make the average energy of molecules go up, beating the **E__a__** barrier.</p>`,
  ],
  [ // 7
    `When applying logarithmic properties to both sides, you get a version of the equation that's linear, where:`,
    `ln(k)**(y)**=(-E--a--/RT)**(mx)**+ln(a)**(b)**`,
    `With a slope of -E--a--/R.`,
  ],
  [ // 8
    `<p style='font-size: 16px'>If the linear equation is used to represent 2 different points (point 1 and point 2) of the line, we can sum \
    up the equations to get this form of the Arrhenius equation. This is a very common way to use the Arrhenius equation \
    where k--1-- is the rate constant at T--1-- and k--2-- is the rate constant at T--2--.</p>`,
  ],
  [ // 9
    (val: string[]) => `<p style='font-size: 16px'>For this reaction, **E__a__ is ${val[0]}J** and **k is ${val[1]}** \
    when the temperature is **${val[2]}K**. \
    In other words, the kinetic energy of the molecules have to be one that when colliding, the potential \
    energy resultant is higher than **${val[0]}** in order for A and B to successfully transform into a C molecule.</p>`,
  ],
  [ // 10
    `<p style='font-size: 15px'>One way to depict the reaction's activation energy and potential energy is with an **energy diagram or reaction profile**. \
    The reaction profile plots the increase in potential energy of the reactants as they approach, reaching a maximum at the moment \
    of collision, and then the decrease in potential energy as the products recoil.</p>`,
  ],
  [ // 11
    `<p style='font-size: 16px'>This is an **exothermic reaction** because the reaction starts at a higher point of \
    energy than where it ends. In other words, energy is being released when the reaction \
    takes place. This energy released is usually referred to as heat, but we'll talk about \
    that deeper in other units.</p>`,
  ],
  // [ // 12
  //   `This is an **endothermic reaction** because the reaction starts at a lower point of energy \
  //   than where it ends. In other words, energy is being absorbed when the reaction takes \
  //   place. This energy is usually referred to as heat, but we'll talk about that deeper in \
  //   other units.`,
  // ],
  [ // 12
    `<p style='font-size: 15px'>The hump or bell in the graph represents the **activation energy**. The reaction energy has to be one \
    that overcomes that difference for it to occur. Otherwise, even with the proper orientation the molecules colliding of \
    A and B won't be turning into C. The higher **E__a__** is, the harder it is for the reaction to have sufficient energy to overcome it.</p>`,
  ],
  [ // 13
    `<p style='font-size: 18px'>There's a way to reduce the **activation energy**, and that is with the use of a **catalyst**. \
    Catalysts make reactions faster, and even though there are various types, in one way or another they do \
    so by reducing the activation energy, or **E__a__**.</p>`,
  ],
  [ // 14
    `Let's try that out!`,
    `Choose a catalyst to use to make the reaction in the beaker go faster.`,
    `**Tap a catalyst to select it**.`,
  ],
  [ // 15
    `Perfect! Now tap the catalyst to drop it into the beaker, and let's see what happens.`,
    `**Tap the catalyst to release into solution.**.`,
  ],
  [ // 16
    (val: string[]) => `Look! The E--a-- was reduced to **${val[0]}J** 
    thanks to that catalyst. See that horizontal line? It represents the average kinetic energy of the molecules. 
    Right now it's lower than E--a--, so no products are going to be formed just yet.`,
  ],
  [ // 17
    (val: string[]) => `<p style='font-size: 17px'>Take a look at the linear graph of ln(k) vs 1/T with a slope of ${-1083}. \
    This graph is very useful to determine the relation between the constant **k** and the temperature. \
    Here you can see too that the higher **k** is, the higher **T** is.</p>`,
  ],
  [ // 18
    (val: string[]) => `<p style='font-size: 18px'>Points of that graph are being represented in this equation. As of now, **k** went up to **${1.3}** \
    when **T** is **${400}K**, because the catalyst lowered the E--a--, making the constant **k** higher, thus making the **rate** higher too.`,
  ],
  [ // 19
    `<p style='font-size: 17px'>Let's try to produce C. **Use the flame slider to increase the temperature in the beaker**. \
    This will make the kinetic energy of the molecules increase too, meaning they will go faster so that when they collide \
    there's enough energy to overcome the E--a--.</p>`,
  ],
  [ // 20
    `<p style='font-size: 17px'>Perfect! Successful collisions are taking place!</p>`,
    `<p style='font-size: 17px'>Notice how the average kinetic bar goes up when the temperature goes up too. Also, notice how the rate constant can vary with the temperature.</p>`,
  ],
  [ // 21
    `It's all done! All of A and B has turned into C successfully.`,
    `**Choose another catalyst**, and let's see how it compares.`,
  ],
  [ // 22
    `Let's try that out!`,
    `Choose a catalyst to use to make the reaction in the beaker go faster.`,
    `**Tap a catalyst to select it**.`,
  ],
  [ // 23
    `Perfect! Now tap the catalyst to drop it into the beaker, and let's see what happens.`,
    `**Tap the catalyst to release into solution.**.`,
  ],
  [ // 24
    (val: string[]) => `Look! The E--a-- was reduced to **${8000} J** \
    thanks to that catalyst. See that horizontal line? It represents the average kinetic energy of the molecules. \
    Right now it's lower than E--a--, so no products are going to be formed just yet.`,
  ],
  [ // 25
    `<p style='font-size: 17px'>Let's try to produce C. **Use the flame slider to increase the temperature in the beaker**. \
    This will make the kinetic energy of the molecules increase too, meaning they will go faster so that when they collide \
    there's enough energy to overcome the E--a--.</p>`,
  ],
  [ // 26
    `Perfect! Successful collisions are taking place!`,
    `Notice how the average kinetic bar goes up when the temperature goes up too. Also, notice how the rate constant can vary with the temperature.`,
  ],
  [ // 27
    `It's all done! All of A and B has turned into C successfully.`,
    `**Choose another catalyst**, and let's see how it compares.`,
  ],
  [ // 28
    `Let's try that out!`,
    `Choose a catalyst to use to make the reaction in the beaker go faster.`,
    `**Tap a catalyst to select it**.`,
  ],
  [ // 29
    `Look! The E--a-- was reduced to **${6000} J** \
    thanks to that catalyst. See that horizontal line? It represents the average kinetic energy of the molecules. \
    Right now it's lower than E--a--, so no products are going to be formed just yet.`,
  ],
  [ // 30
    `<p style='font-size: 17px'>Let's try to produce C. **Use the flame slider to increase the temperature in the beaker**. \
    This will make the kinetic energy of the molecules increase too, meaning they will go faster so that when they collide \
    there's enough energy to overcome the E--a--.</p>`,
  ],
  [ // 31
    `<p style='font-size: 17px'>Perfect! Successful collisions are taking place!</p>`,
    `<p style='font-size: 17px'>Notice how the average kinetic bar goes up when the temperature goes up too. Also, notice how the rate constant can vary with the temperature.</p>`,
  ],
  [ // 32
    `It's all done! All of A and B has turned into C successfully.`,
    `Let's take another quiz, and then you're free to **explore further** the reaction rates.`,
  ],

  // [ // 22
  //   `Awesome!`,
  //   `Play with temperature to set T__2__. **Use the flame slider.**`,
  // ],
  // [ // 22
  //   `Keep playing with temperature to see more collisions.`,
  //   `**Use the flame slider.**`,
  // ],
  // [ // 22
  //   `You've already used this catalyst, so let's try another one.`,
  //   `**Tap a different catalyst to select it**.`,
  // ],
  // [ // 22
  //   `Now you can explore all parts of kinetics, just tap the button at the top left corner to \
  //   reveal the navigation menu, then choose your favorite part to review it once more!`,
  //   `Why don't you try **selecting the filing cabinet** to view the reactions you created earlier?`,
  // ],
  // open Quiz
]

export const tur_Hightlights = [
  // 0   Not so fast! ...
  // [],
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_chooseMenuIcon'],

  // 1   We now know that the concentration ...
  [],

  // 2   It states that the reaction, ...
  [],
  // ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_math1', 'tur_math2'],

  // 3   This minimum amount of...
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton'],
  // ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_canvasTime', 'tur_math4'],

  // 4   But how is the temperature...
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_math1'],
  // ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_math3'],

  // 5   k is the rate constant...
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_math1'],

  // 6   As you can tell by the equation....
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_math1'],
  // ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_canvasTime'], // Choose reaction 'C to D'

  // 7   When applying logarithmic...
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_math1', 'tur_math2'],
  // ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_canvasTime'],

  // 8   If the linear equation...
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_math1', 'tur_math2', 'tur_math3'],
  // ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_canvasTime'],

  // 9   For this reaction, **E__a__...
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_math3', 'tur_math4'],
  // ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_canvasTime'],

  // 10   One way to depict the reaction ...
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_energyProfileChart'],
  // ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_canvasTime'],

  // 11   This is an **exothermic reaction...
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_energyProfileChartHalf'],
  // ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_canvasTime'],

  // 12   The hump or bell in the ...
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_energyProfileChart'],

  // 13   There's a way to reduce... 
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_energyProfileChart', 'tur_catalystItems'],
  // ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_chooseMenuIcon'],

  // 14   Let's try that out! ...
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_catalystItems', 'tur_beakerShape'],

  // 15   Perfect! Now shake the catalyst ...
  [],

  // 16   Look! The E__a__ was reduced  ...
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_energyProfileChart'],

  // 17   Take a look at the linear  ...
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_energyProfileRateChart'],

  // 18   Points of that graph are ...
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_math3', 'tur_math4', 'tur_energyProfileRateChart'],
  // ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_chooseMenuIcon'],

  // 19   Let's try to produce C....
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_beakerShape', 'tur_burnerSlider', 'tur_burnerSpinBtns'],

  // 20   Perfect! Successful collisions ...
  [],

  // 21   It's all done! All of ...
  [],

  // 22   Let's try that out! ...
  [],

  // 23   Perfect! Now shake the ...
  [],

  // 24   Look! The E__a__ was ...
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_energyProfileChart'],

  // 25   Let's try to produce C ...
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_beakerShape', 'tur_burnerSlider', 'tur_burnerSpinBtns'],

  // 26   Perfect! Successful collisions ...
  [],

  // 27   It's all done! All of ...
  [],

  // 28   Let's try that out! ...
  [],

  // 29   Look! The E__a__ was ...
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_energyProfileChart'],

  // 30   Let's try to produce ...
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_beakerShape', 'tur_burnerSlider', 'tur_burnerSpinBtns'],

  // 31   Perfect! Successful collisions ...
  [],

  // 32   It's all done! All of ...
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
  // activeDotIndex;    Beaker Dot type
  //                    0 - A/B,   1 - C/D,  2 - E/F
  // catalystItemStates; Catalyst Menu/Item Showing State
  //                    0: menu item - hidden, 1: menu item - hidden(movable item will be shown only in this case),
  //                    2: menu item - disabled, 3: menu item - active, 4: menu item - active & clickable
  // xxx (don't use for now) shakeCompletedItemIndex; Order of completed shaking Catalyst Item Index. 0~2
  //                    ex: [1,0,2]
  // curCatShakingOrderIdx;  used history of Catalyst Item index list.

  // 0   Not so fast! ...
  { // 0
    canvaTimeState: 0,
    canvaBeakerState: 0,
    rateChartState: 0,
    isEnableChooseMenu: true,
    isBurnerActive: false,
    catalystItemStates: [2, 2, 2],
    curCatShakingOrderIdx: 0,
    showCatalystMoveItem: false,
    energyProfileChartState: 0,
    isDisableNextButton: false,
    initGasCounts: true,
    valueFire: 425,
    // activeDotIndex: 0,
  },
  // 1   We now know that the concentration ...
  { // 1
    canvaTimeState: 0,
    canvaBeakerState: 0,
    rateChartState: 1,
    isEnableChooseMenu: false,
    isBurnerActive: false,
    catalystItemStates: [2, 2, 2],
    curCatShakingOrderIdx: 0,
    showCatalystMoveItem: false,
    energyProfileChartState: 0,
    isDisableNextButton: false,
    initGasCounts: true,
  },
  // 2   It states that the reaction, ...
  { // 2
    canvaTimeState: 1,
    canvaBeakerState: 0,
    rateChartState: 1,
    isBurnerActive: false,
    catalystItemStates: [2, 2, 2],
    curCatShakingOrderIdx: 0,
    showCatalystMoveItem: false,
    energyProfileChartState: 0,
    isDisableNextButton: false,
    initGasCounts: true,
  },
  // 3   This minimum amount of...
  { // 3
    canvaTimeState: 1,
    canvaBeakerState: 0,
    rateChartState: 1,
    isBurnerActive: false,
    catalystItemStates: [2, 2, 2],
    curCatShakingOrderIdx: 0,
    showCatalystMoveItem: false,
    energyProfileChartState: 0,
    isDisableNextButton: false,
    initGasCounts: true,
  },
  // 4   But how is the temperature...
  { // 4
    canvaTimeState: 1,
    canvaBeakerState: 0,
    rateChartState: 1,
    isBurnerActive: false,
    catalystItemStates: [2, 2, 2],
    curCatShakingOrderIdx: 0,
    showCatalystMoveItem: false,
    energyProfileChartState: 0,
    isDisableNextButton: false,
    initGasCounts: true,
  },
  // 5   k is the rate constant...
  { // 5
    canvaTimeState: 2,
    canvaBeakerState: 0,
    rateChartState: 1,
    isBurnerActive: false,
    catalystItemStates: [2, 2, 2],
    curCatShakingOrderIdx: 0,
    showCatalystMoveItem: false,
    energyProfileChartState: 0,
    isDisableNextButton: false,
    initGasCounts: true,
  },
  // 6   As you can tell by the equation....
  { // 6
    canvaTimeState: 3,
    canvaBeakerState: 0,
    rateChartState: 1,
    isBurnerActive: false,
    catalystItemStates: [2, 2, 2],
    curCatShakingOrderIdx: 0,
    showCatalystMoveItem: false,
    energyProfileChartState: 0,
    isDisableNextButton: false,
    initGasCounts: true,
  },
  // 7   When applying logarithmic...
  { // 7
    canvaTimeState: 3,
    canvaBeakerState: 0,
    rateChartState: 1,
    isBurnerActive: false,
    catalystItemStates: [2, 2, 2],
    curCatShakingOrderIdx: 0,
    showCatalystMoveItem: false,
    energyProfileChartState: 0,
    isDisableNextButton: false,
    initGasCounts: true,
  },
  // 8   If the linear equation...
  { // 8
    canvaTimeState: 3,
    canvaBeakerState: 0,
    rateChartState: 1,
    isBurnerActive: false,
    catalystItemStates: [2, 2, 2],
    curCatShakingOrderIdx: 0,
    showCatalystMoveItem: false,
    energyProfileChartState: 0,
    isDisableNextButton: false,
    initGasCounts: true,
  },
  // 9   For this reaction, **E__a__...
  { // 9
    canvaTimeState: 3,
    canvaBeakerState: 0,
    rateChartState: 1,
    isBurnerActive: false,
    catalystItemStates: [2, 2, 2],
    curCatShakingOrderIdx: 0,
    showCatalystMoveItem: false,
    energyProfileChartState: 0,
    isDisableNextButton: false,
    initGasCounts: true,
  },
  // 10   One way to depict the reaction ...
  { // 10
    canvaTimeState: 3,
    canvaBeakerState: 0,
    rateChartState: 1,
    isBurnerActive: false,
    catalystItemStates: [2, 2, 2],
    curCatShakingOrderIdx: 0,
    showCatalystMoveItem: false,
    energyProfileChartState: 0,
    isDisableNextButton: false,
    initGasCounts: true,
  },
  // 11   This is an **exothermic reaction...
  { // 11
    canvaTimeState: 3,
    canvaBeakerState: 0,
    rateChartState: 1,
    isBurnerActive: false,
    catalystItemStates: [2, 2, 2],
    curCatShakingOrderIdx: 0,
    showCatalystMoveItem: false,
    energyProfileChartState: 0,
    isDisableNextButton: false,
    initGasCounts: true,
  },
  // 12   The hump or bell in the ...
  { // 12
    canvaTimeState: 3,
    canvaBeakerState: 0,
    rateChartState: 1,
    isBurnerActive: false,
    catalystItemStates: [2, 2, 2],
    curCatShakingOrderIdx: 0,
    showCatalystMoveItem: false,
    energyProfileChartState: 0,
    isDisableNextButton: false,
    initGasCounts: true,
  },
  // 13   There's a way to reduce... 
  { // 13
    canvaTimeState: 3,
    canvaBeakerState: 0,
    rateChartState: 1,
    isBurnerActive: false,
    catalystItemStates: [3, 3, 3],
    curCatShakingOrderIdx: 0,
    showCatalystMoveItem: false,
    energyProfileChartState: 0,
    isDisableNextButton: false,
    initGasCounts: true,
  },
  // 14   Let's try that out! ...
  { // 14
    canvaTimeState: 0,
    canvaBeakerState: 0,
    rateChartState: 1,
    isBurnerActive: false,
    catalystItemStates: [4, 4, 4],
    curCatShakingOrderIdx: 0,
    showCatalystMoveItem: false,
    energyProfileChartState: 0,
    isDisableNextButton: false,
    initGasCounts: true,
  },
  // 15   Perfect! Now shake the catalyst ...
  { // 15
    canvaTimeState: 1,
    canvaBeakerState: 0,
    rateChartState: 1,
    isBurnerActive: false,
    catalystItemStates: [3, 3, 3],
    curCatShakingOrderIdx: 0,
    showCatalystMoveItem: true,
    energyProfileChartState: 0,
    isDisableNextButton: false,
    initGasCounts: true,
  },
  // 16   Look! The E__a__ was reduced  ...
  { // 16
    canvaTimeState: 2,
    canvaBeakerState: 0,
    rateChartState: 1,
    isBurnerActive: false,
    catalystItemStates: [3, 3, 3],
    curCatShakingOrderIdx: 1,
    showCatalystMoveItem: false,
    energyProfileChartState: 2,
    isDisableNextButton: false,
    initGasCounts: false,
  },
  // 17   Take a look at the linear  ...
  { // 17
    canvaTimeState: 3,
    canvaBeakerState: 0,
    rateChartState: 1,
    isBurnerActive: false,
    catalystItemStates: [3, 3, 3],
    curCatShakingOrderIdx: 1,
    showCatalystMoveItem: false,
    energyProfileChartState: 2,
    isDisableNextButton: false,
    initGasCounts: false,
  },
  // 18   Points of that graph are ...
  { // 18
    canvaTimeState: 3,
    canvaBeakerState: 0,
    rateChartState: 1,
    isBurnerActive: false,
    catalystItemStates: [3, 3, 3],
    curCatShakingOrderIdx: 1,
    showCatalystMoveItem: false,
    energyProfileChartState: 2,
    isDisableNextButton: false,
    initGasCounts: false,
  },
  // 19   Let's try to produce C....
  { // 19
    canvaTimeState: 0,
    canvaBeakerState: 1,
    rateChartState: 1,
    isBurnerActive: true,
    catalystItemStates: [3, 3, 3],
    curCatShakingOrderIdx: 1,
    showCatalystMoveItem: false,
    energyProfileChartState: 2,
    isDisableNextButton: true,
    initGasCounts: false,
    valueFire: 425,
  },
  // 20   Perfect! Successful collisions ...
  { // 20
    canvaTimeState: 1,
    canvaBeakerState: 1,
    rateChartState: 1,
    isBurnerActive: true,
    catalystItemStates: [3, 3, 3],
    curCatShakingOrderIdx: 1,
    showCatalystMoveItem: false,
    energyProfileChartState: 2,
    isDisableNextButton: false,
    initGasCounts: false,
  },
  // 21   It's all done! All of ...
  { // 21
    canvaTimeState: 2,
    canvaBeakerState: 2,
    rateChartState: 1,
    isBurnerActive: true,
    catalystItemStates: [3, 3, 3],
    curCatShakingOrderIdx: 1,
    showCatalystMoveItem: false,
    energyProfileChartState: 2,
    isDisableNextButton: false,
    initGasCounts: false,
  },
  // 22   Let's try that out! ...
  { // 22
    canvaTimeState: 3,
    canvaBeakerState: 0,
    rateChartState: 1,
    isBurnerActive: false,
    catalystItemStates: [4, 4, 4],
    curCatShakingOrderIdx: 1,
    showCatalystMoveItem: false,
    energyProfileChartState: 0,
    isDisableNextButton: false,
    initGasCounts: true,
    valueFire: 425,
  },
  // 23   Perfect! Now shake the ...
  { // 23
    canvaTimeState: 3,
    canvaBeakerState: 0,
    rateChartState: 1,
    isBurnerActive: false,
    catalystItemStates: [3, 3, 3],
    curCatShakingOrderIdx: 1,
    showCatalystMoveItem: true,
    energyProfileChartState: 0,
    isDisableNextButton: false,
    initGasCounts: true,
  },
  // 24   Look! The E__a__ was ...
  { // 24
    canvaTimeState: 3,
    canvaBeakerState: 0,
    rateChartState: 1,
    isBurnerActive: false,
    catalystItemStates: [3, 3, 3],
    curCatShakingOrderIdx: 2,
    showCatalystMoveItem: false,
    energyProfileChartState: 2,
    isDisableNextButton: false,
    initGasCounts: false,
  },
  // 25   Let's try to produce C ...
  { // 25
    canvaTimeState: 3,
    canvaBeakerState: 1,
    rateChartState: 1,
    isBurnerActive: true,
    catalystItemStates: [3, 3, 3],
    curCatShakingOrderIdx: 2,
    showCatalystMoveItem: false,
    energyProfileChartState: 2,
    isDisableNextButton: true,
    initGasCounts: false,
    valueFire: 425,
  },
  // 26   Perfect! Successful collisions ...
  { // 26
    canvaTimeState: 3,
    canvaBeakerState: 1,
    rateChartState: 1,
    isBurnerActive: true,
    catalystItemStates: [3, 3, 3],
    curCatShakingOrderIdx: 2,
    showCatalystMoveItem: false,
    energyProfileChartState: 2,
    isDisableNextButton: false,
    initGasCounts: false,
  },
  // 27   It's all done! All of ...
  { // 27
    canvaTimeState: 3,
    canvaBeakerState: 2,
    rateChartState: 1,
    isBurnerActive: true,
    catalystItemStates: [4, 4, 4],
    curCatShakingOrderIdx: 2,
    showCatalystMoveItem: false,
    energyProfileChartState: 2,
    isDisableNextButton: false,
    initGasCounts: false,
  },
  // 28   Let's try that out! ...
  { // 28
    canvaTimeState: 3,
    canvaBeakerState: 0,
    rateChartState: 1,
    isBurnerActive: false,
    catalystItemStates: [3, 3, 3],
    curCatShakingOrderIdx: 2,
    showCatalystMoveItem: true,
    energyProfileChartState: 0,
    isDisableNextButton: false,
    initGasCounts: true,
    valueFire: 425,
  },
  // 29   Look! The E__a__ was ...
  { // 29
    canvaTimeState: 3,
    canvaBeakerState: 0,
    rateChartState: 1,
    isBurnerActive: false,
    catalystItemStates: [3, 3, 3],
    curCatShakingOrderIdx: 3,
    showCatalystMoveItem: false,
    energyProfileChartState: 2,
    isDisableNextButton: false,
    initGasCounts: false,
    valueFire: 425,
  },
  // 30   Let's try to produce ...
  { // 30
    canvaTimeState: 3,
    canvaBeakerState: 1,
    rateChartState: 1,
    isBurnerActive: true,
    catalystItemStates: [3, 3, 3],
    curCatShakingOrderIdx: 3,
    showCatalystMoveItem: false,
    energyProfileChartState: 2,
    isDisableNextButton: true,
    initGasCounts: false,
    valueFire: 425,
  },
  // 31   Perfect! Successful collisions ...
  { // 31
    canvaTimeState: 3,
    canvaBeakerState: 1,
    rateChartState: 1,
    isBurnerActive: true,
    catalystItemStates: [3, 3, 3],
    curCatShakingOrderIdx: 3,
    showCatalystMoveItem: false,
    energyProfileChartState: 2,
    isDisableNextButton: false,
    initGasCounts: false,
  },
  // 32   It's all done! All of ...
  { // 32
    canvaTimeState: 3,
    canvaBeakerState: 2,
    rateChartState: 1,
    isBurnerActive: true,
    catalystItemStates: [3, 3, 3],
    curCatShakingOrderIdx: 3,
    showCatalystMoveItem: false,
    energyProfileChartState: 2,
    isDisableNextButton: false,
    initGasCounts: false,
  },
]

export const tur_MathBlankArr = [
  [
    {
      query: '#tur_math4_1 mjx-math mjx-mn',
      nths: [1, 6, 8],
    },
  ],
  [
    {
      query: '#tur_math4_1 mjx-math mjx-mn',
      nths: [1, 6, 8],
    },
  ],
  [
    {
      query: '#tur_math4_1 mjx-math mjx-mn',
      nths: [1, 6, 8],
    },
  ],
  [
    {
      query: '#tur_math4_1 mjx-math mjx-mn',
      nths: [1, 6, 8],
    },
  ],
  [
    {
      query: '#tur_math4_1 mjx-math mjx-mn',
      nths: [1, 6, 8],
    },
  ],
  [
    {
      query: '#tur_math4_1 mjx-math mjx-mn',
      nths: [1, 6, 8],
    },
  ],
  [
    {
      query: '#tur_math4_1 mjx-math mjx-mn',
      nths: [1, 6, 8],
    },
  ],
  [
    {
      query: '#tur_math4_1 mjx-math mjx-mn',
      nths: [1, 6, 8],
    },
  ],
  [
    {
      query: '#tur_math4_1 mjx-math mjx-mn',
      nths: [1, 6, 8],
    },
  ],
  [
    {
      query: '#tur_math4_1 mjx-math mjx-mn',
      nths: [1, 6, 8],
    },
  ],
  [
    {
      query: '#tur_math4_1 mjx-math mjx-mn',
      nths: [1, 6, 8],
    },
  ],
  [
    {
      query: '#tur_math4_1 mjx-math mjx-mn',
      nths: [1, 6, 8],
    },
  ],
  [
    {
      query: '#tur_math4_1 mjx-math mjx-mn',
      nths: [1, 6, 8],
    },
  ],
  [
    {
      query: '#tur_math4_1 mjx-math mjx-mn',
      nths: [1, 6, 8],
    },
  ],
  [
    {
      query: '#tur_math4_1 mjx-math mjx-mn',
      nths: [1, 6, 8],
    },
  ],
  [
    {
      query: '#tur_math4_1 mjx-math mjx-mn',
      nths: [1, 6, 8],
    },
  ],
  [
    {
      query: '#tur_math4_1 mjx-math mjx-mn',
      nths: [1, 6, 8],
    },
  ],
  [],
  [],
  [],
  [],
  [],

  [
    {
      query: '#tur_math4_1 mjx-math mjx-mn',
      nths: [1, 6, 8],
    },
  ],
  [
    {
      query: '#tur_math4_1 mjx-math mjx-mn',
      nths: [1, 6, 8],
    },
  ],
  [],
  [],
  [],
]

// old one
export const tur_MathBlanks = [
  [
    { left: 185, top: 198, width: 30 }, //1
    { left: 24, top: 231, width: 30 },  //2
    { left: 180, top: 231, width: 30 }, //3
  ],
  [
    { left: 185, top: 198, width: 30 }, //1
    { left: 24, top: 231, width: 30 },  //2
    { left: 180, top: 231, width: 30 }, //3
  ],
  [
    { left: 185, top: 198, width: 30 }, //1
    { left: 24, top: 231, width: 30 },  //2
    { left: 180, top: 231, width: 30 }, //3
  ],
  [
    { left: 185, top: 198, width: 30 }, //1
    { left: 24, top: 231, width: 30 },  //2
    { left: 180, top: 231, width: 30 }, //3
  ],
  [
    { left: 185, top: 198, width: 30 }, //1
    { left: 24, top: 231, width: 30 },  //2
    { left: 180, top: 231, width: 30 }, //3
  ],
  [
    { left: 185, top: 198, width: 30 }, //1
    { left: 24, top: 231, width: 30 },  //2
    { left: 180, top: 231, width: 30 }, //3
  ],
  [
    { left: 185, top: 198, width: 30 }, //1
    { left: 24, top: 231, width: 30 },  //2
    { left: 180, top: 231, width: 30 }, //3
  ],
  [
    { left: 185, top: 198, width: 30 }, //1
    { left: 24, top: 231, width: 30 },  //2
    { left: 180, top: 231, width: 30 }, //3
  ],
  [
    { left: 185, top: 198, width: 30 }, //1
    { left: 24, top: 231, width: 30 },  //2
    { left: 180, top: 231, width: 30 }, //3
  ],
  [
    { left: 185, top: 198, width: 30 }, //1
    { left: 24, top: 231, width: 30 },  //2
    { left: 180, top: 231, width: 30 }, //3
  ],
  [
    { left: 185, top: 198, width: 30 }, //1
    { left: 24, top: 231, width: 30 },  //2
    { left: 180, top: 231, width: 30 }, //3
  ],
  [
    { left: 185, top: 198, width: 30 }, //1
    { left: 24, top: 231, width: 30 },  //2
    { left: 180, top: 231, width: 30 }, //3
  ],
  [
    { left: 185, top: 198, width: 30 }, //1
    { left: 24, top: 231, width: 30 },  //2
    { left: 180, top: 231, width: 30 }, //3
  ],
  [
    { left: 185, top: 198, width: 30 }, //1
    { left: 24, top: 231, width: 30 },  //2
    { left: 180, top: 231, width: 30 }, //3
  ],
  [
    { left: 185, top: 198, width: 30 }, //1
    { left: 24, top: 231, width: 30 },  //2
    { left: 180, top: 231, width: 30 }, //3
  ],
  [
    { left: 185, top: 198, width: 30 }, //1
    { left: 24, top: 231, width: 30 },  //2
    { left: 180, top: 231, width: 30 }, //3
  ],
]

export const tur_MathHighlights = [
  [
    { left: 185, top: 198, width: 30 }, //1
    { left: 24, top: 231, width: 30 },  //2
    { left: 180, top: 231, width: 30 }, //3
  ],
  [
    { left: 185, top: 198, width: 30 }, //1
    { left: 24, top: 231, width: 30 },  //2
    { left: 180, top: 231, width: 30 }, //3
  ],
  [
    { left: 185, top: 198, width: 30 }, //1
    { left: 24, top: 231, width: 30 },  //2
    { left: 180, top: 231, width: 30 }, //3
  ],
]

export const tur_MathText: any[] = [
  { // 0
    blanks: [1, 6, 7],
  },
  { // 1
    blanks: [1, 6, 7],
  },
  {
    blanks: [1, 6, 7],
  },
  {
    blanks: [1, 6, 7],
  },
  {
    blanks: [1, 6, 7],
  },
  { // 5
    blanks: [1, 6, 7],
  },
  { // 6
    blanks: [1, 6, 7],
  },
  { // 7
    blanks: [1, 6, 7],
  },
  { // 8
    blanks: [1, 6, 7],
  },
  { // 9
    blanks: [1, 6, 7],
  },
  { // 10
    blanks: [1, 6, 7],
  },
  { // 11
    blanks: [1, 6, 7],
  },
  { // 12
    blanks: [1, 6, 7],
  },
  { // 13
    blanks: [1, 6, 7],
  },
  { // 14
    blanks: [1, 6, 7],
  },
  { // 15
    blanks: [1, 6, 7],
  },
  { // 16
  },
  { // 17
  },
  { // 18
  },
  { // 19
  },
  { // 20
  },
  { // 21
  },
  { // 22
    blanks: [1, 6, 7],
  },
  { // 23
  },
  { // 24
  },
  { // 25
  },
  { // 26
  },
  { // 27
  },
  { // 28
  },
  { // 29
  },
  { // 30
  },
  { // 31
  },
  { // 32
  },
  { // 33
  },
  { // 34
  },
  { // 35
  },
  { // 36
  },
  { // 37
  },
]


export const maxStep_Kinetics = tur_Text.length // 23 steps

export const chooseMenuItems = [
  { title: 'Zero Order Reactions' },
  { title: 'First Order Reactions' },
  { title: 'Second Order Reactions' },
]
