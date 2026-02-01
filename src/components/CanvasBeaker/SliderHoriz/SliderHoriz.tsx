// import ReactSlider from "react-slider"
import styles from './SliderHoriz.module.scss'
import { useMemo, useState } from "react"
import MultiRangeSliderHoriz from "../../MutiRangeSlider/MultiRangeSliderHoriz"

interface SliderHoriz {
  className?: string
  width?: number
  max: number
  distance?: number
  values: number[]
  setValues: (val: number[]) => void
  showThumbIndex: number[]
  hidePointer?: boolean
}

const SliderHoriz = ({ className, width, max = 1000, distance = 0, values, setValues, showThumbIndex, hidePointer = false }: SliderHoriz) => {
  const handleChangeVal = (vals: number[]) => {
    // console.log('===handleChangeAB=== ', { val, index, valuesT: values, showThumbIndex })
    const update: number[] = [...vals]
    setValues(update)
  }

  return <MultiRangeSliderHoriz
      max={max}
      width={width}
      distance={distance}
      showThumbIndex={showThumbIndex}
      values={values}
      onChange={(vals) => handleChangeVal(vals)}
      hiddePointer={hidePointer}
    />
}
export default SliderHoriz