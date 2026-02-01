import { useEffect, useRef, useState } from 'react'
import styles from './EnergyCatalyst.module.scss'
import { Point } from '../../helper/types'
import { debounce, delay } from '../../helper/functions'
import { ImgPentagonPink, ImgPentagonSky, ImgPentagonYellow, catalystDisabled, catalystOne, catalystThree, catalystTwo } from '../Images'
import Color from 'color'
import { CatalystDropItemColors } from './constants'

const log_EnergyCatalyst = true

// Images for catalystType
const catalystImgs = [catalystOne, catalystTwo, catalystThree]
const catalystImgColors = ['red', 'green', 'blue']
const ImgsPentagon = [ImgPentagonPink, ImgPentagonYellow, ImgPentagonSky]

interface EnergyCatalystContainerProps {
  catalystTypes: number[]
  catalystItemStates: number[]
  setCatalystItemStates: (val: number[]) => void
  onCatalystMenuItemClick: (id: number) => void
  activeCatIdx: number
  regionWidth?: number
  regionHeight?: number
  maxShakingCount?: number
  onChangeShakingCount?: (shakingCount: number, shakingItemIndex: number) => void
}
export const EnergyCatalystContainer = ({
  catalystTypes = [0, 1, 2],

  // 0: menu item - hidden, 1: menu item - hidden(movable item will be shown only in this case),
  // 2: menu item - disabled, 3: menu item - active, 4: menu item - active & clickable
  catalystItemStates,
  setCatalystItemStates,
  onCatalystMenuItemClick,
  activeCatIdx = -1,
  regionWidth = 350,
  regionHeight = 230,
  maxShakingCount = 30,
  onChangeShakingCount,
}: EnergyCatalystContainerProps) => {
  const catItemWidth = 25, catItemHeight = 55

  const menuItemPositions = [
    { x: regionWidth / 2 - catItemWidth / 2 - 60, y: 0 },
    { x: regionWidth / 2 - catItemWidth / 2, y: 0 },
    { x: regionWidth / 2 - catItemWidth / 2 + 60, y: 0 },
  ]
  const initialMovableItemPositions = { x: regionWidth / 2 - catItemWidth / 2, y: catItemHeight + 20 }

  const containerRef = useRef<HTMLDivElement>(null)

  // const [enabledIndex, setEnabledIndex] = 
  // const [activeCatIdx, setActiveCatIdx] = useState(-1)
  const [position, setPosition] = useState<Point>(initialMovableItemPositions)
  const [dragIndex, setDragIndex] = useState(-1)
  const [dragOffset, setDragOffset] = useState<Point>({ x: 0, y: 0 })

  const shakeThreshold = 5
  const [prevPosition, setPrevPosition] = useState<Point>({ x: 0, y: 0 })
  const shakings = useRef<number>(0)  // shaking element count
  // const [shakingDirection, setShakingDirection] = useState(0)
  const [curShakingCount, setCurShakingCount] = useState<number>(0) // ** dropped Element count


  // timer to count the shakings
  const timerID = useRef<NodeJS.Timer>()
  // const maxTime = 5 * 1000
  const framesPerSecond = 5
  const intervalTime = 1000 / framesPerSecond
  const [timeCounter, setTimeCounter] = useState<number>(0)
  const startTimer = () => {
    stopTimer()
    setTimeCounter(0)
    timerID.current = setInterval(() => {
      setTimeCounter(v => v += intervalTime)
    }, intervalTime)
  }
  const stopTimer = () => {
    if (timerID.current) {
      clearInterval(timerID.current)
      timerID.current = undefined
    }
  }
  const onTimer = () => {
    const distance = Math.sqrt((prevPosition.x - position.x) ** 2 + (prevPosition.y - position.y))
    if (distance > shakeThreshold) {
      shakings.current++
    }
    setPrevPosition(position)
  }
  useEffect(() => {
    if (dragIndex < 0) {
      stopTimer()
      return
    }
    onTimer()
  }, [timeCounter])
  useEffect(() => {
    return () => stopTimer()
  }, [])

  const onItemDragStart = (index: number) => {
    log_EnergyCatalyst && console.log('===handleMouseUp=== drag start')
    // setDragIndex(index)
    // shakings.current++
    // startTimer()
  }
  const onItemDragEnd = () => {
    setDragIndex(-1)
  }
  const onItemMove = (_e: any) => {
    if (dragIndex > -1) {
      // log_EnergyCatalyst && console.log('=== handleMouseMove ===', {dragIndex})
      let update = position
      let newX = _e.clientX - dragOffset.x
      let newY = _e.clientY - dragOffset.y
      newX = Math.min(Math.max(newX, 0), regionWidth - catItemWidth)
      newY = Math.min(Math.max(newY, 0), regionHeight - catItemHeight)

      // const distance = Math.sqrt((newX - positions[dragIndex].x) ** 2 + (newY - positions[dragIndex].y) ** 2)
      update = { x: newX, y: newY }
      setPosition(update)
    }
  }

  // Moveable Item: Detect multiple clicked count within 0.5s
  const [lastClickTime, setLastClickTime] = useState(0);
  const [isDroppingMultiple, setIsDroppingMultiple] = useState<boolean>(false)
  // const isDropping = useRef(false)

  const onMovableItemClick = async () => {
    // isDropping.current = true
    // log_EnergyCatalyst && console.log('===onItemClick===', { shakingCount })
    // shakings.current++
    // setCurShakingCount(v => v + 1)
    console.log('===================1233333')

    // await delay(100)                        // delay until last animation ends.
    await addMultipleDropping(7)

    const currentTime = new Date().getTime();
    setLastClickTime(currentTime);
    if (currentTime - lastClickTime > 300) {
      return
    }

    // When double clicked
    if (isDroppingMultiple) {
      return
    }
    let droppingCountToAdd = 10
    if (maxShakingCount - curShakingCount < droppingCountToAdd) {
      droppingCountToAdd = maxShakingCount - curShakingCount
    }

    // isDropping.current = false
    // setIsDroppingMultiple(true)
    // await addMultipleDropping(4)
    // await delay(300)                        // delay until last animation ends.
    // setIsDroppingMultiple(false)
    // log_EnergyCatalyst && console.log('addMultipleDropping', { isDroppingMultiple })
  }
  const addMultipleDropping = async (count: number) => {
    if (count < 1) return
    console.log(count)
    // setCurShakingCount(v => v + 1)
    // await addMultipleDropping(count - 1)
    for (let i = 0; i < count; i++) {
      // if (curShakingCount >= maxShakingCount) return
      setCurShakingCount(v => v + 1)
      await delay(200)
    }
  }

  // Menu Item: Change CatalystItemState   3 (menu clickable) -> 1 (hide menu and show movable item instead)
  const onClickCatalystMenuItem = (id: number) => {
    const others = [...catalystItemStates]
    others.splice(id, 1)
    const normalState = Math.max(...others) // find another which is disabled(2) or active(3)
    const update = [normalState, normalState, normalState]
    update[id] = 1  // show item as moveable

    // log_EnergyCatalyst && console.log('debug --- 000', {catalystItemStates: update})
    setCatalystItemStates(update)

    onCatalystMenuItemClick(id)
  }

  useEffect(() => {
    const count = Math.floor(shakings.current)
    if (count > 0) {
      shakings.current = 0
      const update = curShakingCount + count
      setCurShakingCount(update)
    }
  }, [shakings.current])

  // Check shakingCount if movable item is shaked enough.
  useEffect(() => {
    if (isDroppingMultiple) return
    if (curShakingCount >= maxShakingCount) {
      onItemDragEnd()
      return
    }
  }, [curShakingCount, isDroppingMultiple])

  // Trigger shaking event to parent.
  useEffect(() => {
    if (curShakingCount <= 0) return
    onChangeShakingCount?.(curShakingCount, activeCatIdx)
  }, [curShakingCount])

  // Initialize shaking count to be 0 when active catalyst state changes
  useEffect(() => {
    // log_EnergyCatalyst && console.log('===useEffect.catalystItemStates===')
    // const activeId = catalystItemStates.findIndex(item => item === 1) // find an item which is moveable
    // setActiveCatIdx(activeId)
    // log_EnergyCatalyst && console.log('!!! 111', {catalystItemStates})
    // log_EnergyCatalyst && console.log('!!! 222', {curShakingCount})
    setCurShakingCount(0)
    setPosition(initialMovableItemPositions)
  }, [catalystItemStates])

  return <div
    id='tur_catalystItems'
    ref={containerRef}
    className={styles.catalystContainer}
    style={{
      width: regionWidth,
      height: regionHeight,
    }}
    onMouseUp={onItemDragEnd}
    onMouseMove={onItemMove}
  >
    {catalystTypes.map((catIdx, index) => {
      // log_EnergyCatalyst && console.log({ catIdx, catalystTypes, catalystItemStates }, catalystItemStates[index])
      if (catalystItemStates[index] === undefined || catalystItemStates[index] < 2) return null
      return <EnergyCatalystMenuItem
        key={index}
        disable={catalystItemStates[index] === 2}
        catType={catIdx}
        width={catItemWidth}
        height={catItemHeight}
        position={menuItemPositions[index]}
        clickable={catalystItemStates[index] === 4}
        onClick={() => onClickCatalystMenuItem(index)}
      />
    })}
    {activeCatIdx > -1 && <>
      <EnergyCatalystMoveableItem
        catIndex={activeCatIdx}
        width={catItemWidth}
        height={catItemHeight}
        isDragging={dragIndex === activeCatIdx}
        position={position}
        onClick={() => onMovableItemClick()}
        onDragStart={() => onItemDragStart(activeCatIdx)}
        // onDragStart={() => {}}
        setDragOffset={setDragOffset}
      />
      {/* <div className={styles.textShake}>
        <span>&#9650;</span>
        <span>shake</span>
        <span>&#9660;</span>
      </div> */}
    </>}
    {/* <button onClick={() => animationStart()}>start</button>
    <button onClick={() => animationEnd()}>end</button> */}
    <ElementDroppingAnimation
      elementType={activeCatIdx}
      elementCount={curShakingCount}
    />
  </div>
}

// Menu for Catalyst Items
interface EnergyCatalystMenuItemProps {
  catType: number
  disable?: boolean
  width?: number
  height?: number
  position: Point
  clickable?: boolean
  onClick: () => void
}
export const EnergyCatalystMenuItem = ({
  catType,
  disable,
  width = 50,
  height = 100,
  position,
  clickable = false,
  onClick,
}: EnergyCatalystMenuItemProps) => {
  // const catalystColor = disable ? 'gray' : catalystImgColors[catType]
  const catalystImg = disable ? catalystDisabled : catalystImgs[catType]
  // log_EnergyCatalyst && console.log({ catalystColor, catType })

  return <div
    className={`${styles.catalystItem}`}
    style={{
      position: 'absolute',
      left: position.x,
      top: position.y,
      width,
      height,
      ... (clickable ? { cursor: 'pointer' } : {}),
      // backgroundColor: catalystColor,
      backgroundImage: `url(${catalystImg})`
    }}
    onClick={() => clickable && onClick()}
  />
}


// Moveable Catalyst Item
interface EnergyCatalystMoveableItemProps {
  catIndex: number
  disable?: boolean
  width?: number
  height?: number
  position: Point
  isDragging: boolean
  onClick?: () => void
  onDragStart: () => void
  setDragOffset: React.Dispatch<React.SetStateAction<Point>>
}
export const EnergyCatalystMoveableItem = ({
  catIndex,
  disable,
  width = 50,
  height = 100,
  position,
  isDragging,
  onClick,
  onDragStart,
  setDragOffset,
}: EnergyCatalystMoveableItemProps) => {

  // log_EnergyCatalyst && console.log({ catIndex, position, disable })

  const handleMouseDown = (_e: any) => {
    const offsetX = _e.clientX - position.x;
    const offsetY = _e.clientY - position.y;
    setDragOffset({ x: offsetX, y: offsetY })
    onDragStart()
  }

  if (disable) {
    return <div
      className={styles.catalystItem}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width,
        height,
        cursor: isDragging ? 'grabbing' : 'grab',
        ...(isDragging ? { zIndex: 123 } : {}),
        // backgroundColor: catalystImgColors[catIndex],
        backgroundImage: `url(${catalystDisabled})`
      }}
    >
      {/* <img
        width={width}
        height={height}
        src={catalystDisabled}
      /> */}
    </div>
  }
  return <div
    className={`${styles.catalystItem} ${styles.active}`}
    style={{
      position: 'absolute',
      left: position.x,
      top: position.y,
      width,
      height,
      cursor: isDragging ? 'grabbing' : 'grab',
      ...(isDragging ? { zIndex: 123 } : {}),
      // backgroundColor: catalystImgColors[catIndex],
      backgroundImage: `url(${catalystImgs[catIndex]})`
    }}
    onMouseDown={_e => handleMouseDown(_e)}
    onClick={() => onClick?.()}
  >
    {/* <img
      width={50}
      height={100}
      src={catalystImgs[catIndex]}
    /> */}
  </div>
}

interface ElementDroppingAnimationProps {
  elementCount: number
  elementType: number
  // isStart: boolean
  // onEnd?: () => void
}
export const ElementDroppingAnimation = ({
  elementCount,
  elementType,
  // isStart,
  // onEnd,
}: ElementDroppingAnimationProps) => {

  // const [timeCounter, setTimeCounter] = useState<number>(0)
  // const [counter, setCounter] = useState(0)
  // const maxTime = 5 * 1000
  // const framesPerSecond = 1
  // const intervalTime = 1000 / framesPerSecond

  // const timerID = useRef<NodeJS.Timer>()
  // const startTimer = () => {
  //   stopTimer()
  //   setTimeCounter(0)
  //   timerID.current = setInterval(() => {
  //     setTimeCounter(v => v += intervalTime)
  //   }, intervalTime)
  //   log_EnergyCatalyst && console.log('started', timerID.current)
  // }
  // const stopTimer = () => {
  //   if (timerID.current) {
  //     clearInterval(timerID.current)
  //     timerID.current = undefined
  //     log_EnergyCatalyst && console.log('timer end')
  //   }
  // }

  // // animation play
  // useEffect(() => {
  //   if (timeCounter > maxTime) {
  //     // animation ends
  //     stopTimer()
  //     onEnd?.()
  //     return
  //   }
  //   log_EnergyCatalyst && console.log('timer count', { timeCounter, isStart })
  // }, [timeCounter])

  // useEffect(() => {
  //   if (!isStart) {
  //     stopTimer()
  //     onEnd?.()
  //     return
  //   }
  //   startTimer()
  // }, [isStart])
  // useEffect(() => {
  //   log_EnergyCatalyst && console.log({ elementCount, counter })
  //   setCounter(v => v + 1)
  // }, [elementCount])

  // log_EnergyCatalyst && console.log({ elementType })

  return <div>
    {Array.from(Array(elementCount).fill(true)).map((item, index) => {
      return <div
        key={index}
        className={`
          ${styles.droppingElement}
        `}
      // style={{
      //   backgroundColor: Color(CatalystDropItemColors[elementType]).hex()
      // }}
      >
        <img
          src={ImgsPentagon[elementType]}
          width={10}
          height={10}
        />
      </div>
    })}
    {/* <div className={styles.droppingElement}></div> */}
  </div>
}