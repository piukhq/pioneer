import usePaymentCardRefresher from './hooks/usePaymentCardRefresher'

// Note: This must be a component in order to side step the 'no if statements areound hooks' caveat
const PaymentCardRefresher = ({ paymentCardId }) => {
  usePaymentCardRefresher(paymentCardId)

  return null
}

export default PaymentCardRefresher
