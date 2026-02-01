
import { useEffect, useState } from 'react'
import styles from './HandDragOrderItem.module.scss'
import IconHandOpen from '../assets/ReactionRates/openhand.png'
import IconHandClose from '../assets/ReactionRates/closedhand.png'

interface HandDragOrderItemProps {
  isAnimate: boolean
}
const HandDragOrderItem = ({ isAnimate }: HandDragOrderItemProps) => {
  // const [handIcon, setHandIcon] = 
  // useEffect(() => {
    // setTimeout(function () {
      // console.log('Hello world')
    // }, 1000)
  // }, [isAnimate])

  return <div
    id={'tur_handDragOrderItem'}
    className={`
      ${styles.orderItemAction} 
    `}
  >
    <div className={styles.handIcon}>
      <img
        className={styles.handOpen}
        src={IconHandOpen}
        width={25}
      />
    </div>
    <div className={styles.actionCard}>
      Order: 0
      <img
        className={styles.handClose}
        src={IconHandClose}
        width={25}
      />
    </div>

  </div>
}
export default HandDragOrderItem