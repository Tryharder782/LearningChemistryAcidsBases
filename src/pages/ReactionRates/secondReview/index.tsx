import useAppData from "../../../hooks/useAppData"
import styles from './second.module.scss'
import { useCallback, useEffect, useState } from "react"
import EnergyProfile from "../../../components/EnergyProfile"
import ChartTime from "../../../components/ChartTime/ChartTime"
import ChartBar from "../../../components/ChartBar"
import MathContent from "../../../components/MathContent"
import TutorialControl from "../../../components/TutorialControl"
import { useHighLight } from "../../../hooks/useHighlight"
import { maxStep_Second, stepsActions, tur_MathBlanks, tur_Hightlights, tur_Text, tur_MathBlankArr, tur_MathText } from "./constants"
import useFunctions from "../../../hooks/useFunctions"
import { ChooseMenu } from "../../../layout/ChooseMenu"
import WatchMenu from "../../../layout/WatchMenu"
import { dotColorList, sliderVertText } from "../../../constants"
import ChapterMenu from "../../../layout/ChapterMenu"
import ChartInA from "../../../components/ChartInA/ChartInA"
import { convertExpToHtml, getStorage } from "../../../helper/functions"
import MathExpSecond from "./MathExp"
import SpinSelection from "../../../components/Buttons/SpinSelection"
import { spinValuesT } from "../constants"

const ReactionSecondReview = () => {
  const {
    curStep,
    valuesC,
    setValuesC,
    valuesT,
    setValuesT,
    canvaTimeSliderC,
    setCanvaTimeSliderC,
    canvaTimeSliderT,
    setCanvaTimeSliderT,
    canvaTimeState,
    setCanvaTimeState,
    setCurStep,
    canvaBeakerState,
    setCanvaBeakerState,
    setTimeframe,
    isEnableChooseMenu,
    setIsEnableChooseMenu,
    activeDotIndex,
    setActiveDotIndex,
    spinValueT,
    setSpinValueT,
  } = useAppData()

  const {
    updatePageFromMenu,
    getNextMenu,
  } = useFunctions()

  const [curValT, setCurValT] = useState<number>(valuesT[0])
  const [curValC, setCurValC] = useState<number>(valuesC[0])
  const onChangeCurValC = (valC: number) => {
    setCurValC(valC)
  }

  const { highlightElement, removeHighlightElement, isHighlight } = useHighLight()
  const [chartBarState, setChartBarState] = useState(0)

  // *** Setup tutorial actions here
  const tutorials = Array.from(Array(tur_Text.length).keys()).map(idx => {
    return {
      text: tur_Text[idx],
      highlight: tur_Hightlights[idx],
      actions: stepsActions[idx],
    }
  })

  // *** Tutorial-ACTIONS  - curStep changes
  const curActions = tutorials[curStep]?.actions as any
  useEffect(() => {
    // console.log('*** Tutorial-ACTIONS  - curStep changes', { curStep })
    // console.log('curActions: ', { curActions, curStep })
    if (curActions) {
      if (curActions?.canvaTimeState !== undefined) {
        setCanvaTimeState(curActions.canvaTimeState)
      }
      if (curActions?.canvaBeakerState !== undefined) {
        setCanvaBeakerState(curActions.canvaBeakerState)
      }
      if (curActions?.isEnableChooseMenu !== undefined) {
        setIsEnableChooseMenu(curActions.isEnableChooseMenu)
      }
      if (curActions?.activeDotIndex !== undefined) {
        setActiveDotIndex(curActions.activeDotIndex)
      }
      if (curActions?.canvaBarState !== undefined) {
        setChartBarState(curActions.canvaBarState)
      }
      if (Array.isArray(curActions?.canvaTimeSliderC)) {
        setCanvaTimeSliderC(curActions.canvaTimeSliderC)
      }
      if (Array.isArray(curActions?.canvaTimeSliderT)) {
        setCanvaTimeSliderT(curActions.canvaTimeSliderT)
      }
      if (curActions?.activeDotIndex !== undefined) {
        const values = getStorage(`secondReview-order${curActions?.activeDotIndex}`)
        // debugger
        const { valuesC, valuesT } = values ?? { valuesC: [70, 35], valuesT: [10, 15] }
        setValuesC(valuesC)
        setValuesT(valuesT)
      }
    }

    // action_turMathBlanks()
  }, [curStep, curActions])

  const handleClickChooseMenuItem = () => {
    onStepChange(1)
  }

  const getFormula = () => {
    const c1 = (valuesC[0] ?? 0) / 100
    const c2 = (valuesC[1] ?? 0) / 100
    const t1 = valuesT[0]
    const At = c2
    const A0 = c1
    const k = ((1 / At) - (1 / A0)) / t1
    const t_12 = 1 / (k * A0)
    const rate = k * (At * At)

    const exp0 = `\\[ k = \\frac{(1/[A_t]) - (1/[A_0])}{t}\\]`
    const exp1 = `\\[ ${k.toFixed(2)} = \\frac{${(1 / At).toFixed(2)} - ${(1 / A0).toFixed(2)}}{${t1.toFixed(2)}}\\]`
    const exp2 = `\\[ t_{1/2} = 1/k[A_0] \\]`
    const exp3 = `\\[ ${t_12.toFixed(2)} = 1/${k.toFixed(2)}(${A0.toFixed(2)}) \\]`
    const exp4 = `\\[ Rate = k[A]^2 \\]`
    const exp5 = `\\[ ${rate.toFixed(2)} = ${k.toFixed(3)}(${At.toFixed(2)})^2 \\]`

    return [
      k.toFixed(2),
      (1 / At).toFixed(2),
      (1 / A0).toFixed(2),
      t1.toFixed(2),

      t_12.toFixed(2),
      k.toFixed(2),
      A0.toFixed(2),

      rate.toFixed(2),
      k.toFixed(3),
      curValC.toFixed(2),
    ]
  }

  const getTurTextByStep = useCallback(() => {
    const c1 = (valuesC[0] ?? 0) / 100
    const c2 = (valuesC[1] ?? 0) / 100
    const t1 = valuesT[0]
    const At = c2
    const A0 = c1
    const k = ((1 / At) - (1 / A0)) / t1
    const t_12 = 1 / (k * A0)
    const rate = k * (At * At)
    // console.log({c1, c2, t1, t2, lnA0, lnAt, k, t_12, rate})

    // turText can be undefined on new page due to curStep(lazy changes of state variable)
    const turTxt = tur_Text[curStep]
    const turVal = [
      rate.toFixed(2), // val[0]
    ]
    const update = turTxt?.map((item) => {
      // const update: string[] = []
      let res = ''
      if (typeof item === 'function') {
        res = item(turVal)
      } else {
        res = item
      }
      return convertExpToHtml(res)
    }) ?? []
    return update
  }, [curStep, valuesC, valuesT])

  // get available next step number
  const getNextStep = (step: number) => {
    let update = curStep + step
    if (update < 0) {
      update = 0
      // console.log('getNextStep 0', { update })
      // updatePageFromMenu(getNextMenu(-1))
      return
    }
    else if (update >= maxStep_Second) {
      update = maxStep_Second - 1
      // updatePageFromMenu(getNextMenu(1))
      return
    }

    return update
  }
  // call when click prev step
  const onStepChange = (step: number) => {
    // console.log('===onStepChange===', { step })
    const nextStep = getNextStep(step)
    // console.log({ nextStep })
    if (nextStep === undefined) return
    if (curStep === nextStep) return
    // Tutorial-Highlight
    removeHighlightElement(tutorials[curStep]?.highlight)
    if (tutorials[nextStep]?.highlight?.length > 0) {
      highlightElement(tutorials[nextStep].highlight)
    }

    // console.log({ curStep })
    setCurStep(nextStep)
  }
  // remove highlighted elements when page opens
  useEffect(() => {
    return () => removeHighlightElement(tutorials[curStep]?.highlight)
  }, [])

  return <div className={styles.container}>
    <ChapterMenu />
    <ChooseMenu isEnable={isEnableChooseMenu} onClickItem={() => handleClickChooseMenuItem()} />
    <WatchMenu />

    <div className={styles.reactionDrawContainer}>
      <EnergyProfile
        valuesC={valuesC}
        valuesT={valuesT}
        beakerDotColor={dotColorList[activeDotIndex]}
        beakerState={canvaBeakerState}
        onEndPlay={() => onStepChange(1)}
      />
      <ChartTime
        valuesC={valuesC}
        setValuesC={val => setValuesC(val)}
        canvaTimeSliderC={canvaTimeSliderC}
        valuesT={valuesT}
        setValuesT={val => setValuesT(val)}
        curValT={curValT}
        setCurValT={(val) => setCurValT(val)}
        onChangeCurValC={onChangeCurValC}
        canvaTimeSliderT={canvaTimeSliderT}
        canvaTimeState={canvaTimeState}
        onTimeframeChange={val => setTimeframe(val)}
        colors={dotColorList[activeDotIndex]}
        textVert={`[${sliderVertText[activeDotIndex]}]`}
        textHoriz={`Time`}
        order={2}
      />
      {/* <SpinSelection
        spinValues={spinValuesT}
        value={spinValueT}
        onChange={(val) => setSpinValueT(val)}
      /> */}
      <ChartBar
        valuesC={valuesC}
        valuesT={valuesT}
        state={chartBarState}
        kind={activeDotIndex}
        colors={dotColorList[activeDotIndex]}
      />
    </div>
    <div className={styles.reactionContentContainer}>
      <div className={styles.chartInA}>
        <ChartInA
          valuesC={valuesC}
          canvaTimeSliderC={canvaTimeSliderC}
          valuesT={valuesT}
          canvaTimeSliderT={canvaTimeSliderT}
          canvaTimeState={canvaTimeState}
          onTimeframeChange={val => setTimeframe(val)}
          colors={dotColorList[activeDotIndex]}
          textVert={`In(${sliderVertText[activeDotIndex]})`}
          textHoriz={`Time`}
        />
      </div>
      <MathExpSecond
        values={getFormula()}
        blanks={tur_MathText[curStep].blanks}
        txtRed={tur_MathText[curStep]?.txtRed ?? []}
      />
      <TutorialControl
        turText={getTurTextByStep()}
        onStepChange={onStepChange}
        isDisableNextButton={isEnableChooseMenu}
      />
    </div>
    {isHighlight && <div className='overlay'></div>}
  </div>
}
export default ReactionSecondReview
