import React from 'react'
import PaymentAddSvg from 'images/payment-add.svg'
import styles from './PaymentCardAdd.module.scss'

const PaymentCardAdd = ({ onClick }) => (
  <button className={styles.root} onClick={onClick}>
    <PaymentAddSvg />
  </button>
)

export default PaymentCardAdd
