import styles from './SliderHoriz.module.scss'
import { useEffect, useMemo, useRef, useState } from "react"
import MultiRangeSliderHoriz from "../MutiRangeSlider/MultiRangeSliderHoriz"
import CanvasSlider from '../Slider'
import useAppData from '../../hooks/useAppData'
import { SpinBtnHoriz } from '../Buttons/SpinBtns'

interface SliderHoriz {
  valuesT: number[]
  setValuesT: (val: number[]) => void
  showThumbIndex: number[]
  distance?: number
  minValue?: number
  maxRange?: number
  canvaTimeState?: number
  curValT?: number
  setCurValT?: (val: number) => void
}

const flexibleV = 10;

const SliderHoriz = ({ valuesT, setValuesT, showThumbIndex, distance = 25, minValue = 0, maxRange = 100, canvaTimeState = 0, curValT, setCurValT }: SliderHoriz) => {

  const { spinValueT } = useAppData()
  const infoT = useMemo(() => {
    let showCount = 0, disabledCount = 0, activeIndex = 0
    showThumbIndex.forEach((item, index) => {
      item > 0 && showCount++
      item === 1 && disabledCount++
      if (item === 2) activeIndex = index
    })
    return {
      showCount,
      disabledCount,
      activeIndex,
    }
  }, [showThumbIndex])

  // console.log('wwwww ', {infoT, valuesT, showThumbIndex, distance, minValue, maxRange, canvaTimeState, curValT})
  
  const getValueT = () => {
    let update: number[] = []
    update = valuesT
    return update.map(item => item * flexibleV)
  }

  const handleChangeVal = (vals: number[]) => {
    // console.log('===handleChangeAB=== ', { vals, valuesT: valuesT })
    // let update: number[] = []
    // update = [...vals].map(item => item / flexibleV)
    // setValuesT(update)

    let valMin = vals[0]
    let valMax = vals[1]

    valMax = Math.max(valMax, valMin + distance)
    valMax = Math.min(valMax, maxRange)

    valMin = Math.min(valMin, valMax - distance)
    valMin = Math.max(valMin, minValue)

    const update = [valMin / flexibleV, valMax / flexibleV]
    setValuesT(update)

    setTextT(update[infoT.activeIndex])
  }

  const [textT, setTextT] = useState<number>()

  useEffect(() => {
    setTextT(valuesT[infoT.activeIndex])
  }, [showThumbIndex])

  const handleBtnClick = (step: number) => {
    if (canvaTimeState !== 3) {
      const update = getValueT()
      update[infoT.activeIndex] -= step * 10
      handleChangeVal(update)
    }
    else {
      let update = (curValT ?? valuesT[0]) - (step > 0 ? 1 : -1)
      if (update < valuesT[0]) update = valuesT[0]
      else if (update > valuesT[1]) update = valuesT[1]
      setCurValT?.(update)
    }
  }

  // @ts-ignore
  const isMobile = window.mobileCheck()
  return (
    <div className={styles.container}>
      <div className={styles.sliceHorizontal}>
        {/* {
          infoT.showCount > 0 &&
          <div style={{ position: 'relative' }}>
            <div className={styles.sliderback}></div>
            <MultiRangeSliderHoriz
              max={maxRange}
              width={167}
              distance={distance}
              showThumbIndex={showThumbIndex}
              values={getValueT()}
              onChange={(vals) => handleChangeVal(vals)}
            />
          </div>
        } */}
        {/* <CanvasSlider
              direction='horizontal'
              max={200}
              width={150}
              distance={25}
              showThumbIndex={showThumbIndex}
              values={getValueT()}
              onChange={(val, index) => handleChangeVal(val)}
            /> */}


        <div>
          {showThumbIndex[0] > 0 && <div
            className={`
              h-slider-pointer 
              ${showThumbIndex[0] === 1 ? 'disabled' : ''}
            `}
            style={{
              left: 7 + 152 / 20 * getValueT()[0] / 10
            }}
          />}
          {showThumbIndex[1] > 0 && <div
            className={`
              h-slider-pointer 
              ${showThumbIndex[1] === 1 ? 'disabled' : ''}
            `}
            style={{
              left: 7 + 152 / 20 * getValueT()[1] / 10
            }}
          />}
        </div>


      </div>
      <div className={styles.textHoriz}>
        <p>{`Time:`} <span className='txt-red'>{textT?.toFixed(1)} s</span></p>
      </div>
      <SpinBtnHoriz
        className={styles.horizSpins}
        onClickUp={() => handleBtnClick(-1)}
        onClickDown={() => handleBtnClick(1)}
      />
    </div>
  )
}
export default SliderHoriz