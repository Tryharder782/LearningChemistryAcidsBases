import { useEffect } from "react"
import QuizReaction from "../../../components/QuizReaction"
import useAppData from "../../../hooks/useAppData"
import { quizData } from "./constants"

// Main page
const ReactionKineticsQuiz = () => {
  const { scrollable } = useAppData()
  useEffect(() => {
    scrollable.current = true
    return () => {
      scrollable.current = false
    }
  }, [])
  return <QuizReaction quizKind={'kinetics'} quizData={quizData} />
}
export default ReactionKineticsQuiz