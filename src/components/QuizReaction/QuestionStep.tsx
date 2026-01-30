import { convertExpToHtml } from "../../helper/functions"
import { QuizItemType } from "../../helper/types"
import styles from './styles.module.scss'

// Quiz answer steps
interface QuestionStepProps {
  quizItem: QuizItemType
  selectedAnswers: number[]
  onSelectAnswers: (val: number[]) => void
  isCorrectAnswered: boolean
  onCorrectAnswer: (val: number) => void
}
const QuestionStep = ({ quizItem, selectedAnswers, onSelectAnswers, isCorrectAnswered, onCorrectAnswer }: QuestionStepProps) => {
  const { question, correctAnswer, allAnswerItems } = quizItem
  const correctAnswerIndex = allAnswerItems?.findIndex((item: { answer: string }) => item.answer === correctAnswer.answer) ?? -1

  // useEffect(() => {
  //   console.log('isCorrectAnswered; ', { isCorrectAnswered })
  // }, [isCorrectAnswered])

  const handleSelect = (idx: number) => {
    if (isCorrectAnswered) return
    if (correctAnswerIndex === idx) {
      onCorrectAnswer(idx)
    }
    onSelectAnswers([...selectedAnswers, idx])
  }

  if (!quizItem || !allAnswerItems || correctAnswerIndex < 0) return null
  return <div className={styles.quizStep}>
    <h3
      className={`${styles.quizQuestion} ${question.length < 60 ? styles.textCenter : ''}`}
    >
      <div dangerouslySetInnerHTML={{ __html: convertExpToHtml(question) || '' }} />
    </h3>
    <div>
      {allAnswerItems.map((item, index) => {
        const isSelected = selectedAnswers.includes(index)
        let answered = 0
        if (isSelected) {
          // console.log('aad 1', { isSelected, item, correctAnswer })
          if (item.answer === correctAnswer.answer) {
            answered = 1
          } else answered = 2
          // console.log('aad 2', { answerStyle: answer })
        }
        // answer;  0: not selected, 1: correct, 2: wrong
        return <div key={index}>
          <div
            className={`
              ${styles.quizCard} 
              ${isSelected} 
              ${answered === 1 ? styles.correctAnswer :
                (answered === 2 ? styles.wrongAnswer : '')
              }
            `}
            onClick={() => handleSelect(index)}
          >
            {answered === 1 && <div className={styles.correctIcon}>
              <i className="fa fa-check"></i>
            </div>}
            {answered === 2 && <div className={styles.wrongIcon}>
              <i className="fa fa-close"></i>
            </div>}
            <div dangerouslySetInnerHTML={{ __html: convertExpToHtml(item.answer) || '' }} />
          </div>
          {answered === 2 && <div className={styles.explanation}>
            <div dangerouslySetInnerHTML={{ __html: convertExpToHtml(item.explanation) || '' }} />
          </div>}
        </div>
      })}
    </div>
  </div>
}

export default QuestionStep