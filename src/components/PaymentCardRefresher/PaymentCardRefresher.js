import usePaymentCardRefresher from './hooks/usePaymentCardRefresher'

// TODO: should be refactored into hook as a component is not appropriate here
const PaymentCardRefresher = ({ paymentCardId }) => {
  usePaymentCardRefresher(paymentCardId)

  return null
}

export default PaymentCardRefresher
