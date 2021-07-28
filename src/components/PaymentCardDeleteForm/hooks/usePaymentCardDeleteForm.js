import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions as paymentCardsActions } from 'ducks/paymentCards'
import { selectors as membershipCardsSelectors } from 'ducks/membershipCards'
import { useMembershipCardDetailsByCardId } from 'hooks/useMembershipCardDetailsByCardId'
import { isPaymentCardExpired, isPaymentCardPending } from 'utils/paymentCards'

export const usePaymentCardDeleteForm = (paymentCardId, onClose, membershipCardId) => {
  const { planName, planNameSuffix } = useMembershipCardDetailsByCardId()
  const card = useSelector(state => state.paymentCards.cards[paymentCardId])
  const last4Digits = card?.card?.last_four_digits

  const isCardExpired = isPaymentCardExpired(card)
  const isCardPending = isPaymentCardPending(card)

  const [userEnteredLast4Digits, setUserEnteredLast4Digits] = useState('')

  const dispatch = useDispatch()
  const loading = useSelector(state => state.paymentCards.delete.loading)
  const error = useSelector(state => state.paymentCards.delete.error)
  const success = useSelector(state => state.paymentCards.delete.success)

  const currency = useSelector(
    state => membershipCardsSelectors.currency(state, membershipCardId),
  )
  const linkedPaymentCards = useSelector(
    state => membershipCardsSelectors.linkedPaymentCards(state, membershipCardId),
  )
  const isLastPaymentCard = linkedPaymentCards.length === 1

  const handleDelete = useCallback(() => {
    dispatch(paymentCardsActions.deletePaymentCard(paymentCardId))
  }, [paymentCardId, dispatch])

  useEffect(() => {
    if (success) {
      dispatch(paymentCardsActions.deletePaymentCardResetSuccessStatus())
      onClose()
    }
  }, [success, dispatch, onClose])

  return {
    isCardExpired,
    isCardPending,
    error,
    loading,
    last4Digits,
    userEnteredLast4Digits,
    setUserEnteredLast4Digits,
    handleDelete,
    currency,
    planName,
    planNameSuffix,
    isLastPaymentCard,
  }
}
