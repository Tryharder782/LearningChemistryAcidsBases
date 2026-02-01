import styles from './DropDownButton.module.scss'

interface DropDownButtonProps {
  text?: string | undefined,
  isActive: boolean,
  toggleActive: () => void
}
export const DropDownButton = ({ text = '', isActive, toggleActive }: DropDownButtonProps) => {
  return <div
    className={styles.dropDownBtn}
    onClick={() => toggleActive()}
  >
    <div>{text}</div>
    <span className={`${styles.dropDownIcon} ${isActive ? styles.active : ''}`} ></span>
  </div>
}
