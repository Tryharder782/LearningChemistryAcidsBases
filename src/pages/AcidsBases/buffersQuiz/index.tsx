import { useEffect } from "react"
import QuizReaction from "../../../components/QuizReaction"
import useAppData from "../../../hooks/useAppData"
import { routes } from "../../../constants"
import { bufferQuizData } from "../quiz/quizData"

const AcidsBuffersQuiz = () => {
  const { scrollable } = useAppData()
  useEffect(() => {
    scrollable.current = true
    return () => {
      scrollable.current = false
    }
  }, [])
  return (
    <QuizReaction
      quizKind={'acidsBuffers'}
      quizData={bufferQuizData}
      prevRoute={routes.buffers.path}
      nextRoute={routes.titration.path}
      useOrderedSelection={true}
      showAcidsHeader={true}
    />
  )
}

export default AcidsBuffersQuiz
