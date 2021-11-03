import { useMembershipCardsDispatch, useMembershipCardsState } from 'hooks/membershipCards'
import { useCallback, useEffect, useState } from 'react'

export const useLinkPaymentCard = (membershipCard, onSuccess, onError) => {
  const { linkPaymentCard } = useMembershipCardsDispatch()
  const [justFinishedLinkingPaymentCard, setJustFinishedLinkingPaymentCard] = useState(false)
  const [paymentCardToLink, setPaymentCardToLink] = useState(null)

  const { linkPaymentCard: { card: updatedCard, loading, error } } = useMembershipCardsState()

  useEffect(() => {
    if (justFinishedLinkingPaymentCard) {
      if (updatedCard?.status === 'active' && updatedCard?.membership_cards?.some(card => card.id === membershipCard.id)) {
        onSuccess && onSuccess()
      } else {
        onError && onError(paymentCardToLink)
      }
      setJustFinishedLinkingPaymentCard(false)
    }
  }, [justFinishedLinkingPaymentCard, membershipCard, paymentCardToLink, error, updatedCard, onError, onSuccess])

  const linkCard = useCallback(
    async (paymentCard) => {
      setPaymentCardToLink(paymentCard)
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

// export default useLinkPaymentCard
