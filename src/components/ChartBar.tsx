import styles from './ChartBar.module.scss'
import BarChartCanvas from './Canvas/CanvasBar'
import useAppData from '../hooks/useAppData'
import { themeColors } from '../constants'

export const barChartText = [
  ['A', 'B'],
  ['C', 'D'],
  ['E', 'F'],
]
interface ChartBarProps {
  valuesC: number[]
  valuesT: number[]
  state: number
  colors: string[]
  kind?: number
}
const ChartBar = ({ valuesC, valuesT, state, colors, kind = 0 }: ChartBarProps) => {
  // return (<></>)
  return (
    <div className={styles.chartBarContainer}>
      {/* <div className={styles.timeContainer}> */}
      <BarChartCanvas
        state={state}
        // c2={0.8}
        // c1={0.5}
        // t2={3.2}
        // t1={16}
        c1={valuesC[1] / 100}
        c2={valuesC[0] / 100}
        t1={valuesT[1]}
        t2={valuesT[0]}
        height={212}
        width={212}
        colorA={colors[1]}
        colorB={colors[2]}
        text={barChartText[kind]}
      />
    </div>
  )
}

export default ChartBar