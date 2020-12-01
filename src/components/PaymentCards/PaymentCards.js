import React, { useEffect } from 'react';

const PaymentCards = ({ paymentCards, getPaymentCards }) => {
  useEffect(() => {
    getPaymentCards();
  }, [getPaymentCards]);

  return (
    <div>
      {(paymentCards || []).map((card, index) => (
        <div key={index}>Card ending {card.card.last_four_digits}</div>
      ))}
    </div>
  )
}

export default PaymentCards;
