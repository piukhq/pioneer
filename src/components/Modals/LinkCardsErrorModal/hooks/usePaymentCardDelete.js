import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions as paymentCardsActions } from 'ducks/paymentCards'

const usePaymentCardDelete = (paymentCardId, onClose) => {
  const dispatch = useDispatch()

  const loading = useSelector(state => state.paymentCards.delete.loading)
  const error = useSelector(state => state.paymentCards.delete.error)
  const success = useSelector(state => state.paymentCards.delete.success)

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
    error,
    loading,
    handleDelete,
  }
}

export default usePaymentCardDelete
