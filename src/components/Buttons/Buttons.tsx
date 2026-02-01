import { ReactNode } from 'react'
import styles from './Buttons.module.scss'

interface PrevButtonProps {
  id?: string
  className?: string
  children?: ReactNode
  onClick: () => void
  disabled?: boolean
}
export const StepButton = ({ className, children, onClick, ...restProps }: PrevButtonProps) => {
  return <button
    className={`${styles.prevBtn} ${className || ''}`}
    onClick={() => onClick()}
    {...restProps}
  >
    {children}
  </button>
}

interface PrevButtonProps {
  id?: string
  className?: string
  onClick: () => void
}
export const NextButton = ({ id, className, onClick, disabled, ...restProps }: PrevButtonProps) => {
  return <div id={id}>
    <button
      className={`${styles.nextBtn} ${disabled ? styles.disabledNext : ''} ${className || ''}`}
      onClick={() => onClick()}
      disabled={disabled}
      {...restProps}
    >
      Next <span>&#9654;</span>
    </button>
  </div>
}

interface PlayButtonProps {
  id?: string
  className?: string
  show?: boolean
  isActive?: boolean
  onPlay: () => void
}
export const PlayButton = ({ className, isActive = false, onPlay, ...restProps }: PlayButtonProps) => {
  return <button
    className={`${styles.playBtn} ${isActive ? styles.active : ''} ${className || ''}`}
    onClick={() => onPlay()}
    disabled={!isActive}
    {...restProps}
  >
    <span>&#9654;</span>
  </button>
}

export default {
  StepButton,
  NextButton,
  PlayButton,
}

