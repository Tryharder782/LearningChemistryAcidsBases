import useAppData from "../../../hooks/useAppData"
import styles from './zero.module.scss'
import { useCallback, useEffect, useRef, useState } from "react"
import EnergyProfile from "../../../components/EnergyProfile"
import ChartTime from "../../../components/ChartTime/ChartTime"
import ChartBar from "../../../components/ChartBar"
import MathContent from "../../../components/MathContent"
import TutorialControl from "../../../components/TutorialControl"
import { useHighLight } from "../../../hooks/useHighlight"
import { maxStep_Zero, stepsActions, tur_MathBlanks, tur_Hightlights, tur_Text, tur_MathBlankArr, tur_MathText } from "./constants"
import useFunctions from "../../../hooks/useFunctions"
import { ChooseMenu } from "../../../layout/ChooseMenu"
import WatchMenu from "../../../layout/WatchMenu"
import { dotColorList, sliderVertText } from "../../../constants"
import ChapterMenu from "../../../layout/ChapterMenu"
import { convertExpToHtml, setStorage } from "../../../helper/functions"
import MathExpZero from "./MathExp"
import SpinSelection from "../../../components/Buttons/SpinSelection"
import { spinValuesT } from "../constants"

const ReactionZero = () => {
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
  const curActions = tutorials[curStep]?.actions
  useEffect(() => {
    // console.log('*** Tutorial-ACTIONS  - curStep changes', { curStep })
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
      // if (Array.isArray(curActions?.valuesT)) {
      //   setValuesT(curActions.valuesT)
      // }
    }

    // action_turMathBlanks()
  }, [curStep, curActions])

  useEffect(() => {
    if (curActions?.saveDotIndex === undefined) return
    setStorage(`zeroReview-order${activeDotIndex}`, { valuesC, valuesT })
  }, [curActions?.saveDotIndex])

  // useEffect(() => {
  //   setTimeout(() => {
  //     action_turMathBlanks()
  //   }, 1500);
  // }, [])
  // const action_turMathBlanks = () => {
  //   jQuery('.blankMath').removeClass()
  //   const curTurMathBlanks = tur_MathBlankArr[curStep]

  //   // console.log({aaa: jQuery('#tur_math4_2')})

  //   const s1 = '#tur_math3_2>span mjx-msub'
  //   const s2 = '#tur_math3_2>span mjx-num'
  //   const s3 = '#tur_math3_2>span mjx-den'
  //   const s4 = '#tur_math3_2 mjx-math mjx-mn'
  //   const a3 = jQuery(s1)
  //   const b3 = jQuery(s2)
  //   const c3 = jQuery(s3)
  //   const d3 = jQuery(s4)

  //   // console.log('0', s1, {a3})
  //   // console.log('1', s2, {b3})
  //   // console.log('2', s3, {c3})
  //   // console.log('3', s4, {d3})

  //   if (!curTurMathBlanks) return
  //   curTurMathBlanks.map((blank: any, index) => {
  //     const math = jQuery(blank.query)
  //     // console.log({ query: blank.query, index, math, nths: blank?.nths })
  //     if (!math || !blank?.nths) return
  //     blank?.nths.map((nth: any) => {
  //       if (!math[nth]) return
  //       math[nth].className = 'blankMath'
  //     })
  //   })
  // }

  const handleClickChooseMenuItem = () => {
    onStepChange(1)
  }

  const getFormula = () => {
    const c1 = (valuesC[0] ?? 0) / 100
    const c2 = (valuesC[1] ?? 0) / 100
    const t1 = valuesT[0]
    const t2 = valuesT[1]
    const c = c2 - c1
    const t = t2 - t1
    const k = -(c / t)
    const deltaT = t2 - t1
    const deltaC = c2 - c1
    const rateConstant = -deltaC / deltaT
    const a0Numerator = (t1 * c2) - (t2 * c1)
    const A0 = a0Numerator / (t1 - t2)
    const t_12 = A0 / (2 * rateConstant)

    const exp0 = `\\[ Rate = k = -\\frac{△c}{△t} = -\\frac{c_2 - c_1}{t_2 - t_1}\\]`
    const exp1 = `\\[ Rate = ${k.toFixed(2)} = -\\frac{${c.toFixed(2)}}{${t.toFixed(2)}} = -\\frac{${c2.toFixed(2)} - ${c1.toFixed(2)}}{${t2.toFixed(2)} - ${t1.toFixed(2)}}\\]`
    const exp2 = `\\[ t_{1/2} = [A_0]/(2k) \\]`
    const exp3 = `\\[ ${t_12.toFixed(2)} = ${A0.toFixed(2)} / (2  x  ${k.toFixed(2)}) \\]`
    const exp4 = `\\[ Rate = k[A]^0 \\]`
    const exp5 = `\\[ ${k.toFixed(2)} = ${k.toFixed(3)}(${c1.toFixed(2)})^0 \\]`

    return [
      k.toFixed(2),
      (-c).toFixed(2),
      t.toFixed(2),
      c2.toFixed(2),
      t2.toFixed(2),
      c1.toFixed(2),
      t1.toFixed(2),

      t_12.toFixed(2),
      A0.toFixed(2),
      k.toFixed(2),

      k.toFixed(2),
      k.toFixed(3),
      curValC.toFixed(2),
    ]
  }

  // const getFormula = () => {
  //   const c1 = (valuesC[0] ?? 0) / 100
  //   const c2 = (valuesC[1] ?? 0) / 100
  //   const t1 = valuesT[0]
  //   const t2 = valuesT[1]
  //   const c = c2 - c1
  //   const t = t2 - t1
  //   const k = -(c / t)
  //   const deltaT = t2 - t1
  //   const deltaC = c2 - c1
  //   const rateConstant = -deltaC / deltaT
  //   const a0Numerator = (t1 * c2) - (t2 * c1)
  //   const A0 = a0Numerator / (t1 - t2)
  //   const t_12 = A0 / (2 * rateConstant)

  //   const exp0 = `\\[ Rate = k = -\\frac{△c}{△t} = -\\frac{c_2 - c_1}{t_2 - t_1}\\]`
  //   const exp1 = `\\[ Rate = ${k.toFixed(2)} = -\\frac{${c.toFixed(2)}}{${t.toFixed(2)}} = -\\frac{${c2.toFixed(2)} - ${c1.toFixed(2)}}{${t2.toFixed(2)} - ${t1.toFixed(2)}}\\]`
  //   const exp2 = `\\[ t_{1/2} = [A_0]/(2k) \\]`
  //   const exp3 = `\\[ ${t_12.toFixed(2)} = ${A0.toFixed(2)} / (2  x  ${k.toFixed(2)}) \\]`
  //   const exp4 = `\\[ Rate = k[A]^0 \\]`
  //   const exp5 = `\\[ ${k.toFixed(2)} = ${k.toFixed(3)}(${c1.toFixed(2)})^0 \\]`

  //   return {
  //     exp0,
  //     exp1,
  //     exp2,
  //     exp3,
  //     exp4,
  //     exp5,
  //   }
  // }

  const getTurTextByStep = useCallback(() => {
    const c1 = (valuesC[0] ?? 0) / 100
    const c2 = (valuesC[1] ?? 0) / 100
    const t1 = valuesT[0]
    const t2 = valuesT[1]
    const c = c2 - c1
    const t = t2 - t1
    const k = -(c / t)
    const deltaT = t2 - t1
    const deltaC = c2 - c1
    const rateConstant = -deltaC / deltaT
    const a0Numerator = (t1 * c2) - (t2 * c1)
    const A0 = a0Numerator / (t1 - t2)
    const t_12 = A0 / (2 * rateConstant)

    // turText can be undefined on new page due to curStep(lazy changes of state variable)
    const turTxt = tur_Text[curStep]
    const turVal = [
      k.toFixed(3),   // val[0]
      t_12.toFixed(2),// val[1]
      k.toFixed(2),   // val[2]
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
  }, [curStep])

  // get available next step number
  const getNextStep = (step: number) => {
    let update = curStep + step
    if (update < 0) {
      update = 0
      // console.log('getNextStep 0', { update })
      updatePageFromMenu(getNextMenu(-1))
      return
    }
    // else if (update > stepPlayCount[activeMenu]) update = stepPlayCount[activeMenu]
    else if (update >= maxStep_Zero) {
      update = maxStep_Zero - 1
      updatePageFromMenu(getNextMenu(1))
      return
    }

    return update
  }

  // call when click prev step
  const onStepChange = (step: number) => {
    const nextStep = getNextStep(step)
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
    // @ts-ignore
    // window.jQuery = jQuery;
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
        order={0}
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
      <MathExpZero
        values={getFormula()}
        blanks={tur_MathText[curStep]?.blanks ?? []}
        txtRed={tur_MathText[curStep]?.txtRed ?? []}
      />
      {/* <MathContent
        {...getFormula()}
        blanks={tur_MathBlankArr[curStep]}
      /> */}
      <TutorialControl
        turText={getTurTextByStep()}
        onStepChange={onStepChange}
        isDisableNextButton={isEnableChooseMenu}
      />
    </div>
    {isHighlight && <div className='overlay'></div>}
  </div>
}
export default ReactionZero
