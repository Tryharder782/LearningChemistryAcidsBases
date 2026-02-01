import { routes } from "../constants";

export type PageMenuType = keyof typeof routes
export interface QuizAnswerType {
  answer: string,
  explanation: string,
  answerLabel?: string,
  explanationLabel?: string,
  position?: string,
}
export interface QuizItemType {
  id: string,
  question: string,
  correctAnswer: QuizAnswerType,
  otherAnswers: QuizAnswerType[],
  allAnswerItems?: QuizAnswerType[],
  difficulty: string,
  [x: string]: any,
}

export type SizeStyle = {
  width?: number,
  height?: number,
}

export type Point = {
  x: number,
  y: number,
}

export type TurTextType = (string | ((val: string[]) => string))[][]
