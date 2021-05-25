import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions as paymentCardsActions } from 'ducks/paymentCards'
import { selectors as membershipCardsSelectors } from 'ducks/membershipCards'
import useContactSupport from 'hooks/useContactSupport'
import Modal from 'components/Modal'
import Button from 'components/Button'

import styles from './LinkedCardsErrorModal.module.scss'

const LinkCardsErrorModal = ({ onClose, paymentCardId }) => {
  const { contactSupport } = useContactSupport()
  const dispatch = useDispatch()
  const loading = useSelector(state => state.paymentCards.delete.loading)
  const error = useSelector(state => state.paymentCards.delete.error)
  const success = useSelector(state => state.paymentCards.delete.success)

  console.log(paymentCardId)
  const handleDelete = useCallback(() => {
    dispatch(paymentCardsActions.deletePaymentCard(paymentCardId))
  }, [paymentCardId, dispatch])

  useEffect(() => {
    if (success) {
      dispatch(paymentCardsActions.deletePaymentCardResetSuccessStatus())
      onClose()
    }
  }, [success, dispatch, onClose])

  return (
  <Modal onClose={onClose}>
    <Modal.Header>Card cannot be linked</Modal.Header>
    <p className={styles.root__paragraph}>
      Your credit/debit card cannot be linked to your {Config.planTitle} card. This usually happens when you have already linked it to a different {Config.planTitle} card.
    </p>
    {/* todo: consider replacing button with link tag to match its functionality */}
    <Button className={styles.root__button} onClick={handleDelete}>Delete credit/debit card</Button>
    { error && (
      <div className={styles.root__error}>
        There was an error
      </div>
    )}
    <Button onClick={contactSupport} secondary className={styles.root__button}>Contact Support</Button>
  </Modal>
  )
}

export default LinkCardsErrorModal
