import React, { useEffect, useRef, useState } from 'react';
import { ReactionRateChartLayoutSettings } from './ReactionRateChartLayoutSettings';
import { Equation } from './Equation';
import TimeChartDataLineView from './TimeChartDataLineView';
import { ChartAxisShapeSettings } from './ChartAxisShapeSettings';
import Color from 'color';
import useAppData from '../../hooks/useAppData';

type ReactionMoleculeDisplay = {
  name: string,
  color: string,
}

type ReactionPairDisplay = {
  reactant: ReactionMoleculeDisplay,
  product: ReactionMoleculeDisplay,
}

type ConcentrationPlotViewProps = {
  height?: string | number | undefined,
  width?: string | number | undefined,
  settings: ReactionRateChartLayoutSettings,
  concentrationA: Equation,
  concentrationB?: Equation,
  initialTime: number,
  finalTime: number,
  framesPerSecond?: number
  initialConcentration?: number,
  finalConcentration?: number,
  canSetCurrentTime: boolean,
  highlightChart: boolean,
  highlightLhsCurve: boolean,
  highlightRhsCurve: boolean,
  display: ReactionPairDisplay,
  includeAxis: boolean
  tempLine: boolean
  timingState: number
  onEndPlay?: () => void
  showOnlyView?: boolean
  order: number
  canvaTimeSliderC: number[]
  canvaTimeSliderT: number[]
  curValT: number,
  setCurValT: (val: number) => void,
}

type Rect = {
  width: number,
  height: number
}

const ConcentrationPlotView = (props: ConcentrationPlotViewProps) => {
  const {
    width,
    height,
    settings,
    concentrationA,
    concentrationB,
    initialTime,
    finalTime,
    framesPerSecond = 10,
    initialConcentration,
    finalConcentration,
    canSetCurrentTime,
    highlightChart,
    highlightLhsCurve,
    highlightRhsCurve,
    display,
    includeAxis = true,
    tempLine,
    timingState,
    onEndPlay,
    showOnlyView,
    order,
    canvaTimeSliderC,
    canvaTimeSliderT,
    curValT,
    setCurValT,
  } = props;
  const canvas = React.useRef<HTMLCanvasElement>(null);
  // const [curValT, setCurValT] = useState(initialTime)
  // @ts-ignore
  const isMobile = window.mobileCheck()
  // console.log({concentrationA, concentrationB, initialTime, finalTime})

  const drawFunc = () => {
    const ctx = canvas?.current?.getContext('2d');
    if (!ctx) return
    const { height: rectHeight, width: rectWidth } = ctx.canvas;
    const rect: Rect = {
      width: rectWidth,
      height: rectHeight
    }
    // if (highlightChart) {
    //   ctx.rect(
    //     0,
    //     0,
    //     rect.width,
    //     rect.height,
    //   );
    //   ctx.fillStyle = "white";
    //   ctx.fill();
    // }

    // if (highlightLhsCurve) {
    //   rectangleHighlight(ctx, initialTime, (initialTime + finalTime) / 2)
    // }
    // if (highlightRhsCurve) {
    //   rectangleHighlight(ctx, (initialTime + finalTime) / 2, finalTime)
    // }

    // ctx.clearRect(
    //   0,
    //   0,
    //   rect.width,
    //   rect.height,
    // );
    if (showOnlyView) return
    if (tempLine) {
      verticalIndicator(ctx, initialTime)
      verticalIndicator(ctx, finalTime)
      horizontalIndicator(ctx, concentrationA.getValue(initialTime))
      horizontalIndicator(ctx, concentrationA.getValue(finalTime))
      // console.log(Date.now())
    } else {
      // if (!isMobile) {
      //   tIndicator(ctx, initialTime, canvaTimeSliderT[0])
      //   tIndicator(ctx, finalTime, canvaTimeSliderT[1])
      // }

      // initialConcentration && cIndicatoer(ctx, initialConcentration / 100, canvaTimeSliderC[0])
      // finalConcentration && cIndicatoer(ctx, finalConcentration / 100, canvaTimeSliderC[1])
    }

    if (includeAxis) {
      chartAxisShape(ctx, settings.chartAxisShapeSettings, rect)
    }
  }


  React.useEffect(() => {
    const ctx = canvas?.current?.getContext('2d');
    if (!ctx) return
    const { height: rectHeight, width: rectWidth } = ctx.canvas;
    const rect: Rect = {
      width: rectWidth,
      height: rectHeight
    }
    ctx.clearRect(
      0,
      0,
      rect.width,
      rect.height,
    );
    drawFunc()

    // console.log({ concentrationA, concentrationB, initialTime, finalTime })
  }, [concentrationA, initialTime, finalTime, initialConcentration, finalConcentration, tempLine, canvaTimeSliderT, canvaTimeSliderC, window.innerWidth])

  useEffect(() => {
    // drawFunc()
    // window.addEventListener('resize', drawFunc)

    return () => {
      // window.removeEventListener('resize', drawFunc)
    }
  }, [])

  // const rectangleHighlight = (
  //   ctx: CanvasRenderingContext2D,
  //   t1: number,
  //   t2: number,
  // ) => {
  //   const x1 = settings.xAxis.getPosition(t1)
  //   const x2 = settings.xAxis.getPosition(t2)
  //   const width = x2 - x1
  //   const midX = (x2 + x1) / 2

  //   const c1 = concentrationA.getValue(t1)
  //   const c2 = concentrationA.getValue(t2)
  //   const y1 = settings.yAxis.getPosition(c1)
  //   const y2 = settings.yAxis.getPosition(c2)

  //   const height = Math.abs(y2 - y1)
  //   let midY = (y1 + y2) / 2

  //   ctx.rect(midX, midY, width, height)
  //   ctx.fillStyle = "white";
  //   ctx.fill();
  // }

  const verticalIndicator = (
    ctx: CanvasRenderingContext2D,
    time: number
  ) => {
    ctx.beginPath()

    ctx.moveTo(settings.xAxis.getPosition(time), 0)
    ctx.lineTo(settings.xAxis.getPosition(time), settings.chartSize)
    ctx.lineWidth = 0.5
    ctx.strokeStyle = 'black'
    ctx.stroke()
  }

  const tIndicator = (
    ctx: CanvasRenderingContext2D,
    time: number,
    state: number,
  ) => {
    if (state === 0) return
    ctx.beginPath()

    ctx.moveTo(settings.xAxis.getPosition(time), settings.chartSize / 10 * 9)
    ctx.lineTo(settings.xAxis.getPosition(time), settings.chartSize)
    ctx.lineWidth = 3
    ctx.strokeStyle = state === 1 ? 'gray' : 'rgb(220, 84, 59)'
    ctx.stroke()
  }

  const cIndicatoer = (
    ctx: CanvasRenderingContext2D,
    concentration: number,
    state: number,
  ) => {
    if (state === 0) return
    ctx.beginPath()

    ctx.moveTo(0, settings.yAxis.getPosition(concentration))
    ctx.lineTo(ctx.canvas.width / 10, settings.yAxis.getPosition(concentration))
    ctx.lineWidth = 3
    ctx.strokeStyle = state === 1 ? 'gray' : 'rgb(220, 84, 59)'
    ctx.stroke()
  }

  const horizontalIndicator = (
    ctx: CanvasRenderingContext2D,
    concentration: number
  ) => {
    ctx.beginPath()

    ctx.moveTo(0, settings.yAxis.getPosition(concentration))
    ctx.lineTo(settings.chartSize, settings.yAxis.getPosition(concentration))
    ctx.lineWidth = 0.5
    ctx.strokeStyle = 'black'
    ctx.stroke()
  }

  const chartAxisShape = (
    ctx: CanvasRenderingContext2D,
    settings: ChartAxisShapeSettings,
    rect: Rect,
  ) => {
    ctx.beginPath()
    ctx.rect(0, 0, rect.width, rect.height)
    let dy = (rect.height - settings.gapToTop) / settings.verticalTicks
    for (let i = 0; i < settings.verticalTicks; i++) {
      let distanceFromBottom = i * dy
      let y = rect.height - distanceFromBottom
      ctx.moveTo(0, y)
      ctx.lineTo(settings.tickSize, y)
    }

    let dx = (rect.width - settings.gapToSide) / settings.horizontalTicks
    for (let i = 0; i < settings.horizontalTicks; i++) {
      let x = i * dx
      ctx.moveTo(x, rect.height)
      ctx.lineTo(x, rect.height - settings.tickSize)
    }
    ctx.lineWidth = 2
    ctx.strokeStyle = 'black'
    ctx.stroke()
  }

  const [timeCounter, setTimeCounter] = useState<number>(0)
  const maxTime = finalTime - initialTime
  // const framesPerSecond = 2
  const intervalTime = 1 / framesPerSecond

  const timerID = useRef<NodeJS.Timer>()
  const startTimer = () => {
    stopTimer()
    setTimeCounter(0)
    timerID.current = setInterval(() => {
      // console.log('interval')
      setTimeCounter(v => v += intervalTime)
    }, intervalTime * 1000)
    // console.log('started', timerID.current)
  }
  const stopTimer = () => {
    if (timerID.current) {
      clearInterval(timerID.current)
      timerID.current = undefined
      // console.log('timer end')
    }
  }

  // animation play
  useEffect(() => {
    if (timeCounter > maxTime) {
      // animation ends
      setCurValT(finalTime)
      stopTimer()
      onEndPlay?.()
      return
    }
    setCurValT(initialTime + timeCounter)
  }, [timeCounter])


  useEffect(() => {
    if (timingState === 2) {
      setCurValT(initialTime)
      startTimer()
      return
    } else {
      stopTimer()
    }
    if (timingState === 0) {
      setCurValT(initialTime)
    } else if (timingState === 1) {
      setCurValT(initialTime)
    } else if (timingState === 3) {
      setCurValT(finalTime)
    }
    return () => stopTimer()
  }, [timingState, initialTime, finalTime])

  return (
    <div style={{ position: 'relative' }}>
      {/* <button
    style={{position: 'absolute', top: 80, zIndex: 9099 }}
    onClick={() => {
      console.log({currentTime})
    }}>Test</button> */}
      {/* <button onClick={() => {
        const updatedCurrentTime = currentTime + 1
        console.log('aaa 000', { updatedCurrentTime, initialTime, finalTime })
        setCurrentTime(updatedCurrentTime)
      }}>TestRender</button> */}
      {/* <div style={{position: 'relative'}}> */}
      <canvas
        style={{ backgroundColor: 'white' }}
        ref={canvas}
        height={width}
        width={height}
      />
      {timingState > 0 &&
        <>
          {concentrationB &&
            <TimeChartDataLineView
              width={width}
              height={height}
              data={{
                equation: concentrationB,
                headColor: display.product.color,
                headRadius: settings.chartHeadSecondarySize,
                showFilledLine: true,
              }}
              settings={settings.timeChartLayoutSettings}
              lineWidth={settings.timeChartLayoutSettings.lineWidth}
              initialTime={initialTime}
              currentTime={curValT} //.constant(currentTime),
              finalTime={finalTime}
              filledBarColor={'gray'} //Styling.timeAxisCompleteBar,
              canSetCurrentTime={timingState === 3}
              highlightLhs={false}
              highlightRhs={false}
              order={order}
            />
          }
          <TimeChartDataLineView
            width={width}
            height={height}
            data={{
              equation: concentrationA,
              headColor: display.reactant.color,
              haloColor: Color(display.reactant.color).alpha(0.3).toString(),
              headRadius: settings.chartHeadPrimarySize,
              showFilledLine: true,
            }}
            settings={settings.timeChartLayoutSettings}
            lineWidth={settings.timeChartLayoutSettings.lineWidth}
            initialTime={initialTime}
            currentTime={curValT} //$currentTime
            finalTime={finalTime}
            filledBarColor={''} //Styling.timeAxisCompleteBar
            canSetCurrentTime={timingState === 3}
            highlightLhs={highlightLhsCurve}
            highlightRhs={highlightRhsCurve}
            showOnlyView={showOnlyView}
            order={order}
            setCurrentTime={setCurValT}
          />
        </>
      }
      {/* </div> */}
    </div>
  );
};
export default ConcentrationPlotView;