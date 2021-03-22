import React from 'react'

import styles from './PaymentCardAdd.module.scss'

const PaymentCardAdd = ({ onClick }) => (
  <div className={styles.root} onClick={onClick}>
    <div className={styles.root__border}>
      <div className={styles.root__inner}>
      </div>
    </div>
  </div>
)

export default PaymentCardAdd
