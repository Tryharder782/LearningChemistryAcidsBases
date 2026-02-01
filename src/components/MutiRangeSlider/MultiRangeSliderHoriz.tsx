import React, { useCallback, useEffect, useRef, useState } from 'react'
import './slider.css'
import { debounce } from '../../helper/functions'

interface MultiRangeSliderProps {
  max: number
  width?: number
  distance?: number
  showThumbIndex: number[]
  values: number[]
  hiddePointer?: boolean
  // onChange: (val: number, index: number) => void
  onChange: (vals: number[]) => void
}

const MultiRangeSliderHoriz = ({
  max,
  width,
  distance = 13,
  showThumbIndex,
  values,
  hiddePointer = false,
  onChange
}: MultiRangeSliderProps) => {
  // const valLeft = values[0]
  // const valRight = values[1]

  // const [vals, setVals] = useState(values)
  const minDisabled = showThumbIndex[0] === 1 ? true : false
  const maxDisabled = showThumbIndex[1] === 1 ? true : false
  const isLeftOverlap = maxDisabled || values[0] > max - max * 0.1

  const refRequest = useRef<number>(0)


  const onChangeValue = (val: number, index: number) => {
    const update = [...values]
    update[index] = val
    onChange(update)
  }

  const onChangeValMin = useCallback(debounce((val: number) => {
    cancelAnimationFrame(refRequest.current)
    refRequest.current = requestAnimationFrame(() => {
      // if (values[1]) {
      //   val = Math.min(val, values[1] - distance)
      // }
      onChangeValue(+val, 0)
    })
  }, 10), [onChangeValue])

  const onChangeValMax = useCallback(debounce((val: number) => {
    cancelAnimationFrame(refRequest.current)
    refRequest.current = requestAnimationFrame(() => {
      // if (values[0]) {
      //   val = Math.max(val, values[0] + distance)
      // }
      onChangeValue(+val, 1)
    })
  }, 10), [onChangeValue])


  return (
    <div
      className='h-slider-container'
      style={{
        ...(width ? { width } : { width: '100%' })
      }}
    >
      <div className='h-slider-bar' />
      <div className='h-slider-thumbs'>
        <div className='h-slider-inputs'>
          <input
            className={`
              h-slider-thumb thumb--zindex-3 
              ${isLeftOverlap ? 'thumb--zindex-5' : ''} 
              ${showThumbIndex[0] === 0 ? 'h-slider-thumb-hidden' : ''}
            `}
            style={{
              ...(width ? { width } : { width: '100%' })
            }}
            disabled={minDisabled}
            type='range'
            max={max}
            value={values[0]}
            onChange={(event) => {
              onChangeValMin(+event.target.value)
            }}
          />

          <input
            className={`
              h-slider-thumb thumb--zindex-4 
              ${showThumbIndex[1] === 0 ? 'thumb-hidden' : ''} 
            `}
            style={{
              ...(width ? { width } : { width: '100%' })
            }}
            disabled={maxDisabled}
            type='range'
            max={max}
            value={values[1]}
            onChange={(event) => {
              onChangeValMax(+event.target.value)
            }}
          />
        </div>
      </div>
      {!hiddePointer && <div>
        {showThumbIndex[0] > 0 && <div
          className={`
            h-slider-pointer 
            ${showThumbIndex[0] === 1 ? 'disabled' : ''}
          `}
          style={{
            left: 7 + 152 / 20 * values[0] / 10
          }}
        />}
        {showThumbIndex[1] > 0 && <div
          className={`
            h-slider-pointer 
            ${showThumbIndex[1] === 1 ? 'disabled' : ''}
          `}
          style={{
            left: 7 + 152 / 20 * values[1] / 10
          }}
        />}
      </div>}
    </div>
  )
}

export default MultiRangeSliderHoriz
