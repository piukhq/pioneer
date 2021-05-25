import { useMembershipCardsDispatch, useMembershipCardsState } from 'hooks/membershipCards'
import { useCallback, useEffect, useState } from 'react'

const useLinkPaymentCard = (membershipCard, onSuccess, onError) => {
  const { linkPaymentCard } = useMembershipCardsDispatch()
  const [justFinishedLinkingPaymentCard, setJustFinishedLinkingPaymentCard] = useState(false)

  const { linkPaymentCard: { card: updatedCard, loading, error } } = useMembershipCardsState()

  useEffect(() => {
    if (justFinishedLinkingPaymentCard) {
      if (error) {
        onError && onError(updatedCard)
      } else if (updatedCard.status === 'pending') {
        onError && onError(updatedCard)
      } else if (updatedCard.status === 'active') {
        onSuccess && onSuccess()
      }

      setJustFinishedLinkingPaymentCard(false)
    }
  }, [justFinishedLinkingPaymentCard, error, updatedCard, onError, onSuccess])

  const linkCard = useCallback(
    async (paymentCard) => {
      setJustFinishedLinkingPaymentCard(false)
      await linkPaymentCard(paymentCard.id, membershipCard.id)
      setJustFinishedLinkingPaymentCard(true)
    },
    [membershipCard, linkPaymentCard],
  )

  return {
    loading,
    linkCard,
  }
}

export default useLinkPaymentCard
