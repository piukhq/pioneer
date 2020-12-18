import React, { useEffect } from 'react'

import PaymentCard from 'components/PaymentCard'
import styles from './PaymentCards.module.scss'

const PaymentCards = ({ children }) => {
  return (
    <div className={styles['payment-cards']}>
      {children}
    </div>
  )
}

export default PaymentCards
