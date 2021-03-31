import React from 'react'
import Modal from 'components/Modal'
import Button from 'components/Button'

import styles from './PaymentCardDeleteForm.module.scss'
import usePaymentCardDeleteForm from './hooks/usePaymentCardDeleteForm'

const PaymentCardDeleteForm = ({ id, onClose, membershipCardId }) => {
  const {
    isCardExpired,
    error,
    loading,
    last4Digits,
    userEnteredLast4Digits,
    setUserEnteredLast4Digits,
    handleDelete,
    membershipCardCurrency,
    membershipPlanName,
    isLastPaymentCard,
  } = usePaymentCardDeleteForm(id, onClose, membershipCardId)

  return (
    <Modal onClose={onClose}>
      { isCardExpired ? (
        <>
          <Modal.Header>Card Expired</Modal.Header>
          <p className={styles.root__message}>
            This payment card has expired and can no longer be used to auto-collect points and rewards.
          </p>
          {/* todo: refine handling of error */}
          { error && (
            <div className={styles.root__error}>
              There was an error
            </div>
          ) }
          <Button disabled={loading} primary className={styles.root__button} onClick={handleDelete}>Remove card</Button>
        </>
      ) : (
        <>
          <Modal.Header>Delete this card</Modal.Header>
          <p>
            Are you sure you want to delete the card ending in {last4Digits}? This cannot be undone.
          </p>
          { isLastPaymentCard && (
            <p>You are about to delete your only active payment card. Doing so will mean you will not automatically collect {membershipPlanName} {membershipCardCurrency}</p>
          )}
          <p>Enter the last four digits of the card to confirm.</p>
          <div className={styles.root__group}>
            <label className={styles.root__label}>Last four digits</label>
            <input
              placeholder='Last four digits'
              className={styles.root__input}
              value={userEnteredLast4Digits}
              onChange={(event) => { setUserEnteredLast4Digits(event.target.value) }}
            />
          </div>
          { error && (
            <div className={styles.root__error}>
              There was an error
            </div>
          ) }
          <Button
            disabled={loading || last4Digits !== userEnteredLast4Digits}
            tertiary
            className={styles.root__button}
            onClick={handleDelete}
          >Remove card</Button>
        </>
      ) }
    </Modal>
  )
}

export default PaymentCardDeleteForm
