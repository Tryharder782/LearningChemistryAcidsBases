import styles from './SpinBtns.module.scss'

interface SpinBtnHorizProps {
  className?: string,
  isDisabled?: boolean,
  onClickUp: () => void
  onClickDown: () => void
}
const SpinBtnHoriz = ({ className = '', isDisabled = false, onClickUp, onClickDown }: SpinBtnHorizProps) => {
  // const [upCounter, setUpCounter] = useState(0)
  // const [downCounter, setDownCounter] = useState(0)
  // const refIncrement = useRef<NodeJS.Timer>()

  // const startTimer = (isUp: number) => {
  //   if (isUp > 0) {
  //     setUpCounter(v => v + 1)
  //   } else {
  //     setDownCounter(v => v + 1)
  //   }
  //   refIncrement.current = setInterval(() => {
  //     if (isUp > 0) {
  //       setUpCounter(v => v + 1)
  //     } else {
  //       setDownCounter(v => v + 1)
  //     }
  //   }, 100)
  // }
  // const stopTimer=() => {
  //   clearInterval(refIncrement.current)
  //   refIncrement.current = undefined
  // }
  // useEffect(() => {
  //   if (upCounter <= 0) return
  //   const update = getValueT()
  //   update[infoT.activeIndex]++
  //   handleChangeVal(update)
  // }, [upCounter])
  // useEffect(() => {
  //   if (downCounter <= 0) return
  //   const update = getValueT()
  //   update[infoT.activeIndex]--
  //   handleChangeVal(update)
  // }, [downCounter])

  return <div className={`${className} ${styles.horizBtnGroup}`}>
    <button
      className={styles.btnUp}
      disabled={isDisabled}
      onClick={() => onClickDown()}
    >◀</button>
    <button
      className={styles.btnDown}
      disabled={isDisabled}
      onClick={() => onClickUp()}
    >▶</button>
    {/* <button
      className={styles.btnUp}
      onMouseDown={() => startTimer(-1)}
      onMouseUp={() => stopTimer()}
      onMouseLeave={() => stopTimer()}
      onTouchStart={() => startTimer(-1)}
      onTouchEnd={() => stopTimer()}
    >◀</button>
    <button
      className={styles.btnDown}
      onMouseDown={() => startTimer(1)}
      onMouseUp={() => stopTimer()}
      onMouseLeave={() => stopTimer()}
      onTouchStart={() => startTimer(1)}
      onTouchEnd={() => stopTimer()}
    >▶</button> */}
  </div>
}

interface SpinBtnVertProps {
  className?: string,
  onClickUp: () => void
  onClickDown: () => void
}
const SpinBtnVert = ({ className = '', onClickUp, onClickDown }: SpinBtnVertProps) => {

  // const [upCounter, setUpCounter] = useState(0)
  // const [downCounter, setDownCounter] = useState(0)
  // const refSpinTimer = useRef<NodeJS.Timer>()

  // const startTimer = (isUp: number) => {
  //   if (isUp > 0) {
  //     setUpCounter(v => v + 1)
  //   } else {
  //     setDownCounter(v => v + 1)
  //   }
  //   refSpinTimer.current = setInterval(() => {
  //     if (isUp > 0) {
  //       setUpCounter(v => v + 1)
  //     } else {
  //       setDownCounter(v => v + 1)
  //     }
  //   }, 100)
  // }
  // const stopTimer = () => {
  //   clearInterval(refSpinTimer.current)
  //   refSpinTimer.current = undefined
  // }
  // useEffect(() => {
  //   if (upCounter <= 0) return
  //   const update = [...valuesC]
  //   update[infoC.activeIndex]++
  //   handleChangeAB(update)
  // }, [upCounter])
  // useEffect(() => {
  //   if (downCounter <= 0) return
  //   const update = [...valuesC]
  //   update[infoC.activeIndex]--
  //   handleChangeAB(update)
  // }, [downCounter])


  return <div className={`${className} ${styles.vertBtnGroup}`}>
    <button
      className={styles.btnUp}
      onClick={() => onClickUp()}
    >▲</button>
    <button
      className={styles.btnDown}
      onClick={() => onClickDown()}
    >▼</button>
    {/* <button
      className={styles.btnUp}
      onMouseDown={() => startTimer(1)}
      onMouseUp={() => stopTimer()}
      onMouseLeave={() => stopTimer()}
      onTouchStart={() => startTimer(1)}
      onTouchEnd={() => stopTimer()}
    >▲</button>
    <button
      className={styles.btnDown}
      onMouseDown={() => startTimer(-1)}
      onMouseUp={() => stopTimer()}
      onMouseLeave={() => stopTimer()}
      onTouchStart={() => startTimer(-1)}
      onTouchEnd={() => stopTimer()}
    >▼</button> */}
  </div>
}
export {
  SpinBtnHoriz,
  SpinBtnVert,
}
