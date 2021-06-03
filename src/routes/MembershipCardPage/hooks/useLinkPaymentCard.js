import { useMembershipCardsDispatch, useMembershipCardsState } from 'hooks/membershipCards'
import { useCallback, useEffect, useState } from 'react'

const useLinkPaymentCard = (membershipCard, onSuccess, onError) => {
  const { linkPaymentCard } = useMembershipCardsDispatch()
  const [justFinishedLinkingPaymentCard, setJustFinishedLinkingPaymentCard] = useState(false)
  const [linkingPaymentCard, setLinkingPaymentCard] = useState(null)

  const { linkPaymentCard: { loading, error } } = useMembershipCardsState()

  useEffect(() => {
    if (justFinishedLinkingPaymentCard) {
      if ((error || linkingPaymentCard.status === 'pending') && onError) {
        onError(linkingPaymentCard)
      } else if (linkingPaymentCard.status === 'active' && onSuccess) {
        onSuccess()
      }
      setJustFinishedLinkingPaymentCard(false)
    }
  }, [justFinishedLinkingPaymentCard, error, linkingPaymentCard, onError, onSuccess])

  const linkCard = useCallback(
    async (paymentCard) => {
      setJustFinishedLinkingPaymentCard(false)
      await linkPaymentCard(paymentCard.id, membershipCard.id)
      setLinkingPaymentCard(paymentCard)
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
