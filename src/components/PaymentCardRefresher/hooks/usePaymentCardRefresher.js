// import React from 'react'
import { useMembershipCardsDispatch } from 'hooks/membershipCards'
import { useGetPaymentCardsDispatch, usePaymentCardById } from 'hooks/paymentCards'
import useCardRefresher from 'hooks/useCardRefresher'

const usePaymentCardRefresher = (paymentCardId) => {
  const PENDING_STATE = 'pending'
  const { getMembershipPlans } = useMembershipCardsDispatch()
  const paymentCard = usePaymentCardById(paymentCardId).card
  const { getPaymentCards, loading, resetPendingPaymentCard } = useGetPaymentCardsDispatch()
  const cardStatus = paymentCard?.status

  const handlePaymentCardPendingCompletion = () => {
    resetPendingPaymentCard()
    // Refresh membership cards once payment card is no longer pending
    getMembershipPlans()
  }

  useCardRefresher(paymentCard, getPaymentCards, cardStatus, PENDING_STATE, loading, handlePaymentCardPendingCompletion)
}

export default usePaymentCardRefresher
