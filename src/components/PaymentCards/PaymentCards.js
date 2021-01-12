import React from 'react'

import styles from './PaymentCards.module.scss'

const PaymentCards = ({ children }) => {
  return (
    <div className={styles.root}>
      {children}
    </div>
  )
}

export default PaymentCards
