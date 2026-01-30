import { useEffect } from "react"
import QuizReaction from "../../../components/QuizReaction"
import useAppData from "../../../hooks/useAppData"
import { routes } from "../../../constants"
import { introductionQuizData } from "../quiz/quizData"

const AcidsIntroQuiz = () => {
  const { scrollable } = useAppData()
  useEffect(() => {
    scrollable.current = true
    return () => {
      scrollable.current = false
    }
  }, [])
  return (
    <QuizReaction
      quizKind={'acidsIntro'}
      quizData={introductionQuizData}
      prevRoute={routes.introduction.path}
      nextRoute={routes.buffers.path}
      useOrderedSelection={true}
      showAcidsHeader={true}
    />
  )
}

export default AcidsIntroQuiz
