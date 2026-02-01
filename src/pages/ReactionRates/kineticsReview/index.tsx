import useAppData from "../../../hooks/useAppData"
import styles from './kinetics.module.scss'
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import EnergyProfile from "../../../components/EnergyProfile"
import ChartTime from "../../../components/ChartTime/ChartTime"
import ChartBar from "../../../components/ChartBar"
import MathContent from "../../../components/MathContent"
import TutorialControl from "../../../components/TutorialControl"
import { useHighLight } from "../../../hooks/useHighlight"
import { maxStep_Kinetics, stepsActions, tur_MathBlanks, tur_Hightlights, tur_Text, chooseMenuItems, tur_MathHighlights, tur_MathBlankArr, tur_MathText } from "./constants"
import useFunctions from "../../../hooks/useFunctions"
import { ChooseMenuSel } from "../../../layout/ChooseMenu"
import WatchMenu from "../../../layout/WatchMenu"
import { dotCatalystColors, dotColorList, sliderVertText } from "../../../constants"
import ChapterMenu from "../../../layout/ChapterMenu"
import ChartInA from "../../../components/ChartInA/ChartInA"
import { convertExpToHtml, setStorage } from "../../../helper/functions"
import { EnergyCatalystContainer, EnergyCatalystMoveableItem } from "../../../components/EnergyCatalyst"
import { BeakerSettings, BeakerShape } from "../../../components/CanvasBeaker/BeakerShape"
import BeakerWater from "../../../components/CanvasBeaker/BeakerShape/BeakerWater"
import { ChamberF } from "../../../components/CanvasBeaker/Chamber/ChamberF"
import Chamber from "../../../components/CanvasBeaker/Chamber/Chamber"
import SliderHoriz from "../../../components/CanvasBeaker/SliderHoriz/SliderHoriz"
import {
  ConcentrationPlotView,
  FirstOrderConcentration,
  ReactionRateChartLayoutSettings,
  TimeChartLayoutSettings,
  ZeroOrderConcentration
} from "../../../components/ConcentrationPlotView"
import { ReactionSettings, ReactionType } from "../../../components/ConcentrationPlotView/constants"
import Burner from "../../../components/CanvasBeaker/Burner/Burner"
import EnergyProfileChart from "../../../components/EnergyProfileChart/EnergyProfileChart"
import { EnergyRateChartSettings, LinearEquation, ReactionOrder } from "../../../components/EnergyProfileChart"
import { EnergyProfileChatInput } from "../../../components/EnergyProfileChart/EnergyProfileChartInput"
import EnergyProfileRateChart from "../../../components/EnergyProfileRateChart/EnergyProfileRateChart"
import { dotKineticsColors } from "../constants"
import { Mask } from '@reactour/mask'
import { RectResult } from '@reactour/utils';
import MathExpKinetics from "./MathExp"

const log_Kinetics = true

const ReactionKineticsReview = () => {
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
    catalystItemStates,
    setCatalystItemStates,
  } = useAppData()

  const {
    updatePageFromMenu,
    getNextMenu,
  } = useFunctions()

  const { highlightElement, removeHighlightElement, isHighlight } = useHighLight()

  const [chooseMenuIndex, setChooseMenuIndex] = useState(0)
  const [isDisableNextButton, setIsDisableNextButton] = useState<boolean>(false)
  const [rateChartState, setRateChartState] = useState<number>(0)

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
    // log_Kinetics && console.log('*** Tutorial-ACTIONS  - curStep changes', { curStep, curActions })
    // log_Kinetics && console.log('curActions: ', { curActions, curStep })
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
      if (Array.isArray(curActions?.canvaTimeSliderC)) {
        setCanvaTimeSliderC(curActions.canvaTimeSliderC)
      }
      if (Array.isArray(curActions?.canvaTimeSliderT)) {
        setCanvaTimeSliderT(curActions.canvaTimeSliderT)
      }
      if (Array.isArray(curActions?.catalystItemStates)) {
        setCatalystItemStates(curActions.catalystItemStates)
      }
      if (curActions?.curCatShakingOrderIdx !== undefined) {
        setCurCatShakingOrderIdx(curActions.curCatShakingOrderIdx)
      }
      if (curActions?.showCatalystMoveItem !== undefined) {
        setShowCatalystMoveItem(curActions.showCatalystMoveItem)
      }
      if (curActions?.isBurnerActive !== undefined) {
        setIsBurnerActive(curActions.isBurnerActive)
      }
      if (curActions?.energyProfileChartState !== undefined) {
        setEnergyProfileChartState(curActions.energyProfileChartState)
      }
      if (curActions?.valueFire !== undefined) {
        setValueFire(curActions.valueFire)
      }
      // console.log(curActions?.isDisableNextButton)
      if (curActions?.isDisableNextButton !== undefined) {
        setIsDisableNextButton(curActions.isDisableNextButton)
      }
      if (curActions?.rateChartState !== undefined) {
        setRateChartState(curActions.rateChartState)
      }

      if (curActions?.initGasCounts) {
        setGasCounts(initGasCounts)
      } else {
        const update = [...initGasCounts]
        const gasType = catShakingOrder[curActions.curCatShakingOrderIdx - 1] + 2
        update[gasType] = 7
        setGasCounts(update)
      }
    }
  }, [curStep, curActions])

  const handleClickChooseMenuItem = (index: number) => {
    setChooseMenuIndex(index)
  }

  const getFormula = () => {

    const t1 = 400
    const t2 = valueFire ?? 400

    const vR = 8.31
    const tmp = ((val_Ea ?? 8) * 1000 / vR * ((t1 - t2) / (t1 * t2))) ?? 0
    const lnA = (Math.exp(tmp) * ln_below) ?? 0
    

    console.log({t1, t2, vR, tmp, lnA})

    return [
      (lnA ?? 0).toFixed(1),
      (ln_below ?? 0).toFixed(1),

      (val_Ea ?? 0).toFixed(0) + 'e3',
      vR,

      t1,
      t1,

      t2.toFixed(0),
      t2.toFixed(0),
    ]
  }

  const getTurTextByStep = useCallback(() => {

    const t1 = 400
    const t2 = valueFire

    const vR = 8.31
    const lnA = (val_Ea * 1000 / vR * ((t1 - t2) / (t1 * t2))) ?? 0

    // log_Kinetics && console.log({c1, c2, t1, t2, lnA0, lnAt, k, t_12, rate})

    // turText can be undefined on new page due to curStep(lazy changes of state variable)
    const turTxt = tur_Text[curStep]
    const turVal = [
      (val_Ea ?? 0).toFixed(0),
      (lnA ?? 0).toFixed(2),
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
      // log_Kinetics && console.log('getNextStep 0', { update })
      // updatePageFromMenu(getNextMenu(-1))
      return
    }
    else if (update >= maxStep_Kinetics) {
      update = maxStep_Kinetics - 1
      // updatePageFromMenu(getNextMenu(1))
      return
    }

    return update
  }
  // call when click prev step
  const onStepChange = (step: number) => {
    // log_Kinetics && console.log('===onStepChange===', { step })
    const nextStep = getNextStep(step)
    if (nextStep === undefined) return
    if (curStep === nextStep) return
    // Tutorial-Highlight
    removeHighlightElement(tutorials[curStep]?.highlight)
    if (tutorials[nextStep]?.highlight?.length > 0) {
      highlightElement(tutorials[nextStep].highlight)
    }

    // log_Kinetics && console.log({ curStep, nextStep })
    setCurStep(nextStep)
  }
  // remove/init highlighted elements when page opens
  useEffect(() => {
    removeHighlightElement(tutorials[0]?.highlight)
    if (tutorials[0]?.highlight?.length > 0) {
      highlightElement(tutorials[0].highlight)
    }
    return () => removeHighlightElement(tutorials[curStep]?.highlight)
  }, [])


  // ** Beaker Burner state ;  'false': disable Burner, 'true': active Burner
  const [isBurnerActive, setIsBurnerActive] = useState(false)
  const [valueFire, setValueFire] = useState(400) // [400 - 600]

  // ** Chamber control variables
  const initActiveGases = [
    {
      id: 1,
      particleSize: 4.5,  // ** control gas cirle sizez
      color: dotKineticsColors[chooseMenuIndex][0],  // ** control gas color

      // name: 'Oxygen',
      // symbol: <>O<sub>2</sub></>,
      // svgSymbol: <>O<tspan baselineShift="sub">2</tspan></>,
      mass: 1,
      particleType: 'circle',
    },
    {
      id: 2,
      particleSize: 4.5,  // ** control gas cirle size
      color: dotKineticsColors[chooseMenuIndex][1],  // ** control gas color

      // name: 'Hydrogen',
      // symbol: <>H<sub>2</sub></>,
      // svgSymbol: <>H<tspan baselineShift="sub">2</tspan></>,
      mass: 1,
      particleType: 'circle',
    },
    {
      id: 10,
      particleSize: 4,
      color: dotCatalystColors[0],
      mass: 1,
      particleType: 'pentagon',
    },
    {
      id: 11,
      particleSize: 4,
      color: dotCatalystColors[1],
      mass: 1,
      particleType: 'pentagon',
    },
    {
      id: 12,
      particleSize: 4,
      color: dotCatalystColors[2],
      mass: 1,
      particleType: 'pentagon',
    }
  ]
  const [activeGases, setActiveGases] = useState(initActiveGases)   // ** control Gas Types here.

  const initGasCounts = [15, 15];  // ** control counts here
  const [gasCounts, setGasCounts] = useState(initGasCounts)   // ** control Beaker Gas Counts here.
  const beakerGasSpeed = (valueFire / 100 - 4) * 5 + 1      // ** control Gas Speed here  1-11

  const handleGasIncrease = () => {
    // setGasCounts([5, 5])
    setCanvaBeakerState(0)
  }
  const handleGasDecrease = () => {
    // setGasCounts([10, 10])
    setCanvaBeakerState(1)
  }
  const handleTest = () => {
    setCanvaBeakerState(2)
  }

  // ** Beaker control variables
  const settings = new BeakerSettings(290, true)
  // log_Kinetics && console.log({ settings })
  const beakerSize = { width: 240, height: 270 }
  const waterLevel = 0.4          // ** control waterlevel here

  // ** Graph Chart control variables
  const graphChartSize = { width: 220, height: 220 }

  const concentrationA = new ZeroOrderConcentration()
  concentrationA.init4Params(0, 0.8, 10, 0.2)
  const concentrationB = new ZeroOrderConcentration()
  concentrationB.init4Params(0, 0.2, 10, 0.8)
  // const concentrationA = new FirstOrderConcentration()
  // concentrationA.init3Params(1, 3, 10)
  // const concentrationB = new FirstOrderConcentration()
  // concentrationB.init3Params(1, 3, 10)

  // ** Control Catalyst State
  const [catShakingOrder, setCatShakingOrder] = useState<number[]>([0, 1, 2])
  const [curCatShakingOrderIdx, setCurCatShakingOrderIdx] = useState<number>(0)
  const [showCatalystMoveItem, setShowCatalystMoveItem] = useState<boolean>(false)
  const maxShakingCount = 7

  const val_Ea = [9, 8, 6][catShakingOrder[curCatShakingOrderIdx - 1]]
  const ln_below = [1.8, 2.1, 3.7][catShakingOrder[curCatShakingOrderIdx - 1]]

  const onCatalystItemShake = (shakingCount: number, itemIndex: number) => {
    // log_Kinetics && console.log('===onCatalystItemShake===', { shakingCount, itemIndex, curCatShakingOrderIdx, catShakingOrder })

    // const update = [...gasCounts]
    const update = [...gasCounts]
    if (update[itemIndex + 2] === undefined) {
      update[itemIndex + 2] = 0
    }
    update[itemIndex + 2] += 1
    setGasCounts(update)
    // console.log({ update })
    if (shakingCount >= maxShakingCount) {
      onStepChange(1)
    }
  }
  const onCatalystMenuItemClick = (index: number) => {
    // log_Kinetics && console.log('error --- 111', { index, catalystItemStates })

    const others = [...catalystItemStates]
    others.splice(index, 1)
    const normalState = Math.max(...others) // find normal state from other which is disabled(2) or active(3)
    const updatedState = [3, 3, 3]
    updatedState[index] = 1  // change current state[index] as moveable(hide menu item and show moveable item).
    // log_Kinetics && console.log('clicked catalyst menu item', { id, origin: catalystItemStates, update })
    setCatalystItemStates(updatedState)

    const restOrders = catShakingOrder.filter(s => s !== index)
    const updatedOrder = [
      ...restOrders.slice(0, curCatShakingOrderIdx),
      index,
      ...restOrders.slice(curCatShakingOrderIdx),
    ]
    // log_Kinetics && console.log({ updatedOrder })
    setCatShakingOrder(updatedOrder)
    onStepChange(1)
  }

  // ! important to use 'useMemo' to avoid re-renderting and show animation.
  const curCatalystItemState = useMemo(() => {
    return catalystItemStates.map((state, index) => {
      // // hide menu item for shaking.
      // if (showCatalystMoveItem && index === catShakingOrder[curCatShakingOrderIdx]) {
      //   return 1
      // }
      // // hide menu item which is completed shaking.
      // if (catShakingOrder.slice(0, curCatShakingOrderIdx).includes(index)) return 0
      return state
    })
  }, [catalystItemStates])

  const [chartTimingState, setChartTimingState] = useState(0)

  // ** EnergyProfileChart variables.
  const energyProfileInput = new EnergyProfileChatInput(ReactionOrder[chooseMenuIndex], valueFire, chooseMenuIndex + 1)
  const [energyProfileChartState, setEnergyProfileChartState] = useState(0)

  // ** EnergyProfileRateChart variables
  // const concentrationC = new ZeroOrderConcentration()
  // concentrationC.init2Params(1, 0.1)
  // const rateChartEquation = concentrationC
  const rateChartEquation = new LinearEquation()
  const minTemp = 400
  const gasConstant = 8.314
  const activationEnergy = useMemo(() => {
    switch (chooseMenuIndex) {
      case 0: return 12000
      case 1: return 10000
      case 2: return 8000
      default: return 12000
    }
  }, [chooseMenuIndex])
  const preExponentFactor = useMemo(() => {
    switch (chooseMenuIndex) {
      case 0: return 30
      case 1: return 10
      case 2: return 5
      default: return 20
    }
  }, [chooseMenuIndex])
  const k1 = preExponentFactor * Math.pow(Math.E, (-1 * activationEnergy) / (minTemp * gasConstant))
  const slope = (-1 * activationEnergy) / gasConstant
  rateChartEquation.init3Params(slope, 1 / minTemp, Math.log(k1))

  // const rectangle = { id: 1, x: 10, y: 10, width: 50, height: 50 }

  return <div className={styles.container}>
    <ChapterMenu />
    <ChooseMenuSel
      selectedIndex={chooseMenuIndex}
      menuItems={chooseMenuItems}
      isEnable={isEnableChooseMenu}
      onClickItem={handleClickChooseMenuItem}
    />
    {/* <WatchMenu /> */}

    <div className={styles.reactionDrawContainer}>
      <EnergyCatalystContainer
        catalystTypes={[0, 1, 2]}
        catalystItemStates={curCatalystItemState}
        setCatalystItemStates={(val) => setCatalystItemStates(val)}
        onCatalystMenuItemClick={onCatalystMenuItemClick}
        activeCatIdx={showCatalystMoveItem ? catShakingOrder[curCatShakingOrderIdx] : -1}
        regionWidth={290}
        regionHeight={150}
        maxShakingCount={maxShakingCount}
        onChangeShakingCount={(val, index) => {
          onCatalystItemShake(val, index)
        }}
      />
      <div className={styles.reactionBeaker}>
        <div
          id='tur_beakerShape'
          className={styles.beakerShape}
        >
          <BeakerShape
            {...beakerSize}
            settings={settings}
            waterlevel={waterLevel}
          />
          <ChamberF
            {...beakerSize}
            waterLevel={waterLevel}
            activeGases={activeGases}
            gasCounts={gasCounts}
            allowEscape={false}
            escapeSpeed={1000}
            gasSpeed={beakerGasSpeed}

            beakerState={canvaBeakerState}
            beakerColors={dotKineticsColors[chooseMenuIndex]}
            onMiddlePlay={() => { onStepChange(1) }}
            onEndPlay={() => { onStepChange(1) }}
          />
        </div>
        <Burner
          isActive={isBurnerActive}
          min={400}
          max={600}
          fireVal={valueFire}
          onChange={(val) => {
            setValueFire(val)
          }}
        />
      </div>
    </div>
    <div className={styles.reactionContentContainer}>
      <div className={styles.reactionChartRow}>
        <div className={styles.chartInA}>
          <EnergyProfileRateChart
            {...graphChartSize}
            // width={250}
            // height={250}
            settings={new EnergyRateChartSettings(graphChartSize.width)}
            equation={rateChartEquation}
            currentTime={1 / valueFire}
            currentTempInverse={1 / 500}
            highlightChart={true}
            rateChartState={rateChartState}
          />
          <div>
            <span className={styles.txtInK}> In(k) </span>
            <span className={styles.txtT}> 1/T </span>
            {rateChartState !== 0 && <span className={styles.txtSlope}> Slope=-Ea/R </span>}
          </div>
        </div>
        <div className={styles.chartInA}>
          <EnergyProfileChart
            kind={chooseMenuIndex}
            // width={250}
            // height={250}
            {...graphChartSize}
            settings={new EnergyRateChartSettings(graphChartSize.width)}
            state={energyProfileChartState}
            chartInput={energyProfileInput}
          />
          <div>
            <span className={styles.txtEnergy}> Energy </span>
            <span className={styles.txtReactants}> Reactants </span>
            <span className={styles.txtProducts}> Products </span>
          </div>
        </div>
      </div>
      <div className={styles.reactionContentRow}>
        <MathExpKinetics
          values={getFormula()}
          blanks={tur_MathText[curStep].blanks}
          txtRed={tur_MathText[curStep]?.txtRed ?? []}
        />
        <TutorialControl
          turText={getTurTextByStep()}
          onStepChange={onStepChange}
          isDisableNextButton={isDisableNextButton}
        />
      </div>
    </div>
    {isHighlight && <div className='overlay'></div>}
  </div>
}
export default ReactionKineticsReview
