import React from 'react'
import Modal from 'components/Modal'
import Button from 'components/Button'
import TextInputGroup from 'components/Form/TextInputGroup'
import usePaymentCardDeleteForm from './hooks/usePaymentCardDeleteForm'

import styles from './PaymentCardDeleteForm.module.scss'

const PaymentCardDeleteForm = ({ paymentCardId, onClose, membershipCardId }) => {
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
  } = usePaymentCardDeleteForm(paymentCardId, onClose, membershipCardId)

  return (
    <Modal onClose={onClose}>
      { isCardExpired ? (
        <>
          <Modal.Header>Card Expired</Modal.Header>
          <p className={styles.root__paragraph}>
            This payment card has expired and can no longer be used to auto-collect points and rewards.
          </p>
          {/* todo: Check with Jack refine handling of error */}
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
          <p className={styles.root__paragraph}>
            Are you sure you want to delete the card ending in {last4Digits}? This cannot be undone.
          </p>
          <p className={styles.root__paragraph}>
            Any stamps that have not yet been redeemed will be lost. If you have recently transacted, be sure any stamps have been received.
          </p>
          { isLastPaymentCard && (
            <p className={styles.root__paragraph}>You are about to delete your only active payment card. Doing so will mean you will not automatically collect {membershipPlanName} {membershipCardCurrency}</p>
          )}
          <p className={styles.root__paragraph}>Enter the last four digits of the card to confirm.</p>
          <TextInputGroup
            label='Last four digits'
            placeholder='Last four digits'
            name='last-four-digits'
            value={userEnteredLast4Digits}
            maxLength={4}
            onChange={(event) => { setUserEnteredLast4Digits(event.target.value) }}
            className={styles.root__input}
          />
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
