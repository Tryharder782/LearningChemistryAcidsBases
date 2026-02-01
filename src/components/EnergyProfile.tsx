
import { useEffect, useRef, useState } from 'react'
import { generateEnergyArray } from '../helper/functions'
import Canvas from './Canvas/Canvas'
import styles from './EnergyProfile.module.scss'
import useAppData from '../hooks/useAppData'
import { themeColors, dotColors, initDots, dotBgColors, totalDots } from '../constants'
import { SizeStyle } from '../helper/types'

function beaker(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number, fillStyle: string, strokeStyle: string, lineWidth: number, offset: number) {
  ctx.beginPath();
  ctx.moveTo(x, y + radius);
  ctx.arcTo(x, y + height, x + radius, y + height, radius);
  ctx.arcTo(x + width - offset, y + height, x + width - offset, y + height - radius, radius);
  ctx.lineTo(x + width - offset, y + radius);
  ctx.lineTo(x + width, y + radius);
  ctx.bezierCurveTo(width + 25, 30, width + 25, x, x + width, y);
  ctx.lineTo(x, y);
  ctx.bezierCurveTo(0, x, 0, 30, x, y + radius);
  ctx.lineWidth = lineWidth;
  ctx.lineTo(x, height);
  ctx.strokeStyle = strokeStyle;
  ctx.stroke();
  ctx.fillStyle = fillStyle;
  ctx.fill();
}

interface EnergyProfileProps {
  index?: string,
  valuesC: number[],
  valuesT: number[],
  beakerState: number,
  beakerDotColor: string[],
  canvasSize?: SizeStyle
  onEndPlay?: () => void
}

const EnergyProfile = ({
  index,
  valuesC,
  valuesT,
  beakerState,
  beakerDotColor,
  canvasSize = { width: 230, height: 285 },
  onEndPlay
}: EnergyProfileProps) => {

  const [energyDots, setEnergyDots] = useState(initDots)
  const energyDotsAnimation = useRef(initDots)
  // const { concentrationAB } = useAppData()

  // console.log({ concentration, energyDots })
  // useEffect(() => {
  //   const update = generateEnergyArray(energyDots, concentrationAB[0], 1, 2)
  //   setEnergyDots(update)
  //   // console.log({ update })
  // }, [concentrationAB])

  const { beakerDots, beakerDotsEnd, dragConcentration } = useAppData()

  useEffect(() => {
    // console.log('vvv111')
    let update = generateEnergyArray(beakerDots.current, valuesC[0], 0, 1).items
    beakerDots.current = update
    energyDotsAnimation.current = update
    const valC = Math.abs(valuesC[0] - valuesC[1])
    update = generateEnergyArray(update, (valC / valuesC[0] * 100), 1, 2).items
    beakerDotsEnd.current = update
    setEnergyDots(beakerDots.current)
  }, [valuesC[0]])

  useEffect(() => {
    // console.log('vvv222')
    const valC = Math.abs(valuesC[0] - dragConcentration)
    const update = generateEnergyArray(beakerDotsEnd.current, (valC / valuesC[0] * 100), 1, 2).items
    beakerDotsEnd.current = update
    if (beakerState === 3) {
      // console.log({ beakerState, beakerDotsEnd })
      setEnergyDots(beakerDotsEnd.current)
    }
  }, [dragConcentration, beakerState])

  useEffect(() => {
    // console.log('vvv222')
    const valC = Math.abs(valuesC[0] - valuesC[1])
    const update = generateEnergyArray(beakerDotsEnd.current, (valC / valuesC[0] * 100), 1, 2).items
    beakerDotsEnd.current = update
    if (beakerState === 3) {
      // console.log({ beakerState, beakerDotsEnd })
      setEnergyDots(beakerDotsEnd.current)
    }
  }, [valuesC[1], beakerState])

  // // changes while the Animation
  // useEffect(() => {
  //   if (beakerState !== 2) return
  //   const update = generateEnergyArray(beakerDotsEnd.current, (valueC[1] / valueC[0] * 100), 2, 1)
  // }, [timeframe])

  useEffect(() => {
    if (beakerState === 2) {
      setEnergyDots(beakerDots.current)
      startTimer()
      return
    } else {
      stopTimer()
    }
    if (beakerState === 0) {
      setEnergyDots(initDots)
    } else if (beakerState === 1) {
      setEnergyDots(beakerDots.current)
    } else if (beakerState === 3) {
      setEnergyDots(beakerDotsEnd.current)
    }
    // console.log(beakerDotsEnd.current)
    return () => stopTimer()
  }, [beakerState])

  const [timeCounter, setTimeCounter] = useState<number>(0)
  const finalTime = Math.abs(valuesT[0] - valuesT[1])
  const framesPerSecond = 3
  const intervalTime = 1000 / framesPerSecond


  const timerID = useRef<NodeJS.Timer>()
  const startTimer = () => {
    stopTimer()
    setTimeCounter(0)
    timerID.current = setInterval(() => {
      // console.log('interval', timeCounter)
      setTimeCounter(v => v += 1 / framesPerSecond)
    }, intervalTime)
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
    const valT = Math.min(timeCounter / finalTime, 1)
    const valC = Math.abs(valuesC[0] - valuesC[1])
    if (timeCounter >= finalTime) {
      // animation ends
      stopTimer()
      const res = generateEnergyArray(energyDotsAnimation.current, (valC / valuesC[0] * 100), 1, 2)
      beakerDotsEnd.current = res.items
      console.log('animation ends', { valuesC, timeCounter, finalTime, energyDotsAnimation: energyDotsAnimation.current, res })
      setEnergyDots(res.items)
      onEndPlay?.()
      return
    }
    const curValC = Math.floor(valC * valT)
    const res = generateEnergyArray(energyDotsAnimation.current, (curValC / valuesC[0] * 100), 1, 2)
    energyDotsAnimation.current = res.items
    // console.log({curValC, res})
    setEnergyDots(energyDotsAnimation.current)
    // console.log({ res, timeCounter })
  }, [timeCounter])

  // render from 'energyDots'
  const drawBeaker = (ctx: CanvasRenderingContext2D) => {
    const width = 206, height = 248
    // const { width, height } = beakerSize
    // parent beaker
    beaker(ctx, 12, 12, width, height, 15, "lightgray", "black", 3, 0)
    // ctx.clip()
    beaker(ctx, 12, 12, width - 10, height - 10, 15, "rgba(255,255,255,0.5)", "rgba(255,255,255,0.5)", 0.1, 15)
    beaker(ctx, 12, 12, width - 20, height - 20, 15, "white", "white", 0.1, 20)
    ctx.clearRect(12, 142, 206, 118)
    ctx.beginPath()
    ctx.rect(12, 142, 206, 118)
    ctx.fillStyle = dotBgColors[1]
    ctx.fill()
    ctx.beginPath()
    const delta = 15
    const startPoint = 40
    for (let y = startPoint; y < 140; y += delta) {
      y === startPoint + delta * 3 ? ctx.moveTo(160, y) : ctx.moveTo(175, y)
      ctx.lineTo(193, y)
    }
    ctx.strokeStyle = "black"
    ctx.lineWidth = 0.5
    ctx.stroke()
    let index = 0
    const startX = 17, startY = 150, t = 13
    for (let i = 0; i < 9; i++) {
      const yy = startY + i * t
      for (let j = 0; j < 16; j++) {
        ctx.beginPath()
        const xx = startX + j * t
        ctx.moveTo(xx, yy)
        ctx.arc(xx, yy, 6, 0, 2 * Math.PI);
        ctx.fillStyle = beakerDotColor[energyDots[index]]
        ctx.fill()
        index++
      }
    }
  };

  const getDotsCounts = (arr: number[]) => {
    const count: number[] = [0, 0, 0, 0, 0, 0]
    arr.forEach(item => {
      count[0]++
      count[item + 1]++
    })
    return count
  }

  // return (<></>)

  return (
    <div
      id={`tur_energyProfile${index ?? ''}`}
      className={styles.energyContainer}
    >
      {/* <button onClick={() => {
        console.log({ valuesC, valuesT, beakerState, energyDots, beakerDotsEnd })
      }}>cccVV</button> */}
      {/* <button onClick={() => {
        console.log({ initDots })
        const iniaaa = Array.from({ length: totalDots }, () => 1)
        const diff = valuesC[0] - valuesC[1]
        console.log({ diff, percent: (diff / valuesC[0] * 100) })
        const aaa = generateEnergyArray(iniaaa, (diff / valuesC[0] * 100), 1, 2)
        console.log({aaa, infO: getDotsCounts(aaa.items)})
        const bbb = generateEnergyArray(aaa.items, (diff / valuesC[0] * 100), 2, 1)
        console.log({ valuesC, diff, bbb })
        console.log('info: ', getDotsCounts(bbb.items))
      }}>Test</button> */}
      <div style={{ ...canvasSize }}>
        <Canvas draw={drawBeaker} width={230} height={270} />
      </div>
    </div>
  )
}
export default EnergyProfile