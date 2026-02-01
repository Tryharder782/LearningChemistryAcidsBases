import { QuizItemType } from "../../../helper/types";

export const quizData: QuizItemType[] = [
  {
    id: "COMPARISON-1",
    question: `
      For any given reaction, what would be the way to determine the rate of reaction?
      `,
    correctAnswer: {
      answer: "The rate law has to be determined experimentally",
      explanation: "The rate law has to be determined experimentally for each reaction."
    },
    otherAnswers: [
      {
        answer: "The rate law has to be determined by knowing at which temperature the reaction occurs.",
        explanation: `
              The rate law does depend on the temperature (since the constant k depends \
              on the temperature) but that doesn't mean that only knowing it is enough \
              to determine the rate law equation.
              `
      },
      {
        answer: "The rate law has to always be determined by using the coefficients of the balanced equation as the orders of each species. ",
        explanation:
          "The rate law is only determined by the coefficients of the balanced equation in the case of elementary single step reactions."
      },
      {
        answer: "The rate law has to be determined by knowing which catalysts are being used to increase the rate of the reaction.",
        explanation: `
              The rate law cannot be determined just by knowing the catalysts that are \
              being used, even though these affect the rate of the reaction.
              `
      }
    ],
    difficulty: '.easy',
  },
  {
    id: "COMPARISON-2",
    question: `
  An experiment is conducted where the absorbance of a substance X is measured through time \
  using a spectrophotometer. The data is then plotted into the three graphs that are shown \
  below. What would be the order of the reaction?
  `,
    correctAnswer: {
      answer: "First order",
      explanation: `
          For this first order reaction, the resultant integrated rate law is \
          $k = (ln[X_0_] – ln[X])/t$, that’s why a graph plotting $(ln[X] vs t)$ is a \
          straight line: $(ln[X](y) = -kt(mx) + ln[X_0_](b)))$ with a slope of -k.
          `
    },
    otherAnswers: [
      {
        answer: "Zero order",
        explanation: `
              The graph plotting [X] vs t results in a curved line. If it was a zero \
              order reaction, it would be a straight line.
              `
      },
      {
        answer: "Second order",
        explanation: `
              The graph plotting $1/[X]$ vs t results in a curved line. If it was a zero \
              order reaction, it would be a straight line.
              `
      },
      {
        answer: "Insufficient data",
        explanation: `
              There is enough data to determine the order of the reaction.
              `
      }
    ],
    difficulty: '.easy,',
    image: {
      image: "reaction-comparison",
      label: `
          Three charts showing time in seconds on the x axis.
          Chart 1 shows concentration of X, with a curved line that reduces as time increases.
          Chart 2 shows ln X, with a straight line that reduces as time increases.
          Chart 3 shows inverse X, with a curved line that increases as time increases.
          `
    }
  },
  {
    id: "COMPARISON-3",
    question: `
      Units for the rate constant vary with the order and the rate law of the equation. For this rate \
      law, $rate = k[A]^3^[B]$. What would be the units for k, the rate constant?
      `,
    questionLabel: `
      Units for the rate constant vary with the order and the rate law of the equation. For this rate \
      law, rate = k, times [A]^3^, times [B]. What would be the units for k, the rate constant?
      `,
    correctAnswer: {
      answer: "s^-1^M^-3^",
      explanation: `
          For the rate law equation: $rate = k[A]^3^[B]$, knowing that concentrations \
          are in units of M, and rate in $M/s$, you can solve for k:

          $M/s = k(M)^3^(M)$ ➝
          $M/s = kM^4^$ ➝
          $k = M/(M^4^)(s)$ ➝
          $k = 1/(M^3^)(s)$

          which is the same as $s^-1^M^-3^$.

          A short way to know the units for the rate constant is by using $M^(1-n)^/s$, \
          where n is the overall order of the equation. When $n = 4$, \
          $M^(1-4)^/s = s^-1^M^-3^$.
          `,
      explanationLabel: `
          For the rate law equation: rate = k, times [A]^3^, times [B], knowing that concentrations \
          are in units of M, and rate in $M/s$, you can solve for k:

          $M/s = k, times M^3^, times M$ ➝
          $M/s = k, times M^4^$ ➝
          $k = M/, M to the power of 4 times s$ ➝
          $k = 1/, M cubed times s$

          which is the same as s^-1^M^-3^.

          A short way to know the units for the rate constant is by using M^(1-n)^/s, \
          where n is the overall order of the equation. When $n = 4$, \
          $M^(1-4)^, /s, = s^-1^M^-3^$.
          `
    },
    otherAnswers: [
      {
        answer: "s^-1^M^-1^",
        explanation: `
              Given that rate law equation, the reaction is of fourth order overall. If \
              the units of the rate constant were s^-1^M^-1^, that would imply a second \
              order reaction instead.
              `
      },
      {
        answer: "s^-1^M^-2^",
        explanation: `
              Given that rate law equation, the reaction is of fourth order overall. If \
              the units of the rate constant were $s^-1^M^-2^$, that would imply a third \
              order reaction instead.
              `
      },
      {
        answer: "s^-1^",
        explanation: `
              Given that rate law equation, the reaction is of fourth order overall. If \
              the units of the rate constant were $s^-1^$, that would imply a first \
              order reaction instead.
              `
      }
    ],
    difficulty: '.easy',
  },
  {
    id: "COMPARISON-4",
    question: `
      Consider a reaction: $3A + 5B ➝ 4C + D$. Based on the table below, what would be \
      the rate law of this reaction?
      `,
    correctAnswer: {
      answer: "Rate = k[A]^3^",
      explanation: `
          When [A] goes from 0.230 to 0.690 (it's tripled, goes up by a factor of 3) \
          while B remains constant, the rate goes from 0.0042 to 0.1134 (it goes up by a \
          factor of 27). $3^x^ = 27$ where $x = 3$; the reaction is third order for [A].

          When [B] goes from 0.230 to 0.460 (it goes up by a factor of 2) while A \
          remains constant, the rate remains constant. If the rate doesn't vary with the \
          concentration of B, it means the reaction is zero order for [B]. Writing the \
          complete rate law equation: $rate = k[A]^3^$.
          `
    },
    otherAnswers: [
      {
        answer: "Rate = k[A]^2^",
        explanation: `
              When [A] goes from 0.230 to 0.690 (it's tripled, goes up by a factor of 3) \
              while B remains constant, the rate goes from 0.0042 to 0.1134 (it goes up \
              by a factor of 27). $3^x^ = 27$ where $x = 3$; the reaction is third order \
              for [A].
              `
      },
      {
        answer: "Rate = k[A]^2^[B]",
        explanation: `
              When [B] goes from 0.230 to 0.460 (it goes up by a factor of 2) while A \
              remains constant, the rate remains constant. If the rate doesn't vary with \
              the concentration of B, it means the reaction is zero order for [B].
              `
      },
      {
        answer: "Rate = k[B]",
        explanation: `
              When the concentration of B changes, the rate doesn't vary, so [B] is not \
              affecting the rate.
              `
      }
    ],
    difficulty: '.easy,',
    table: {
      rows: [
        ["[A] (M)", "[B] (M)", "Rate M/s"],
        ["0.230", "0.230", "0.0042"],
        ["0.690", "0.230", "0.1134"],
        ["0.230", "0.460", "0.0042"]
      ]
    }
  },
  {
    id: "COMPARISON-5",
    question: `
  Consider a multi-step reaction. The rate laws for the elementary reactions that are part of the \
  proposed mechanism are given. Which one would probably never be the rate-determining step?
  `,
    correctAnswer: {
      answer: "Rate = k[U]",
      answerLabel: "Rate = k times U",
      explanation: `
          Out of all the rate law equations, $rate = k[U]$ would probably never be the rate-determining \
          step of the mechanism. Being an elementary step, the equation suggests that there's no \
          need for a collision to happen for the reaction to take place. Compared to the rest, this \
          would most likely be the fastest reaction.
          `
    },
    otherAnswers: [
      {
        answer: "Rate = k[V][W]^2^",
        explanation: `
              A rate law equation as $rate = k[V][W]2$ for an elementary step suggests that a \
              successful collision between a molecule of V and two molecules of W has to take place. \
              Compared to the rest, this would not be the fastest reaction or step.
              `,
        explanationLabel: `
              A rate law equation as $rate = k times [V], times [W]^2^$ for an elementary step suggests that a \
              successful collision between a molecule of V and two molecules of W has to take place. \
              Compared to the rest, this would not be the fastest reaction or step.
              `
      },
      {
        answer: "Rate = k[X]^2^[Y]^2^",
        answerLabel: "Rate = k times [X]^2^, times [Y]^2^",
        explanation: `
              Out of all the rate laws, the rate-determining step would probably be $rate = k[X]^2^[Y]^2^$. \
              This one is of the highest order (fourth overall) and implies that a successful collision \
              of 4 molecules has to take place for the reaction to occur. Since the probabilities of this \
              happening are lower, the chances of this reaction to be slower than the other ones is \
              greater. Being the slowest of all the steps, this would probably be the rate-determining \
              step.
              `,
        explanationLabel: `
              Out of all the rate laws, the rate-determining step would probably be \
              $rate = k times X^2^, times Y^2^$. This one is of the highest order (fourth overall) and implies \
              that a successful collision of 4 molecules has to take place for the reaction to occur. \
              Since the probabilities of this happening are lower, the chances of this reaction to be \
              slower than the other ones is greater. Being the slowest of all the steps, this would \
              probably be the rate-determining step.
              `
      },
      {
        answer: "Rate = k[Z]^2^",
        answerLabel: "Rate = k, times [D]^2^",
        explanation: `
              A rate law equation as $rate = k[Z]^2^$ for an elementary step suggests \
              that a successful collision between two molecules of Z has to take place. \
              Compared to the rest, this would not be the fastest reaction or step.
              `,
        explanationLabel: `
              A rate law equation as rate = k, times [Z]^2^, for an elementary step suggests \
              that a successful collision between two molecules of Z has to take place. \
              Compared to the rest, this would not be the fastest reaction or step.
              `
      }
    ],
    difficulty: '.easy',
  },
  {
    id: "COMPARISON-6",
    question: `
  The rate constant for a second order reaction $(A ➝ B)$ is 0.11 M^-1^s^-1^. How much time will \
  it take for the concentration of A to drop to 0.43 M considering that the reaction started \
  with 0.50 M?
  `,
    correctAnswer: {
      answer: "3 seconds",
      explanation: `
          The equation for a second order reaction is $1/[A] = 1/[A_0_] + kt$. Knowing \
          k, [A_0_] and the [A] at which it's going to drop, we just solve for time (t):

          $t = (1/[A] - 1/[A_0_])/k$ ➝
          $t = (1/0.43 - 1/0.50)/0.11 = 2.95 seconds$, or roughly 3 seconds.
          `,
      explanationLabel: `
          The equation for a second order reaction is, inverse A = inverse A0 + kt. Knowing \
          k, [A_0_] and the [A] at which it's going to drop, we just solve for time (t):

          t = inverse A - inverse A0, /k ➝
          t = 1/0.43, - 1/0.50, /0.11, = 2.95 seconds, or roughly 3 seconds.
          `
    },
    otherAnswers: [
      {
        answer: "4 seconds",
        explanation: `
              After 4 seconds the concentration of A would have already dropped to 0.41 M.
              `
      },
      {
        answer: "5 seconds",
        explanation: `
              After 5 seconds the concentration of A would have already dropped to 0.39 M.
              `
      },
      {
        answer: "6 seconds",
        explanation: `
              After 6 seconds the concentration of A would have already dropped to 0.38 M.
              `
      }
    ],
    difficulty: '.easy',
  },
  {
    id: "COMPARISON-7",
    question: `
  The rate constant for a second order reaction $(A ➝ B)$ is 0.11 M^-1^s^-1^. How much of A would \
  be remaining after 12 seconds has passed? Considering the initial concentration of A is 0.94 M?
  `,
    correctAnswer: {
      answer: "0.42 M",
      explanation: `
          The equation for a second order reaction is $1/[A] = 1/[A_0_] + kt$. Knowing \
          k, [A_0_] and the time, we just solve for [A]:

          $[A] = [A_0_]/([A_0_]kt + 1)$ ➝
          $[A] = 0.94/(0.94 \\* 0.11 \\* 12 + 1) = 0.42 M$.
          `,
      explanationLabel: `
          The equation for a second order reaction is, inverse A = inverse A0 + kt. Knowing \
          k, [A_0_] and the time, we just solve for [A]:

          [A] = [A_0_]/, \(Labels.openParen) [A_0_] times kt,  + 1, \(Labels.closedParen) ➝
          [A] = 0.94/, \(Labels.openParen) (0.94 \\* 0.11 \\* 12, + 1, \(Labels.closedParen}, = 0.42 M.
          `
    },
    otherAnswers: [
      {
        answer: "0.38 M",
        explanation: `
              For the concentration of A to drop to 0.38 M, around 14 seconds should pass.
              `
      },
      {
        answer: "0.36 M",
        explanation: `
              For the concentration of A to drop to 0.36 M, around 16 seconds should pass.
              `
      },
      {
        answer: "0.32 M",
        explanation: `
              For the concentration of A to drop to 0.32 M, around 19 seconds should pass.
              `
      }
    ],
    difficulty: '.easy',
  },
  {
    id: "COMPARISON-8",
    question: `
      For the reaction below, what would the rate law be?
      2NO_(g)_ + O_2__(g)_ ➝ 2NO_2__(g)_
      `,
    correctAnswer: {
      answer: "Rate = k[NO]^m^[O_2_]^n^",
      answerLabel: "Rate = k, times [NO]^m^, times [O_2_]^n^",
      explanation: `
          This is correct because there's no way to know the \
          exponents without more information. The rate law has to be determined \
          experimentally for each reaction.
          `
    },
    otherAnswers: [
      {
        answer: "Rate = k[NO][O_2_]",
        answerLabel: "Rate = k times [NO] times [O_2_]",
        explanation: `
              This assumes that the reaction is first order for each \
              reactant without any information to back it up.
              `
      },
      {
        answer: "Rate = k[NO][NO_2_]^2^",
        answerLabel: "Rate = k times [NO], times [NO_2_]^2^",
        explanation: `
              This has a product as an element for the equation, \
              which is incorrect.
              `
      },
      {
        answer: "Rate = k[NO]^2^[O_2_]",
        answerLabel: "Rate = k, times [NO]^2^, times [O_2_]",
        explanation: `
              This assumes that the coefficients are the \
              exponents for the equation, which would only be true if it was an \
              elementary single step reaction.
              `
      }
    ],
    difficulty: '.medium',
  },
  {
    id: "COMPARISON-9",
    question: `
      Based on the information below, what is the constant rate for the reaction?

      The table below shows recorded concentration data for the following reaction:
      A + B ➝ Products
      `,
    correctAnswer: {
      answer: "Rate = k[A][B]^3^",
      explanation: `
          When [B] goes from 0.0132 to 0.0264 (it's doubled, goes up by a factor of 2) \
          the rate goes from 4.30 to 34.4 (it goes up by a factor of 8). $2^x^ =  8$ \
          where $x = 3$; the reaction is third order for [B].

          When [B] drops to 0.0066, if [A] was maintained at 0.0176, then the Rate would \
          have been 0.53 since we know it's of third order for [B]. In order for the \
          Rate to be 2.15 when [A] goes from 0.0176 to 0.0704 (it goes up by a factor \
          of 4}, it had to go up by a factor of 4. $4^x^ = 4$. where $x = 1$; the reaction \
          is of first order for [A].
          `
    },
    otherAnswers: [
      {
        answer: "Rate = k[A][B]",
        explanation: `
              Try comparing how the reactants concentrations affect the rate.
              `
      },
      {
        answer: "Rate = k[A]^3^[B]^2^",
        explanation: `
              Given the data, the concentrations affect the rate but not in these \
              proportions.
              `
      },
      {
        answer: "Rate = k[A][B]^2^",
        explanation: `
              When [B] goes from 0.0132 to 0.0264 (it's doubled, goes up by a factor of 2) \
              the rate goes from 4.30 to 34.4 (it goes up by a factor of 8). $2^x^ =  8$ \
              where $x = 3$; the reaction is third order for [B].
              `
      }
    ],
    difficulty: '.medium,',
    table: {
      rows: [
        ["[A] (M)", "[B] (M)", "Rate (M/s)"],
        ["0.0176", "0.0132", "4.30"],
        ["0.0176", "0.0264", "34.4"],
        ["0.0704", "0.0066", "2.15"]
      ]
    }
  },
  {
    id: "COMPARISON-10",
    question: `
      Consider a reaction that took place at very high temperatures, in which the \
      reactants are NO and H_2_. Based on the information in the table below, what is \
      the constant rate for the reaction?
      `,
    correctAnswer: {
      answer: "2.02x10^-24^ M^-2^s^-1^",
      explanation: `
          The rate law for this reaction can be determined as $rate = k[NO]^2^[H_2_]$, \
          so by replacing the values using the data we get:

          $8.26x10^-4^ = k(0.0176^2^)(0.0132)$.

          Clearing for k:

          k = $(8.26x10^-30^)/((0.0176^2^)(0.0132))$ = $2.02x10^-24^ M^-2^ s^-1^$.
          `,
      explanationLabel: `
          The rate law for this reaction can be determined as, rate = k, times [NO]^2^, times [H_2_], \
          so by replacing the values using the data we get:

          8.26x10^-4^ = k, times 0.0176^2^, times 0.0132.

          Clearing for k:

          k = 8.26x10^-30^, /, 0.0176^2^ times 0.0132, = $2.02x10^-24^ M^-2^ s^-1^$.
          `
    },
    otherAnswers: [
      {
        answer: "2.02x10^-24^ s^-1^",
        explanation: `
              2.02 would be the correct value but be aware of the units.
              `
      },
      {
        answer: "1.01x10^-24^ s^-1^",
        explanation: `
              Since both concentrations affect the rate of the reaction, it cannot be a \
              first order reaction, so the units couldn't possibly be s^-1^.
              `
      },
      {
        answer: "1.01x10^-24^ M^-2^s^-1^",
        explanation: `
              Try determining first the rate law equation for the reaction given the \
              data provided.
              `
      }
    ],
    difficulty: '.easy,',
    table: {
      rows: [
        ["[NO] (M)", "[H_2_]", "Rate of reaction (M/s)"],
        ["0.0176", "0.0132", "8.26x10^-30^"],
        ["0.0176", "0.0264", "1.65x10^-29^"],
        ["0.0352", "0.0066", "1.65x10^-29^"]
      ]
    }
  },
  {
    id: "COMPARISON-11",
    question: `
      Consider a reaction that's: 3A + 2B + 5C ➝ 2D + E + F.

      Determine what the rate constant would be for the reaction given the data shown in \
      the table below.

      Take into account that the reaction is order 2 with respect to C, and the \
      concentration of it remains as 0.0125 M throughout all the experiments conducted.
      `,
    questionLabel: `
      Consider a reaction that's: 3A + 2B + 5C, to, 2D + E + F.

      Determine what the rate constant would be for the reaction given the data shown in \
      the table below.

      Take into account that the reaction is order 2 with respect to C, and the \
      concentration of it remains as 0.0125 M throughout all the experiments conducted.
      `,
    correctAnswer: {
      answer: "8.32x10^-4^ M^-4^ s^-1^",
      explanation: `
          When [A] goes from 0.0125 to 0.0375 (it's tripled, it goes up by a factor of \
          3) the rate of appearance of D goes from $3.9x10^-13^$ to $3.51x10^-12^$ (nine \
          times higher, it goes up by a factor of 9). $3^x^ = 9$ where $x = 2$; the \
          reaction is second order for [A].

          When [B] goes from 0.0096 to 0.0048 (it's halved, it goes down by a factor \
          of 2) the rate goes from $3.51x10^-12^$ to $1.76x10^-12^$ (it's halved, it \
          goes down by a factor of 2). $2^x^ = 2$ where $x = 1$; the reaction is first \
          order for [B]. The rate law result is, $rate = k[A]^2^[B][C]^2^$.

          Now we just replace the values to determine k, but take into account that \
          rate of reaction = rate of appearance of D/2, because $rate = [ΔD]/2Δt$, \
          where $[ΔD]/Δt$ is the rate of appearance of D.

          Replacing, we get:

          $3.9x10^-13^/2 =$ $k(0.0125)^2^(0.0096)(0.0125)^2^$.

          Solving for k:

          k = $3.9x10^-13^$ / $2 \\*(0.0125)^2^(0.0096)(0.0125)^2^$
          k = 8.32x10^-4^ M^-4^ s^-1^.
          `,
      explanationLabel: `
          When [A] goes from 0.0125 to 0.0375 (it's tripled, it goes up by a factor of \
          3) the rate of appearance of D goes from $3.9x10^-13^$ to $3.51x10^-12^$ (nine \
          times higher, it goes up by a factor of 9). $3^x^ = 9$ where $x = 2$; the \
          reaction is second order for [A].

          When [B] goes from 0.0096 to 0.0048 (it's halved, it goes down by a factor \
          of 2) the rate goes from $3.51x10^-12^$ to $1.76x10^-12^$ (it's halved, it \
          goes down by a factor of 2). $2^x^ = 2$ where $x = 1$; the reaction is first \
          order for [B]. The rate law result is, rate = k, times [A]^2^, times [B], times [C]^2^.

          Now we just replace the values to determine k, but take into account that \
          rate of reaction = rate of appearance of D/2, because $rate = [ΔD]/2Δt$, \
          where $[ΔD]/Δt$ is the rate of appearance of D.

          Replacing, we get:

          3.9x10^-13^, divided by 2 = k, times 0.0125^2^, times 0.0096, times 0.0125^2^.

          Solving for k:

          k = 3.9x10^-13^ / 2 times (0.0125^2^ times 0.0096 times 0.0125^2^)
          k = 8.32x10^-4^ M^-4^ s^-1^.
          `
    },
    otherAnswers: [
      {
        answer: "1.3x10^-7^ M^-4^ s^-1^",
        explanation: `
              You may have gotten $1.3x10^-7^$ M^-4^ s^-1^ as a result because you forgot to \
              include [C]^2^ in the rate law equation when calculating the rate constant.
              `
      },
      {
        answer: "1.66x10^-3^ M^-4^ s^-1^",
        explanation: `
              You may have gotten $1.66x10^-3^$ M^-4^ s^-1^ as a result because you \
              forgot that the rate of reaction is not the same as the rate of appearance \
              of D. Think of how these relate to each other to determine the rate constant.
              `
      },
      {
        answer: "2.6x10^-7^ M^-4^ s^-1^",
        explanation: `
              Remember that the reaction is order 2 with respect to C, and is part of \
              the rate law equation as [C]^2^. Also, take into account that the rate of \
              reaction = $[ΔD]/2Δt$, where [ΔD]/Δt is rate of appearance of D, the \
              measured value in the tables.
              `
      }
    ],
    difficulty: '.medium,',
    table: {
      rows: [
        ["[A] (M)", "[B] (M)", "Rate of appearance of D"],
        ["0.0125", "0.0096", "3.9x10^-13^"],
        ["0.0375", "0.0096", "3.51x10^-12^"],
        ["0.0375", "0.0048", "1.76x10^-12^"]
      ]
    }
  },
  {
    id: "COMPARISON-12",
    question: `
      Consider this reaction: $A + 5B + 2C + 3D ➝ Products$. The rate law equation has \
      been determined to be, $rate = k[A][B]^2^[D]^0^$. Knowing this, what would the \
      overall order of the reaction be?
      `,
    questionLabel: `
      Consider this reaction: A + 5B, + 2C, + 3D, to Products. The rate law equation has \
      been determined to be, rate = k times [A], times [B]^2^, times [D]^0^. Knowing this, what would the \
      overall order of the reaction be?
      `,
    correctAnswer: {
      answer: "Third order",
      explanation: `
          The reaction is first order with respect to A, second order with respect to B, \
          zero order with respect to C and zero order with respect to D. The sum of the \
          individual orders go as: $1 + 2 + 0 + 0 = 3$, so the reaction is of third \
          order overall.
          `
    },
    otherAnswers: [
      {
        answer: "Zero order",
        explanation: `
              The reaction is zero order with respect to D, but that doesn't mean the \
              overall order is zero since A and B are affecting the rate.
              `
      },
      {
        answer: "First order",
        explanation: `
              The reaction is already first order with respect to A, so since B is also \
              affecting the rate of the reaction, it couldn't possibly be first order overall.
              `
      },
      {
        answer: "Second order",
        explanation: `
              The reaction is already second order with respect to B, so since A is also \
              affecting the rate of the reaction, it couldn't possibly be second order overall.
              `
      }
    ],
    difficulty: '.easy',
  },
  {
    id: "COMPARISON-13",
    question: `
      Consider the reaction of which the mechanism (steps of the overall reaction) is this:

      X + Y + Z ➝ XY (fast)
      XY + Z ➝ A + B (slow)

      What would be the rate law equation for the overall reaction?
      `,
    questionLabel: `
      Consider the reaction of which the mechanism (steps of the overall reaction) is this:

      X + Y + Z, to XY (fast)
      XY + Z, to A + B (slow)

      What would be the rate law equation for the overall reaction?
      `,
    correctAnswer: {
      answer: "Rate = k[X][Y][Z]^2^",
      explanation: `
          Many reactions proceed from reactants to products through a sequence of \
          reactions (elementary reactions, or steps). This sequence of reactions is \
          called the reaction mechanism.

          The reaction mechanism for elementary steps or reactions is very simple to \
          write since it's determined by the stoichiometry. For example, if we were \
          going to write step 1's rate law, it would be: $rate = k[X][Y][Z]$. \
          Furthermore, the slowest step, in this case step 2, is also called the \
          rate-determining step, because the overall reaction cannot go faster than \
          the slowest of the steps.

          In other words, the rate for this reaction would be $rate = k[XY][Z]$, but \
          since XY is only the intermediate, then the actual rate law is: \
          $rate = k[X][Y][Z]^2^$
          `
    },
    otherAnswers: [
      {
        answer: "Rate = k[X][Y][Z]",
        explanation: `
              $Rate = k[X][Y][Z]$ would be the rate law equation for the elementary \
              step 1 (fast step) of the reaction mechanism.
              `
      },
      {
        answer: "Rate = k[XY][Z]",
        explanation: `
              $Rate = k[XY][Z]$ would be the rate law equation for the elementary step 2 \
              (slow step) of the reaction mechanism, which even though it's the \
              rate-determining step, XY itself is an intermediate and not a reactant.
              `
      },
      {
        answer: "Rate = k[X][Y][XY]",
        explanation: `
              XY is not a reactant of the overall reaction. To know the overall \
              reaction, sum all the elementary steps and cancel the reactants/products \
              appearing in both sides of the equation.
              `
      }
    ],
    difficulty: '.hard',
  },
  {
    id: "COMPARISON-14",
    question: `
      Consider a reaction that follows these elementary steps:

      Step 1: [ ]A_[ ]_ + [ ]B_[ ]_ ➝ C
      Step 2: D + E ➝ F
      Step 3: F ➝ G

      Considering that the rate law equation for the step 1 reaction is \
      $rate = k[A]^2^[B]^3^$, how would the reactants side of the balanced equation \
      look like (with the [ ] filled with the values of the coefficients)?
      `,
    questionLabel: `
      Consider a reaction that follows these elementary steps:

      Step 1: blank A, +, blank B, to C
      Step 2: D + E, to F
      Step 3: F to G

      Considering that the rate law equation for the step 1 reaction is \
      $rate = k, times [A]^2^, times [B]^3^$, how would the reactants side of the balanced equation \
      look like (with the blanks filled with the values of the coefficients)?
      `,
    correctAnswer: {
      answer: "2A + 3B",
      explanation: `
          Just for elementary reactions like this, the coefficients of the balanced \
          equation are in fact the exponents of the concentration elements in the rate \
          law equation. In this case since A has an exponent of 2 and B has an exponent \
          of 3, then the coefficients in the balanced equations are 2 and 3 \
          respectively: $2A + 3B$.
          `
    },
    otherAnswers: [
      {
        answer: "A + B",
        answerLabel: "'A' + B",
        explanation: `
              Even though A and B are the reactants of the reaction, the coefficients \
              are important.
              `
      },
      {
        answer: "A_2_ + B_3_",
        answerLabel: "'A'_2_ + B_3_",
        explanation: `
              The coefficients of the reactions are the number values on the left of the \
              species, which in this case are A and B.
              `
      },
      {
        answer: "The coefficients of the rate law are unrelated to the reactants in the balanced equation",
        explanation: `
              The coefficients are related when it comes to elementary steps or elementary reactions.
              `
      }
    ],
    difficulty: '.easy',
  },
  {
    id: "COMPARISON-15",
    question: `
  What would be false about the order of a reaction?
  `,
    correctAnswer: {
      answer: "The temperature affects the order of a reaction",
      explanation: `
          The temperature doesn't affect the order of a reaction but can affect the rate of a reaction \
          indirectly. Analyzing the rate law equation $rate = k[A][B][C]...$ The rate is dependent of \
          concentrations and the rate constant, but the rate constant itself is dependent of the \
          temperature.
          `
    },
    otherAnswers: [
      {
        answer: "Only conducting an experiment can the reaction order be determined for a given reaction",
        explanation: `
              For a given reaction, the order can only be determined experimentally.
              `
      },
      {
        answer: `
              The overall order of a reaction is the sum of all exponents
              `,
        explanation: `
              For a reaction with a rate law: $Rate = k[A][B]^2^[C]^3^...[X]^n^$, the overall order of the reaction would be $1 + 2 + 3... + n$.
              `,
        explanationLabel: `
              For a reaction with a rate law: $Rate = k times [A], times [B]^2^, times [C]^3^... times [X]^n^$, the overall order of the reaction would \
              be $1 + 2 + 3... + n$.
              `
      },
      {
        answer: "The order of a reaction is not necessarily an integer",
        explanation: `
              For high school chemistry, most common reactions studied are of second order, first order, half order and zero order; \
              that already means that is not mandatory for the order of a reaction to be a whole number. Orders could possibly \
              be non-integer numbers both positive or negative.
              `
      }
    ],
    difficulty: '.medium',
  },
  {
    id: "COMPARISON-16",
    question: `
      Consider a reaction A + B ➝ C. The reaction is taking place under standard conditions in a controlled \
      environment, but when the concentrations of both A and B are doubled, there is no real increment in \
      the rate of the reaction. Which type of reaction would this be?
      `,
    correctAnswer: {
      answer: "Zero order",
      explanation: `
          For a zero order reaction $rate = k$, which in other words means it's constant. So the rate of \
          the reaction won't change with the concentration of the reactants.
          `
    },
    otherAnswers: [
      {
        answer: "First order",
        explanation: `
              The rate of first order reactions is affected by the concentration of one \
              reactant.
              `
      },
      {
        answer: "Second order",
        explanation: `
              The rate of second order reactions is normally affected by the concentration of one \
              or two reactants.
              `
      },
      {
        answer: "Third order",
        explanation: `
              The rate of third order reactions is affected by the concentration of one \
              or more reactants.
              `
      }
    ],
    difficulty: '.easy',
  },
  {
    id: "COMPARISON-17",
    question: `
      For first order reactions, what data is needed to calculate the half-life of the reaction?
      `,
    correctAnswer: {
      answer: "Only the rate constant k",
      explanation: `
          The equation for half-life for a first order reaction is $t_1/2_ = ln(2)/k$, meaning that we \
          only need to know the rate constant to calculate the half-life and vice-versa.
          `
    },
    otherAnswers: [
      {
        answer: "Initial concentration [A_0_] and rate constant k",
        explanation: `
              To calculate the half-life of other types of orders, usually [A_0_] and k are used. In \
              the case of first order reactions, only the rate constant is needed.
              `
      },
      {
        answer: "Only the initial concentration [A_0_]",
        explanation: `
              Knowing the initial concentration is not very useful to calculate the half-life of first \
              order reactions.
              `
      },
      {
        answer: "Initial concentration [A_0_] and the current concentration [A]",
        explanation: `
              Current concentration [A] is not often part of the direct equation of half life for any order.
              `
      }
    ],
    difficulty: '.easy',
  },
  {
    id: "COMPARISON-18",
    question: `
  The half-life of a first order reaction $(A ➝ B)$ is equal to 198 seconds. What percentage of \
  the reactant would be left after 390 seconds have passed?
  `,
    correctAnswer: {
      answer: "25.5%",
      explanation: `
          First it is important to determine k. The equation for half-life for a first order reaction is \
          $t_1/2_ = ln(2)/k$. If t_1/2_ is 198 seconds, we only need to replace it and solve for k: \
          $k = ln(2)/198 = 0.0035 seconds^-1^$.

          The equation for a first order reaction is $ln[A] = ln[A_0_] - kt$. After 390 seconds have \
          passed, there's a fraction of A remaining, or: $[A] = X[A_0_]$.

          Replacing we get: $ln(X[A_0_]) = ln[A_0_] - (0.0035)(390)$.

          Moving all logarithmic expressions to one side: $(0.0035)(390) = ln([A_0_]) - lnX[A_0_]$.

          Using logarithmic properties: $(0.0035)(390) = ln([A_0_]/X[A_0_])$. Cancelling [A_0_] from the \
          expression and solving numerically: $(1.365) = ln(1/X)$.

          Applying exponential to both sides: $e^1.365^ = 1/X$.

          Finally solving for X: $X = 1/e^1.365^ = 0.255$ which is the same as 25.5%.
          `,
      explanationLabel: `
          First it is important to determine k. The equation for half-life for a first order reaction is \
          $t_1/2_ = ln(2)/k$. If t_1/2_ is 198 seconds, we only need to replace it and solve for k: \
          $k = ln(2)/198 = 0.0035 seconds^-1^$.

          The equation for a first order reaction is $ln[A] = ln[A_0_] - kt$. After 390 seconds have \
          passed, there's a fraction of A remaining, or: $[4A] = X[A_0_]$.

          Replacing we get: $ln(X[A_0_]) = (ln[A_0_]) - (0.0035)(390)$.

          Moving all logarithmic expressions to one side: $(0.0035)(390) = ln([A_0_]) - lnX[A_0_]$.

          Using logarithmic properties: $(0.0035)(390) = ln([A_0_]/X[A_0_])$. Cancelling [A_0_] from the \
          expression and solving numerically: $(1.365) = ln(1/X)$.

          Applying exponential to both sides: $e^1.365^ = 1/X$.

          Finally, solving for X: $X = 1/e^1.365^ = 0.255$ which is the same as 25.5%.
          `
    },
    otherAnswers: [
      {
        answer: "12%",
        explanation: `
              In order for 12% of A to be left, around 605 seconds should have passed.
              `
      },
      {
        answer: "15.5%",
        explanation: `
              In order for 15.5% of A to be left, around 532 seconds should have passed.
              `
      },
      {
        answer: "0.98%",
        explanation: `
              In order for 0.98% of A to be left, around 1,321 seconds should have passed.
              `
      }
    ],
    difficulty: '.easy',
  },
  {
    id: "COMPARISON-19",
    question: `
      The half-life of a first order reaction $(A ➝ B)$ is equal to 232 seconds. What percentage of \
      the reactant would be left after 490 seconds have passed?
      `,
    correctAnswer: {
      answer: "23.1%",
      explanation: `
          First it is important to determine k. The equation for half-life for a first order reaction is \
          $t_1/2_ = ln(2)/k$. If t_1/2_ is 232 seconds, we only need to replace it and solve for k:

          $k = ln(2)/232 = 0.00298 seconds^-1^$.

          The equation for a first order reaction is, $ln[A] = ln[A_0_] - kt$. After 490 seconds have \
          passed, there's a fraction of A remaining, or: $[A] = X[A_0_]$.

          Replacing, we get: $ln(X[A_0_]) = ln[A_0_] - (0.00298)(490)$.

          Moving all logarithmic expressions to one side: $(0.00298)(490) = ln[A_0_] - ln(X[A_0_])$.

          Using logarithmic properties: $(0.00298)(490) = ln([A_0_]/X[A_0_])$. Cancelling [A_0_] from the \
          expression and solving numerically: $(1.464) = ln(1/X)$.

          Applying exponential to both sides: $e^1.464^ = 1/X$.

          Finally, solving for X: $X = 1/e^1.464^ = 0.231$ which is the same as 23.1%.
          `,
      explanationLabel: `
          First it is important to determine k. The equation for half-life for a first order reaction is \
          $t_1/2_ = ln(2)/k$. If t_1/2_ is 232 seconds, we only need to replace it and solve for k:

          $k = ln(2)/232 = 0.00298 seconds^-1^$.

          The equation for a first order reaction is, $ln[A] = ln[A_0_] - kt$. After 490 seconds have \
          passed, there's a fraction of A remaining, or: $[A] = X[A_0_]$.

          Replacing, we get: $ln(X[A_0_]) = (ln[A_0_]) - (0.00298)(490)$.

          Moving all logarithmic expressions to one side: $(0.00298)(490) = ln[A_0_] - ln(X[A_0_])$.

          Using logarithmic properties: $(0.00298)(490) = ln([A_0_]/X[A_0_])$. Cancelling [A_0_] from the \
          expression and solving numerically: $(1.464) = ln(1/X)$.

          Applying exponential to both sides: $e^1.464^ = 1/X$.

          Finally, solving for X: $X = 1/e^1.464^ = 0.231$ which is the same as 23.1%.
          `
    },
    otherAnswers: [
      {
        answer: "15.5%",
        explanation: `
              In order for 15.5% of A to be left, around 625 seconds should have passed.
              `
      },
      {
        answer: "25.5%",
        explanation: `
              In order for 25.5% of A to be left, around 458 seconds should have passed.
              `
      },
      {
        answer: "3.78%",
        explanation: `
              In order for 3.78% of A to be left, around 1099 seconds should have passed.
              `
      }
    ],
    difficulty: '.easy',
  },
  {
    id: "COMPARISON-20",
    question: `
      Considering that radioactive decay is a first order process: Rate constant for the decay of \
      bismuth-212 is 0.01155 s^-1^, while for cobalt-60 is 0.13 years^-1^. The decay of which \
      radioactive compound would be the fastest?
      `,
    correctAnswer: {
      answer: `
          The decomposition of bismuth-212 would take much less time than the decomposition of \
          cobalt-60 to reach half of its initial amount
          `,
      explanation: `
          The equation for half-life for a first order reaction is $t_1/2_ = ln(2)/k$. The smaller \
          the rate constant is, the higher the half-life is. For cobalt-60, $t_1/2_ = ln(2)/0.13 years^-1^$; \
          t_1/2_ = 5.33 years, while for bismuth-212, $t_1/2_ = ln(2)/0.01155 s^-1^$; $t_1/2_ = 60 seconds$. \
          It would take 60 seconds for bismuth-212 to reach half its initial amount while for cobalt-60, it \
          would take approximately 5.33 years.
          `
    },
    otherAnswers: [
      {
        answer: `
              The decomposition of bismuth-212 would take the same time as the decomposition of cobalt-60 to \
              reach half of its initial amount
              `,
        explanation: `
              The decay of bismuth-212 and cobalt-60 don't have the same half-life given that their rate \
              constants are different.
              `
      },
      {
        answer: `
              The decomposition of bismuth-212 would take slightly more time than the decomposition of \
              cobalt-60 to reach half of its initial amount
              `,
        explanation: `
              The half-life is inversely proportional to the rate constant of the reaction. Considering \
              half-life is the time the reaction takes to make the reactant half of its initial concentration, \
              given the data provided, the half life of bismuth-212 is smaller than the one of cobalt-60 by \
              a lot.
              `
      },
      {
        answer: `
              It depends on the initial amount of each compound, since the rate depends on the \
              concentration
              `,
        explanation: `
              Only for first order reactions, half-life is independent of the initial amount of \
              the reactants or in this case, the radioactive compounds.
              `
      }
    ],
    difficulty: '.medium',
  }
]