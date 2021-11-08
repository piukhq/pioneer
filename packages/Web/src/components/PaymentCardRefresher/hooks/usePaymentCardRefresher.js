import { useCallback } from 'react'
import { useMembershipCardsDispatch } from 'hooks/membershipCards'
import { useGetPaymentCardsDispatch, usePaymentCardById } from 'hooks/paymentCards'
import useCardRefresher from 'hooks/useCardRefresher'

const usePaymentCardRefresher = (paymentCardId) => {
  const PENDING_STATE = 'pending'
  const { getMembershipCards } = useMembershipCardsDispatch()
  const paymentCard = usePaymentCardById(paymentCardId).card
  const { getPaymentCards, loading, resetPendingPaymentCard } = useGetPaymentCardsDispatch()
  const cardStatus = paymentCard?.status

  const handlePaymentCardStateChange = useCallback(
    async () => {
      // Refresh membership cards once payment card is no longer pending
      await getMembershipCards()
      resetPendingPaymentCard()
    },
    [getMembershipCards, resetPendingPaymentCard],
  )

  useCardRefresher(paymentCard, getPaymentCards, cardStatus, PENDING_STATE, loading, handlePaymentCardStateChange)
}

export default usePaymentCardRefresher
