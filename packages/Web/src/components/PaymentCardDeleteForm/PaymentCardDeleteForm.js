import React from 'react'
import Modal from 'components/Modal'
import Button from 'components/Button'
import TextInputGroup from 'components/Form/TextInputGroup'
import { usePaymentCardDeleteForm } from './hooks/usePaymentCardDeleteForm'

import styles from './PaymentCardDeleteForm.module.scss'
import { useMembershipCardDetailsByCardId } from 'hooks/useMembershipCardDetailsByCardId'

const PaymentCardDeleteForm = ({ paymentCardId, onClose, membershipCardId }) => {
  const {
    isCardExpired,
    isCardPending,
    error,
    loading,
    last4Digits,
    userEnteredLast4Digits,
    setUserEnteredLast4Digits,
    handleDelete,
    currency,
    isLastPaymentCard,
  } = usePaymentCardDeleteForm(paymentCardId, onClose, membershipCardId)

  const errorMessage = error ? 'There was an error' : null
  const { planName, planNameSuffix } = useMembershipCardDetailsByCardId(membershipCardId)

  return (
    <Modal onClose={onClose}>
      { isCardExpired ? (
        <>
          <Modal.Header>Card Expired</Modal.Header>
          <div className={styles.root__paragraph}>
            This credit/debit card has expired and can no longer be used to auto-collect points and rewards.
          </div>

          <Button
            data-testid='expired-card-submit-button'
            disabled={loading}
            tertiary
            className={styles.root__button}
            onClick={handleDelete}
            error={errorMessage}
          >Remove card</Button>
        </>
      ) : (
        <>
          <Modal.Header>Delete this card</Modal.Header>
          <div className={styles.root__paragraph}>
            Are you sure you want to delete the card ending in {last4Digits}? This cannot be undone.
          </div>
          {isCardPending ? (
            <div>We are currently processing your credit/debit card to automatically collect {currency}.</div>
          ) : (
          <div className={styles.root__paragraph}>
          Any {currency} that have not yet been awarded will be lost. If you have recently made a purchase using this card, make sure any {currency} have been added to your {planName} {planNameSuffix} before deleting.
          </div>
          )}
          { isLastPaymentCard && !isCardPending && (
            <div className={styles.root__paragraph}>You are about to delete your only active credit/debit card. This will mean you will not collect {planName} {currency}.</div>
          )}
          <div className={styles.root__paragraph}>Enter the last four digits of the card to confirm.</div>
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
            data-testid='submit-button'
            disabled={loading || last4Digits !== userEnteredLast4Digits}
            tertiary
            className={styles.root__button}
            onClick={handleDelete}
            error={errorMessage}
          >Remove card</Button>
        </>
      ) }
    </Modal>
  )
}

export default PaymentCardDeleteForm
