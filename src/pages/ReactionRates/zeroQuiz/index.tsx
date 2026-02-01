import { useEffect } from "react"
import QuizReaction from "../../../components/QuizReaction"
import { quizData } from "./constants"
import useAppData from "../../../hooks/useAppData"

// Main page
const ReactionZeroQuiz = () => {
  const { scrollable } = useAppData()
  useEffect(() => {
    scrollable.current = true
    return () => {
      scrollable.current = false
    }
  }, [])
  return <QuizReaction quizKind={'zero'} quizData={quizData} />
}
export default ReactionZeroQuiz