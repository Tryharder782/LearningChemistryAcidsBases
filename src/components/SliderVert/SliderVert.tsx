import styles from './SliderVert.module.scss'
import { useEffect, useMemo, useRef, useState } from "react"
import MultiRangeSliderVert from "../MutiRangeSlider/MultiRangeSliderVert"
import useAppData from '../../hooks/useAppData'
import { SpinBtnVert } from '../Buttons/SpinBtns'

interface SliderVert {
  valuesC: number[]
  setValuesC: (val: number[]) => void
  canvaTimeSliderC: number[]
  textVert?: string
  distance?: number
  minValue?: number
  maxRange?: number
  canvaTimeState?: number
  curValT?: number
  setCurValT?: (val: number) => void
}

const SliderVert = ({ valuesC, setValuesC, canvaTimeSliderC: showIndexC, distance = 13, minValue = 0, maxRange = 100, textVert, canvaTimeState = 0, curValT, setCurValT }: SliderVert) => {
  const { valuesT } = useAppData()
  // const [vals, setVals] = useState(valuesC)

  const infoC = useMemo(() => {
    let showCount = 0, disabledCount = 0, activeIndex = 0
    showIndexC.forEach((item, index) => {
      item > 0 && showCount++
      item === 1 && disabledCount++
      if (item === 2) activeIndex = index
    })
    return {
      showCount,
      disabledCount,
      activeIndex,
    }
  }, [showIndexC])

  const getValueC = () => {
    let update: number[] = []
    update = valuesC
    return update
  }

  const handleChangeAB = (vals: number[]) => {
    let valMax = vals[0]
    let valMin = vals[1]

    if (valMin > valMax - distance) {
      valMin = valMax - distance
    }
    valMin = Math.max(valMin, minValue)
    valMax = Math.max(valMax, valMin + distance)
    valMax = Math.min(valMax, maxRange)
    const update = [valMax, valMin]
    setValuesC(update)

    setTextC(update[infoC.activeIndex] / 100)
  }

  const [textC, setTextC] = useState<number>()
  useEffect(() => {
    setTextC(valuesC[infoC.activeIndex] / 100)
  }, [showIndexC])

  const handleBtnClick = (step: number) => {
    if (canvaTimeState !== 3) {
      const update = [...valuesC]
      update[infoC.activeIndex] -= step * 100
      handleChangeAB(update)
    }
    else {
      let update = (curValT ?? valuesT[0]) - (step > 0 ? 1 : -1)
      if (update < valuesT[0]) update = valuesT[0]
      else if (update > valuesT[1]) update = valuesT[1]
      setCurValT?.(update)
    }
  }

  return <div className={styles.container}>
    <div className={styles.sliceVertical}>
      {/* {
        infoC.showCount > 0 &&
        <div style={{ position: 'relative' }}>
          <div className={styles.sliderback}></div>
          <MultiRangeSliderVert
            width={167}
            max={maxRange}
            distance={13}
            minVal={14}
            showThumbIndex={showIndexC}
            values={getValueC()}
            onChange={(vals) => handleChangeAB(vals)}
          />
        </div>
      } */}

      <div className='v-slider-container' style={{ width: 167 }}>
        <div style={{ position: 'relative' }}>
          {showIndexC[0] > 0 && <div
            className={`
            v-slider-pointer 
            ${showIndexC[0] === 1 ? 'disabled' : ''}
          `}
            style={{
              left: 8 + 150 / 100 * getValueC()[0]
            }}
          />}
          {showIndexC[1] > 0 && <div
            className={`
            v-slider-pointer 
            ${showIndexC[1] === 1 ? 'disabled' : ''}
          `}
            style={{
              left: 8 + 150 / 100 * getValueC()[1]
            }}
          />}
        </div>
      </div>


    </div>
    <div className={styles.textVert}>
      <p>{`${textVert || '[A]'}`}</p>
      <p className='txt-red'>{textC?.toFixed(2)} M</p>
    </div>
    <SpinBtnVert
      className={styles.vertSpins}
      onClickUp={() => handleBtnClick(-0.1)}
      onClickDown={() => handleBtnClick(0.1)}
    />
  </div>
}
export default SliderVert