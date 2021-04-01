// import React from 'react'
import useCardRefresher from '../../hooks/useCardRefresher'
import { useGetPaymentCardsDispatch, usePaymentCardById } from '../../hooks/paymentCards'

const PaymentCardRefresher = ({ newPaymentCardId }) => {
  const PENDING_STATE = 'pending'
  const LOADING_STATE = false
  const { getPaymentCards } = useGetPaymentCardsDispatch()
  const paymentCard = usePaymentCardById(newPaymentCardId).card
  const cardStatus = paymentCard?.status

  useCardRefresher(paymentCard, getPaymentCards, cardStatus, PENDING_STATE, LOADING_STATE)

  return null
}

export default PaymentCardRefresher
