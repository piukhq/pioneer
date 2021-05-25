import React from 'react'
import { ReactComponent as PaymentAddSvg } from 'images/payment-add.svg'
import styles from './PaymentCardAdd.module.scss'

const PaymentCardAdd = ({ onClick }) => (
  <div className={styles.root} onClick={onClick}>
    <div className={styles.root__inner}>
      <PaymentAddSvg className={styles['root__payment-add-svg']} />
    </div>
  </div>
)

export default PaymentCardAdd
