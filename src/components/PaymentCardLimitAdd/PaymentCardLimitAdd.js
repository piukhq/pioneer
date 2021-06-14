import React from 'react'
import { ReactComponent as PaymentAddSvg } from 'images/payment-add.svg'
import styles from './PaymentCardLimitAdd.module.scss'

const PaymentCardLimitAdd = ({ onClick }) => (
  <div className={styles.root} onClick={onClick}>
    <div className={styles.root__inner}>
      <PaymentAddSvg className={styles['root__payment-add-svg']} />
    </div>
  </div>
)

export default PaymentCardLimitAdd
