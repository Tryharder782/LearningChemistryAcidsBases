import { QuizItemType } from '../../../helper/types';

export const quizData: QuizItemType[] = [
  {
    id: "ENERGYPROFILE-1",
    question: "What is the concept of Activation Energy (E_a_)?",
    correctAnswer: {
      answer: "Activation Energy is the one that must be provided to compounds to result in a chemical reaction",
      explanation: `
          This is the definition of Activation Energy. It's the one that's required for a chemical reaction \
          to take place.
          `
    },
    otherAnswers: [
      {
        answer: "Activation Energy is the one that a molecule possesses due to its motion",
        explanation: "That would be closer to the concept of Kinetics Energy."
      },
      {
        answer: "Activation Energy is the one released or consumed when one mole of a substance is created under standard conditions from its pure elements",
        explanation: "That would be closer to the concept of Standard Enthalpy of Formation."
      },
      {
        answer: "Activation Energy is the one stored in the bonds of chemical compounds (atoms and molecules)",
        explanation: "That would be closer to the concept of Chemical Energy."
      }
    ],
    difficulty: '.easy',
  },
  {
    id: "ENERGYPROFILE-2",
    question: `
      Consider the energy diagram below. By adding the catalyst, this one has created a new pathways that's being \
      represented by the red line (line 2) in the diagram. How exactly does this make the reaction faster?
      `,
    correctAnswer: {
      answer: `
          By the addition of the catalyst, another pathway is created which requires \
          much less energy for A and B to finally produce C
          `,
      explanation: `
          The red line represents a pathway that the catalyst created which requires a \
          lot less energy for the reactants A and B to follow and become C.
          `
    },
    otherAnswers: [
      {
        answer: `
              By the addition of the catalyst, two pathways have been created for A and \
              B to follow to produce C.
              `,
        explanation: `
              Even though another pathway has been indeed created by the addition of \
              the catalyst, A and B reactants wouldn't follow both pathways, but only \
              the one with much less energy.
              `
      },
      {
        answer: "Adding the catalyst results in an increment of the temperature of the system, making the heat to increase as well.",
        explanation: `
              The heat difference between reactants (A and B) and product (C) remains \
              the same even when the hump is lowered.
              `
      },
      {
        answer: "Adding the catalyst makes the products to be at a lower state of energy, so it's easier for the reaction to reach.",
        explanation: `
              The product state of energy stays the same, the only thing that was \
              lowered is the activation energy represented by the hump of the diagram.
              `
      }
    ],
    difficulty: '.easy,',
    image: {
      image: "energy-profile-reaction-profile",
      label: `
          A reaction profile for an endothermic reaction (A + B to C), \
          where the hump for line 2 is much below the hump of line 1. Line 2 starts and ends at the same energy level as line 1.
          `
    }
  },
  {
    id: "ENERGYPROFILE-3",
    question: `
      Take a look at the energy diagram below that represents the pathway of a reaction. \
      The steps of the pathway are numbered:

      1: reactants, and 7: products. Fill the rest of the numbers accordingly.
      `,
    correctAnswer: {
      answer: `
          1: Reactants, 2: Transition State, 3: Intermediate, 4: Transition State, \
          5: Intermediate, 6: Transition State, 7: Products
          `,
      explanation: `
          All energy profiles follow this order: reactants, transition state, products. \
          In this case there is an intermediate, so there would be two transition states.
          `
    },
    otherAnswers: [
      {
        answer: `
              1: Reactants, 2: Reactants, 3: Intermediate, 4: Transition State, \
              5: Intermediate, 6: Products, 7: Products
              `,
        explanation: `
              The reaction mechanism has at least three transition states which are \
              represented by the peaks of the diagram. Also, nothing formed along the \
              pathway are reactants or products.
              `
      },
      {
        answer: `
              1: Reactants, 2: Intermediate, 3: Transition State, 4: Intermediate, \
              5: Transition State, 6: Intermediate, 7: Products
              `,
        explanation: `
              The peaks represent the transition state and not the intermediate.
              `
      },
      {
        answer: `
              1: Reactants, 2: Transition State, 3: Intermediate, 4: Intermediate, \
              5: Intermediate, 6: Transition State, 7: Products
              `,
        explanation: `
              The intermediates (represented by the valleys) are always followed by \
              another transition state. Not every reaction has intermediates.
              `
      }
    ],
    difficulty: '.hard,',
    image: {
      image: "energy-profile-reaction-pathway",
      label: `
          Reaction profile diagram with 3 peaks and 2 valleys, which are labelled from 1 to 7.

          1: Start of reaction
          2: First peak
          3: First valley
          4: Second peak
          5: Second valley
          6: Third peak
          7: End of reaction, at a low energy
          `
    }
  },
  {
    id: "ENERGYPROFILE-4",
    question: `
      Consider the following reactions and scenarios, and choose the one that would most \
      likely have the lowest activation energy to overcome:
      `,
    correctAnswer: {
      answer: "A reaction like H^+^ + OH^-^ ➝ H_2_O in the presence of a catalyst",
      answerLabel: "A reaction like H^+^, + OH^-^, yields H_2_O, in the presence of a catalyst",
      explanation: `
          Correct, because in general, comparing both reactions, the formation of water \
          by its ions $(H^+^ + OH^-^ ➝ H_2_O_3_)$ is spontaneous while the formation of \
          nitrogen monoxide $(N_2_ + O_2_ ➝ 2NO)$ is non-spontaneous, so from the get-go, \
          the spontaneous reaction would have a lower activation energy. Also, adding a \
          catalyst lowers the activation energy of the reaction.
          `,
      explanationLabel: `
          Correct, because in general, comparing both reactions, the formation of water \
          by its ions $(H^+^ + OH^-^, yields H_2_O_3_)$ is spontaneous while the formation of \
          nitrogen monoxide $(N_2_ + O_2_ ➝ 2NO)$ is non-spontaneous, so from the get-go, \
          the spontaneous reaction would have a lower activation energy. Also, adding a \
          catalyst lowers the activation energy of the reaction.
          `
    },
    otherAnswers: [
      {
        answer: "A reaction like N_2_ + O_2_ ➝ 2NO without any catalyst",
        explanation: `
              The formation of nitrogen monoxide $(N_2_ + O_2_ ➝ 2NO)$ is a \
              non-spontaneous reaction.
              `
      },
      {
        answer: "A reaction like H^+^ + OH^-^ ➝ H_2_O without any catalyst",
        explanation: `
              The formation of water by its ions $(H^+^ + OH^-^ ➝ H_2_O)$ is spontaneous \
              but being in the presence of a catalyst would make the reaction faster.
              `
      },
      {
        answer: " A reaction like N_2_ + O_2_ ➝ 2NO in the presence of a catalyst",
        explanation: `
              The formation of nitrogen monoxide $(N_2_ + O_2_ ➝ 2NO)$ is a non-spontaneous \
              reaction, so even with the addition of a catalyst, its activation energy \
              would most likely still be higher than other choices.
              `
      }
    ],
    difficulty: '.hard',
  },
  {
    id: "ENERGYPROFILE-5",
    question: `
      Consider a first order reaction as: $R ➝ Products$.

      In which scenario is it most likely for the reaction to have a higher rate of reaction?
      `,
    correctAnswer: {
      answer: "[R] = 0.200M @70°C",
      explanation: `
          This option has the highest concentration of R and also the highest \
          temperature, those conditions would boost the rate of the reaction.
          `
    },
    otherAnswers: [
      {
        answer: "[R] = 0.030M @5°C",
        explanation: `
              Take into account the rate law equation for a first order reaction, \
              $rate = k[R]$, the lower the concentration of R, then the lower the rate \
              of the reaction too. Also, take into account the Arrhenius equation, \
              $k = Ae^(-Ea/RT)^$. The lower the temperature, then the lower the rate \
              constant, which ultimately results in a lower rate of reaction.
              `,
        explanationLabel: `
              Take into account the rate law equation for a first order reaction, \
              rate = k[R], the lower the concentration of R, then the lower the rate \
              of the reaction too. Also, take into account the Arrhenius equation, \
              k = A, times e^(-EA/RT)^. The lower the temperature, then the lower the rate \
              constant, which ultimately results in a lower rate of reaction.
              `
      },
      {
        answer: "[R] = 0.030M @70°C",
        explanation: `
              Take into account the rate law equation for a first order reaction, \
              $rate = k[R]$. The lower the concentration of R, then the lower the rate of \
              the reaction too.
              `
      },
      {
        answer: "[R] = 0.200M @5°C",
        explanation: `
              Take into account the Arrhenius equation, $k = Ae^(-Ea/RT)^$. The lower \
              the temperature, then the lower the rate constant, which ultimately results \
              in a lower rate of reaction.
              `,
        explanationLabel: `
              Take into account the Arrhenius equation, k = A, times e^(-EA/RT)^. The lower \
              the temperature, then the lower the rate constant, which ultimately results \
              in a lower rate of reaction.
              `
      }
    ],
    difficulty: '.easy',
  },
  {
    id: "ENERGYPROFILE-6",
    question: `
      There are different types of catalysts and are often classified according to their state \
      of matter in relation with the reactants/products. The ozone layer is getting destroyed \
      following this reaction:

      $O_3(g)_ → O_(g)_ + O_2(g)_$

      One of the main catalysts that makes this reaction much faster than usual is \
      the CFC gas that's used extensively in aerosols, air conditioners, refrigerators, etc.

      What type of catalyst would this be?
      `,
    questionLabel: `
      There are different types of catalysts and are often classified according to their state \
      of matter in relation with the reactants/products. The ozone layer is getting destroyed \
      following this reaction:

      $O_3(g)_, yields O_(g)_ + O_2(g)_$.

      One of the main catalysts that makes this reaction much faster than usual is \
      the CFC gas that's used extensively in aerosols, air conditioners, refrigerators, etc.

      What type of catalyst would this be?
      `,
    correctAnswer: {
      answer: "Homogeneous catalyst",
      explanation: `
          Since both the catalyst CFC and the compounds (ozone and oxygen) are gaseous, \
          it's said that is a homogeneous catalyst.
          `
    },
    otherAnswers: [
      {
        answer: "Heterogeneous catalyst",
        explanation: `
              Heterogeneous catalysts are those that are in a different state of matter in \
              relation with the reactants and products of the reaction.
              `
      },
      {
        answer: "Enzymatic catalyst",
        explanation: `
              The enzymes are proteins that act as catalysts in biochemical reactions, and are \
              often called enzymatic catalysts.
              `
      },
      {
        answer: "Acid-base catalyst",
        explanation: `
              Acid-Base catalysts are those that are either an acid (H^+^ ion) or a base (OH^-^ ion).
              `
      }
    ],
    difficulty: '.easy',
  },
  {
    id: "ENERGYPROFILE-7",
    question: `
      Determine which of the compounds in the following mechanisms are neither reactants nor products of the overall reaction:

      Step 1: A_2_ + B ➝ A + AB
      Step 2: AB + 2C ➝ A + BC_2_
      Step 3: A + D ➝ AD
      Step 4: A + AD ➝ A_2_ + D
      `,
    questionLabel: `
      Determine which of the compounds in the following mechanisms are neither reactants nor products of the overall reaction:

      Step 1: A_2_ + B, yields A + AB.
      Step 2: AB + 2C, yields A + BC2.
      Step 3: A + D, yields AD.
      Step 4: A + AD, yields A_2_ + D.
      `,
    correctAnswer: {
      answer: "A2, A, AB, AD, D",
      explanation: `
          The easiest way to determine the overall reaction is by summing up all steps and cancel out all of those \
          species that repeat themselves in both reactant and product sides:

          A_2_ + A + A + AB + B + 2C + AD + D ➝ A_2_ + A + A + AB + BC_2_ + AD + D

          Canceling, we get:

          B + 2C ➝ BC_2_. Being that overall reaction, the remaining of the compounds would be the intermediates.
          `,
      explanationLabel: `
          The easiest way to determine the overall reaction is by summing up all steps and cancel out all of those \
          species that repeat themselves in both reactant and product sides:

          A_2_ + A + A + AB + B + 2C + AD + D, yields, A_2_ + A + A + AB + BC_2_ + AD + D

          Canceling, we get:

          B + 2C yields BC_2_. Being that the overall reaction, the remaining of the compounds would be the intermediates.
          `
    },
    otherAnswers: [
      {
        answer: "B, C, BC_2_",
        explanation: `
              On the contrary, B, C and BC_2_ are all part of the overall reaction.
              `
      },
      {
        answer: "A_2_, A, AB, AD, BC_2_",
        explanation: `
              BC_2_ only appears once in the products side of all the steps, meaning that is an actual \
              product of the overall reaction.
              `
      },
      {
        answer: "A_2_, A, B, AD, D",
        explanation: `
              B only appears once in the reactants side of all the steps, meaning that is an actual \
              reactant of the overall reaction.
              `
      }
    ],
    difficulty: '.easy',
  },
  {
    id: "ENERGYPROFILE-8",
    question: `
      A catalyst is a substance that is used to boost the rate of reactions to ultimately produce \
      faster the desirable products. Knowing this, does the catalyst take part of the reactions?
      `,
    correctAnswer: {
      answer: `
          Yes, it takes part in the reaction. It reacts in steps of the reaction, without \
          actually being neither a reactant nor a product of the overall reaction.
          `,
      explanation: `
          The catalyst can participate in the reaction as an intermediate that \
          generates a "faster" pathway for the reaction to take. In some cases, it \
          participates in other ways, like physically serving as a surface to \
          increase the surface area where the reaction takes place.
          
          `
    },
    otherAnswers: [
      {
        answer: `
              Yes, it takes part in the reaction. It acts as a reactant of the reaction and increases the speed of it
              `,
        explanation: `
              The catalyst can participate in the reaction but not as a reactant of the overall reaction \
              but as an intermediate that generates another pathway for the reaction to follow for faster production.
              `
      },
      {
        answer: `
              No, it doesn't take part in the reaction. Catalysts are very low energized \
              molecules that absorb the energy of the reactants, lowering the activation energy
              `,
        explanation: `
              The catalyst energy state has little to do with its function. Catalysts provide \
              an alternative pathway that's more efficient for the reactants because it requires \
              less energy.
              `
      },
      {
        answer: `
              Yes, it takes part in the reaction. It creates one more pathway, making the reaction \
              to go faster now because it has two pathways instead of just one
              `,
        explanation: `
              The catalyst does offer an alternative pathway, but it doesn't mean the reaction is \
              faster because of the number of pathways, but because the new pathway is supposed to \
              be much more efficient.
              `
      }
    ],
    difficulty: '.medium',
  },
  {
    id: "ENERGYPROFILE-9",
    question: `
      Consider two reactions (reaction 1 and reaction 2). The black line (1) in the energy diagram \
      below represents reaction 1 and the red line (2) represents reaction 2. What is a true statement?
      `,
    correctAnswer: {
      answer: `
          The activation energy of reaction 1 is the same one as the activation energy \
          of reaction 2
          `,
      explanation: `
          The activation energy in the diagram is represented by the difference between \
          the energy state at which the reactants are and the energy state at which an \
          activated complex is formed to later become the products. In this diagram, that \
          difference is the same for both reactions, so they have the same activation energy.
          `
    },
    otherAnswers: [
      {
        answer: `
              Reaction 1 was the original pathway for a reaction, which after a catalyst was \
              added, became inefficient because reaction 2 is a pathway that results in a \
              faster formation of the products
              `,
        explanation: `
              Cannot be true as a catalyst only lowers the activation energy, it doesn't \
              lower the final energy of the reaction. Practically speaking, if a catalyst \
              was added to a reaction, it would lower the hump in the diagram and not the \
              products too.
              `
      },
      {
        answer: `
              The heat released in the reaction 1 is the same one as the heat in reaction 2
              `,
        explanation: `
              Even though both reactions are in fact exothermic, and do release heat when \
              taking place, this heat is the difference between the energy state of the \
              reactants and the energy state of the products, which is higher for the \
              reaction 1, because the reactants start at a higher point of energy.
              `
      },
      {
        answer: `
              Reaction 1 and reaction 2 have different reactants but end up with the same products
              `,
        explanation: `
              The reactions in the diagram might very well be different reactions entirely. \
              This is an energy diagram, so it only represents the energy in every step of \
              the pathway for both reactions. However, they do end up with products that \
              are in the same energy state.
              `
      }
    ],
    difficulty: '.hard,',
    image: {
      image: "energy-profile-reaction-profile-2",
      label: `
          Energy profile chart with two lines, 1 and 2, each with a single hump.
          Reactants of line 1 have a higher energy than line 2, and the hump for line 1 \
          is higher than line 2 by the same amount. Both lines have the same energy level for \
          the products, which is lower than the reactant energy levels.
          `
    }
  },
  {
    id: "ENERGYPROFILE-10",
    question: `
      A reaction $(2AB + C_2_ ➝ 2C_2_B)$ has the proposed mechanism:

      Step 1: AB + AB ➝ A_2_B_2_ (fast)
      Step 2: A_2_B_2_ + C_2_ ➝ A_2_B + C_2_B (slow)
      Step 3: A_2_B + C_2_ ➝ A_2_ + C_2_B (fast)

      What is the rate law of the overall equation and which one would be the \
      rate-determining step?
      `,
    questionLabel: `
      A reaction 2 AB, + C_2_, yields 2C_2_B,  has the proposed mechanism:

      Step 1: AB + AB, yields A_2_B_2_ (fast).
      Step 2: A_2_B_2_, + C_2_, yields A_2_B, + C_2_B (slow).
      Step 3: A_2_B, + C_2_, yields A_2_, + C_2_B (fast).

      What is the rate law of the overall equation and which one would be the \
      rate-determining step?
      `,
    correctAnswer: {
      answer: `
          The rate law of the reaction is $rate=k[AB]^2^[C_2_]$ and the \
          rate-determining step is step 2.
          `,
      answerLabel: `
          The rate law of the reaction is rate = k, times [AB]^2^, times [C_2_], and the \
          rate-determining step is step 2.
          `,
      explanation: `
          The rate-determining step would be the slowest step, which in this case is \
          step 2 $(A_2_B_2_ + C_2_ ➝ A_2_B + C_2_B)$. The rate law equation would be \
          determined by this step, being $rate = k[A_2_B_2_][C_2_]$. However, A_2_B_2_ \
          is neither a reactant nor a product of the overall reaction, so it has to be \
          substituted by the reactants from which it comes $(AB + AB ➝ A_2_B_2_)$. \
          $Rate = k[AB]^2^[C_2_]$.
          `,
      explanationLabel: `
          The rate-determining step would be the slowest step, which in this case is \
          step 2 (A_2_B_2_ + C_2_, yields A_2_B + C_2_B). The rate law equation would be \
          determined by this step, being rate = k, times [A_2_B_2_], times [C_2_]. \
          However, A_2_B_2_ is neither a reactant nor a product of the overall reaction, so it has to be \
          substituted by the reactants from which it comes (AB + AB, yields A_2_B_2_). \
          Rate = k, times [AB]^2^, times [C_2_].
          `
    },
    otherAnswers: [
      {
        answer: `
              The rate law of the reaction is $rate=k[A_2_B_2_][C_2_]$ and the \
              rate-determining step is step 2.
              `,
        answerLabel: `
              The rate law of the reaction is rate = k, times [A_2_B_2_], times [C_2_] and the \
              rate-determining step is step 2.
              `,
        explanation: `
              Step 2 is indeed the rate-determining step, but A_2_B_2_ is not a reactant \
              of the overall reaction but rather an intermediate, so it cannot be part \
              of the rate law equation.
              `
      },
      {
        answer: `
              The rate law of the reaction is $rate=k[AB]^2^$ and the rate-determining \
              step is step 1.
              `,
        answerLabel: `
              The rate law of the reaction is rate = k, times [AB]^2^, and the rate-determining \
              step is step 1.
              `,
        explanation: `
              The rate-determining step would be the slowest of the steps, because the \
              reaction cannot go faster than the slowest of the steps. Since step 1 is a \
              fast one, then it cannot be the rate determining step.
              `
      },
      {
        answer: `
              The rate law of the reaction is $rate=k[A_2_B][C_2_]$ and the \
              rate-determining step is step 3
              `,
        answerLabel: `
              The rate law of the reaction is rate = k, times [A_2_B], times [C_2_], and the \
              rate-determining step is step 3
              `,
        explanation: `
              Since step 3 is not the slowest of the steps, then it isn't the \
              rate-determining step. Besides that, A_2_B is not part of the overall \
              reaction, so it can't be part of the rate law equation.
              `
      }
    ],
    difficulty: '.hard',
  },
  {
    id: "ENERGYPROFILE-11",
    question: `
      An experiment was conducted to test two different catalysts: catalyst A and \
      catalyst B. Both were tested for the same reaction at different temperatures. \
      Wether the reactants completely transformed into the products was also registered \
      in the table below:
      `,
    correctAnswer: {
      answer: `
          Catalyst B is the most effective one because it takes less energy for the \
          reaction to go to completion when the catalyst is present.
          `,
      explanation: `
          Raising the temperature is one way to make energy enter the reaction for it to \
          take place. Catalysts are supposed to lower the energy required by the reaction \
          (activation energy) so if the reaction went to completion at 400K in the \
          presence of the catalyst B, it means that it needed less energy than when the \
          reaction was in presence of the catalyst A.
          `
    },
    otherAnswers: [
      {
        answer: `
              Catalyst A is the most effective one because it resulted in a higher temperature for the reaction
              `,
        explanation: `
              Catalyst A didn't "result in a higher temperature". The temperature had to \
              be increased to 420K for the reaction to go to completion when adding catalyst A.
              `
      },
      {
        answer: `
              Catalyst B is the most effective one because it made the reaction go to \
              completion in both temperature points 420K and 400K.
              `,
        explanation: `
              Catalyst B isn't the most effective one because of that, the important \
              thing is the actual temperature at which the reaction takes place in the \
              presence of the catalyst.
              `
      },
      {
        answer: `
              There's no way to know in these few experiments which one of the catalysts \
              is the most effective one.
              `,
        explanation: `
              It's totally possible to determine which catalyst is the most effective \
              one by comparing the energy required for it to go to completion in the \
              presence of the catalysts.
              `
      }
    ],
    difficulty: '.medium,',
    table: {
      rows: [
        ["Catalyst", "Reaction temperature", "Reaction completed?"],
        ["A", "400K", "No"],
        ["A", "420K", "Yes"],
        ["B", "400K", "Yes"],
        ["B", "420K", "Yes"]
      ]
    }
  },
  {
    id: "ENERGYPROFILE-12",
    question: `
      Consider the following reaction diagram. Which of the elementary steps requires \
      less energy to take place?
      `,
    correctAnswer: {
      answer: "Section 1-2-3",
      explanation: `
          In the diagram, the difference between where the reaction starts with reactants \
           and the peak of the hump \
          is the activation energy, or what is the same, the energy barrier to overcome.

          For 5 to get to 7, the activation energy is the difference between 5 and 6, \
          which is the highest of all the elementary steps.

          For 3 to get to 5 (products), the activation energy is the difference between 3 \
          and 4, which is not large enough compared to other steps.

          Finally, for 1 (reactants) to get to 3, the activation energy is the difference \
          between 1 and 2, which since it is the smallest, it means it has a very low \
          activation energy.

          We get then that: Section 5-6-7 > Section 3-4-5 > Section 1-2-3. Notice how the \
          activation energy doesn't depend on the product side of the hump, but only on \
          the reactants side.
          `,
      explanationLabel: `
          In the diagram, the difference between where the reaction starts with reactants \
           and the peak of the hump \
          is the activation energy, or what is the same, the energy barrier to overcome.

          For 5 to get to 7, the activation energy is the difference between 5 and 6, \
          which is the highest of all the elementary steps.

          For 3 to get to 5 (products), the activation energy is the difference between 3 \
          and 4, which is not large enough compared to other steps.

          Finally, for 1 (reactants) to get to 3, the activation energy is the difference \
          between 1 and 2, which since it is the smallest, it means it has a very low \
          activation energy.

          We get then that: section 5 6 7 is bigger than section 3 4 5, which is bigger than \
          section 1 2 3. Notice how the activation energy doesn't depend on the product side of the hump, \
          but only on the reactants side.
          `
    },
    otherAnswers: [
      {
        answer: "Section 3-4-5",
        answerLabel: "Section 3 4 5",
        explanation: `
              For 3 to get to 5 (products), the activation energy is the difference between 3 and 4, \
              which is not large enough compared to other steps.
              `
      },
      {
        answer: "Section 5-6-7",
        answerLabel: "Section 5 6 7",
        explanation: `
              For 5 to get to 7, the activation energy is the difference between 5 and 6, which is the \
              highest of all the elementary steps.
              `
      },
      {
        answer: "Cannot be determined",
        explanation: `
              The energy profile or diagram of a reaction mechanism would be enough to determine at \
              least the activation energy of each step.
              `
      }
    ],
    difficulty: '.medium,',
    image: {
      image: "energy-profile-reaction-coordinate",
      label: `
          Energy profile of an exothermic reaction, with 3 peaks and two valleys, and 7 points labelled from 1 to 7.
          1: Start of reaction, at a high energy.
          2: First peak, very small increase from point 1.
          3: First valley, very large drop from point 2.
          4: Second peak, moderate increase from point 3.
          5: Second peak, very small drop from point 4.
          6: Third peak, very large increase from point 5.
          7: End of reaction, very large drop from point 6.
          `
    }
  },
  {
    id: "ENERGYPROFILE-13",
    question: `
      Reactants molecules can collide without resulting in the formation of the products \
      of the reaction. What has to happen in order for the collision to be successful?
      `,
    correctAnswer:
    {
      answer: `
              The molecules colliding have to be specifically oriented while also having \
              enough energy to overcome the activation energy
              `,
      explanation: `
              Both the orientation and the kinetic energy of the molecules are factors that \
              are required for a successful collision to take place.
              `
    },
    otherAnswers: [
      {
        answer: "The molecules colliding have to be different from each other for them produce a new molecule",
        explanation: `
              The same type of molecule can collide to produce a new one. (For example, 2A ➝ A_2_).
              `
      },
      {
        answer: `
              The molecules colliding have to have the same number of atoms
              `,
        explanation: `
              The number of atoms is not relevant when it comes to the conditions required for a \
              successful collision to happen. (For example, A + 2B ➝ AB_2_).
              `
      },
      {
        answer: `
              The molecules colliding have to be in the same state of matter.
              `,
        explanation: `
              Is not true, the molecules don't have to be in any particular state of \
              matter for a successful collision to occur.
              `
      }
    ],
    difficulty: '.easy',
  },
  {
    id: "ENERGYPROFILE-14",
    question: `
      Consider a reaction represented by the energy diagram below. What is a true statement \
      about this reaction?
      `,
    correctAnswer: {
      answer: "The reaction has four transition states and the overall reaction releases energy",
      explanation: `
          At a first glance it's noticeable that the reaction has four humps that represent the transition \
          state, meaning that it has four steps (four elementary reactions that compose the overall \
          reaction). Reactants started at a higher energy state in comparison to the energy of the final \
          products, meaning that energy was released, making the reaction exothermic.
          `
    },
    otherAnswers: [
      {
        answer: "The reaction has four intermediates and the overall reaction releases energy",
        explanation: `
              The four humps represent the transition state, not the intermediates
              `
      },
      {
        answer: "The reaction has four transition state and the overall reaction absorbs energy",
        explanation: `
              The reactants start at a higher energy state than the products, so the difference is \
              negative, making the reaction exothermic.
              `
      },
      {
        answer: "The reaction has four intermediates and the overall reaction absorbs energy",
        explanation: `
              Try comparing the points of energy at which the diagram starts and end, and take into \
              account the humps represent the transition state.
              `
      }
    ],
    difficulty: '.easy,',
    image: {
      image: "energy-profile-reaction-profile-3",
      label: `
          Energy profile diagram with four peaks and three valleys, where the products energy state is \
          less than the reactants energy state.
          `
    }
  },
  {
    id: "ENERGYPROFILE-15",
    question: `
      Consider a first order reaction (A ➝ B). What is an action you can take to increase \
      the speed of the reaction?
      `,
    correctAnswer: {
      answer: "All of the above",
      explanation: `
          All these actions may lead to an improvement on the rate of the reaction, \
          forming products at a much higher rate in most cases.
          `,
      position: '.D'
    },
    otherAnswers: [
      {
        answer: "Increase the temperature of the reaction",
        explanation: `
              A way to increase the kinetic energy of the molecules, creating a higher \
              frequency of collisions and increasing the chances that the collisions \
              meet the energy requirements to be successful is by increasing the temperature, \
              but there are other ways to increase the rate of the reaction.
              `
      },
      {
        answer: "Add a catalyst that creates another more efficient pathway to follow",
        explanation: `
              Adding a catalyst would ultimately decrease the activation energy, making \
              the reaction to go faster, but there are other ways to increase the rate of the reaction.
              `
      },
      {
        answer: "Add more of A to the mixture to increase its concentration.",
        explanation: `
              Adding more of A, since it's a first order reaction $(rate = k[A])$, the \
              higher the concentration is, the faster the reaction will go, but there are \
              other ways to increase the rate of the reaction.
              `
      }
    ],
    difficulty: '.easy',
  },
  {
    id: "ENERGYPROFILE-16",
    question: `
      How does the temperature affect the rate of a reaction?
      `,
    correctAnswer: {
      answer: `
          Increasing the temperature would charge the molecules with a higher kinetic \
          energy so the potential energy when collision happens would be enough, or more \
          than enough, to overcome the activation energy
          `,
      explanation: `
          A high temperature will result in molecules with higher kinetic energy that \
          will result in more successful collisions.
          `
    },
    otherAnswers: [
      {
        answer: `
              Increasing the temperature would make some molecules absorb energy, making \
              them bigger so when they collide, the clash is stronger, resulting in a \
              succesful collision
              `,
        explanation: `
              Increasing the temperature will not affect the size of the molecules.
              `
      },
      {
        answer: `
              Increasing the temperature would fix the orientation of the molecules so \
              when they collide they are properly oriented and form products
              `,
        explanation: `
              Increasing the temperature would only increase the kinetic energy of the molecules.
              `
      },
      {
        answer: `
              Increasing the temperature would make the liquid evaporate thus provoking \
              a gaseous mixture in which collisions are, more often than not, successful
              `,
        explanation: `
              Increasing the temperature can ultimately in some cases lead to a change in \
              the state of matter of the compounds, but this is not the fundamental \
              relationship between temperature and the rate of a reaction.
              `
      }
    ],
    difficulty: '.medium',
  },
  {
    id: "ENERGYPROFILE-17",
    question: `
      Which one of these elementary reactions would probably be the slowest one within a mechanism?
      `,
    correctAnswer: {
      answer: "A + B + C + D ➝ E + F",
      answerLabel: "'A' + B + C + D ➝ E + F",
      explanation: `
          The slowest reaction would probably be A + B + C + D ➝ E + F, because in comparison to the \
          rest of the reactions, this one has four reactants, which implies that a successful collision \
          of 4 molecules has to take place for the reaction to occur. Since the probabilities of this \
          happening are lower, the chances of this reaction to be slower than the other ones is greater. \
          Being the slowest of all the steps, this would be the rate-determining step.
          `
    },
    otherAnswers: [
      {
        answer: "G + H + I ➝ J",
        answerLabel: "G + H + I, to J",
        explanation: `
              G + H + I, three reactants (termolecular reaction) colliding successfully is a little more \
              likely to happen than some of these other scenarios.

              `
      },
      {
        answer: "K ➝ L + M + N",
        answerLabel: "K to L + M + N",
        explanation: `
              K, being only one reactant, it doesn't even need a collision for it to take \
              place, so it should be the fastest one.
              `
      },
      {
        answer: " O + P ➝ Q",
        answerLabel: " O + P, to Q",
        explanation: `
              O + P, two reactants (bimolecular reaction) colliding successfully is more \
              likely to happen than some of these other scenarios.
              `
      }
    ],
    difficulty: '.medium',
  },
  {
    id: "ENERGYPROFILE-18",
    question: `
      Consider a reaction represented by the energy diagram below. What is a true statement \
      about this reaction?
      `,
    correctAnswer: {
      answer: `
          This is an exothermic reaction with a mechanism with an intermediate
          `,
      explanation: `
          At a first glance it's noticeable that the reaction starts with the reactants being \
          at a higher energy state than the products, meaning that the reaction is exothermic \
          since it's going to release energy. For each step an activated complex is formed, \
          but between both steps an intermediate is produced.
          `
    },
    otherAnswers: [
      {
        answer: `
              This is an endothermic reaction with a mechanism with an intermediate
              `,
        explanation: `
              The reactants start at a higher point of energy than the products, so energy is \
              being released when the reaction takes place.
              `
      },
      {
        answer: `
              This is an exothermic reaction with a mechanism with two intermediates
              `,
        explanation: `
              The valley between humps represents an intermediate, which in this particular \
              diagram there is only one.
              `
      },
      {
        answer: `
              This is an endothermic reaction with a mechanism with two intermediates
              `,
        explanation: `
              Not only there is only one intermediate but the reaction releases energy instead \
              of absorbing it.
              `
      }
    ],
    difficulty: '.medium,',
    image: {
      image: "energy-profile-energy-diagram",
      label: `
          Energy profile diagram with two humps, where the products are at a lower \
          energy state than the reactants.
          `
    }
  },
  {
    id: "ENERGYPROFILE-19",
    question: `
      What is a true statement about catalysts?
      `,
    correctAnswer: {
      answer: `
          Catalysts are called heterogeneous when they are in a different state of \
          matter compared to the reactants
          `,
      explanation: `
          Catalysts can be classified in heterogeneous (when they're in different \
          state of matter) and homogeneous (when they're the same).
          `
    },
    otherAnswers: [
      {
        answer: `
              Catalysts are part of the reactions as reactants, creating a new pathway \
              for the reactants to follow
              `,
        explanation: `
              Catalysts do create a new pathway, but are not considered reactants \
              of the overall reaction.
              `
      },
      {
        answer: `
              Catalysts provide energy to the reactants to increase the kinetic energy and \
              make successful collisions
              `,
        explanation: `
              Catalysts do not alter the energy of the reactants, but lower the activation \
              energy, making it easier for the kinetic energy of the molecules to overcome it.
              `
      },
      {
        answer: `
              Catalysts are sometimes necessary for a reaction to take place
              `,
        explanation: `
              Catalysts are never necessary for a reaction to take place. What can happen is \
              that a reaction that's so slow that seems like it's not occurring can suddenly \
              have a notorious increment on the rate of the reaction when adding a catalyst.
              `
      }
    ],
    difficulty: '.hard',
  },
  {
    id: "ENERGYPROFILE-20",
    question: `
      Consider a reaction $(A + B ➝ C)$ that is right now being represented in the energy \
      diagram below. The horizontal line indicates the average kinetic energy at which \
      the molecules are right now. What is false about this reaction at this point?
      `,
    questionLabel: `
      Consider a reaction $(A + B ➝ C)$ that is right now being represented in the energy \
      diagram below. The horizontal line indicates the average kinetic energy at which \
      the molecules are right now. What is false about this reaction at this point?
      `,
    correctAnswer: {
      answer: `
          The average kinetic energy is more than the energy state of both the reactants \
          and products, which means that molecules of A and B are colliding to ultimately \
          form molecules of C
          `,
      explanation: `
          The average kinetic energy is in fact above the energy state of the reactants \
          and products, but is not enough to surpass the activation energy, so no \
          molecules of C are being produced.
          `
    },
    otherAnswers: [
      {
        answer: `
              The average kinetic energy surpasses the energy state of the molecules of \
              C at the end of the reaction
              `,
        explanation: `
              The average kinetic energy is higher than the energy at which the molecules \
              of C will end up once they're produced, which at the same time is a higher \
              energy state than the one the reactants A and B are at. This means this is \
              an endothermic reaction, because it absorbs energy.
              `
      },
      {
        answer: `
              The average kinetic energy is insufficient to meet the requirements \
              (activation energy), making molecules of A and B collide unsuccessfully
              `,
        explanation: `
              The activation energy is represented by the peak, and the average kinetic \
              energy is below it, meaning that is not sufficient just yet for \
              succesful collisions to happen.
              `
      },
      {
        answer: `
              The average kinetic energy can be increased in the presence of high temperatures
              `,
        explanation: `
              The average kinetic energy is just a way to represent the energy at which \
              the molecules are moving, and when the temperature is increased, this \
              can lead to faster molecules.
              `
      }
    ],
    difficulty: '.medium,',
    image: {
      image: "energy-profile-reaction-progress",
      label: `
          Energy profile diagram with a single hump, where the product (C) is at a higher \
          energy state than the reactants (A and B). There is a red horizontal line below \
          the peak of the hump of the diagram and above both the energy state of the \
          products and the reactants.
          `
    }
  }
]