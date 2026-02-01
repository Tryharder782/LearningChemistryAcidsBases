import React, { useCallback, useEffect, useRef, useState } from 'react'
import './slider.css'
import { debounce } from '../../helper/functions'

interface MultiRangeSliderProps {
  max: number
  minVal: number
  width?: number
  distance?: number
  showThumbIndex: number[]
  values: number[]
  onChange: (val: number[]) => void
}
const MultiRangeSliderVert = ({
  max: maxRange,
  minVal = 0,
  width,
  distance = 13,
  showThumbIndex,
  values,
  onChange
}: MultiRangeSliderProps) => {
  // const valLeft = values[0]
  // const valRight = values[1]

  // const [vals, setVals] = useState(values)

  // const [minDisabled, setMinDisabled] = useState<boolean>(false);
  // const [maxDisabled, setMaxDisabled] = useState<boolean>(false);

  // useEffect(() => {
  //   setMaxDisabled(true);
  //   setMinDisabled(true);
  //   if (showThumbIndex[0] === 2 && showThumbIndex[1] === 1) {
  //     setMaxDisabled(false);
  //   } else if (showThumbIndex[1] === 2 && showThumbIndex[0] === 1) {
  //     setMinDisabled(false);
  //   } else if (showThumbIndex[1] === 2 && showThumbIndex[0] === 0) {
  //     setMaxDisabled(false);
  //     setMinDisabled(false);
  //   } else if (showThumbIndex[0] === 2 && showThumbIndex[1] === 0) {
  //     setMaxDisabled(false);
  //     setMinDisabled(false);
  //   }
  // }, showThumbIndex)

  const minDisabled = showThumbIndex[0] === 1 ? true : false
  const maxDisabled = showThumbIndex[1] === 1 ? true : false
  const isLeftOverlap = maxDisabled || values[0] > maxRange - 10

  const refRequest = useRef<number>(0)

  // useEffect(() => {
  // }, [vals])

  const onChangeValue = (value: number[]) => {
    // console.log('ttt', { value, vals, showThumbIndex, distance })
    // onChange(val, index)
    const update = [...value]

    // setVals(update)
    onChange(update)
  }

  const onChangeValMin = useCallback(debounce((val: number) => {
    cancelAnimationFrame(refRequest.current)
    refRequest.current = requestAnimationFrame(() => {

      const update = [...values]
      update[0] = val
      // if (update[0] <= minVal + distance) {
      //   update[0] = minVal + distance
      // }
      // if (update[1] > update[0] - distance) {
      //   update[1] = update[0] - distance
      // }
      onChangeValue(update)
    })
  }, 10), [onChangeValue])

  const onChangeValMax = useCallback(debounce((val: number) => {
    cancelAnimationFrame(refRequest.current)
    refRequest.current = requestAnimationFrame(() => {
      const update = [...values]
      update[1] = val
      // if (update[1] >= update[0] - distance) {
      //   update[1] = update[0] - distance
      // }
      // if (update[1] <= minVal) {
      //   update[1] = minVal
      // }
      onChangeValue(update)
    })
  }, 10), [onChangeValue])


  return (
    <div
      className='v-slider-container'
      style={{
        ...(width ? { width } : { width: '100%' })
      }}
    >
      <div className='v-slider-bar' />
      <div className='v-slider-thumbs'>
        <div className='v-slider-inputs'>
          <input
            className={`
              v-slider-thumb thumb--zindex-3 
              ${isLeftOverlap ? 'thumb--zindex-5' : ''} 
              ${showThumbIndex[0] === 0 ? 'v-slider-thumb-hidden' : ''}
            `}
            style={{
              ...(width ? { width } : { width: '100%' })
            }}
            disabled={minDisabled}
            type='range'
            max={maxRange}
            value={values[0]}
            onChange={(event) => {
              event.preventDefault()
              event.stopPropagation()
              onChangeValMin(+event.target.value)
            }}
          />
          <input
            className={`
              v-slider-thumb thumb--zindex-4 
              ${showThumbIndex[1] === 0 ? 'thumb-hidden' : ''} 
            `}
            style={{
              ...(width ? { width } : { width: '100%' })
            }}
            disabled={maxDisabled}
            type='range'
            max={maxRange}
            value={values[1]}
            onChange={(event) => {
              event.preventDefault()
              event.stopPropagation()
              onChangeValMax(+event.target.value)
            }}
          />
        </div>
      </div>
      <div>
        {showThumbIndex[0] > 0 && <div
          className={`
            v-slider-pointer 
            ${showThumbIndex[0] === 1 ? 'disabled' : ''}
          `}
          style={{
            left: 8 + 150 / 100 * values[0]
          }}
        />}
        {showThumbIndex[1] > 0 && <div
          className={`
            v-slider-pointer 
            ${showThumbIndex[1] === 1 ? 'disabled' : ''}
          `}
          style={{
            left: 8 + 150 / 100 * values[1]
          }}
        />}
      </div>
    </div>
  )
}

export default MultiRangeSliderVert
