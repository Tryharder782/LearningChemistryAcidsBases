import useAppData from "../../../hooks/useAppData"
import styles from './comparison.module.scss'
import { useCallback, useEffect, useState } from "react"
import EnergyProfile from "../../../components/EnergyProfile"
import ChartTime from "../../../components/ChartTime/ChartTime"
import ChartBar from "../../../components/ChartBar"
import MathContent from "../../../components/MathContent"
import TutorialControl from "../../../components/TutorialControl"
import { useHighLight } from "../../../hooks/useHighlight"
import { maxStep_Second, stepsActions, tur_MathBlanks, tur_Hightlights, tur_Text } from "./constants"
import useFunctions from "../../../hooks/useFunctions"
import { dotColorList } from "../../../constants"
import ChapterMenu from "../../../layout/ChapterMenu"
import ChartInA from "../../../components/ChartInA/ChartInA"
import { SizeStyle } from "../../../helper/types"
import OrderCardItem from "../../../components/OrderCardItem"
import HandDragOrderItem from "../../../components/HandDragOrderItem"
import Buttons from "../../../components/Buttons/Buttons"
import { convertExpToHtml } from "../../../helper/functions"
import { ConcentrationPlotView, ReactionRateChartLayoutSettings, TimeChartLayoutSettings } from "../../../components/ConcentrationPlotView"
import { ReactionSettings, ReactionType } from "../../../components/ConcentrationPlotView/constants"
import { ReactionComparisonViewModel } from "../../../components/ConcentrationPlotView/ReactionComparisonViewModel"
import { DndContext } from '@dnd-kit/core';
import Draggable from "./Draggable"
import Droppable from "./Droppable"
import SliderHoriz from "../../../components/SliderHoriz/SliderHoriz"
import { SpinBtnHoriz } from "../../../components/Buttons/SpinBtns"

const ReactionComparison = () => {
  const {
    curStep,
    // valuesC,
    setValuesC,
    // valuesT,
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
    setHoverOrder,
    hoverOrder,
    dragOrder,
  } = useAppData()
  const valuesC = [100, 1]
  const valuesT = [0, 20]

  const {
    updatePageFromMenu,
    getNextMenu,
  } = useFunctions()

  const [curValT, setCurValT] = useState<number>(valuesT[0])

  const { highlightElement, removeHighlightElement, isHighlight } = useHighLight()
  const [isDisableNextButton, setIsDisableNextButton] = useState<boolean>(false)
  const [shuffledOrder] = useState([1, 2, 3].sort((a, b) => 0.5 - Math.random()))
  // console.log({ shuffledArray: shuffledOrder })

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
    // console.log('*** Tutorial-ACTIONS  - curStep changes', { curStep, curActions })
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
      if (curActions?.orderItemMove !== undefined) {
        setIsOrderItemMove(curActions.orderItemMove)
      }
      if (curActions?.playButtonStatus !== undefined) {
        setPlayButtonStatus(curActions.playButtonStatus)
      }
      if (curActions?.isDisableNextButton !== undefined) {
        setIsDisableNextButton(curActions.isDisableNextButton)
      }
      if (Array.isArray(curActions?.canvaTimeSliderC)) {
        setCanvaTimeSliderC(curActions.canvaTimeSliderC)
      }
      if (Array.isArray(curActions?.canvaTimeSliderT)) {
        setCanvaTimeSliderT(curActions.canvaTimeSliderT)
      }
      if (Array.isArray(curActions?.draggableOrder)) {
        setOrderMatches(curActions.draggableOrder)
      }
    }
  }, [curStep, curActions])

  const [orderMatches, setOrderMatches] = useState([0, 0, 0])

  const handleDragEnd = ({ over }: any) => {
    // setParent(over ? over.id : null);
    // setHoverOrder(0)
    if (hoverOrder === dragOrder) {
      const update = [...orderMatches]
      update[hoverOrder - 1] = 2
      setOrderMatches(update)
      if (update.every(v => v === 2)) {
        setIsDisableNextButton(false)
      }
    }
  }

  const handleDragOver = ({ over }: any) => {
    // console.log({ over })
    setHoverOrder(over ? over.id : 0);
  }

  const getTurTextByStep = useCallback(() => {
    // turText can be undefined on new page due to curStep(lazy changes of state variable)
    const turTxt = tur_Text[curStep]
    const update = turTxt?.map((item) => {
      // const update: string[] = []
      let res = ''
      if (typeof item === 'function') {
        res = item([])
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
      updatePageFromMenu(getNextMenu(-1))
      return
    }
    else if (update >= maxStep_Second) {
      update = maxStep_Second - 1
      updatePageFromMenu(getNextMenu(1))
      return
    }

    return update
  }
  // call when click prev step
  const onStepChange = (step: number) => {
    // console.log('===onStepChange===', { step })
    const nextStep = getNextStep(step)
    // console.log({ curStep, nextStep })
    if (nextStep === undefined) return
    if (curStep === nextStep) return
    // Tutorial-Highlight
    removeHighlightElement(tutorials[curStep]?.highlight)
    if (tutorials[nextStep]?.highlight?.length > 0) {
      highlightElement(tutorials[nextStep].highlight)
    }

    setCurStep(nextStep)
  }
  // remove highlighted elements when page opens
  useEffect(() => {
    return () => removeHighlightElement(tutorials[curStep]?.highlight)
  }, [])

  const [isOrderItemMove, setIsOrderItemMove] = useState(false)
  const getOrderListItems = () => {
    const order0 = {
      title: 'Order: 0',
      // exp0: `[A<span class="sm-botom">t</span>] = [A<span class="sm-botom">0</span>] - kt`,
      exp0: `&nbsp;[A__t__] = [A__0__] - kt`,
      exp1: `**1.00** = 1.0 - 0.07 (**0.0**)`,
      exp2: `&nbsp;Rate = k[A]^0^`,
      exp3: `**0.070** = 0.07(**1.00**)^0^`,
    }
    const order1 = {
      title: 'Order: 1',
      exp0: `&nbsp;[A__t__] = [A__0__]e^-kt^`,
      exp1: `**1.00** = 1.0e^0.07 (**0.0**)^`,
      exp2: `&nbsp;Rate = k[A]^1^`,
      exp3: `**0.069** = 0.07(**1.00**)^1^`,
    }
    const order2 = {
      title: 'Order: 2',
      exp0: `&nbsp;[A__t__] = [A__0__]([A__0__]kt+1)`,
      exp1: `**1.00** = 1.0/(1.0(0.14)(**0.0**)+1)`,
      exp2: `&nbsp;Rate = k[A]^2^`,
      exp3: `**0.143** = 0.14(**1.00**)^2^`,
    }
    return [order0, order1, order2]
  }
  const orderListItems = getOrderListItems()

  const [playButtonStatus, setPlayButtonStatus] = useState(0)
  const handleClickPlayButton = () => {
    onStepChange(1)
  }
  const handleSpinDown = () => {
    let update = curValT - 1
    if (update < 0) update = 0
    setCurValT(update)
  }
  const handleSpinUp = () => {
    let update = curValT + 1
    if (update > 20) update = 20
    setCurValT(update)
  }

  const beakerSize: SizeStyle = { width: 170, height: 170 }
  const timeInASize: SizeStyle = { width: 220, height: 220 }
  const reaction = new ReactionComparisonViewModel()

  return <div className={styles.container}>
    <ChapterMenu />

    {/* <DndContext onDragEnd={handleDragEnd} onDragOver={handleDragOver}> */}
    <div className={styles.reactionDrawContainer}>
      <div className={styles.chartBeakerCol}>
        <EnergyProfile
          index={'0'}
          valuesC={valuesC}
          valuesT={valuesT}
          beakerDotColor={dotColorList[activeDotIndex]}
          beakerState={canvaBeakerState}
          canvasSize={beakerSize}
          onEndPlay={() => {
            // onStepChange(1)
          }}
        />
        <EnergyProfile
          index={'1'}
          valuesC={valuesC}
          valuesT={valuesT}
          beakerDotColor={dotColorList[activeDotIndex]}
          beakerState={canvaBeakerState}
          canvasSize={beakerSize}
        />
        <EnergyProfile
          index={'2'}
          valuesC={valuesC}
          valuesT={valuesT}
          beakerDotColor={dotColorList[activeDotIndex]}
          beakerState={canvaBeakerState}
          canvasSize={beakerSize}
        />
      </div>
      <div className={styles.chartTimeCol}>
        <div
          id="chartTimeItem0"
          style={{
            width: '160px',
          }}
          className={styles.chartTimeItem}
        >
          <div className={styles.chartInA}>
            <ConcentrationPlotView
              {...timeInASize}
              settings={
                new ReactionRateChartLayoutSettings(
                  timeInASize.width!,
                  ReactionSettings.Axis.minC,
                  ReactionSettings.Axis.maxC,
                  ReactionSettings.Axis.minT,
                  ReactionSettings.Axis.maxT,
                  true,
                  {} as TimeChartLayoutSettings
                )
              }
              concentrationA={reaction.zeroOrder}
              concentrationB={reaction.zeroOrderB}
              initialTime={reaction.initialTime}
              finalTime={reaction.finalTime0}
              framesPerSecond={2}
              curValT={curValT}
              setCurValT={(val) => setCurValT(val)}
              canSetCurrentTime={true}
              highlightChart={false}
              highlightLhsCurve={true}
              highlightRhsCurve={false}
              display={
                {
                  reactant: {
                    name: ReactionType.reactantName.A,
                    color: ReactionType.reactantColor[activeDotIndex],
                  },
                  product: {
                    name: ReactionType.productName.A,
                    color: ReactionType.productColor[activeDotIndex],
                  }
                }
              }
              includeAxis={false}
              tempLine={false}
              timingState={canvaTimeState}
              // onEndPlay={() => {
              //   console.log('&&& timer ended &&& ')
              // }}
              showOnlyView={true}
              order={0}
              canvaTimeSliderC={canvaTimeSliderC}
              canvaTimeSliderT={canvaTimeSliderT}
            />
          </div>
          {/* <ChartInA
              turIndex={'0'}
              className={styles.chartInA}
              valuesC={valuesC}
              canvaTimeSliderC={canvaTimeSliderC}
              valuesT={valuesT}
              canvaTimeSliderT={canvaTimeSliderT}
              canvaTimeState={canvaTimeState}
              onTimeframeChange={val => setTimeframe(val)}
              colors={dotColorList[activeDotIndex]}
              textVert={`[${'A'}]`}
              textHoriz={`Time`}
              canvasSize={timeInASize}
            /> */}
          {playButtonStatus > 0 && <div
            className={styles.playBtnContainer}
          >
            <Buttons.PlayButton
              isActive={playButtonStatus === 2}
              onPlay={() => handleClickPlayButton()}
            />
          </div>}
        </div>
        <div
          id="chartTimeItem1"
          style={{
            width: '160px',
          }}
          className={styles.chartTimeItem}
        >

          <div className={styles.chartInA}>
            <ConcentrationPlotView
              {...timeInASize}
              settings={
                new ReactionRateChartLayoutSettings(
                  timeInASize.width!,
                  ReactionSettings.Axis.minC,
                  ReactionSettings.Axis.maxC,
                  ReactionSettings.Axis.minT,
                  ReactionSettings.Axis.maxT,
                  true,
                  {} as TimeChartLayoutSettings
                )
              }
              concentrationA={reaction.firstOrder}
              concentrationB={reaction.firstOrderB}
              initialTime={reaction.initialTime}
              finalTime={reaction.finalTime1}
              framesPerSecond={2}
              curValT={curValT}
              setCurValT={(val) => setCurValT(val)}
              canSetCurrentTime={true}
              highlightChart={false}
              highlightLhsCurve={true}
              highlightRhsCurve={false}
              display={
                {
                  reactant: {
                    name: ReactionType.reactantName.A,
                    color: ReactionType.reactantColor[activeDotIndex],
                  },
                  product: {
                    name: ReactionType.productName.A,
                    color: ReactionType.productColor[activeDotIndex],
                  }
                }
              }
              includeAxis={false}
              tempLine={false}
              timingState={canvaTimeState}
              // onEndPlay={() => {
              //   console.log('&&& timer ended &&& ')
              // }}
              showOnlyView={true}
              order={1}
              canvaTimeSliderC={canvaTimeSliderC}
              canvaTimeSliderT={canvaTimeSliderT}
            />
          </div>
          {/* <ChartInA
              turIndex={'1'}
              className={styles.chartInA}
              valuesC={valuesC}
              canvaTimeSliderC={canvaTimeSliderC}
              valuesT={valuesT}
              canvaTimeSliderT={canvaTimeSliderT}
              canvaTimeState={canvaTimeState}
              onTimeframeChange={val => setTimeframe(val)}
              colors={dotColorList[activeDotIndex]}
              textVert={`[${'A'}]`}
              textHoriz={`Time`}
              canvasSize={timeInASize}
            /> */}
          {playButtonStatus > 0 && <div
            className={styles.playBtnContainer}
          >
            <Buttons.PlayButton
              isActive={playButtonStatus === 2}
              onPlay={() => handleClickPlayButton()}
            />
          </div>}
        </div>
        <div
          id="chartTimeItem2"
          style={{
            width: '160px',
          }}
          className={styles.chartTimeItem}
        >
          <div className={styles.chartInA}>
            <ConcentrationPlotView
              {...timeInASize}
              settings={
                new ReactionRateChartLayoutSettings(
                  timeInASize.width!,
                  ReactionSettings.Axis.minC,
                  ReactionSettings.Axis.maxC,
                  ReactionSettings.Axis.minT,
                  ReactionSettings.Axis.maxT,
                  true,
                  {} as TimeChartLayoutSettings
                )
              }
              concentrationA={reaction.secondOrder}
              concentrationB={reaction.secondOrderB}
              initialTime={reaction.initialTime}
              finalTime={reaction.finalTime2}
              framesPerSecond={2}
              curValT={curValT}
              setCurValT={(val) => setCurValT(val)}
              canSetCurrentTime={true}
              highlightChart={false}
              highlightLhsCurve={true}
              highlightRhsCurve={false}
              display={
                {
                  reactant: {
                    name: ReactionType.reactantName.A,
                    color: ReactionType.reactantColor[activeDotIndex],
                  },
                  product: {
                    name: ReactionType.productName.A,
                    color: ReactionType.productColor[activeDotIndex],
                  }
                }
              }
              includeAxis={false}
              tempLine={false}
              timingState={canvaTimeState}
              // onEndPlay={() => {
              //   console.log('&&& timer ended &&& ')
              // }}
              showOnlyView={true}
              order={2}
              canvaTimeSliderC={canvaTimeSliderC}
              canvaTimeSliderT={canvaTimeSliderT}
            />
          </div>
          {/* <ChartInA
              turIndex={'2'}
              className={styles.chartInA}
              valuesC={valuesC}
              canvaTimeSliderC={canvaTimeSliderC}
              valuesT={valuesT}
              canvaTimeSliderT={canvaTimeSliderT}
              canvaTimeState={canvaTimeState}
              onTimeframeChange={val => setTimeframe(val)}
              colors={dotColorList[activeDotIndex]}
              textVert={`[${'A'}]`}
              textHoriz={`Time`}
              canvasSize={timeInASize}
            /> */}
          {playButtonStatus > 0 && <div
            className={styles.playBtnContainer}
          >
            <Buttons.PlayButton
              isActive={playButtonStatus === 2}
              onPlay={() => handleClickPlayButton()}
            />
          </div>}
        </div>
        <div
          style={{
            position: 'relative'
          }}
        >
          <SpinBtnHoriz
            className={styles.spinControl}
            isDisabled={canvaTimeState !== 3}
            onClickUp={handleSpinUp}
            onClickDown={handleSpinDown}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              height: 0,
            }}
          >
            <div
              style={{
                position: 'absolute',
                width: 'fit-content',
                top: 3,
                fontSize: '15px',
                fontWeight: 600,
              }}
            >
              {`Time: `}
              <span
                style={{
                  color: 'rgb(220, 84, 59)',
                }}
              >{`${curValT.toFixed(1)}s`}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className={styles.reactionContentContainer}>
      <div className={styles.orderListContainer}>
        {orderListItems.map((item, index) => {
          if (orderMatches[index] === 1) {
            return <OrderCardItem
              key={index}
              orderType={index}
              {...item}
              matches={orderMatches}
            />
            // return (
            //   <Draggable
            //     id={index + 1}
            //     key={index}
            //   >
            //   <OrderCardItem
            //     key={index}
            //       orderType={index}
            //       {...item}
            //       matches={orderMatches}
            //     />
            //   </Draggable>
            // )
          } else {
            return (
              <OrderCardItem
                key={index}
                orderType={index}
                {...item}
                matches={orderMatches}
              />
            )
          }
        })}

        {/* {isOrderItemMove && <HandDragOrderItem
            isAnimate={isOrderItemMove}
          />} */}
        {/* <button onClick={() => {
            console.log({ isOrderItemMove })
            console.log({ valuesC, valuesT })
            // setIsOrderItemMove(v => !v)
          }}>TestAnimation</button> */}
      </div>
      <TutorialControl
        className={styles.tutorial}
        turText={getTurTextByStep()}
        onStepChange={onStepChange}
        isDisableNextButton={isDisableNextButton}
      />
    </div>
    {/* </DndContext > */}
    {isHighlight && <div className='overlay'></div>}
  </div >
}
export default ReactionComparison
