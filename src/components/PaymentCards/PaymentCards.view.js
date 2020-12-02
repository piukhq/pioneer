import React, { useEffect } from 'react'

const PaymentCardsView = ({ paymentCards, getPaymentCards }) => {
  useEffect(() => {
    getPaymentCards()
  }, [getPaymentCards])

  return (
    <div>
      {(paymentCards || []).map((card, index) => (
        <div key={index}>Card ending {card.card.last_four_digits}</div>
      ))}
    </div>
  )
}

export default PaymentCardsView
