import { QuizItemType } from "../../../helper/types";

export const quizData: QuizItemType[] = [
  {
    id: "FIRSTORDER-1",
    question: "If a reaction is of first order, it means the rate is dependent on:",
    correctAnswer: {
      answer: "It depends",
      explanation: `
          It depends, because there could be cases in which the reaction is, for example, \
          of order 0.5 with respect with 2 different reactants, making the sum $0.5$ \\+ $0.5$ = 1, \
          a first order reaction overall.
          `
    },
    otherAnswers: [
      {
        answer: "The concentration of two or more reactants",
        explanation: `
              If the overall order of the reaction is 1, normally there wouldn't be two or more \
              reactants affecting the rate of the reaction.
              `
      },
      {
        answer: "The concentration of one reactant",
        explanation: `
              If the overall order of the reaction is 1, normally that means that the rate of the reaction \
              depends on the concentration of one reactant, given its rate law: $Rate = k[A]$, but it's not \
              true for all cases.
              `
      },
      {
        answer: "It doesn't depend on anything",
        explanation: `
              If the overall order of the reaction is 1, the rate depends on the \
              concentration of a reactant. Rate is only constant for zero order reactions.
              `
      }
    ],
    difficulty: 'easy'
  },
  {
    id: "FIRSTORDER-2",
    question:
      "If the rate law for a reaction is $rate = k[A]$, what order is the reaction?",
    correctAnswer: {
      answer: "First order",
      explanation: `
          The rate law for first order reactions is usually rate = k[A] where A is the reactant.
          `
    },
    otherAnswers: [
      {
        answer: "Zero order",
        explanation: `
              The rate law for zero order is usually $rate = k$ because the rate \
              remains constant no matter the concentration of A.
              `
      },
      {
        answer: "Second order",
        explanation: `
              The rate law for second order reactions is usually $rate = k[A]^2^$ or \
              $rate = k[A][B]$ where A and B are the reactants.
              `
      },
      {
        answer: "It depends",
        explanation: `
              The rate law is a way to identify the order of the reaction and vice-versa.
              `
      }
    ],
    difficulty: 'easy'
  },
  {
    id: "FIRSTORDER-3",
    question: "Rate constant k for a first order reaction has the units of:",
    correctAnswer: {
      answer: "s^-1^",
      explanation: `
          Units for the rate constant are $M^(1-n)^/s$ where n is the order. When \
          $n = 1$, $M^(1-1)^/s = 1/s$ which is the same as s^-1^.
          `,
      explanationLabel: `
          Units for the rate constant are $M^(1-n)^/s$, where n is the order. When \
          $n = 1$, $M^(1-1)^/s, = 1/s$, which is the same as s^-1^.
          `
    },
    otherAnswers: [
      {
        answer: "M/s",
        explanation: `
              The units of k are M/s only for zero order reactions.
              `
      },
      {
        answer: "M^2^/s",
        explanation: `
              Units for the rate constant are $M^(1-n)^/s$ where n is the order. This \
              means there's no way $M^2^/s$ is the unit for any rate constant k.
              `
      },
      {
        answer: "It depends",
        explanation: `
              The units of k do depend on which order the reaction is, but for each type \
              of reaction there are predetermined k units.
              `
      }
    ],
    difficulty: 'easy'
  },
  {
    id: "FIRSTORDER-4",
    question: `
      If a reaction $(A + B to C)$ is first order for A and zero order for B, how do you \
      write the rate law for this reaction?
      `,
    correctAnswer: {
      answer: "Rate = k[A][B]^0^",
      answerLabel: "Rate = k[A], times [B]^0^",
      explanation: `
          If the reaction is first order for A, that means that its exponent is 1 in the \
          rate law equation. If the reaction is zero order for B, that means that its \
          exponent is 0. $Rate = k[A]$, which is the same as $rate = k[A][B]^0^$.
          `,
      explanationLabel: `
          If the reaction is first order for A, that means that its exponent is 1 in the \
          rate law equation. If the reaction is zero order for B, that means that its \
          exponent is 0. $Rate = k[A]$, which is the same as $rate = k[A], times [B]^0^$.
          `
    },
    otherAnswers: [
      {
        answer: "Rate = k[A][B]",
        explanation: `
              A rate law equation like $rate = k[A][B]$ would imply that the reaction is \
              first order for A and first order for B.
              `
      },
      {
        answer: "Rate = k[A]^1^[B]^1^",
        answerLabel: "Rate = k[A]^1^ times [B]^1^",
        explanation: `
              $Rate = k[A]^1^[B]^1^$ is the same as $rate = k[A][B]$. That rate law \
              would imply that the reaction is first order for A and first order for B.
              `,
        explanationLabel: `
              Rate = k[A]^1^ times [B]^1^ is the same as $rate = k[A][B]$. That rate law \
              would imply that the reaction is first order for A and first order for B.
              `
      },
      {
        answer: "k[A]^1^[B]",
        answerLabel: "k[A]^1^ times [B]",
        explanation: `
              $Rate = k[A]^1^[B]$ is the same as $rate = k[A][B]$. That rate law would \
              imply that the reaction is first order for A and first order for B.
              `,
        explanationLabel: `
              Rate = k[A]^1^ times [B], is the same as rate = k[A][B]. That rate law would \
              imply that the reaction is first order for A and first order for B.
              `
      }
    ],
    difficulty: 'medium'
  },
  {
    id: "FIRSTORDER-5",
    question:
      "If the rate constant k has the units of days^-1^, what order is the reaction?",
    correctAnswer: {
      answer: "First order",
      explanation: `
          Units for the rate constant are $M^(1-n)^/s$ where n is the order. When \
          $n = 1$, $M^(1-1)^/s = 1/s$ which is the same as s^-1^. When useful, it can be \
          represented in any $time^-1^$ unit, for example $days^-1^$.
          `,
      explanationLabel: `
          Units for the rate constant are $M^(1-n)^/s$, where n is the order. When \
          $n = 1$, $M^(1-1)^/s, = 1/s$, which is the same as s^-1^. When useful, it can be \
          represented in any time to the power of minus 1 unit, for example $days^-1^$.
          `
    },
    otherAnswers: [
      {
        answer: "Zero order",
        explanation: `
              Units for the rate constant are $M^(1-n)^/s$ where n is the order. When \
              n = 0, $M^(1-0)^/s = M/s$.
              `,
        explanationLabel: `
              Units for the rate constant are $M^(1-n)^/s$, where n is the order. When \
              n = 0, $M^(1-0)^/s, = M/s$.
              `
      },
      {
        answer: "Second order",
        explanation: `
              Units for the rate constant are $M^(1-2)^/s$ where n is the order. When \
              n = 2, $M^(1-2)^/s = 1/M \\* s$.
              `,
        explanationLabel: `
              Units for the rate constant are M^(1-2)^/s, where n is the order. When \
              n = 2, $M^(1-2)^/s, = 1, /M \\* s$.
              `
      },
      {
        answer: "It depends",
        explanation: `
              The units of k do depend on which order the reaction is, but for each type \
              of reaction there are predetermined k units.
              `
      }
    ],
    difficulty: 'easy'
  },
  {
    id: "FIRSTORDER-6",
    question: `
      Consider the reaction A to B. The reaction started a long time ago. After 1 hour, \
      there's only 12.5% of the initial amount of A left. What is the rate constant for \
      this reaction?
      `,
    correctAnswer: {
      answer: "0.034667 min^-1^",
      explanation: `
          The equation for a first order reaction is $ln[A] = ln[A_0_] - kt$. After an \
          hour passed (or 60 minutes}, there's only 12.5% of A remaining, or: \
          $[A] = 0.125[A_0_]$. Replacing we get:

          ln(0.125[A_0_]) = ln[A_0_] - k(1).

          Solving for k, $k = ln[A_0_] - ln(0.125[A_0_])$.

          Using logarithmic properties:

          k = ln([A_0_]/0.125[A_0_]) ➝
          k = ln(1/0.125) = 2.08 hours^-1^

          which is the same as:
          2.08 hours^-1^ \\* (1 hour/60 mins) = 0.034667 min^-1^.
          `,
      explanationLabel: `
          The equation for a first order reaction is $ln[A] = ln[A_0_] - kt$. After an \
          hour passed (or 60 minutes}, there's only 12.5% of A remaining, or: \
          $[A] = 0.125[A_0_]$. Replacing we get:

          ln(0.125[A_0_]) = ln[A_0_], - k times 1.

          Solving for k, k =, ln[A_0_], - ln(0.125[A_0_]).

          Using logarithmic properties:

          k =, ln, open bracket, A_0_, /, 0.125[A_0_], close bracket ➝
          k = ln(1/0.125}, = 2.08 hours^-1^

          which is the same as:
          2.08 hours^-1^ \\* (1 hour/60 mins) = 0.034667 min^-1^.
          `
    },
    otherAnswers: [
      {
        answer: "0.00057 min^-1^",
        explanation: `
              0.00057 s^-1^ is actually the correct answer, but be aware of the units.
              `
      },
      {
        answer: "2.2 h^-1^",
        explanation: `
              The equation for a first order reaction is $ln[A] = ln[A_0_] - kt$. After \
              an hour passed (or 60 minutes}, there's only 12.5% of A remaining, or: \
              $[A] = 0.125[A_0_]$. Try replacing the values you know to calculate the \
              constant k.
              `
      },
      {
        answer: "0.034667 s^-1^",
        explanation: `
              0.034667 m^-1^ is actually the correct answer, but be aware of the units.
              `
      }
    ],
    difficulty: 'medium'
  },
  {
    id: "FIRSTORDER-7",
    question: "What is false for first order reactions?",
    correctAnswer:
    {
      answer: "The concentration vs time graph for it is a straight line",
      explanation: `
              It's false, a graph of [A] vs t will only result in a straight line for \
              zero order reactions.
              `
    },
    otherAnswers: [
      {
        answer: "Rate constant k has the units of $1/time$",
        explanation: `
              It's true, units for the rate constant are $M^(1-n)^/s$, where n is the \
              order. When $n = 1$, $M^(1-1)^/s = 1/s$ which is the same as s^-1^. Or, \
              whichever measurement of $time^-1^$, which is the same as $1/time$.
              `
      },
      {
        answer: "Half-life is independent of concentration of the species.",
        explanation: `
              It's true, the half-life equation is $t_1/2_ = ln(2)/k$ so it doesn't \
              depend on the initial concentration of the species.
              `
      },
      {
        answer: "Rate is dependent on the concentration of one reactant",
        explanation: `
              It's true, the rate law for first order reactions is usually $rate=k[A]$ where A \
              is the reactant, making the rate dependent on the concentration of it.
              `
      }
    ],
    difficulty: 'easy'
  },
  {
    id: "FIRSTORDER-8",
    question: `
      What is the half-life for a first order reaction whose rate constant is 34.62 \
      $h^-1^$?
      `,
    correctAnswer: {
      answer: "72 s",
      explanation: `
          The equation for half-life for a first order reaction is $t_1/2_ = ln(2)/k$. \
          If k is $34.62 h^-1^$, we only need to replace it in the equation:

          t_1/2_ = ln(2)/34.62 h^-1^ = 0.02 hours.

          To get that time in seconds, we need to convert it:

          0.02 hours \\* $(60 mins / 1 hour)$ \\* $(60 seconds / 1 min)$ = 72 seconds.
          `
    },
    otherAnswers: [
      {
        answer: "12 s",
        explanation: `
              12 seconds is too little time for the reactant to be halved given that \
              rate constant.
              `
      },
      {
        answer: "36 s",
        explanation: `
              The equation for half-life for a first order reaction is \
              $t_1/2_ = ln(2)/k.$ Try replacing the values you know and calculate \
              the half-life.
              `
      },
      {
        answer: "1 h",
        explanation: `
              After 1 hour, there would be far less than half of the reactant remaining \
              (if any).
              `
      }
    ],
    difficulty: 'easy'
  },
  {
    id: "FIRSTORDER-9",
    question: `
      Consider the reaction A to B. The reaction started a long time ago. After a day \
      and a half, there's only 3/5 of the initial amount of A left. What is the rate for \
      this reaction?
      `,
    correctAnswer: {
      answer: "Rate = 0.34 d^-1^ [A]",
      answerLabel: "Rate = 0.34 d^-1^ times [A]",
      explanation: `
          The equation for a first order reaction is $ln[A] = ln[A_0_] - kt$. After a \
          day and a half passed (or 1.5 days}, there's 3/5 of A remaining, or: \
          $[A] = 0.6[A_0_]$.

          Replacing, we get: $ln(0.6[A_0_]) = ln[A_0_] - k(1.5)$. Solving for k, \
          $k = (ln[A_0_] - ln(0.6[A_0_]))/1.5$.

          Using logarithmic properties:

          k = ln([A_0_]/0.6[A_0_])/1.5 ➝
          k = ln(1/0.6)/1.5 ➝
          k = 0.340 d^-1^

          Since it's a first order equation, according to the rate law we get that: \
          $rate = 0.340d^-1^[A]$.
          `,
      explanationLabel: `
          The equation for a first order reaction is ln[A] = ln[A_0_] - kt. After a \
          day and a half passed (or 1.5 days}, there's 3/5 of A remaining, or: \
          [A] = 0.6[A_0_].

          Replacing, we get: ln(0.6[A_0_]) = ln[A_0_], - k times 1.5. Solving for k, \
          k =, open parenthesis, ln A_0_, -, ln 0.6[A_0_], close parenthesis, / 1.5.

          Using logarithmic properties:

          k = ln, open bracket, A_0_, /, 0.6 times A_0_,  close bracket, / 1.5 ➝
          k = ln 1/0.6 , / 1.5 ➝
          k = 0.340 d^-1^

          Since it's a first order equation, according to the rate law we get that: \
          rate = 0.340d^-1^ times [A].
          `
    },
    otherAnswers: [
      {
        answer: "Rate = 1.5 d^-1^ [A]",
        answerLabel: "Rate = 1.5 d^-1^ times [A]",
        explanation: `
              1.5 days have passed since the reaction started.
              `
      },
      {
        answer: "Rate = 0.51 s^-1^ [A]",
        answerLabel: "Rate = 0.51 s^-1^ times [A]",
        explanation: `
              The equation for a first order reaction is $ln[A] = ln[A_0_] - kt$. Try \
              replacing the known values to calculate k and therefore determine the rate \
              law equation.
              `
      },
      {
        answer: "Rate = 0.34 s^-1^ [A]",
        answerLabel: "Rate = 0.34 s^-1^ times [A]",
        explanation: `
              0.340 d^-1^ is actually the correct answer, but be aware of the units.
              `
      }
    ],
    difficulty: 'medium'
  },
  {
    id: "FIRSTORDER-10",
    question: `
      The half-life for a first order reaction is 48 seconds. What was the original \
      concentration if, after 1 minute, the reactant concentration is 0.3 M?
      `,
    correctAnswer: {
      answer: "0.713 M",
      explanation: `
          The equation for half-life for a first order reaction is $t_1/2_ = ln(2)/k$. \
          If t_1/2_ is 48 seconds, we only need to replace it in the equation and solve \
          for k, $k = ln(2)/48s = 0.0144 seconds^-1^$.

          The equation for a first order reaction is $[A] = [A_0_]e^-kt^$. If we solve \
          for $[A_0_] = [A]/e^-kt^$, we only have to replace the values:

          [A_0_] = 0.3/e^(-0.0144)(60)^ = 0.713 M.
          `,
      explanationLabel: `
          The equation for half-life for a first order reaction is $t_1/2_ = ln(2)/k$. \
          If t_1/2_ is 48 seconds, we only need to replace it in the equation and solve \
          for k, $k = ln 2 /48 S, = 0.0144 seconds^-1^$.

          The equation for a first order reaction is $[A] = [A_0_], times e^-kt^$. If we solve \
          for $[A_0_] = [A]/, e^-kt^$, we only have to replace the values:

          [A_0_] = 0.3/, e^-0.0144 times 60^, = 0.713 M.
          `

    },
    otherAnswers: [
      {
        answer: "0.654 M",
        explanation: `
              The equation for half-life for a first order reaction is \
              $t_1/2_ = ln(2)/k$, try replacing the known values to calculate the \
              constant k first.
              `
      },
      {
        answer: "1.4 M",
        explanation: "1.4 M is far too much."
      },
      {
        answer: "0.4 M",
        explanation: "0.4 M is far too little."
      }
    ],
    difficulty: 'medium'
  },
  {
    id: "FIRSTORDER-11",
    question: `
      For a reaction $(A to B)$, if a graph plotted with axis $ln[A] vs t$ produces a \
      straight line, what is the order of the equation, and what is the slope of the line?
      `,
    correctAnswer: {
      answer: "First order and -k",
      explanation: `
          For an $ln[A] vs t$ graph, if the resultant line is a straight line, the \
          reaction is a first order reaction. The equation for the line is \
          $ln[A] = -kt + ln[A_0_]$ where $ln[A] = y$, $t = x$, $-k = m$ (slope) and \
          $ln[A_0_] = b$ (cut in Y axis}, making it $y = mx + b$.
          `,
      explanationLabel: `
          For an $ln[A] vs t$ graph, if the resultant line is a straight line, the \
          reaction is a first order reaction. The equation for the line is \
          $ln[A] = -kt + ln[A_0_]$, where $ln[A] = y$, $t = x$, $-k = m$ (slope) and \
          $ln[A_0_] = b$ (cut in Y axis}, making it $y = mx + b$.
          `
    },
    otherAnswers: [
      {
        answer: "Zero order and -([A_0_] - [A_t_])/(t_0_- t)",
        explanation: `
              A graph plotting [A] vs t would result in a straight line for zero order \
              reactions with a slope of -k.
              `
      },
      {
        answer: "Second order and -ln[A_0_/A_t_]/(t_0_ - t)",
        answerLabel: "Second order and -ln[A_0_/A_t_], / (t_0_ - t)",
        explanation: `
              A graph plotting 1/[A] vs t would result in a straight line for second \
              order reactions with a slope of k.
              `
      },
      {
        answer: "None of the above",
        explanation: "The answer is one of the above.",
        position: '.D'
      }
    ],
    difficulty: 'easy'
  },
  {
    id: "FIRSTORDER-12",
    question: `
      If the rate of a reaction $(A to B)$ is 0.02 $M/s$ when there is 0.01 M of A \
      present, how much of [A] would it take for the rate to be 0.015 $M/s$ considering \
      it is a first order reaction?
      `,
    correctAnswer: {
      answer: "0.0075 M",
      explanation: `
          Following the rate law equation, $rate = k[A]$. Replacing the first values, and solving for $k = rate/[A]$ ➝ \
          $k = 0.02 M/s / 0.01 M = 2 s^-1^$.

          So for a rate of $0.015 M/s$ we just replace and solve for $[A] = rate/k$ ➝ \
          $[A] = 0.015 M/s / 2 s^-1^ = 0.0075 M$.
          `,
      explanationLabel: `
          Following the rate law equation, $rate = k[A]$. Replacing the first values, and solving for $k = rate/[A]$ ➝ \
          $k = 0.02 M/s / 0.01 M, = 2 s^-1^$.

          So for a rate of $0.015 M/s$ we just replace and solve for $[A] = rate/k$ ➝ \
          $[A] = 0.015 M/s, / 2 s^-1^, = 0.0075 M$.
          `
    },
    otherAnswers: [
      {
        answer: "0.075 M",
        explanation: `
              Following the rate law equation, $rate = k[A]$. Meaning that if the reactant's concentration is 0.075 M, the rate of the \
              reaction at that point is 0.15 M/s.
              `
      },
      {
        answer: "0.01 M",
        explanation: `
              Following the rate law equation, $rate = k[A]$. Meaning that if the reactant's concentration is 0.01 M, the rate of the \
              reaction at that point is 0.02 M/s.
              `
      },
      {
        answer: "0.015 M",
        explanation: `
              Following the rate law equation, $rate = k[A]$. Meaning that if the reactant's concentration is 0.015 M, the rate of the \
              reaction at that point is 0.03 M/s.
              `
      }
    ],
    difficulty: 'easy'
  },
  {
    id: "FIRSTORDER-13",
    question: `
      If a reaction $(A + B to C)$ is zero order for A and first order for B, how do you \
      write the rate law for the reaction?
      `,
    correctAnswer: {
      answer: "Rate = k[A]^0^[B]^1^",
      explanation: `
          If the reaction is zero order for A, that means that its exponent is 0 in the \
          rate law equation. If the reaction is first order for B, that means that its \
          exponent is 1. $Rate = k[B]$ which is the same as $rate = k[A]^0^[B]^1^$.
          `
    },
    otherAnswers: [
      {
        answer: "Rate = k[A][B]^1^",
        explanation: `
              A rate law of $rate = k[A][B]^1^$ which is the same as $rate = k[A][B]$, \
              implies a reaction that's first order for A and first order for B.
              `
      },
      {
        answer: "Rate = k[A]^1^[B]^1^",
        explanation: `
              A rate law of $rate = k[A]^1^[B]^1^$ which is the same as \
              $rate = k[A][B]$, implies a reaction that's first order for A and first \
              order for B.
              `
      },
      {
        answer: "Rate = k[A][B]^0^",
        explanation: `
              A rate law of $rate = k[A][B]^0^$ which is the same as $rate = k[A]$, \
              implies a reaction that's first order for A and zero order for B.
              `
      }
    ],
    difficulty: 'easy'
  },
  {
    id: "FIRSTORDER-14",
    question: `
      The half-life for a first order reaction is 36 mins. What was the original \
      concentration if, after 52 minutes, the reactant concentration is 0.2 M?
      `,
    correctAnswer: {
      answer: "0.544 M",
      explanation: `
          The equation for half-life for a first order reaction is $t_1/2_ = ln(2)/k$. \
          If $t_1/2_$ is 36 mins, we only need to replace it and solve for k: \
          $k = ln(2)/36 mins = 0.0192 mins^-1^$.

          The equation for first order reactions is $[A] = [A_0_]e^-kt^$. If we solve for \
          $[A_0_] = [A]/e^-kt^$, we only have to replace the values: \
          $[A_0_] = 0.2/e^(-0.0192)(52)^ = 0.544 M$
          `,
      explanationLabel: `
          The equation for half-life for a first order reaction is $t_1/2_ = ln(2)/k$. \
          If $t_1/2_$ is 36 mins, we only need to replace it and solve for k: \
          $k = ln(2)/36 mins = 0.0192 mins^-1^$.

          The equation for first order reactions is $[A] = [A_0_], times e^-kt^$. If we solve for \
          $[A_0_] = [A]/, e^-kt^$, we only have to replace the values: \
          $[A_0_] = 0.2/, e^-0.0192 times 52^, = 0.544 M$
          `
    },
    otherAnswers: [
      {
        answer: "0.322 M",
        explanation: "0.322 M is too low."
      },
      {
        answer: "1.088 M",
        explanation: "1.088 M is too high."
      },
      {
        answer: "0.444 M",
        explanation: `
              The equation for half-life for a first order reaction is \
              $t_1/2_ = ln(2)/k$. Try replacing the known values to calculate the rate \
              constant first.
              `
      }
    ],
    difficulty: 'easy'
  },
  {
    id: "FIRSTORDER-15",
    question: `
      If the rate constant k has units of $week^-1^$, what order is the reaction?
      `,
    correctAnswer: {
      answer: "First Order",
      explanation: `
          Units for the rate constant are $M^(1-n)^/s$ where n is the order. When \
          $n = 1$, $M^(1-1)^/s = 1/s$ which is the same as $s^-1^$. When useful, it can \
          be represented in any $time^-1^$ unit, for example $week^-1^$.
          `,
      explanationLabel: `
          Units for the rate constant are $M^(1-n)^/s$ where n is the order. When \
          $n = 1$, $M^(1-1)^/s, = 1/s$ which is the same as $s^-1^$. When useful, it can \
          be represented in any time to the power of minus 1 unit, for example $week^-1^$.
          `
    },
    otherAnswers: [
      {
        answer: "Zero Order",
        explanation: `
              Units for the rate constant are $M^(1-n)^/s$ where n is the order. When \
              n = 0, $M^(1-0)^/s = M/s$.
              `
      },
      {
        answer: "Second Order",
        explanation: `
              Units for the rate constant are $M^(1-2)^/s$ where n is the order. When \
              n = 2, $M^(1-2)^/s = 1/, M \\* s$.
              `
      },
      {
        answer: "It depends",
        explanation: `
              The units of k do depend on which order the reaction is, but for each type \
              of reaction there are predetermined k units.
              `
      }
    ],
    difficulty: 'easy'
  },
  {
    id: "FIRSTORDER-16",
    question: `
      The rate constant of a first order reaction is $0.0042/hours$. What would be the half-life for the reaction?
      `,
    correctAnswer: {
      answer: "Almost 7 days",
      explanation: `
          The equation for half-life for a first order reaction is $t_1/2_ = ln(2)/k$. \
          If k is $0.0042 h^-1^$, we only need to replace it: \
          $t_1/2_ = ln(2)/0.0042 h^-1^ = 165 hours$. To get that time in days, we \
          convert it: $165 hours \\* (1 day/24 hours) = 6.9 days$ which is almost the \
          same as 7 days.
          `
    },
    otherAnswers: [
      {
        answer: "Almost 6 days",
        explanation: `
              6 days is not enough time for the reactant to be halved from its initial \
              value.
              `
      },
      {
        answer: "4 days",
        explanation: `
              4 days is not even nearly enough time for the reactant to be halved from \
              its initial value.
              `
      },
      {
        answer: "8 days",
        explanation: `
              After 8 days there would be less than half of the reactant remaining.
              `
      }
    ],
    difficulty: 'easy'
  },
  {
    id: "FIRSTORDER-17",
    question: `
      For a reaction $(A to B)$, if a graph plotted with axis $[A] vs t$ produces a \
      curved line, what is the order of the equation and what is the slope of the line?
      `,
    correctAnswer: {
      answer: "Any of the above except for zero order reaction",
      explanation: `
          For an [A] vs t graph, if the resultant line is a curved line, the reaction can \
          be either first or second order, or any order whatsoever except for zero.
          `,
      position: '.D'
    },
    otherAnswers: [
      {
        answer: "Zero order reaction",
        explanation: `
              An [A] vs t graph, the resultant line is a straight line for zero order \
              reactions.
              `
      },
      {
        answer: "First order reaction",
        explanation: `
              An [A] vs t graph will result in a curved line for first order reactions, \
              but it doesn't mean necessarily that it is a first order reaction.
              `
      },
      {
        answer: "Second order reaction",
        explanation: `
              An [A] vs t graph will result in a curved line for second order reactions, \
              but it doesn't mean necessarily that it is a second order reaction.
              `
      }
    ],
    difficulty: 'easy'
  },
  {
    id: "FIRSTORDER-18",
    question: `
      3/4 of a substance that's 100% composed by Sodium-24 decays in 30 hours, what is \
      the half-life of Sodium-24?
      `,
    questionLabel: `
      Three quarters of a substance that's 100% composed by Sodium-24 decays in 30 hours, what is \
      the half-life of Sodium-24?
      `,
    correctAnswer: {
      answer: "15 hours",
      explanation: `
          The radioactive decay is a first order process. Given the data, using first \
          order equation (where A is just Sodium-24 in this case):

          $[A] = [A_0_]e^-kt^$.

          After 30 hours, the remaining of Sodium-24 is 25% (100% - 75%) of the initial \
          value, or 0.25[A_0_].

          Replacing in the equation: $[A_0_]e^-k(30)^ = 0.25[A_0_]$. Applying natural \
          log to each side we get: $ln([A_0_]e^-k(30)^) = ln(0.25[A_0_])$.

          Using logarithmic properties:

          $ln([A_0_]) + ln(e^-k(30)^) = ln[0.25A_0_]$ ➝
          $ln([A_0_]) - k(30) = ln(0.25[A_0_])$.

          Clearing for k:

          $k = ln[A_0_] - ln(0.25[A_0_]) / 30$ ➝
          $k = ln([A_0_]/0.25[A_0_]) / 30$ ➝
          $k = ln(1/0.25) / 30$.

          We get $k = 0.0462 h^-1^$. Now to determine half-life, we use the half-life \
          equation $t_1/2_ = ln(2) / 0.0462 h^-1^ = 15 hours$.
          `,
      explanationLabel: `
          The radioactive decay is a first order process. Given the data, using first \
          order equation (where A is just Sodium-24 in this case):

          $[A] = [A_0_]e^-kt^$.

          After 30 hours, the remaining of Sodium-24 is 25% (100% - 75%}, of the initial \
          value, or 0.25[A_0_].

          Replacing in the equation: [A_0_], times e^-k times 30^, = 0.25[A_0_]. Applying natural \
          log to each side we get: ln, open parenthesis, [A_0_], times e^-k times 30^ close parenthesis, = ln(0.25[A_0_]).

          Using logarithmic properties:

          ln [A_0_], +, ln e^-k times 30^, = ln 0.25 times A_0_ ➝
          ln [A_0_], -, k times 30, = ln 0.25[A_0_].

          Clearing for k:

          k =, ln[A_0_], -, ln 0.25[A_0_] , / 30 ➝
          k =, ln, open parenthesis, [A_0_], /, 0.25[A_0_], close parenthesis, / 30 ➝
          k =, ln(1/0.25}, / 30.

          We get, $k = 0.0462 h^-1^$. Now to determine half-life, we use the half-life \
          equation $t_1/2_ = ln(2) / 0.0462 h^-1^, = 15 hours$.
          `
    },
    otherAnswers: [
      {
        answer: "4 hours",
        explanation: `
              Given that data, 4 hours would not be enough to reduce the reactant \
              to half of its initial concentration.
              `
      },
      {
        answer: "18 hours",
        explanation: `
              Given that data, after 18 hours there would be less than half of the \
              initial concentration of the reactant left.
              `
      },
      {
        answer: "24 hours",
        explanation: `
              Take into account that the radioactive decay is a first order process. \
              After 24 hours, the remaining of Sodium-24 is (100% - 75%) 25% of the \
              initial value, or 0.25[A_0_].
              `
      }
    ],
    difficulty: 'medium'
  },
  {
    id: "FIRSTORDER-19",
    question: `
      Take into account a reaction were the species of A and B are involved. The reaction \
      is being represented by the graph below. The concentrations of A and B were measured \
      periodically over time for a few hours. According to the results, which of the following \
      can be concluded about the reaction?
      `,
    correctAnswer: {
      answer: "It's a first order reaction where A is the reactant",
      explanation: `
          Of the two species, A is the one that's being consumed, which means that it \
          is the reactant, and usually the reaction kinetics are studied based on the \
          reactants. The reaction can be inferred to be of first order by looking at how \
          the concentration of A changes but to confirm this, you can apply first order \
          equation of $k = (ln[A_0_], - ln[A]) / t$ \
          to calculate k using the data for each point, which will result in the same k value, \
          making it linear when plotting $ln[A] vs t$.
          `,
      explanationLabel: `
          Of the two species, A is the one that's being consumed, which means that it \
          is the reactant, and usually the reaction kinetics are studied based on the \
          reactants. The reaction can be inferred to be of first order by looking at how \
          the concentration of A changes but to confirm this, you can apply first order \
          equation of $k =, \(Labels.openParen}, ln[A_0_], - ln[A], \(Labels.closedParen}, / t$ \
          to calculate k using the data for each point, which will result in the same k value, \
          making it linear when plotting $ln[A] vs t$.
          `
    },
    otherAnswers: [
      {
        answer: "It's a zero order reaction where A is the reactant",
        explanation: `
              The reaction cannot be of zero order because the concentrations change at a \
              variable rate.
              `
      },
      {
        answer: "It's a second order reaction where B is the reactant",
        explanation: `
              The reaction cannot be of second order because the concentration doesn't affect \
              the rate as much. Try using the equations and see which one fits better with the \
              data provided.
              `
      },
      {
        answer: "It's a first order reaction where B is the reactant",
        explanation: `
              Of the two species, B is being produced, because the concentration of it is getting \
              higher through time. A would be the reactant.
              `
      }
    ],
    difficulty: 'medium',
    image: {
      image: "first-order-a-b-concentration",
      label: `
          Chart showing time in hours vs concentration in molar. Line 'A' is a curved line which \
          tends to 0 as time increases. Line 'B' is a curved line which increases with time. \
          There are three shown data points for line A: Concentration 0.4 at time 0 hours, \
          concentration 0.2 at time 2 hours, concentration 0.1 at time 4 hours. There are three \
          shown data points for line B: Concentration 0 at time 0 hours, concentration 0.2 at time \
          2 hours, concentration 0.3 at time 4 hours.
          `
    }
  },
  {
    id: "FIRSTORDER-20",
    question: `
      The table below experimental kinetics data extracted from this reaction at 25°C:

      ClNO_2_(g) + NO(g) ➝ NO_2_(g) + ClNO(g)

      What is the rate law equation?
      `,
    questionLabel: `
      The table below experimental kinetics data extracted from this reaction at 25°C:

      ClNO_2_(g) + NO(g) ➝ NO_2_(g) + ClNO(g)

      What is the rate law equation?
      `,
    correctAnswer: {
      answer: "Rate = k[ClNO_2_][NO]",
      answerLabel: "Rate = k, [ClNO_2_], [NO]",
      explanation: `
          When $[ClNO_2_]$ goes from 0.025 to 0.05 (it's doubled, it goes up by a factor \
          of 2}, the rate goes from $8.33x10^-4^$ to $1.66x10^-3^$ (it's doubled, it goes \
          up by a factor of 2). $2^x^ = 2$ where $x = 1$; the reaction is first order \
          for $[ClNO_2_]$.

          When $[NO]$ goes from 0.025 to 0.05 (it's doubled, it goes up by a \
          factor of 2}, the rate goes from $1.66x10^-3^$ to $3.33x10^-3^$ (it's doubled, \
          it goes up by a factor of 2). $2^x^ = 2$ where $x = 1$; the reaction is first \
          order for $[NO]$.
          `
    },
    otherAnswers: [
      {
        answer: "Rate = k[ClNO_2_]^2^[NO]^0^",
        answerLabel: "Rate = k, [ClNO_2_]^2^, [NO]^0^",
        explanation: `
              When $[ClNO_2_]$ goes from 0.025 to 0.05 (it's doubled, it goes up by a \
              factor of 2) the rate goes from $8.33x10^-4^$ to $1.66x10^-3^$ (it's \
              doubled, it goes up by a factor of 2). $2^x^ = 2$ where x = 1; the reaction \
              is first order for $[ClNO_2_]$.
              `
      },
      {
        answer: "Rate = k[ClNO_2_]^1^[NO]^0^",
        answerLabel: "Rate = k, [ClNO_2_]^1^, [NO]^0^",
        explanation: `
              When the concentration of $[NO]$ changes from 0.025 M to 0.05 M, \
              the rate also changes, so the reaction cannot be zero order for \
              $[NO]$.
              `
      },
      {
        answer: "Rate = k[ClNO_2_]^2^[NO]^2^",
        answerLabel: "Rate = k, [ClNO_2_]^2^, [NO]^2^",
        explanation: `
              When $[NO]$ goes from 0.025 to 0.05 (it's doubled, it goes up by a \
              factor of 2) the rate goes from $1.66x10^-3^$ to $3.33x10^-3^$ (it's \
              doubled, it goes up by a factor of 2). $2^x^ = 2$ where x = 1; the \
              reaction is first order for $[NO]$.
              `
      }
    ],
    difficulty: 'easy',
    table: {
      rows: [
        ["[ClNO_2_] (M)", "[NO] (M)", "Rate (M/s)"],
        ["0.025", "0.025", "8.33x10^-4^"],
        ["0.050", "0.025", "1.66x10^-3^"],
        ["0.050", "0.050", "3.33x10^-3^"]
      ]
    }
  }
]