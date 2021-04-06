// import React from 'react'
import useCardRefresher from 'hooks/useCardRefresher'
import { useGetPaymentCardsDispatch, usePaymentCardById } from 'hooks/paymentCards'

const usePaymentCardRefresher = (paymentCardId) => {
  const PENDING_STATE = 'pending'
  const paymentCard = usePaymentCardById(paymentCardId).card
  const { getPaymentCards, loading } = useGetPaymentCardsDispatch()
  const cardStatus = paymentCard?.status

  useCardRefresher(paymentCard, getPaymentCards, cardStatus, PENDING_STATE, loading)
}

export default usePaymentCardRefresher
