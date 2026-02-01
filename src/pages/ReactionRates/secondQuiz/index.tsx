import { useEffect } from "react"
import QuizReaction from "../../../components/QuizReaction"
import useAppData from "../../../hooks/useAppData"
import { quizData } from "./constants"

// Main page
const ReactionSecondQuiz = () => {
  const { scrollable } = useAppData()
  useEffect(() => {
    scrollable.current = true
    return () => {
      scrollable.current = false
    }
  }, [])
  return <QuizReaction quizKind={'second'} quizData={quizData} />
}
export default ReactionSecondQuiz