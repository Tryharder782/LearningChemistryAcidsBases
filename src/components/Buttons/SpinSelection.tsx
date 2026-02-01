import styles from './SpinSelection.module.scss'

interface SpinSelectionProps {
  spinValues: number[]
  value: number
  onChange: (val: number) => void
}
const SpinSelection = ({ spinValues, value, onChange }: SpinSelectionProps) => {
  return <div
    className={styles.spinListContainer}
  >
    {spinValues.map(item => {
      const isChecked = value === item
      return <div
        key={item}
      >
        <label
          className={`${styles.spinBtn} ${isChecked ? styles.checked : ''}`}
        >
          <input
            type='radio'
            value={item}
            checked={isChecked}
            onChange={e => onChange(+e.target.value)}
            style={{
              display: 'none'
            }}
          />
          <span
            // className={styles.spinBtn}
          >
            {item}
          </span>
        </label>
      </div>
    })}
  </div>
}
export default SpinSelection