import rawQuestions from '../../../data/quizQuestions.json'
import type { QuizItemType, QuizAnswerType } from '../../../helper/types'

type RawQuizQuestion = {
  id: string
  category: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

// Difficulty mappings extracted from iOS CSV files
// This ensures the exact same question order as the iOS app
const difficultyMap: Record<string, 'easy' | 'medium' | 'hard'> = {
  // Introduction (pH Scale)
  'PHSCALE-01': 'easy',
  'PHSCALE-02': 'medium',
  'PHSCALE-03': 'easy',
  'PHSCALE-04': 'easy',
  'PHSCALE-05': 'medium',
  'PHSCALE-06': 'medium',
  'PHSCALE-07': 'easy',
  'PHSCALE-08': 'easy',
  'PHSCALE-09': 'medium',
  'PHSCALE-10': 'hard',
  'PHSCALE-11': 'easy',
  'PHSCALE-12': 'hard',
  'PHSCALE-13': 'easy',
  'PHSCALE-14': 'easy',
  'PHSCALE-15': 'medium',
  'PHSCALE-16': 'medium',
  'PHSCALE-17': 'hard',
  'PHSCALE-18': 'easy',
  'PHSCALE-19': 'medium',
  'PHSCALE-20': 'medium',
  'PHSCALE-21': 'medium',
  'PHSCALE-22': 'hard',
  'PHSCALE-23': 'easy',
  'PHSCALE-24': 'easy',
  'PHSCALE-25': 'medium',
  'PHSCALE-26': 'medium',
  'PHSCALE-27': 'easy',
  'PHSCALE-28': 'medium',
  'PHSCALE-29': 'medium',
  'PHSCALE-30': 'easy',
  
  // Buffer
  'BUFFER-01': 'medium',
  'BUFFER-02': 'easy',
  'BUFFER-03': 'medium',
  'BUFFER-04': 'medium',
  'BUFFER-05': 'medium',
  'BUFFER-06': 'hard',
  'BUFFER-07': 'easy',
  'BUFFER-08': 'easy',
  'BUFFER-09': 'hard',
  'BUFFER-10': 'hard',
  'BUFFER-11': 'medium',
  'BUFFER-12': 'easy',
  'BUFFER-13': 'hard',
  'BUFFER-14': 'hard',
  'BUFFER-15': 'easy',
  'BUFFER-16': 'easy',
  'BUFFER-17': 'medium',
  'BUFFER-18': 'medium',
  'BUFFER-19': 'medium',
  'BUFFER-20': 'medium',
  'BUFFER-21': 'medium',
  'BUFFER-22': 'medium',
  'BUFFER-23': 'medium',
  'BUFFER-24': 'easy',
  'BUFFER-25': 'easy',
  'BUFFER-26': 'medium',
  'BUFFER-27': 'hard',
  'BUFFER-28': 'easy',
  'BUFFER-29': 'medium',
  'BUFFER-30': 'medium',
  
  // Titration
  'TITRATION-01': 'medium',
  'TITRATION-02': 'medium',
  'TITRATION-03': 'hard',
  'TITRATION-04': 'hard',
  'TITRATION-05': 'medium',
  'TITRATION-06': 'easy',
  'TITRATION-07': 'medium',
  'TITRATION-08': 'medium',
  'TITRATION-09': 'medium',
  'TITRATION-10': 'easy',
  'TITRATION-11': 'easy',
  'TITRATION-12': 'medium',
  'TITRATION-13': 'medium',
  'TITRATION-14': 'medium',
  'TITRATION-15': 'medium',
  'TITRATION-16': 'medium',
  'TITRATION-17': 'hard',
  'TITRATION-18': 'medium',
  'TITRATION-19': 'medium',
  'TITRATION-20': 'medium',
  'TITRATION-21': 'medium',
  'TITRATION-22': 'hard',
  'TITRATION-23': 'easy',
  'TITRATION-24': 'medium',
  'TITRATION-25': 'easy',
  'TITRATION-26': 'easy',
  'TITRATION-27': 'medium',
  'TITRATION-28': 'medium',
  'TITRATION-29': 'medium',
  'TITRATION-30': 'medium',
}

// Category to prefix mapping for ordering
const categoryIdPrefix: Record<string, string> = {
  'pH Scale': 'PHSCALE',
  'Buffer': 'BUFFER',
  'Titration': 'TITRATION',
}

const toQuizItems = (category: string): QuizItemType[] => {
  const prefix = categoryIdPrefix[category]
  
  return (rawQuestions as RawQuizQuestion[])
    .filter(item => item.category === category)
    // Sort by the numeric part of the ID to maintain CSV order
    .sort((a, b) => {
      const numA = parseInt(a.id.split('-')[1]) || 0
      const numB = parseInt(b.id.split('-')[1]) || 0
      return numA - numB
    })
    .map((item) => {
      const correct = item.options[item.correctAnswer]
      const otherAnswers: QuizAnswerType[] = item.options
        .filter((_, idx) => idx !== item.correctAnswer)
        .map(answer => ({
          answer,
          explanation: item.explanation
        }))
      return {
        id: item.id,
        question: item.question,
        correctAnswer: {
          answer: correct,
          explanation: item.explanation
        },
        otherAnswers,
        difficulty: difficultyMap[item.id] || 'medium'
      }
    })
}

export const introductionQuizData = toQuizItems('pH Scale')
export const bufferQuizData = toQuizItems('Buffer')
export const titrationQuizData = toQuizItems('Titration')

// Helper function to get questions by difficulty (iOS-compatible logic)
// For Easy: filter difficulty <= 'easy', take first 5
// For Medium: filter difficulty <= 'medium', take first 10  
// For Hard: all questions
export const getQuestionsByDifficulty = (
  questions: QuizItemType[],
  count: number
): QuizItemType[] => {
  const difficultyOrder = ['easy', 'medium', 'hard'] as const
  
  // For hard mode (all questions)
  if (count >= questions.length) {
    return questions
  }
  
  // Determine max difficulty based on count (iOS logic)
  // Easy = 5 questions, Medium = 10 questions
  const maxDifficultyIndex = count <= 5 ? 0 : count <= 10 ? 1 : 2
  
  const loop = (diffIndex: number): QuizItemType[] => {
    const maxDiff = difficultyOrder[diffIndex]
    const available = questions.filter(q => {
      const qDiffIndex = difficultyOrder.indexOf(q.difficulty as typeof difficultyOrder[number])
      return qDiffIndex <= diffIndex
    })
    const filtered = available.slice(0, count)
    
    // If we don't have enough questions, include next difficulty level
    if (filtered.length < count && diffIndex < difficultyOrder.length - 1) {
      return loop(diffIndex + 1)
    }
    
    return filtered
  }
  
  return loop(maxDifficultyIndex)
}
