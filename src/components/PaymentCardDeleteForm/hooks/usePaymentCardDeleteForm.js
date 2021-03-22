import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions as paymentCardsActions } from 'ducks/paymentCards'
import { isPaymentCardExpired } from 'utils/paymentCards'

const usePaymentCardDeleteForm = (id, onClose) => {
  const card = useSelector(state => state.paymentCards.cards[id])
  const last4Digits = card?.card?.last_four_digits

  const isCardExpired = isPaymentCardExpired(card)

  const [userEnteredLast4Digits, setUserEnteredLast4Digits] = useState('')

  const dispatch = useDispatch()
  const loading = useSelector(state => state.paymentCards.delete.loading)
  const error = useSelector(state => state.paymentCards.delete.error)
  const success = useSelector(state => state.paymentCards.delete.success)

  const handleDelete = useCallback(() => {
    dispatch(paymentCardsActions.deletePaymentCard(id))
  }, [id, dispatch])

  useEffect(() => {
    if (success) {
      dispatch(paymentCardsActions.deletePaymentCardResetSuccessStatus())
      onClose()
    }
  }, [success, dispatch, onClose])

  return {
    isCardExpired,
    error,
    loading,
    last4Digits,
    userEnteredLast4Digits,
    setUserEnteredLast4Digits,
    handleDelete,
  }
}

export default usePaymentCardDeleteForm
