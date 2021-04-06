import usePaymentCardRefresher from './hooks/usePaymentCardRefresher'

const PaymentCardRefresher = ({ paymentCardId }) => {
  usePaymentCardRefresher(paymentCardId)

  return null
}

export default PaymentCardRefresher
