import { useState } from 'react'
import styles from './WatchMenu.module.scss'
import useAppData from '../hooks/useAppData'

const WatchMenu = () => {
  const [isActive, setIsActive] = useState(false)
  const handleShowChapterList = () => {
    setIsActive(!isActive)
  }
  return <div
    id='tur_watchMenuIcon'
    className={styles.WatchMenuContainer}
  >
    <button
      className={`${styles.closeIcon} ${isActive ? styles.active : ''}`}
      onClick={() => handleShowChapterList()}
    ></button>
    <WatchMenuPanel visible={isActive} />
  </div>
}
export default WatchMenu

interface WatchMenuPanelProps {
  visible: boolean
}
const WatchMenuPanel = ({ visible }: WatchMenuPanelProps) => {
  const { valuesC: concentrationAB, valuesT: reactionTime } = useAppData()

  return <div className={`${styles.WatchMenuPanel} ${visible ? styles.active : ''}`}>
    <div className={styles.WatchMenuGridItem}>c</div>
    <div className={styles.WatchMenuGridItem}>{concentrationAB[0] ? (concentrationAB[0] / 100).toFixed(2) : '-'}</div>
    <div className={styles.WatchMenuGridItem}>{concentrationAB[1] ? (concentrationAB[1] / 100).toFixed(2) : '-'}</div>

    <div className={styles.WatchMenuGridItem}>t</div>
    <div className={styles.WatchMenuGridItem}>{reactionTime[0] ? reactionTime[0].toFixed(2) : '-'}</div>
    <div className={styles.WatchMenuGridItem}>{reactionTime[1] ? reactionTime[1].toFixed(1) : '-'}</div>
    {/* <p>This is Watch Menu Panel</p> */}
  </div>
}