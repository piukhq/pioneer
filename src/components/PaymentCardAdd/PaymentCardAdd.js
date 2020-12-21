import React from 'react'

import styles from './PaymentCardAdd.module.scss'

const PaymentCardAdd = ({ onClick }) => (
  <div className={styles['payment-card-add']} onClick={onClick}>
    <div className={styles['payment-card-add__border']}>
      <div className={styles['payment-card-add__inner']}>
      </div>
    </div>
  </div>
)

export default PaymentCardAdd
