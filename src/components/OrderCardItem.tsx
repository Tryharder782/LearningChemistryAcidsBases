import { convertExpToHtml } from '../helper/functions'
import styles from './OrderCardItem.module.scss'

interface OrderCardItemProps {
  orderType: number // 0, 1, 2
  matches: number[]
  title: string
  exp0?: string
  exp1?: string
  exp2?: string
  exp3?: string
  onClick?: () => void
}
const OrderCardItem = ({
  orderType,
  matches,
  title,
  exp0,
  exp1,
  exp2,
  exp3,
  onClick,
}: OrderCardItemProps) => {
  let type = orderType
  if (matches[orderType] === 2) type = 3  // gray
  return <div
    id={`tur_orderCardItem${orderType}`}
    className={`${styles.orderItemCard} ${styles[`type${type}`]}`}
    onClick={() => onClick?.()}
  >
    <div className={styles.orderTitle}>
      {title}
    </div>
    <div className={styles.orders}>
      <div className={styles.orderCol1}>
        <div dangerouslySetInnerHTML={{ __html: convertExpToHtml(exp0) || '' }} />
        <div dangerouslySetInnerHTML={{ __html: convertExpToHtml(exp1) || '' }} />
      </div>
      <div className={styles.orderCol2}>
        <div dangerouslySetInnerHTML={{ __html: convertExpToHtml(exp2) || '' }} />
        <div dangerouslySetInnerHTML={{ __html: convertExpToHtml(exp3) || '' }} />
      </div>
    </div>
  </div>
}
export default OrderCardItem