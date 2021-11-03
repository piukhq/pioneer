import React from 'react'
import { ReactComponent as PaymentAddSvg } from 'images/payment-add.svg'
import styles from './PaymentCardLimitAdd.module.scss'

const PaymentCardLimitAdd = ({ onClick }) => (
  <button className={styles.root} onClick={onClick}>
      <PaymentAddSvg />
  </button>
)

export default PaymentCardLimitAdd
