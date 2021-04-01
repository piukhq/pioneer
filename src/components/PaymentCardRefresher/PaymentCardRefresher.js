// import React from 'react'
import useCardRefresher from '../../hooks/useCardRefresher'
import { useGetPaymentCardsDispatch, usePaymentCardById } from '../../hooks/paymentCards'

const PaymentCardRefresher = ({ paymentCardId }) => {
  const PENDING_STATE = 'pending'
  const LOADING_STATE = false
  const paymentCard = usePaymentCardById(paymentCardId).card
  const { getPaymentCards } = useGetPaymentCardsDispatch()
  const cardStatus = paymentCard?.status

  useCardRefresher(paymentCard, getPaymentCards, cardStatus, PENDING_STATE, LOADING_STATE)

  return null
}

export default PaymentCardRefresher
