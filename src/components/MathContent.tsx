// import { MathJax, MathJaxContext } from "better-react-mathjax";
import styles from './MathContent.module.scss'
import { useEffect } from "react";
import './customMath.css'

const config = {
  loader: { load: ["[tex]/html"] },
  tex: {
    packages: { "[+]": ["html"] },
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"]
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"]
    ],
  }
};

const config1 = {
  loader: { load: ['input/mml', 'output/chtml'] },
  input: {
    mml: {
      extensions: ['mml']
    }
  }
};

interface MathContentProps {
  exp0: string,
  exp1?: string,
  exp2?: string,
  exp3?: string,
  exp4?: string,
  exp5?: string,
  blanks: (any | undefined)[]
  highlights?: (any | undefined)[]
  className?: string
}
const MathContent = ({ exp0, exp1, exp2, exp3, exp4, exp5, blanks, highlights, className = '' }: MathContentProps) => {
  // const action_turMathBlanks = () => {
  //   jQuery('.blankMath').removeClass()
  //   const curTurMathBlanks = blanks

  //   // console.log({aaa: jQuery('#tur_math4_2')})

  //   const s1 = '#tur_math3_2>span mjx-msub'
  //   const s2 = '#tur_math3_2>span mjx-num'
  //   const s3 = '#tur_math3_2>span mjx-den'
  //   const s4 = '#tur_math3_2 mjx-math mjx-mn'
  //   const a3 = jQuery(s1)
  //   const b3 = jQuery(s2)
  //   const c3 = jQuery(s3)
  //   const d3 = jQuery(s4)

  //   // console.log('0', s1, {a3})
  //   // console.log('1', s2, {b3})
  //   // console.log('2', s3, {c3})
  //   // console.log('3', s4, {d3})

  //   if (!curTurMathBlanks) return
  //   curTurMathBlanks.map((blank: any, index) => {
  //     const math = jQuery(blank.query)
  //     // console.log({ query: blank.query, index, math, nths: blank?.nths })
  //     if (!math || !blank?.nths) return
  //     blank?.nths.map((nth: any) => {
  //       if (!math[nth]) return
  //       math[nth].className = 'blankMath'
  //     })
  //   })
  // }

  // useEffect(() => {
  //   setTimeout(() => {
  //     action_turMathBlanks()
  //   }, 0);
  // }, [exp0, exp1, exp2, exp3, exp4, exp5, blanks])

  // console.log({highlights})
  return <div className={`${styles.mathContentContainer} ${className}`}>
    {/* <MathJaxContext config={config}>
      <div
        id='tur_math1'
        className={styles.mathjaxRow}
      >
        <MathJax
          className={styles.mathjax}
          dynamic
        >
          {exp0}
        </MathJax>
      </div>
      <div
        id='tur_math2'
        className={styles.mathjaxRow}
      >
        <MathJax
          className={styles.mathjax}
          dynamic
        >
          {exp1}
        </MathJax>
      </div>
      <div
        id='tur_math3'
        className={`${styles.mathjaxRow} ${styles.centerAlign}`}
      >
        <MathJax
          id='tur_math3_1'
          className={styles.mathjax}
          dynamic
        >
          {exp2}
        </MathJax>
        <MathJax
          id='tur_math3_2'
          className={styles.mathjax}
          dynamic
        >
          {exp3}
        </MathJax>
      </div>
      <div
        id='tur_math4'
        className={`${styles.mathjaxRow} ${styles.centerAlign}`}
      >
        <MathJax
          id='tur_math4_1'
          className={styles.mathjax}
          dynamic
        >
          {exp4}
        </MathJax>
        <MathJax
          id='tur_math4_2'
          className={styles.mathjax}
          inline
          dynamic
        >
          {exp5}
        </MathJax>
      </div>
    </MathJaxContext> */}


    {/* {false && blanks && blanks.map((item, index) => {
      if (!item) return null
      const className = `
        ${styles.blank} 
        ${item ? styles.active : ''}
      `
      return <div
        key={index}
        className={className}
        style={item}
      />
    })} */}
    {/* {highlights && highlights.map((item, index) => {
      if (!item) return null
      const className = `
        ${styles.blank} 
        ${item ? styles.active : ''}
      `
      return <div
        key={index}
        id={`tur_mathHighlight${index}`}
        className={className}
        style={item}
      />
    })} */}

    {/* <div className={`
      ${styles.blank} 
      ${styles.blank_test} 
      ${styles.active}
    `} /> */}
    {/* <p>{exp0}</p> */}
  </div>
}
export default MathContent