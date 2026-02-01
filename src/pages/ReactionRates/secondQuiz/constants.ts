import { QuizItemType } from '../../../helper/types';

export const quizData: QuizItemType[] = [
  {
    id: 'SECONDORDER-1',
    question: `
      The rate constant for a second order reaction $(A ➝ B)$ is 0.178 M^-1^s^-1^. How \
      much time will it take for the concentration of A to drop to 0.21 M considering \
      that the reaction started with 0.84 M?
    `,
    correctAnswer: {
      answer: '20 seconds',
      explanation: `
        The equation for a second order reaction is $1/[A] = 1/[A_0_] + kt$. Knowing \
        k, [A_0_] and the [A] at which it's going to drop, we just solve for time (t):

        $t = (1/[A] - 1/[A_0_])/k$ ➝
        $t = (1/0.21 - 1/0.84)/0.178 = 20 seconds$.
      `,
      explanationLabel: `
        The equation for a second order reaction is, inverse A = inverse A0 + kt. Knowing \
        k, [A_0_], and the [A] at which it's going to drop, we just solve for time (t):

        t =, inverse A - inverse A0, / k ➝
        $t = , \(Labels.openParen), 1/0.21, - 1/0.84, \(Labels.closedParen), /0.178, = 20 seconds$.
      `
    },
    otherAnswers: [
      {
        answer: '15 seconds',
        explanation: 'After 15 seconds, the reactant A would drop to 0.26 M.'
      },
      {
        answer: '10 seconds',
        explanation: 'After 10 seconds, the reactant A would drop to 0.34 M.'
      },
      {
        answer: '5 seconds',
        explanation: `
          The equation for a second order reaction is $1/[A] = 1/[A_0_] + kt$. After \
          5 seconds, the reactant A would drop to 0.48 M.
        `,
        explanationLabel: `
          The equation for a second order reaction is, inverse A = inverse A0 + kt. After \
          5 seconds, the reactant A would drop to 0.48 M.
        `
      }
    ],
    difficulty: 'easy',
  },
  {
    id: 'SECONDORDER-2',
    question: `
      The rate constant for a second order reaction $(A ➝ B)$ is 0.44 M^-1^s^-1^. How \
      much time will it take for the concentration of A to drop to $0.05 M$ considering \
      that the reaction started with $0.54 M$?
    `,
    correctAnswer: {
      answer: '41 seconds',
      explanation: `
        The equation for a second order reaction is $1/[A] = 1/[A_0_] + kt$. Knowing \
        k, [A_0_] and the [A] at which it's going to drop, we just solve for time (t):

        $t = (1/[A] - 1/[A_0_])/k$ ➝
        $t = (1/0.05 - 1/0.54)/0.44 = 41 seconds$.
      `,
      explanationLabel: `
        The equation for a second order reaction is, inverse A = inverse A0 + kt. Knowing \
        k, [A_0_], and the [A] at which it's going to drop, we just solve for time (t):

        t = (inverse A - inverse A0), /k ➝
        t =, \(Labels.openParen), 1/0.05, - 1/0.54 \(Labels.closedParen), /0.44, = 41 seconds.
      `
    },
    otherAnswers: [
      {
        answer: '37 seconds',
        explanation: 'After 37 seconds, the reactant A would drop to 0.055 M.'
      },
      {
        answer: '31 seconds',
        explanation: 'After 31 seconds, the reactant A would drop to 0.064 M.'
      },
      {
        answer: '27 seconds',
        explanation: `
          The equation for a second order reaction is $1/[A] = 1/[A_0_] + kt$. After \
          27 seconds, the reactant A would drop to 0.073 M.
        `,
        explanationLabel: `
          The equation for a second order reaction is, inverse A = inverse A0 + kt. After \
          27 seconds, the reactant A would drop to 0.073 M.
        `
      }
    ],
    difficulty: 'easy',
  },
  {
    id: 'SECONDORDER-3',
    question: `
                The rate constant for a second order reaction $(A ➝ B)$ is 0.09 M^-1^s^-1^. How \
                much of A would be remaining after 25 seconds has passed? Considering the initial \
                concentration of A is 0.44 M.
                `,
    correctAnswer: {
      answer: '0.22 M',
      explanation: `
                    The equation for a second order reaction is $1/[A] = 1/[A_0_] + kt$. Knowing \
                    k, [A_0_] and the time, we just solve for [A]:

                    $[A] = [A_0_]/([A_0_]kt + 1)$ ➝
                    $[A] = 0.44/(0.44 \\* 0.09 \\* 25 + 1) = 0.22 M$
                    `,
      explanationLabel: `
                    The equation for a second order reaction is, inverse A = inverse A0 + kt. Knowing \
                    k, [A_0_], and the time, we just solve for [A]:

                    [A] = [A_0_]/, \(Labels.openParen), [A_0_] times kt, + 1 \(Labels.closedParen) ➝
                    $[A] =, 0.44/, \(Labels.openParen), 0.44 \\* 0.09 \\* 25, + 1, \(Labels.closedParen), = 0.22 M$
                    `
    },
    otherAnswers: [
      {
        answer: '0.44 M',
        explanation: `
                        The initial concentration of A is already 0.44 M so after 25 seconds, \
                        there must be less than that remaining.
                        `
      },
      {
        answer: '0.18 M',
        explanation: `
                        The reactant would drop to 0.18 M of concentration only after around 36 \
                        seconds.
                        `
      },
      {
        answer: '0.28 M',
        explanation: `
                        The reactant would drop to 0.28 M of concentration after around 14 seconds.
                        `
      }
    ],
    difficulty: 'easy',
  },
  {
    id: 'SECONDORDER-4',
    question: `
                What is the half-life for a first order reaction whose rate constant is 0.02875 h^-1^?
                `,
    correctAnswer: {
      answer: '1 day',
      explanation: `
                    The equation for half-life for a first order reaction is $t_1/2_ = ln(2)/k$. \
                    If k is 0.02875 h^-1^, we only need to replace it: \
                    $t_1/2_ = ln(2)/0.02875 h^-1^ = 24 hours$, which is the same as 1 day.
                    `
    },
    otherAnswers: [
      {
        answer: '12 hours',
        explanation: `
                        12 hours is not enough time for the reactant to drop to half of its \
                        initial concentration.
                        `
      },
      {
        answer: '36 hours',
        explanation: `
                        After 36 hours there would be less than half of the reactant left.
                        `
      },
      {
        answer: '2 days',
        explanation: `
                        2 days is too much time. The equation for half-life for a first order \
                        reaction is $t_1/2_ = ln(2)/k$. Try replacing the known values to \
                        calculate the half life.
                        `
      }
    ],
    difficulty: 'easy',
  },
  {
    id: 'SECONDORDER-5',
    question: `
                Consider a reaction (A ➝ B) that has this rate law: $rate = k[A][B]^2^$. Which of \
                the following concentration ratios would lead to a higher rate of reaction?
                `,
    correctAnswer: {
      answer: '[A] = 0.2 M, [B] = 0.8 M',
      explanation: `
                    Since the reaction is 2nd order with respect to B (making it the highest order \
                    within the reaction), the change of the concentration of this species will \
                    affect the rate more than the other species. When [B] is really low, rate will \
                    be also, and on the contrary, if [B] is really high, rate will also be. This \
                    is just a way to infer the answer, but to confirm if this is the case with \
                    this reaction, we have the numeric values to replace in the rate law equation: \
                    $rate = (0.2)(0.8)^2^ = 0.128 M/s$.
                    `,
      explanationLabel: `
                    Since the reaction is 2nd order with respect to B (making it the highest order \
                    within the reaction), the change of the concentration of this species will \
                    affect the rate more than the other species. When [B] is really low, rate will \
                    be also, and on the contrary, if [B] is really high, rate will also be. This \
                    is just a way to infer the answer, but to confirm if this is the case with \
                    this reaction, we have the numeric values to replace in the rate law equation: \
                    $rate =, 0.2, times 0.8^2^, = 0.128 M/s$.
                    `
    },
    otherAnswers: [
      {
        answer: '[A] = 0.8 M, [B] = 0.2 M',
        explanation: `
                        Those reactant concentrations would result in a reaction rate of \
                        0.032 $M/s$ which is too low compared to the rest. \
                        $Rate = (0.8)(0.2)^2^ = 0.032 M/s$.
                        `,
        explanationLabel: `
                        Those reactant concentrations would result in a reaction rate of \
                        0.032 $M/s$, which is too low compared to the rest. \
                        $Rate =, 0.8, times 0.2^2^, = 0.032 M/s$.
                        `
      },
      {
        answer: '[A] = 0.4 M, [B] = 0.4 M',
        explanation: `
                        Those reactant concentrations would result in a reaction rate of 0.064 \
                        $M/s$ which is too low compared to the rest. \
                        $Rate = (0.4)(0.4)^2^ = 0.064 M/s$.
                        `,
        explanationLabel: `
                        Those reactant concentrations would result in a reaction rate of 0.064 \
                        $M/s$, which is too low compared to the rest. \
                        $Rate =, 0.4, times 0.4^2^, = 0.064 M/s$.
                        `
      },
      {
        answer: '[A] = 0.5 M, [B] = 0.5 M',
        explanation: `
                        Those reactant concentrations would result in a reaction rate of 0.0125 \
                        $M/s$ which is not the highest compared to the rest. \
                        $Rate = (0.5)(0.5)^2^ = 0.125 M/s$.
                        `,
        explanationLabel: `
                        Those reactant concentrations would result in a reaction rate of 0.0125 \
                        $M/s$, which is not the highest compared to the rest. \
                        $Rate =, 0.5, times 0.5^2^, = 0.125 M/s$.
                        `
      }
    ],
    difficulty: 'medium',
  },
  {
    id: 'SECONDORDER-6',
    question: `
                Radioactive decay is a first-order process. As a general rule, after 10 half-lives, \
                the sample is considered to be safe. Half-lives can be very short (milliseconds) or very \
                long (thousands of years). The long half-lives of some waste products is a major problem \
                with nuclear fission reactors. Considering that, the rate constants for $Po-213$ and $U-238$ \
                are $1.65x10^5^ s^-1^$ and $1.54x10^-10^ y^-1^$ respectively. Which would be the most dangerous \
                isotope as a waste?
                `,
    correctAnswer: {
      answer: `
                    The radioactive isotope $U-238$ would be the most dangerous
                    `,
      explanation: `
                    For $U-238$, substituting the rate constant $1.54x10^-10^ y^-1^$ in the half-life equation we \
                    get: $t_1/2_ = ln(2) / 1.54x10^-10^ = 4.5x10^9^ years$. A half-life like that is huge. Remember, \
                    only after 10 half-lives have passed is the isotope considered safe, which means that $U-238$ as \
                    a waste is extremely dangerous.
                    `,
      explanationLabel: `
                    For $U-238$, substituting the rate constant $1.54x10^-10^ y^-1^$ in the half-life equation we \
                    get: t_1/2_ =, ln (2), / 1.54x10^-10^, = 4.5x10^9^ years. A half-life like that is huge. Remember, \
                    only after 10 half lives have passed is the isotope considered safe, which means that $U-238$ as \
                    a waste is extremely dangerous.
                    `
    },
    otherAnswers: [
      {
        answer: `
                        The radioactive isotope $Po-213$ would be the most dangerous
                        `,
        explanation: `
                        For $Po-213$, substituting the rate constant $1.65x10^5^ s^-1^$ in the half-life equation we get: \
                        $t_1/2_ = ln(2)/1.65x10^5^ = 4.2x10^-6^ seconds$. A half-life that small means that the decay of \
                        the isotope is a very fast one, meaning that $Po-213$ wouldn't stick around as much as a waste.
                        `,
        explanationLabel: `
                        For $Po-213$, substituting the rate constant $1.65x10^5^ s^-1^$ in the half-life equation we get: \
                        t_1/2_ =, ln(2), / 1.65x10^5^, = 4.2x10^-6^ seconds. A half-life that small means that the decay of \
                        the isotope is a very fast one, meaning that $Po-213$ wouldn't stick around as much as a waste.
                        `
      },
      {
        answer: `
                        They are both equally dangerous because both are radioactive
                        `,
        explanation: `
                        Even though they are both radioactive, one of them decays much faster than the other one, \
                        making it an easier to handle waste. Remember, only after 10 half lives have passed is the \
                        isotope considered safe, so the higher is the half-life, the more dangerous it is.
                        `
      },
      {
        answer: `
                        It cannot be determined which of the isotopes would be more dangerous
                        `,
        explanation: `
                        Radioactive decay is a first order process, meaning that only knowing the rate constant is \
                        enough to calculate or estimate the half-life, which itself would be sufficient to determine \
                        how dangerous of a waste the isotope could be.
                        `
      }
    ],
    difficulty: 'medium',
  },
  {
    id: 'SECONDORDER-7',
    question: `
                Consider the following proposed mechanism. Which compound would not be considered neither a reactant \
                nor a product?

                (Step 1) NO_2_ + NO_2_ ⇌ NO_3_ + NO
                (Step 2) NO_3_ + CO ➝ NO_2_ + CO_2_
                (Overall) NO_2_ + CO ➝ NO_2_ + CO_2_
                `,
    questionLabel: `
                Consider the following proposed mechanism. Which compound would not be considered neither a reactant \
                nor a product?

                (Step 1), NO_2_ + NO_2_, ⇌, NO_3_ + NO
                (Step 2), NO_3_ + CO, yields, NO_2_ + CO_2_
                Overall, NO_2_ + CO, yields, NO_2_ + CO_2_
                `,
    correctAnswer:
    {
      answer: `
                        NO_3_
                        `,
      explanation: `
                        A reaction intermediate is a species that is formed from the reactants (or preceding intermediates) \
                        and reacts further to give the directly observed products of a chemical reaction. This intermediate \
                        is immediately consumed after its production, which is why it doesn't appear in the overall chemical \
                        equation. The reaction intermediate for this reaction is $NO_3_$, and its concentration remains constant.
                        `
    },
    otherAnswers: [
      {
        answer: `
                        NO_2_
                        `,
        explanation: `
                        NO_2_ appears in Step 1 as a reactant and in Step 2 as a product, but there is one more mole (molecule) \
                        of NO_2_ in the overall reactants side, making it a true reactant of the whole reaction.
                        `
      },
      {
        answer: `
                        NO
                        `,
        explanation: `
                        NO only appears once in Step 1 as a product, making it a true product of the overall reaction.
                        `
      },
      {
        answer: `
                        CO
                        `,
        explanation: `
                        CO only appears once in Step 2 as a reactant, making it a true reactant of the overall reaction.
                        `
      }
    ],
    difficulty: 'medium',
  },
  {
    id: 'SECONDORDER-8',
    question: `
                The decomposition of a substance X follows a first order process. It takes around 12 hours for the substance \
                X to be half of its initial amount. What would be the rate constant k for this decomposition process?
                `,
    correctAnswer: {
      answer: '0.058 h^-1^',
      explanation: `
                    The equation for half-life for a first order reaction is $t_1/2_ = ln(2)/k$. \
                    If $t_1/2_$ is 12 hours, we only need to replace it:

                    $k = ln(2)/t_1/2_$ ➝ $k = ln(2)/8 = 0.058 h^-1^$.
                    `
    },
    otherAnswers: [
      {
        answer: '0.041 h^-1^',
        explanation: `
                        A rate constant value of 0.041 h^-1^ would imply a half life of around \
                        17 hours.
                        `
      },
      {
        answer: '1.0 g/h',
        explanation: `
                        1.0 g/h is not even the units expected for a rate constant of a first \
                        order reaction.
                        `
      },
      {
        answer: '10 mg \\* h',
        explanation: `
                        10 mg \\* h is not even the units expected for a rate constant of a first \
                        order reaction.
                        `
      }
    ],
    difficulty: 'easy',
  },
  {
    id: 'SECONDORDER-9',
    question: `
                Consider a reaction: $B + 2C + D ➝ E + F$. Based on the table below, and knowing \
                that the rate constant k is $1.2x10^11^$, what would be the value of X?
                `,
    correctAnswer: {
      answer: '3.07x10^-6^',
      explanation: `
                    When [B] goes from 0.002 to 0.008 (it goes up by a factor of 4) while C and D \
                    remain constant, the rate goes from 20X to 80X (it goes up by a factor of 4). \
                    $4^x^ = 4$ where $x = 1$; the reaction is first order for [B].

                    When [C] goes from 0.001 to 0.008 (it goes up by a factor of 8) while B and D \
                    remain constant, the rate goes from 20X to 160X (it goes up by a factor of 8). \
                    $8^x^ = 8$ where $x = 1$; the reaction is first order for [C].

                    When [D] goes from 0.002 to 0.004 (it's doubled, goes up by a factor of 2) while \
                    B and C remain constant, the rate goes from 10X to 160X (it goes up by a factor of \
                    16). $2^x^ = 16$ where $x = 4$; the reaction is fourth order for [D].

                    Replacing in the rate law equation and solving for X we get: \
                    X = $(1.2x10^11^ \\* 0.002 \\* 0.006 \\* 0.002^4^) / 10 =$ $2.3x10^-6^$.
                    `,
      explanationLabel: `
                    When [B] goes from 0.002 to 0.008 (it goes up by a factor of 4) while C and D \
                    remain constant, the rate goes from 20X to 80X (it goes up by a factor of 4). \
                    4^x^ = 4 where x = 1; the reaction is first order for [B].

                    When [C] goes from 0.001 to 0.008 (it goes up by a factor of 8) while B and D \
                    remain constant, the rate goes from 20X to 160X (it goes up by a factor of 8). \
                    8^x^ = 8 where x = 1; the reaction is first order for [C].

                    When [D] goes from 0.002 to 0.004 (it's doubled, goes up by a factor of 2) while \
                    B and C remain constant, the rate goes from 10X to 160X (it goes up by a factor of \
                    16). 2^x^ = 16 where x = 4; the reaction is fourth order for [D].

                    Replacing in the rate law equation and solving for X we get: \
                    $X =, \(Labels.openParen), 1.2x10^11^ \\* 0.002 \\* 0.008 \\* 0.002^4^, \(Labels.closedParen), / 10, = 3.07x10^-6^$.
                    `
    },
    otherAnswers: [
      {
        answer: '384',
        explanation: `
                        You might have used the rate law equation as if D was of first order. When [D] goes \
                        from 0.002 to 0.004 (it goes up by a factor of 2) while B and C remain constant, \
                        the rate goes from 10X to 160X (it goes up by a factor of 16). \
                        $2^x^ = 16$ where $x = 4$; the reaction is fourth order for [D].
                        `
      },
      {
        answer: '2.56x10^-17^',
        explanation: `
                        You might have forgotten the rate constant k in the rate law equation when calculating \
                        X. Try determining the rate law equation first with the provided data.
                        `
      },
      {
        answer: '1.64x10^-21^',
        explanation: `
                        You might have used the rate law equation as if it was $rate = k[B][C]^3^[D]^4^$. When [C] \
                        goes from 0.001 to 0.008 (it goes up by a factor of 8) while B and D remain constant, \
                        the rate goes from 20X to 160X (it goes up by a factor of 8). $8^x^ = 8$ where $x = 1$; the \
                        reaction is first order for [C].
                        `
      }
    ],
    difficulty: 'easy',
    table: {
      rows: [
        ['[B] (M)', '[C] (M)', '[D] (M)', 'Rate M/s'],
        ['0.002', '0.008', '0.002', '10X'],
        ['0.002', '0.001', '0.004', '20X'],
        ['0.002', '0.008', '0.004', '160X'],
        ['0.008', '0.001', '0.004', '80X']
      ]
    }
  },
  {
    id: 'SECONDORDER-10',
    question: `
                What would be the rate law equation for a reaction that follows this reaction mechanism?

                $Step 1 (fast) 2NO_(g)_ ➝ N_2_O_2__(g)_$
                $Step 2 (slow) N_2_O_2__(g)_ + H_2__(g)_ ➝ N_2_O_(g)_ + H_2_O_(g)_$
                $Step 3 (fast) N_2_O_(g)_ + H_2__(g)_ ➝ N_2__(g)_ + H_2_O_(g)_$
                `,
    questionLabel: `
                What would be the rate law equation for a reaction that follows this reaction mechanism?

                $Step 1 (fast) 2NO_(g)_, yields, N_2_O_2__(g)_$,
                $Step 2 (slow) N_2_O_2__(g)_, + H_2__(g)_, yields, N_2_O_(g)_, + H_2_O_(g)_$,
                $Step 3 (fast) N_2_O_(g)_, + H_2__(g)_, yields, N_2__(g)_, + H_2_O_(g)_$,
                `,
    correctAnswer: {
      answer: 'Rate = k[NO]^2^[H_2_]',
      answerLabel: 'Rate = k, times [NO]^2^, times H_2_',
      explanation: `
                    Many reactions proceed from reactants to products through a sequence of reactions \
                    (elementary reactions, or steps). This sequence of reactions is called the \
                    reaction mechanism. The reaction mechanism for elementary steps or reactions is \
                    very simple to write since it's determined by the stoichiometry.

                    For example, if we were going to write Step 1's rate law, it would be: \
                    $Rate = k[NO]^2^$. Furthermore, the slowest step, in this case Step 2, is also called \
                    the rate-determining step, because the overall reaction cannot go faster than \
                    the slowest of the steps.

                    In other words, the rate for this reaction would be $rate = k[N_2_O_2_][H_2_]$ but \
                    since N_2_O_2_ is only the intermediate, then the actual rate law is: \
                    $rate = k[NO]^2^[H_2_]$.
                    `,
      explanationLabel: `
                    Many reactions proceed from reactants to products through a sequence of reactions \
                    (elementary reactions, or steps). This sequence of reactions is called the \
                    reaction mechanism. The reaction mechanism for elementary steps or reactions is \
                    very simple to write since it's determined by the stoichiometry.

                    For example, if we were going to write Step 1's rate law, it would be: \
                    $rate = k, times [NO]^2^$. Furthermore, the slowest step, in this case Step 2, is also called \
                    the rate-determining step, because the overall reaction cannot go faster than \
                    the slowest of the steps.

                    In other words, the rate for this reaction would be rate = k, times [N_2_O_2_], times [H_2_], but \
                    since N_2_O_2_ is only the intermediate, then the actual rate law is: \
                    rate = k, times [NO]^2^, times [H_2_].
                    `
    },
    otherAnswers: [
      {
        answer: 'Rate = k[NO]^2^/[H_2_]',
        answerLabel: 'Rate = k, times NO^2^, / H_2_',
        explanation: `
                        Rate laws only have reactants in the form of $rate = k[A][B][C]...$ \
                        without denominator.
                        `
      },
      {
        answer: 'Rate = k[NO]^2^[H_2_]^2^',
        answerLabel: 'Rate = k, times NO^2^, times H_2_^2^',
        explanation: `
                        $Rate = k[NO]^2^[H_2_]^2^$ would be the rate law if you took the overall reaction \
                        reactants and use their coefficients as the exponents in the rate law \
                        equation, which is incorrect.
                        `
      },
      {
        answer: 'Rate = k[N_2_O]',
        answerLabel: 'Rate = k times N_2_O',
        explanation: `
                        N_2_O is not a reactant but an intermediate of the overall reaction.
                        `
      }
    ],
    difficulty: 'medium',
  },
  {
    id: 'SECONDORDER-11',
    question: `
                Which type of elementary reaction would probably not be the rate-determining step \
                of the mechanism?
                `,
    correctAnswer: {
      answer: 'An elementary step with one reactant and three products',
      explanation: `
                    For elementary reactions, the rate is deeply related to the probability of \
                    collision of the molecules involved. The more molecules are needed to collide \
                    to form products, then the lower would be the probability for a successful \
                    collision to take place.

                    That's why the reaction with the highest rate would be the one with only one \
                    reactant, since it doesn't even need a collision to happen, making it much more \
                    probable to occur. The products are irrelevant to the rate of the reaction.
                    `
    },
    otherAnswers: [
      {
        answer: 'An elementary step with three reactants and two products',
        explanation: `
                        Three reactants for an elementary reaction would imply that a successful \
                        collision of those would have to take place, and given the very low chances \
                        for it to happen, this results in a slower rate of reaction compared to the \
                        rest of the scenarios. The products are irrelevant to the rate of the \
                        reaction.
                        `
      },
      {
        answer: 'An elementary step with two reactants and two products',
        explanation: `
                        Two reactants for an elementary reaction would imply that a successful collision \
                        of those would have to take place, and given the low chances for it to happen, \
                        this results in a slow rate of reaction. The products are irrelevant to the \
                        rate of the reaction.
                        `
      },
      {
        answer: 'An elementary step with four reactants and one product',
        explanation: `
                        For elementary reactions, the rate is deeply related to the probability of collision \
                        of the molecules involved. The more molecules are needed to collide to form products, \
                        then the lower would be the probability for a successful collision to take place. Four \
                        reactants for an elementary reaction would probably be the slowest of the proposed \
                        scenarios.
                        `
      }
    ],
    difficulty: 'medium',
  },
  {
    id: 'SECONDORDER-12',
    question: `
                The rate of disappearance of chlorine is -0.021 $M/s$ in this reaction: \
                $2NO_(g)_ + Cl_2(g)_ ➝ 2NOCl_(aq)_$. What would be rate of formation for NOCl?
                `,
    questionLabel: `
                The rate of disappearance of chlorine is -0.021 $M/s$ in this reaction: \
                $2NO_(g)_ + Cl_2(g)_, yields, 2NOCl_(aq)_$. What would be rate of formation for NOCl?
                `,
    correctAnswer: {
      answer: '0.042 M/s',
      explanation: `
                    The rates of disappearance of reactants and appearance of products can be \
                    related to each other based on the stoichiometry of the reaction.

                    $Rate = -[ΔNO]/2Δt = -[ΔCl_2_]/Δt =$ [ΔNOCl]/2Δt.

                    If $[ΔCl_2_]/Δt = -0.021 M/s$, we only have to replace:

                    -[ΔCl_2_]/Δt = [ΔNOCl]/2Δt ➝
                    -2(-0.021) = [ΔNOCl]/Δt ➝
                    0.042 M/s = [ΔNOCl]/Δt.
                    `,
      explanationLabel: `
                    The rates of disappearance of reactants and appearance of products can be \
                    related to each other based on the stoichiometry of the reaction.

                    Rate =, -[ΔNO]/Δt, = -[ΔCl_2_]/Δt, = [ΔNOCl]/2Δt.

                    If $[ΔCl_2_]/Δt = -0.021 M/s$, we only have to replace:

                    -[ΔCl_2_]/Δt, = [ΔNOCl]/2Δt ➝
                    -2 times -0.021 = [ΔNOCl]/Δt ➝
                    0.042 M/s = [ΔNOCl]/Δt.
                    `
    },
    otherAnswers: [
      {
        answer: '-0.021 M/s',
        explanation: `
                        The rate of appearance is given in positive values. Besides that, \
                        0.021 M/s would imply that the stoichiometry of the reaction is one to \
                        one, which is not the case since for each mole of Cl_2_ that's consumed, \
                        there are 2 moles of NOCl that are produced, so its formation should be \
                        going at a higher rate.
                        `
      },
      {
        answer: '0.021 M/s',
        explanation: `
                        0.021 M/s would imply that the stoichiometry of the reaction is one to \
                        one, which is not the case since for each mole of Cl_2_ that's consumed, \
                        there are 2 moles of NOCl that are produced, so its formation should be \
                        going at twice the rate.
                        `
      },
      {
        answer: '-0.042 M/s',
        explanation: 'The rate of appearance is given in positive values.'
      }
    ],
    difficulty: 'easy',
  },
  {
    id: 'SECONDORDER-13',
    question: `
                Consider the following zero order reaction: $AB + 2C ➝ AC + BC$. What is the rate \
                law for it?
                `,
    correctAnswer: {
      answer: 'Rate = k',
      explanation: `
                    For zero order reactions, the rate is independent of the concentration of the \
                    reactants, so the rate law for all zero order reactions is $rate = k$.
                    `
    },
    otherAnswers: [
      {
        answer: 'Rate = k[AB]^m^',
        explanation: `
                        $Rate = k[AB]^m^$ means that the reactant AB affects the rate, and for zero \
                        order reactions the rate is independent of the concentration of any \
                        reactant.
                        `
      },
      {
        answer: 'Rate = k[AB][C]',
        explanation: `
                        $Rate = k[AB][C]$ would mean that the reaction is of second order.
                        `
      },
      {
        answer: 'Rate = k[AB]^m^[C]^n^',
        explanation: `
                        $Rate = k[AB]^m^[C]^n^$ means that the reactants AB and C affect the rate, and \
                        for zero order reactions the rate is independent of the concentration of \
                        any reactant.
                        `
      }
    ],
    difficulty: 'easy',
  },
  {
    id: 'SECONDORDER-14',
    question: `
                S_2_O_8_^-2^(aq) + 3I^-^(aq) ➝ 2SO_4_(aq) + I_3_^-^(aq)

                Given the data collected experimentally in this table about the reaction above, \
                what is the rate law for the reaction?
                `,
    questionLabel: `
                S2O8 (charge minus 2, AQ), +, 3I (charge minus one, AQ), yields, 2SO4 (AQ), +, I3 (charge minus one, AQ)

                Given the data collected experimentally in this table about the reaction above, \
                what is the rate law for the reaction?
                `,
    correctAnswer: {
      answer: 'Rate = k[S_2_O_8_^-2^][I^-^]^2^',
      answerLabel: 'Rate = k times [S_2_O_8_^-2^], times [I^-^]^2^',
      explanation: `
                    When [S_2_O_8_^-2^] goes from 0.15 to 0.3 (it's doubled, it goes up by a factor of 2) \
                    while I^-^ remains constant, the rate goes from $8.44x10^-4^$ to $1.69x10^-3^$ \
                    (it goes up by a factor of 2). $2^x^ = 2$ where $x = 1$; the reaction is first \
                    order for [S_2_O_8_^-2^].


                    When [I^-^] goes from 0.15 to 0.6 (it goes up by a factor \
                    of 4) while S_2_O_8_^-2^ remains constant, the rate goes from $1.69x10^-3^$ to \
                    $2.7x10^-2^$ (it goes up by a factor of 16). $4^x^ = 16$ where $x = 2$; the \
                    reaction is second order for [I^-^].
                    `
    },
    otherAnswers: [
      {
        answer: 'Rate = k[S_2_O_8_^-2^][I^-^]',
        answerLabel: 'Rate = k times [S_2_O_8_^-2^] times [I^-^]',
        explanation: `
                        When [I^-^] goes from 0.15 to 0.6 (it goes up by a factor of 4) while \
                        S_2_O_8_^-2^ remains constant, the rate goes from to $1.69x10^-3^$ to \
                        $2.7x10^-2^$ (it goes up by a factor of 16). $4^x^ = 16$ where $x = 2$; \
                        the reaction is second order for [I^-^].
                        `
      },
      {
        answer: 'Rate = k[S_2_O_8_^-2^]^2^[I^-^]^1^',
        answerLabel: 'Rate = k, times [S_2_O_8_^-2^]^2^, times [I^-^]^1^',
        explanation: `
                        When [S_2_O_8_^-2^] goes from 0.15 to 0.3 (it's doubled, goes up by a factor of \
                        2) while I^-^ remains constant, the rate goes from $8.44x10^-4^$ to \
                        $1.69x10^-3^$ (it goes up by a factor of 2). $2^x^ = 2$ where $x = 1$; the \
                        reaction is first order for [S_2_O_8_^-2^].
                        `
      },
      {
        answer: 'Rate = k[S_2_O_8_^-2^]^2^[I^-^]^2^',
        answerLabel: 'Rate = k, times [S_2_O_8_^-2^]^2^, times [I^-^]^2^',
        explanation: `
                        Try comparing how much the change of concentration of both reactants \
                        affect the rate of the reaction.
                        `
      }
    ],
    difficulty: 'medium',
    table: {
      rows: [
        ['E', '[S_2_O_8_^-2^](M)', '[I^-^](M)', 'Rate M/s'],
        ['1', '0.15', '0.15', '8.44x10^-4^'],
        ['2', '0.30', '0.15', '1.69x10^-3^'],
        ['3', '0.30', '0.60', '2.7x10^-2^']
      ]
    }
  },
  {
    id: 'SECONDORDER-15',
    question: `
                Consider the reaction below:

                $3A + 2B ➝ C + D$

                Experiments were performed to determine that its rate law is: \
                $rate = k[A][B]^2^$. Which of the following would be expected?
                `,
    questionLabel: `
                Consider the reaction below:

                3A + 2B, yields, C + D

                Experiments were performed to determine that its rate law is: \
                rate = k times [A] times [B]^2^. Which of the following would be expected?
                `,
    correctAnswer:
    {
      answer: `
                        If [A] is halved and [B] is doubled, the rate of the reaction goes up by a factor of 2
                        `,
      explanation: `
                        According to the rate law equation, the reaction is first order with respect to A and \
                        second order with respect to B. If the concentration of A is halved, the rate of the \
                        reaction is halved too. If the concentration of B is doubled, the rate of the reaction \
                        goes up by a factor of 4. If both things happen at the same time, the rate would \
                        ultimately be doubled.
                        `
    },
    otherAnswers: [
      {
        answer: `
                        If [A] is doubled and [B] is halved, the rate of the reaction goes up by a factor of 4
                        `,
        explanation: `
                        If [A] is doubled, the rate is doubled too. If [B] is halved, the rate goes down by a \
                        factor of 4. If both things happen at the same time, the rate would ultimately \
                        be halved.
                        `
      },
      {
        answer: `
                        If [A] is doubled and [B] is doubled too, the rate of the reaction goes down by a factor of 2
                        `,
        explanation: `
                        If [A] is doubled, the rate is doubled too. If [B] is doubled, the rate goes up by a \
                        factor of 4. If both things happen at the same time, the rate would ultimately go \
                        up by a factor of 8.
                        `
      },
      {
        answer: `
                        If [A] is halved and [B] is halved, the rate of the reaction goes down by a factor of 2.
                        `,
        explanation: `
                        If [A] is halved, the rate is halved too. If [B] is halved, the rate goes down by a \
                        factor of 4. If both things happen at the same time, the rate would ultimately go \
                        down by a factor of 8.
                        `
      }
    ],
    difficulty: 'easy',
  },
  {
    id: 'SECONDORDER-16',
    question: `
                Consider the following graph, what would be the order for that reaction?
                `,
    correctAnswer: {
      answer: 'Second order',
      explanation: `
                    For this second order reaction, the resultant integrated rate law is \
                    $k = (1/[A] - 1/[A_0_])/t$, that’s why a graph plotting $(1/[A] vs t)$ is a \
                    straight line $(1/[A](y) = kt(mx) + 1/[A_0_](b))$ with a slope of k.
                    `,
      explanationLabel: `
                    For this second order reaction, the resultant integrated rate law is \
                    k = inverse A - inverse A0, /t, that’s why a graph plotting inverse A vs t is a \
                    straight line. Inverse A (y), = kt (mx), + inverse A0 (b), with a slope of k.
                    `
    },
    otherAnswers: [
      {
        answer: 'Zero order',
        explanation: `
                        For zero order reactions, plotting [A] vs t would result in a straight line.
                        `
      },
      {
        answer: 'First order',
        explanation: `
                        For first order reactions, plotting ln[A] vs t would result in a straight \
                        line
                        `
      },
      {
        answer: 'Third order',
        explanation: `
                        Try considering the rate law equations of the different orders.
                        `
      }
    ],
    difficulty: 'easy',
    image: {
      image: 'second-order-inverse-a',
      label: `
                    Chart showing time in seconds vs inverse concentration of A. There is a straight \
                    line starting at 0,0, which increases as time increases.
                    `
    }
  },
  {
    id: 'SECONDORDER-17',
    question: `
                Consider a reaction that's $2A + 3B ➝ C + D + E$. When the concentrations of both \
                A and B are doubled, the rate increases to 16 times what it was initially. All the \
                information we have is that the rate law is $rate = k[A]^2^[B]^n^$, where n is the \
                specific order for B. What is the order of B?
                `,
    questionLabel: `
                Consider a reaction that's 2A + 3B, to C + D + E. When the concentrations of both \
                A and B are doubled, the rate increases to 16 times what it was initially. All the \
                information we have is that the rate law is $rate = k, times [A]^2^, times [B]^n^$, \
                where n is the specific order for B. What is the order of B?
                `,
    correctAnswer: {
      answer: 'Second order',
      explanation: `
                    Knowing that the reaction is second order with respect to [A], we know that if \
                    it was doubled while [B] remained constant, the rate would go up by a factor of \
                    4. When [B] was doubled at the same time, the rate went up by a factor of 16. \
                    X \\* 4 = 16, where X = 4. In other words, doubling [A] made the rate go up by a \
                    factor of 4. 2^n^ = 4 where n = 2; the reaction is second order for [A].
                    `
    },
    otherAnswers: [
      {
        answer: 'First order',
        explanation: `
                        If this was the case, the rate would have gone up by a factor of 8.
                        `
      },
      {
        answer: 'Third order',
        explanation: `
                        If this was the case, the rate would have gone up by a factor of 32.
                        `
      },
      {
        answer: 'Cannot be determined with the given information',
        explanation: `
                        It can be determined. Consider that according to the equation, the \
                        reaction is second order with respect to [A].
                        `
      }
    ],
    difficulty: 'easy',
  },
  {
    id: 'SECONDORDER-18',
    question: `
                Consider a reaction $A ➝ B$. The concentration of A was measured through time \
                while the reaction was taking place. Based on the data in the table, what \
                would be the order of the reaction?
                `,
    correctAnswer: {
      answer: 'The reaction is a first order reaction',
      explanation: `
                    We can give these tables the same treatment as we give to the graphs. Making 3 \
                    graphs with the provided data might be a way to find the answer, but to \
                    quickly determine the order of the reaction, we can look at the increment in \
                    each experiment.

                    From 0 to 10 seconds, [A] goes from 1.00 to 0.90 (difference of 0.10), ln[A] \
                    goes from 0.00 to -0.10 (difference of 0.10) and $1/[A]$ goes from 1.00 to \
                    1.11 (difference of 0.11).

                    From 10 to 20 seconds, [A] goes from 0.90 to 0.81 (difference of 0.09), ln[A] \
                    goes from -0.10 to -0.20 (difference of 0.10) and $1/[A]$ goes from 1.11 to 1.23 \
                    (difference of 0.12).

                    The only increment that remained the same in these 30 seconds of the reaction \
                    is the value for $ln[A]$, which means that the increment is linear, so it's a \
                    first order reaction.
                    `
    },
    otherAnswers: [
      {
        answer: 'The reaction is a zero order reaction',
        explanation: `
                        If the reaction was a zero order reaction, the increase of $[A]$ would be \
                        linear, for example: For 0 seconds, 1.00 M. For 10 seconds, 0.90 M. For 20 \
                        seconds, 0.80 M (instead of 0.81 M).
                        `
      },
      {
        answer: 'The reaction is a second order reaction',
        explanation: `
                        If the reaction was a second order reaction, the increase of $1/[A]$ would be \
                        linear, for example: For 0 seconds, 1.00 M. For 10 seconds, 1.11 M. For 20 \
                        seconds, 1.22 M (instead of 1.23 M).
                        `
      },
      {
        answer: 'The reaction is a third order reaction',
        explanation: `
                        Try finding which expression between [A], $ln[A]$ and $1/[A]$ changes \
                        linearly with time to determine the order.
                        `
      }
    ],
    difficulty: 'easy',
    table: {
      rows: [
        ['Time (s)', '[A]', 'ln[A]', '1/[A]'],
        ['0', '1.00', '0.00', '1.00'],
        ['10', '0.90', '-0.10', '1.11'],
        ['20', '0.81', '-0.20', '1.23'],
        ['30', '0.74', '-0.30', '1.35'],
        ['40', '0.67', '-0.40', '1.49']
      ]
    }
  },
  {
    id: 'SECONDORDER-19',
    question:
      'Consider the following graph, what would be the order for that reaction?',
    correctAnswer: {
      answer: 'First order',
      explanation: `
                    For this first order reaction, the resultant integrated rate law is \
                    $k = (ln[A_0_] - ln[A])/t$, that’s why a graph plotting $(ln[A] vs t)$ is a \
                    straight line $(ln[A](y) = -kt(mx) + ln[A_0_](b))$ with a slope of -k.
                    `,
      explanationLabel: `
                    For this first order reaction, the resultant integrated rate law is \
                    $k =, ln[A_0_] - ln[A], /t$, that’s why a graph plotting (ln[A] vs t) is a \
                    straight line. ln[A] (y), = -kt (mx), + ln[A_0_] (b), with a slope of -k.
                    `
    },
    otherAnswers: [
      {
        answer: 'Zero order',
        explanation: `
                        For zero order reactions, plotting [A] vs t would result in a straight line.
                        `
      },
      {
        answer: 'Second order',
        explanation: `
                        For second order reactions, plotting $1/[A]$ vs t would result in a \
                        straight line.
                        `
      },
      {
        answer: 'Third order',
        explanation: `
                        Try considering the rate law equations of the different orders.
                        `
      }
    ],
    difficulty: 'easy',
    image: {
      image: 'second-order-ln-a',
      label: `
                    Chart showing time in seconds vs natural log of A. There is a straight line \
                    which starts high up the y axis, and decreases as the time increases.
                    `
    }
  },
  {
    id: 'SECONDORDER-20',
    question: `
                Consider a reaction thats A ➝ B + C. The rate constant (k) for that reaction \
                is 0.6 weeks^-1^. Taking the initial amount of A as 100%, what percentage of A is left \
                after 5 days have passed?
                `,
    correctAnswer: {
      answer: '65%',
      explanation: `
                    The equation for a first order reaction is $ln[A] = ln[A_0_] - kt$. After 4 \
                    days have passed, there's a fraction of A remaining, or: $[A] = X[A_0_]$. \
                    Before continuing, let's transform the units of the time from days to weeks:

                    5 days \\* (1 week / 7 days) = 0.71 weeks.

                    Replacing, we get: $ln(X[A_0_]) = ln[A_0_] - (0.6)(0.71)$.

                    Moving all logarithmic expressions to one side:

                    (0.6)(0.71) = ln([A_0_]) - lnX[A_0_].

                    Using logarithmic properties:

                    (0.6)(0.71) = ln([A_0_]/X[A_0_]).

                    Canceling [A_0_] from the expression and solving numerically: \
                    $(0.426) = ln(1/X)$. Applying exponential to both sides: $e^0.426^ = 1/X$.

                    Finally, solving for X: $X = 1/e^0.426^ = 0.65$ which is the same as 65%.
                    `,
      explanationLabel: `
                    The equation for a first order reaction is $ln[A] = ln[A_0_] - kt$. After 4 \
                    days have passed, there's a fraction of A remaining, or: $[A] = X[A_0_]$. \
                    Before continuing, let's transform the units of the time from days to weeks:

                    5 days \\* (1 week / 7 days) = 0.71 weeks.

                    Replacing, we get: ln(X[A_0_]) = ln[A_0_], - 0.6 times 0.71.

                    Moving all logarithmic expressions to one side:

                    0.6 times 0.71 =, ln [A_0_], - ln X[A_0_].

                    Using logarithmic properties:

                    0.6 times 0.71 =, ln, [A_0_]/X[A_0_] .

                    Canceling [A_0_] from the expression and solving numerically: \
                    $(0.426) = ln(1/X)$. Applying exponential to both sides: $e^0.426^ = 1/X$.

                    Finally, solving for X: $X = 1/e^0.426^ = 0.65$ which is the same as 65%.
                    `
    },
    otherAnswers: [
      {
        answer: '35%',
        explanation: `
                        After 5 days of the reaction, given that rate constant, there would be \
                        much more than 35% of A remaining.
                        `
      },
      {
        answer: '45%',
        explanation: `
                        After 5 days of the reaction, given that rate constant, there would be \
                        much more than 45% of A remaining.
                        `
      },
      {
        answer: '55%',
        explanation: `
                        After 5 days of the reaction, given that rate constant, there would be \
                        more than 55% of A remaining. The equation for a first order reaction is \
                        $ln[A] = ln[A_0_] - kt$.
                        `
      }
    ],
    difficulty: 'easy',
  }
]