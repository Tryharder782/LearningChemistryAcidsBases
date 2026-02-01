import { SizeStyle } from '../../helper/types'
import CanvasTime from '../Canvas/CanvasTime'
import styles from './ChartInA.module.scss'

interface ChartTimeProps {
  turIndex?: string
  className?: string
  valuesC: number[]
  valuesT: number[]
  canvaTimeSliderC: number[]
  canvaTimeSliderT: number[]
  canvaTimeState: number   //  0; show Frame,  1; show Graph, 2; show Animation, 3; show end of Animation
  onTimeframeChange: (val: number) => void
  colors: string[]
  textVert?: string
  textHoriz?: string
  canvasSize?: SizeStyle
}

const ChartInA = ({
  turIndex,
  className,
  valuesC,
  valuesT,
  canvaTimeState: showTimeGraph,
  onTimeframeChange,
  colors,
  textVert,
  textHoriz,
  canvasSize,
}: ChartTimeProps) => {

  const textVertPos = {
    right: canvasSize?.width ? canvasSize.width + 10 : 235,
    top: canvasSize?.height ? canvasSize.height / 2 - 15 : 100,
  }
  const textHorizPos = {
    top: canvasSize?.height ? canvasSize.height : 230,
    right: canvasSize?.width ? canvasSize.width / 2 - 15 : 80,
  }
  const valC2 = valuesC[1] + (valuesC[0] - valuesC[1]) / 5

  return (
    <div
      className={`${styles.chartTimeContainer} ${className || ''}`}
    >
      {textVert && <div
        className={styles.textVert}
        style={{
          ...textVertPos
        }}
      >
        {textVert}
      </div>}

      {textHoriz && <div
        className={styles.textHoriz}
        style={{
          ...textHorizPos
        }}
      >
        {textHoriz}
      </div>}

      <div
        id={`tur_chartInA${turIndex ?? ''}`}
        className={styles.chartTime}
      // style={{ ...canvasSize }}
      >
        <CanvasTime
          showTimeGraph={showTimeGraph}
          onTimeframeChange={onTimeframeChange}
          c1={valuesC[0]}
          c2={valuesC[1] + (valuesC[0] - valuesC[1]) / 3 * 2}
          t1={valuesT[0]}
          t2={valuesT[1]}
          maxC={100}
          maxT={20}
          // width={canvasSize?.width}
          // height={canvasSize?.height}
          colorA={colors[1]}
          colorB={colors[2]}
          colorA_blur={colors[0]}
          canvasSize={canvasSize}
          showOneGraph={true}
        />
      </div>
    </div>
  )
}

export default ChartInA
