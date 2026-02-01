import styles from './MathExp.module.scss'
import { useEffect, useState } from "react";
import Math0 from '../../../assets/ReactionRates/math/kinetics/0.png'
import Math1 from '../../../assets/ReactionRates/math/kinetics/1.png'
import Math2 from '../../../assets/ReactionRates/math/kinetics/2.png'
import Math3 from '../../../assets/ReactionRates/math/kinetics/3.png'

interface MathExpKineticsProps {
  values: any
  blanks?: (any | undefined)[]
  txtRed?: (any | undefined)[]
  highlights?: (any | undefined)[]
  className?: string
}

const MathExpKinetics = ({ values, blanks, txtRed, className = '' }: MathExpKineticsProps) => {
  const [isBlank, setIsBlank] = useState(false)
  // console.log({ blanks })
  const width = 270

  return <div className={styles.mathContainer}>
    <div
      className={styles.mathRow}
      style={{ marginTop: 30}}
    >
      <img
        src={Math0}
        width={width}
      />
    </div>
    <div
      className={styles.mathRow}
      style={{ marginTop: 20}}
    >
      <img
        src={Math1}
        width={width}
      />
    </div>
    <div
      className={styles.mathRow}
      style={{ marginTop: 20}}
    >
      <img
        src={Math2}
        width={width}
      />
    </div>
    <div
      className={styles.mathRow}
      style={{ marginTop: 20}}
    >
      <img
        src={Math3}
        width={width}
      />
      <div>
        <span className={`
          ${styles.mathTxt1_0} 
          ${txtRed && txtRed.includes(0) ? styles.txtRed : ''}
          ${blanks && blanks.includes(0) ? styles.blank : ''}
        `}>
          {values[0]}
        </span>
        <span className={`
          ${styles.mathTxt1_1} 
          ${txtRed && txtRed.includes(1) ? styles.txtRed : ''}
          ${blanks && blanks.includes(1) ? styles.blank : ''}
        `}>
          {values[1]}
        </span>
        <span className={`
          ${styles.mathTxt1_2} 
          ${txtRed && txtRed.includes(2) ? styles.txtRed : ''}
          ${blanks && blanks.includes(2) ? styles.blank : ''}
        `}>
          {values[2]}
        </span>
        <span className={`
          ${styles.mathTxt1_3} 
          ${txtRed && txtRed.includes(3) ? styles.txtRed : ''}
          ${blanks && blanks.includes(3) ? styles.blank : ''}
        `}>
          {values[3]}
        </span>
        <span className={`
          ${styles.mathTxt1_4} 
          ${txtRed && txtRed.includes(4) ? styles.txtRed : ''}
          ${blanks && blanks.includes(4) ? styles.blank : ''}
        `}>
          {values[4]}
        </span>
        <span className={`
          ${styles.mathTxt1_5} 
          ${txtRed && txtRed.includes(5) ? styles.txtRed : ''}
          ${blanks && blanks.includes(5) ? styles.blank : ''}
        `}>
          {values[5]}
        </span>
        <span className={`
          ${styles.mathTxt1_6} 
          ${txtRed && txtRed.includes(6) ? styles.txtRed : ''}
          ${blanks && blanks.includes(6) ? styles.blank : ''}
        `}>
          {values[6]}
        </span>
        <span className={`
          ${styles.mathTxt1_7} 
          ${txtRed && txtRed.includes(7) ? styles.txtRed : ''}
          ${blanks && blanks.includes(7) ? styles.blank : ''}
        `}>
          {values[7]}
        </span>
      </div>
    </div>
  </div>
}
export default MathExpKinetics