import React, { useEffect, useMemo, useState } from 'react';
import { Equation } from './Equation';
import { LinearAxis } from './LinearAxis';
import useAppData from '../../hooks/useAppData';

type TimeChartDataLine = {
  equation: Equation
  xEquation?: Equation
  headColor: string
  haloColor?: string
  headRadius: number
  discontinuity?: number
  showFilledLine?: boolean
}

type TimeChartLayoutSettings = {
  xAxis: LinearAxis
  yAxis: LinearAxis
  haloRadius?: number
  lineWidth?: number
}

type TimeChartDataLineViewProps = {
  height?: string | number | undefined
  width?: string | number | undefined
  data: TimeChartDataLine
  settings: TimeChartLayoutSettings
  lineWidth: number
  initialTime: number
  currentTime: number
  finalTime: number
  filledBarColor: string
  canSetCurrentTime: boolean
  highlightLhs: boolean
  highlightRhs: boolean
  clipData?: boolean
  offset?: number
  minDragTime?: number
  showOnlyView?: boolean
  showFullLine?: boolean
  order: number
  setCurrentTime?: any
}

type Rect = {
  width: number,
  height: number
}

const TimeChartDataLineView = (props: TimeChartDataLineViewProps) => {
  const {
    height,
    width,
    data,
    settings,
    lineWidth,
    initialTime,
    currentTime,
    finalTime,
    filledBarColor,
    canSetCurrentTime,
    highlightLhs,
    highlightRhs,
    clipData = false,
    offset = 0,
    minDragTime = null,
    showOnlyView = false,
    showFullLine = false,
    order,
    setCurrentTime
  } = props;
  const { 
    hoverOrder, 
    isOver, 
    dragOrder, 
    dragConcentration,
    setDragConcentration,
    setDragTime,
  } = useAppData()
  const canvas = React.useRef<HTMLCanvasElement>(null);
  
  const [isDrag, startDrag] = useState(false)
  const [x, setX] = useState(0)
  // @ts-ignore
  const isMobile = window.mobileCheck()
  React.useEffect(() => {
    const ctx = canvas?.current?.getContext('2d');
    if (ctx) {
      if (!isMobile) {
        ctx.canvas.addEventListener('mousedown', function (event: any) {
          setX(event.offsetX)
          startDrag(true)
        });
  
        ctx.canvas.addEventListener('mouseup', function (event: any) {
          startDrag(false)
        });
  
        ctx.canvas.addEventListener('mousemove', function (event: any) {
          setX(event.offsetX)
        });
      } else {
        const ratio = Math.min(window.innerWidth / 1150, window.innerHeight / 650)
        ctx.canvas.addEventListener('touchstart', function (event: any) {
          if (event.touches.length) {
            const rect = event.target.getBoundingClientRect()
            const currX = event.touches[0].clientX - rect.left
            setX(currX / ratio)
            startDrag(true)
          }
        });
  
        ctx.canvas.addEventListener('touchend', function (event: any) {
          startDrag(false)
        });
  
        ctx.canvas.addEventListener('touchmove', function (event: any) {
          if (event.touches.length) {
            const rect = event.target.getBoundingClientRect()
            const currX = event.touches[0].clientX - rect.left
            setX(currX / ratio)
          }
        });
      }
    }
  }, [isMobile])

  
  React.useEffect(() => {
    const ctx = canvas?.current?.getContext('2d');
    if (ctx && canSetCurrentTime && setCurrentTime && isDrag) {
      const dx1Sec = ctx.canvas.width * 0.7 / 20
      let cTime = x / dx1Sec
      if (cTime < initialTime) cTime = initialTime
      if (cTime > finalTime) cTime = finalTime
      // console.log({x, cTime, currentTime})
      setCurrentTime(cTime)
      setDragTime(cTime)
      const y = data.equation.getValue(cTime)
      setDragConcentration(y * 100)
    }
  }, [isDrag, dragConcentration, setCurrentTime, canSetCurrentTime, x, initialTime, finalTime])

  useEffect(() => {
    setDragTime(currentTime)
    const y = data.equation.getValue(currentTime)
    setDragConcentration(y * 100)
  }, [currentTime])

  React.useEffect(() => {
    const ctx = canvas?.current?.getContext('2d');
    if (ctx) {
      ctx.canvas.style.position = 'absolute';
      ctx.canvas.style.right = '0px';
      ctx.canvas.style.backgroundColor = 'transparent';
      const { height: rectHeight, width: rectWidth } = ctx.canvas;
      const rect: Rect = {
        width: rectWidth,
        height: rectHeight
      }
      ctx.clearRect(0, 0, rectWidth, rectHeight)

      // // draw pointers
      // ctx.beginPath()
      // ctx.lineWidth = 4;
      // ctx.strokeStyle = themeColors.C;
      // if (pointerC) {
      //   const pC = Math.abs(1 - pointerC / maxC) * height
      //   ctx.moveTo(0, pC)
      //   ctx.lineTo(tickLength, pC)
      // }
      // if (pointerT) {
      //   const pT = (pointerT / maxT) * width
      //   ctx.moveTo(pT, height)
      //   ctx.lineTo(pT, height - tickLength)
      // }
      // ctx.stroke()

      ctx.beginPath()
      if (data.showFilledLine) {
        // dataLine(ctx, finalTime + offset, filledBarColor)
        addLinesUpToAndIncluding(ctx,
          data.equation,
          data.xEquation!,
          initialTime,                              // from
          finalTime + offset,                       // to
          initialTime                               // startX
        )
      }
      // dataLine(ctx, showFullLine ? finalTime : currentTime, data.headColor)
      addLinesUpToAndIncluding(
        ctx,
        data.equation,
        data.xEquation!,
        initialTime,                              // from
        showFullLine ? finalTime : currentTime,   // to
        initialTime                               // startX
      )


      if (highlightLhs) {
        // highlightLine(ctx, initialTime, (initialTime + finalTime) / 2)
      }
      if (highlightRhs) {
        highlightLine(ctx, (initialTime + finalTime) / 2, finalTime)
      }

      if (data.haloColor) {
        head(
          ctx,
          settings.haloRadius ?? 10,
          data.haloColor!
        )
        // .contentShape(Rectangle())
        // .gesture(canSetCurrentTime ? dragGesture : nil)
      }
      head(
        ctx,
        data.headRadius,
        data.headColor
      )
      if (showOnlyView) {
        ctx.beginPath()
        ctx.strokeStyle = 'transparent'
        ctx.rect(0, rectHeight * 0.27, rectWidth * 0.72, rectHeight * (1 - 0.27))
        let color = 'black'
        // console.log({hoverOrder})
        ctx.lineWidth = 1
        if (isOver && hoverOrder === (order + 1)) {
          switch(dragOrder) {          
            case 0: color = 'black'; break;
            case 1: color = 'rgb(84, 187, 239)'; break;
            case 2: color = 'rgb(222, 55, 42)'; break;
            case 3: color = 'rgb(248, 208, 72)'; break;
            default: color = 'black'
          }
          ctx.lineWidth = 4
        }
        ctx.strokeStyle = color
        ctx.stroke()
      }
    }
  }, [data, initialTime, currentTime, finalTime, hoverOrder, dragOrder, isOver, order])

  const head = (
    ctx: CanvasRenderingContext2D,
    radius: number,
    color: string,
  ) => {
    chartIndicatorHead(
      ctx,
      radius,
      data.equation,
      data.xEquation!,
      settings.yAxis,
      settings.xAxis,
      currentTime,
      offset,
      color,
    )
  }

  const chartIndicatorHead = (
    ctx: CanvasRenderingContext2D,
    radius: number,
    equation: Equation,
    xEquation: Equation,
    yAxis: LinearAxis,
    xAxis: LinearAxis,
    x: number,
    offset: number,
    color: string,
  ) => {
    const y = equation.getValue(x)

    // debugger
    const xValue = xEquation?.getValue(x) ?? x
    const xPosition = xAxis.shift(offset).getPosition(xValue)
    const yPosition = yAxis.getPosition(y)

    ctx.beginPath()
    // console.log({xPosition,  yPosition})
    ctx.arc(xPosition, yPosition, radius, 0, 2 * Math.PI)
    ctx.fillStyle = color
    ctx.strokeStyle = color
    ctx.fill()
    ctx.stroke()
  }

  const highlightLine = (
    ctx: CanvasRenderingContext2D,
    startTime: number,
    endTime: number,
  ) => {
    line(
      ctx,
      startTime,
      endTime,
      data.headColor,
      2.5 * lineWidth
    )
  }

  const dataLine = (
    ctx: CanvasRenderingContext2D,
    time: number,
    color: string
  ) => {
    /* origin code */
    // line(
    //   ctx,
    //   initialTime,
    //   time,
    //   color,
    //   lineWidth
    // )
    chartLine(
      ctx,
      data.equation,
      data.xEquation!,
      settings.yAxis,
      settings.xAxis,
      initialTime,
      time,
      0,
      data.discontinuity!,
      color,
      lineWidth,
    )
  }

  const line = (
    ctx: CanvasRenderingContext2D,
    startTime: number,
    time: number,
    color: string,
    lineWidth: number
  ) => {
    chartLine(
      ctx,
      data.equation,
      data.xEquation!,
      settings.yAxis,
      settings.xAxis,
      startTime,
      time,
      0,
      data.discontinuity!,
      color,
      lineWidth,
    )
  }

  const chartLine = (
    ctx: CanvasRenderingContext2D,
    equation: Equation,
    xEquation: Equation,
    yAxis: LinearAxis,
    xAxis: LinearAxis,
    startX: number,
    endX: number,
    offset: number,
    discontinuity: number,
    color: string,
    lineWidth: number,
  ) => {
    // if (discontinuity && discontinuity <= endX) {
    //   addLinesWithDiscontinuity(ctx, discontinuity)
    // } else {
    // debugger
    addLinesUpToAndIncluding(ctx, equation, xEquation, startX + offset, endX, startX)
    // }
  }

  // const addLinesWithDiscontinuity = (
  //   ctx: CanvasRenderingContext2D,
  //   discontinuity: number,
  // ) => {

  // }

  const addLinesUpToAndIncluding = (
    ctx: CanvasRenderingContext2D,
    equation: Equation,
    xEquation: Equation,
    from: number,
    to: number,
    startX: number,
  ) => {
    for (let x = from; x < to; x += dx(startX, to, ctx.canvas.width)) {
      addLine(ctx, x, equation, xEquation, x === from)
    }
    // addLine(ctx, to, equation, xEquation, false)
  }

  const addLine = (
    ctx: CanvasRenderingContext2D,
    x: number,
    equation: Equation,
    xEquation: Equation,
    isMoveTo: boolean,
  ) => {
    const y = equation.getValue(x)
    const xValue = xEquation?.getValue(x) ?? x
    const xPosition = settings.xAxis.shift(offset).getPosition(xValue)
    const yPosition = settings.yAxis.getPosition(y)
    // console.log({xPosition, yPosition, settings, x, y})
    // debugger
    // console.log({equation})
    if (isMoveTo) {
      ctx.beginPath()
      ctx.moveTo(xPosition, yPosition)
    } else {
      ctx.lineWidth = 1
      ctx.strokeStyle = data.headColor
      ctx.lineTo(xPosition, yPosition)
      ctx.stroke()
    }
  }

  const maxWidthSteps = 100

  const dx = (
    startX: number,
    endX: number,
    width: number,
  ) => {
    const dxPos = width / maxWidthSteps
    const dx1 = settings.xAxis.shift(offset).getValue(dxPos) - settings.xAxis.shift(offset).getValue(0)
    return startX < endX ? dx1 : -dx1
  }

  // return (<></>)

  return (
    <canvas ref={canvas} height={height} width={width} />
  );
};
export default TimeChartDataLineView;