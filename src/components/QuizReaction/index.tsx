import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'
import styles from './styles.module.scss'
import Buttons from '../Buttons/Buttons'
import { convertExpToHtml, getItemsRandomlyFromArray, getStorage, setStorage } from '../../helper/functions'
import useAppData from '../../hooks/useAppData'
import useFunctions from '../../hooks/useFunctions'
import { QuizAnswerType, QuizItemType } from '../../helper/types'
import QuestionStep from './QuestionStep'
import QuestionDifficulty from './QuestionDifficulty'
import { getQuestionsByDifficulty } from '../../pages/AcidsBases/quiz/quizData'
import NavMenu from '../AcidsBases/navigation/NavMenu'
import AcidsBasesLayout from '../../layout/AcidsBasesLayout'

// Main page
interface QuizReactionProps {
  quizKind: string
  quizData: QuizItemType[]
  nextRoute?: string
  prevRoute?: string
  /** If true, questions are selected in order by difficulty (iOS behavior). 
   *  If false, questions are selected randomly (original web behavior). */
  useOrderedSelection?: boolean
  /** If true, show AcidsBases header and top-left nav button. */
  showAcidsHeader?: boolean
}
const QuizReaction = ({
  quizKind,
  quizData,
  nextRoute,
  prevRoute,
  useOrderedSelection = false,
  showAcidsHeader = false,
}: QuizReactionProps) => {
  const navigate = useNavigate()
  const [quizType, setQuizType] = useState(0)
  const [quizStep, setQuizStep] = useState(0)
  const [quizList, setQuizList] = useState<QuizItemType[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number[][]>([])
  const [correctStep, setCorrectStep] = useState(0)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const calc = () => {
      const contentSize = { width: 1420, height: 780 }
      const innerWidth = window.innerWidth
      const innerHeight = window.innerHeight
      if (innerWidth < contentSize.width || innerHeight < contentSize.height) {
        setScale(Math.min(innerWidth / contentSize.width, innerHeight / contentSize.height))
      } else {
        setScale(1)
      }
    }
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])

  const {
    updatePageFromMenu,
    getNextMenu,
  } = useFunctions()

  useEffect(() => {
    loadQuizData()
  }, [])

  const loadQuizData = () => {
    const quizStored = getStorage(`${quizKind}QuizResult`)
    if (!quizStored) return
    // console.log('loadQuizData', { quizStored })
    const { quizType, quizStep, quizList, selectedAnswer, correctStep } = quizStored
    setQuizStep(quizStep ?? 0)
    setQuizType(quizType)
    setQuizList(quizList)
    setSelectedAnswer(selectedAnswer)
    if (quizType > 0) setCorrectStep(100)
  }
  const saveQuizData = () => {
    const quizData = {
      quizType,
      quizStep: quizType + 1,
      quizList,
      selectedAnswer,
      correctStep: correctStep + 1,
    }
    // console.log('saveQuizData', { quizData })
    setStorage(`${quizKind}QuizResult`, quizData)
  }

  const handleInitializeQuiz = () => {
    setStorage(`${quizKind}QuizResult`, {})
    loadQuizData()
  }
  const handleStep = (val: number) => {
    let nextStep = quizStep + val
    if (nextStep > quizType + 1) {
      if (quizType > 0) {
        if (nextRoute) {
          navigate(nextRoute)
        } else {
          updatePageFromMenu(getNextMenu(1), false)
        }
      }
      return
    } else if (nextStep === quizType + 1) {
      saveQuizData()
      setCorrectStep(100)
    } else if (nextStep < 0) {
      // show Prev Course
      if (prevRoute) {
        navigate(prevRoute)
      } else {
        updatePageFromMenu(getNextMenu(-1), false)
      }
      return
    }
    // console.log('handleStep', { val, nextStep })
    setQuizStep(nextStep)
  }
  const handleQuizTypeChange = (val: number) => {
    setQuizType(val)
    // Use ordered selection for iOS-compatible quizzes (AcidsBases),
    // random selection for other quizzes
    const updateQuizList: QuizItemType[] = useOrderedSelection
      ? getQuestionsByDifficulty(quizData, val)
      : getItemsRandomlyFromArray(quizData, val)
    const updateAnswerItems: QuizAnswerType[][] = []
    updateQuizList.forEach(item => {
      const { correctAnswer, otherAnswers } = item
      // Always randomize answer order (this is correct behavior)
      const res: QuizAnswerType[] = getItemsRandomlyFromArray([correctAnswer, ...otherAnswers])
      item.allAnswerItems = res
      updateAnswerItems.push(res)
    })
    // setAnswerList(updateAnswerItems)

    // console.log('111', { update: updateQuizList, updateAnswerItems })
    setQuizList(updateQuizList)
    setCorrectStep(0)
    setSelectedAnswer([])
  }

  const handleSelectAnswers = (sel: number[], idx: number) => {
    // console.log('selectedAnswers 1', { sel, idx })
    const update = [...selectedAnswer]
    update[idx] = sel
    // console.log('selectedAnswers 2', { selectedAnswer, update })
    setSelectedAnswer(update)
  }
  const handleCorrectAnswer = (val: number) => {

    // console.log({ correctStep, correctAnswerData: quizList[val] })
    setCorrectStep(v => v + 1)
  }

  const isResults = quizStep === quizType + 1

  const controls = (
    <>
      <Buttons.StepButton
        onClick={() => handleStep(-1)}
        className={`${styles.prevBtn} ${isResults ? styles.fixedBtn : ''}`}
      >
        &#9664;
      </Buttons.StepButton>
      <Buttons.StepButton
        onClick={() => handleStep(1)}
        className={`${styles.nextBtn} ${isResults ? styles.fixedBtn : ''}`}
        disabled={!quizType || (quizStep > 0 && quizStep <= quizType && correctStep < quizStep) || (quizStep === quizType + 1 && !nextRoute)}
      >
        &#9654;
      </Buttons.StepButton>
      {isResults && (
        <Buttons.StepButton
          onClick={() => handleInitializeQuiz()}
          className={`${styles.refreshBtn} ${styles.fixedBtn}`}
        >
          &#8634;
        </Buttons.StepButton>
      )}
    </>
  )

  const quizControls = isResults ? (
    createPortal(
      <div className={styles.fixedControlsViewport}>
        <div
          className={styles.fixedControlsScaled}
          style={{
            width: `1420px`,
            height: `780px`,
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
          }}
        >
          {controls}
        </div>
      </div>,
      document.body
    )
  ) : (
    controls
  )

  const quizContent = (
    <div
      className={`${styles.container} ${showAcidsHeader ? `${styles.containerWithHeader} ${styles.containerInWrapper}` : ''
        }`}
    >
      {/* <div className={styles.navMenuDivider}></div> */}
      {quizStep === 0 && <div className={styles.content}>
        <h1 className={styles.title}>Let's take a quiz</h1>
        <h2 className={styles.description}>Choose the difficulty level of the quiz</h2>
        <div className={styles.skipQuiz}>
          <p
            onClick={() => {
              if (nextRoute) {
                navigate(nextRoute)
              } else {
                updatePageFromMenu(getNextMenu(1), false)
              }
            }}
          >
            Skip Quiz
          </p>
        </div>
        <div className={styles.selectQuiz}>
          <QuestionDifficulty
            text={'Easy'}
            count={5}
            onClick={handleQuizTypeChange}
            isActive={quizType === 5}
          />
          <QuestionDifficulty
            text={'Medium'}
            count={10}
            onClick={handleQuizTypeChange}
            isActive={quizType === 10}
          />
          <QuestionDifficulty
            text={'Hard'}
            count={20}
            onClick={handleQuizTypeChange}
            isActive={quizType === 20}
          />
        </div>
      </div>}
      {quizStep > 0 && quizStep < quizType + 1 && <div className={styles.content}>
        <QuestionStep
          quizItem={quizList[quizStep - 1]}
          selectedAnswers={selectedAnswer[quizStep - 1] ?? []}
          onSelectAnswers={(sel) => handleSelectAnswers(sel, quizStep - 1)}
          isCorrectAnswered={correctStep >= quizStep}
          onCorrectAnswer={(val) => handleCorrectAnswer(val)}
        />
      </div>}
      {quizStep === quizType + 1 && <>

        <div className={styles.content}>
          <h1 className={styles.title}>You got {selectedAnswer.filter(a => a.length === 1).length} correct out of {quizType}</h1>
          <h2 className={styles.description}>Let's review the questions</h2>

          {quizList.map((quizItem, idx) =>
            <ResultAnswerCard key={idx} quizItem={quizItem} selAnswerOrder={selectedAnswer[idx]} />
          )}
        </div>
      </>
      }
    </div>
  )

  // For AcidsBases quizzes, wrap with scaling layout
  if (showAcidsHeader) {
    return (
      <AcidsBasesLayout>
        <div className={styles.headerBar} />
        <NavMenu />
        <div className={styles.quizWrapper}>
          {quizControls}
          {quizContent}
        </div>
      </AcidsBasesLayout>
    )
  }

  // For ReactionRates quizzes, render without scaling layout (they use CommonLayout)
  return <>
    {quizControls}
    {quizContent}
  </>
}
export default QuizReaction

interface ResultAnswerCardProps {
  quizItem: QuizItemType
  selAnswerOrder: number[]
  // correctAnswerIndex: number
}
const ResultAnswerCard = ({ quizItem, selAnswerOrder }: ResultAnswerCardProps) => {
  return <div
    className={`
    ${styles.quizResultCard} 
    ${selAnswerOrder.length === 1 ? styles.correctBorder : styles.wrongBorder}
  `}
  >
    <div className={styles.question} dangerouslySetInnerHTML={{ __html: convertExpToHtml(quizItem.question) }} />
    {selAnswerOrder.length === 1 ?
      <div className={styles.correctIcon}>
        <i className="fa fa-check"></i>
      </div> :
      <div className={styles.wrongIcon}>
        <i className="fa fa-close"></i>
      </div>
    }
    {selAnswerOrder.map((sel, index) => {
      let answer = quizItem?.allAnswerItems ? quizItem?.allAnswerItems[sel]?.answer : ''
      const explaination = quizItem?.allAnswerItems ? quizItem?.allAnswerItems[sel]?.explanation : ''
      const isCorrectAnswer = index === selAnswerOrder.length - 1
      answer = (isCorrectAnswer ? 'Correct Answer: ' : 'Your Answer: ') + answer
      return <div
        key={index}

      >
        <div className={`${isCorrectAnswer ? styles.correctText : styles.wrongText}`}>
          <div dangerouslySetInnerHTML={{ __html: convertExpToHtml(answer) || '' }} />
        </div>
        <ShowExplaination explaination={explaination} />
      </div>
    })}
  </div>
}
const ShowExplaination = ({ explaination }: { explaination: string }) => {
  const [isShow, setIsShow] = useState(false)
  return <div>
    <div className={styles.toggleShow}
      onClick={() => setIsShow(v => !v)}
    >
      {!isShow ? 'Show Explaination' : 'Hide Explaination'}
    </div>
    {isShow === true && <div className={styles.explanation} dangerouslySetInnerHTML={{ __html: convertExpToHtml(explaination) || '' }} />}
  </div>
}