import { useEffect } from "react"
import QuizReaction from "../../../components/QuizReaction"
import useAppData from "../../../hooks/useAppData"
import { routes } from "../../../constants"
import { titrationQuizData } from "../quiz/quizData"

const AcidsTitrationQuiz = () => {
  const { scrollable } = useAppData()
  useEffect(() => {
    scrollable.current = true
    return () => {
      scrollable.current = false
    }
  }, [])
  return (
    <QuizReaction
      quizKind={'acidsTitration'}
      quizData={titrationQuizData}
      prevRoute={routes.titration.path}
      useOrderedSelection={true}
      showAcidsHeader={true}
    />
  )
}

export default AcidsTitrationQuiz
