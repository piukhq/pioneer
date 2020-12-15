import React, { useEffect } from 'react'

import PaymentCard from 'components/PaymentCard'
import styles from './PaymentCards.module.scss'

const PaymentCardsView = ({ paymentCards, getPaymentCards, error, onError }) => {
  useEffect(() => {
    getPaymentCards()
  }, [getPaymentCards])

  useEffect(() => {
    error && onError && onError(error)
  }, [error, onError])

  return (
    <div className={styles['payment-cards']}>
      {(paymentCards || []).map((card, index) => (
        <PaymentCard
          key={ card.id }
          last4Digits={ card.card.last_four_digits }
          nameOnCard={ card.card.name_on_card }
          provider={ card.card.provider }
        />
      ))}
    </div>
  )
}

export default PaymentCardsView
