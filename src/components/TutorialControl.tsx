import styles from './TutorialControl.module.scss'
import ImgBeacky from '../assets/ReactionRates/reaction_boxes/beaky.png'
import ImgTurtorialBk from '../assets/ReactionRates/reaction_boxes/turtorialbk.png'
import Buttons from './Buttons/Buttons'
import SpeechBubble from './SpeechBubble'

interface TutorialControlProps {
  turText: string[]
  isDisableNextButton?: boolean
  className?: string
  onStepChange: (step: number) => void
}

const TutorialControl = ({
  turText,
  isDisableNextButton = false,
  className,
  onStepChange
}: TutorialControlProps) => {
  return (<div className={`${styles.tutorialControl} ${className || ''}`}>
    <div
      id='tur_tutorialText'
      className={styles.tutorialTextContainer}
    >
      {/* <SpeechBubble
        width={300}
        height={250}
      /> */}
      <div className={styles.tutorialBk}>
        <img
          // className={styles.tutorialBk}
          src={ImgTurtorialBk}
          width={350}
          height={250}
        />
      </div>
      <div className={styles.tutorialText}>
        {turText?.map((val, index) => <div
          key={index}
          className={styles.tutorialTextItem}
          dangerouslySetInnerHTML={{ __html: val || '' }}
        />)}
      </div>
      <div className={styles.beakyIcon}>
        <img src={ImgBeacky} alt='beacky' />
      </div>
    </div>
    <div className={styles.stepButtons}>
      <Buttons.StepButton
        id='tur_stepPrevButton'
        onClick={() => onStepChange(-1)}
      >
        &#9664;
      </Buttons.StepButton>
      <Buttons.NextButton
        id='tur_stepNextButton'
        onClick={() => onStepChange(1)}
        disabled={isDisableNextButton}
      />
      {/* <button
        id='tur_stepPrevButton'
        className={styles.prevBtn}
        onClick={() => onStepChange(-1)}
      >
        &#9664;
      </button> */}
      {/* <button
        id='tur_stepNextButton'
        className={styles.nextBtn}
        onClick={() => onStepChange(1)}
      >
        Next <span>&#9654;</span>
      </button> */}
      {/* <button onClick={() => handleTest()}>Test tutorial</button> */}
    </div>
  </div>)
}
export default TutorialControl