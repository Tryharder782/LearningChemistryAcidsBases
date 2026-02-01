import React, { useEffect } from 'react';
import { EnergyRateChartSettings } from './EnergyRateChartSettings';
import Color from 'color';
import { EnergyProfileChatInput } from './EnergyProfileChartInput';
import { dotColors } from '../../pages/ReactionRates/constants';



type EnergyProfileChartProps = {
  state: number,
  kind: number,
  width: number,
  height: number,
  settings: EnergyRateChartSettings,
  chartInput: EnergyProfileChatInput,
}

type Rect = {
  width: number,
  height: number,
}

const EnergyProfileChart = (props: EnergyProfileChartProps) => {
  const {
    state,
    kind,
    width,
    height,
    settings,
    chartInput,
  } = props;
  const energyProfileChartText = [
    {
      name: 'A + B',
      textC: 'C',
    },
    {
      name: 'D + E',
      textC: 'F',
    },
    {
      name: 'G + H',
      textC: 'I',
    }
  ]
  const canvas = React.useRef<HTMLCanvasElement>(null);
  const canvas1 = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    const ctx = canvas?.current?.getContext('2d');
    if (!ctx) return
    ctx.clearRect(0, 0, width, height)

    const { height: rectHeight, width: rectWidth } = ctx.canvas;
    const rect: Rect = {
      width: rectWidth,
      height: rectHeight
    }

    ctx.clearRect(0, 0, rectWidth, rectHeight)
    if (state > 1) {
      // tempLine
      tempLine(ctx, rect)
    }

    const chartSize = settings.chartSize

    const peakVal = state === 0 ? chartInput.initialPeak : chartInput.reducedPeak

    const startY = absoluteY(0, rectWidth, rectHeight, chartInput.leftAsymptote, chartInput.rightAsymptote, peakVal)
    const midX = chartSize / 2
    const midY = absoluteY(midX, rectWidth, rectHeight, chartInput.leftAsymptote, chartInput.rightAsymptote, peakVal)
    const padding = chartSize * 0.04

    if (state === 0) {
      energyProfileChartShape(ctx, chartInput.initialPeak, chartInput.leftAsymptote, chartInput.rightAsymptote, rect, 'orange')
      // energyProfileChartShape(ctx, chartInput.reducedPeak, chartInput.leftAsymptote, chartInput.rightAsymptote, rect, 'gray')
    } else if (state > 0) {
      energyProfileChartShape(ctx, chartInput.initialPeak, chartInput.leftAsymptote, chartInput.rightAsymptote, rect, 'gray')
      energyProfileChartShape(ctx, chartInput.reducedPeak, chartInput.leftAsymptote, chartInput.rightAsymptote, rect, 'orange')
    }

    ctx.beginPath()
    ctx.moveTo(midX, startY)
    ctx.lineTo(midX, midY + padding)

    // draw Arrow

    ctx.font = 'bold 16px Arial'
    ctx.fillText('E', midX - 0.8 * padding, startY + 15)
    ctx.font = '12px Arial'
    ctx.fillText('a', midX + 0.3 * padding, startY + 19)

    ctx.moveTo(midX, startY)
    ctx.lineTo(midX - 0.65 * padding, startY - padding)

    ctx.moveTo(midX, startY)
    ctx.lineTo(midX + 0.65 * padding, startY - padding)

    ctx.moveTo(midX, midY + padding)
    ctx.lineTo(midX - 0.65 * padding, midY + 2 * padding)

    ctx.moveTo(midX, midY + padding)
    ctx.lineTo(midX + 0.65 * padding, midY + 2 * padding)

    ctx.strokeStyle = 'black'
    ctx.stroke()

    // draw Outlines
    ctx.rect(0, 0, rect.width, rect.height)
    ctx.stroke()


  }, [kind, chartInput, state])
  useEffect(() => {
    const ctx = canvas?.current?.getContext('2d');
    if (!ctx) return
    // ctx.clearRect(0, 0, width, height)
    const { height: rectHeight, width: rectWidth } = ctx.canvas;
    const rect: Rect = {
      width: rectWidth,
      height: rectHeight
    }

  }, [kind, chartInput])

  const tempLine = (ctx: CanvasRenderingContext2D, rect: Rect) => {
    const peak = chartInput.currentEnergy
    ctx.beginPath()
    ctx.rect(0, absoluteY(settings.chartSize / 2, rect.width, rect.height, chartInput.leftAsymptote, chartInput.rightAsymptote, peak), rect.width, 1)
    ctx.strokeStyle = Color.rgb(0, 0, 0).alpha(0.6).toString()
    ctx.lineWidth = 1
    ctx.stroke()
  }

  const energyProfileChartShape = (
    ctx: CanvasRenderingContext2D,
    peak: number,
    leftAsymptote: number,
    rightAsymptote: number,
    rect: Rect,
    color: string,
  ) => {
    const frameWidth = rect.width
    const frameHeight = rect.height
    const points = 100

    ctx.beginPath()
    ctx.moveTo(0, absoluteY(0, frameWidth, frameHeight, leftAsymptote, rightAsymptote, peak))

    const colors = [
      [dotColors.A, dotColors.B, dotColors.C],
      [dotColors.D, dotColors.E, dotColors.F],
      [dotColors.G, dotColors.H, dotColors.I],
    ]

    const dx = frameWidth / points
    const ctx1 = canvas1?.current?.getContext('2d');
    if (!ctx1) return
    ctx1.clearRect(0, 0, width, height)
    for (let x = 0; x < frameWidth; x += dx) {
      const y = absoluteY(x, frameWidth, frameHeight, leftAsymptote, rightAsymptote, peak)

      ctx.strokeStyle = color
      ctx.lineWidth = 1
      ctx.lineTo(x, y)
      ctx.stroke();
    }

    const xx1 = 0, yy1 = absoluteY(xx1, frameWidth, frameHeight, leftAsymptote, rightAsymptote, peak)
    ctx1.beginPath()
    ctx1.arc(10, yy1 + settings.annotationMoleculeSize, settings.annotationMoleculeSize / 2, 0, 2 * Math.PI)
    ctx1.fillStyle = Color.rgb(colors[kind][0]).toString()
    ctx1.fill()

    ctx1.beginPath()
    ctx1.arc(36, yy1 + settings.annotationMoleculeSize, settings.annotationMoleculeSize / 2, 0, 2 * Math.PI)
    ctx1.fillStyle = Color.rgb(colors[kind][1]).toString()
    ctx1.fill()

    ctx1.canvas.style.position = 'absolute'
    ctx1.canvas.style.left = '0px'
    ctx1.font = 'bold 14px Arial'
    ctx1.fillStyle = 'black'
    ctx1.fillText(energyProfileChartText[kind].name, 4, yy1 + settings.annotationMoleculeSize + 20)
    ctx1.closePath()


    const xx2 = frameWidth - 30, yy2 = absoluteY(xx2, frameWidth, frameHeight, leftAsymptote, rightAsymptote, peak)
    ctx1.beginPath()
    ctx1.arc(xx2 + 9, yy2 + settings.annotationMoleculeSize, settings.annotationMoleculeSize / 2, 0, 2 * Math.PI)
    ctx1.arc(xx2 + 20, yy2 + settings.annotationMoleculeSize, settings.annotationMoleculeSize / 2, 0, 2 * Math.PI)
    ctx1.fillStyle = Color.rgb(colors[kind][2]).toString()
    ctx1.fill()
    ctx1.canvas.style.position = 'absolute'
    ctx1.canvas.style.left = '0px'
    ctx1.font = 'bold 14px Arial'
    ctx1.fillStyle = 'black'
    ctx1.fillText(energyProfileChartText[kind].textC, xx2 + 12, yy2 + settings.annotationMoleculeSize + 20)
    ctx1.closePath()


  }

  const absoluteY = (absoluteX: number, frameWidth: number, frameHeight: number, leftAsymptote: number, rightAsymptote: number, peak: number) => {
    const relativeX = absoluteX / frameWidth
    const y = relativeY(relativeX, leftAsymptote, rightAsymptote, peak)
    const absoluteFromTop = y * frameHeight
    return frameHeight - absoluteFromTop
  }

  const relativeY = (relativeX: number, leftAsymptote: number, rightAsymptote: number, peak: number) => {
    let asymptote = relativeX < 0.5 ? leftAsymptote : rightAsymptote
    let height = peak - asymptote
    let exponent = -1 * Math.pow((relativeX - 0.5), 2) * 30
    return (height * Math.pow(Math.E, exponent)) + asymptote
  }

  return (
    <div
      id='tur_energyProfileChart'
      style={{
        width: width,
        height: height,
        position: 'relative',
        backgroundColor: 'white',
      }}
    >
      <div
        id='tur_energyProfileChartHalf'
        style={{
          width: width,
          height: '100%',
        }}
      >
        <div
          style={{
            height: '50%',
            position: 'absolute',
            backgroundColor: 'white',
            width: '100%',
            bottom: '0',
          }}
        ></div>
        <canvas
          style={{
            zIndex: 5,
            position: 'absolute'
          }}
          ref={canvas}
          height={height}
          width={width}
        />
        <canvas
          ref={canvas1}
          height={height}
          width={width}
        />
        {/* <button onClick={() => {
        const ctx = canvas?.current?.getContext('2d');
        if (!ctx) return
        ctx.clearRect(0, 0, width, height)
      }}>Test</button> */}
      </div>
    </div>
  );
};
export default EnergyProfileChart;