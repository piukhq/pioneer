import React from 'react'
import Modal from 'components/Modal'
import cx from 'classnames'
import Button from 'components/Button'
import usePaymentCardAddForm from './hooks/usePaymentCardAddForm'

import styles from './PaymentCardAddForm.module.scss'

// todo: to rename this component to PaymentCardAddModal
const PaymentCardAddForm = ({ onClose }) => {
  const {
    formPhase,
    setFormPhase,
    fullName,
    setFullName,
    expiry,
    setExpiry,
    iframeLoaded,
    submitForm,
  } = usePaymentCardAddForm(onClose)
  return (
    <Modal onClose={formPhase === 1 ? onClose : undefined}>
      <div className={cx(formPhase !== 1 && styles['root__form-phase--hidden'])}>
        <Modal.Header>Add payment card</Modal.Header>
        Enter details below to add your payment card.

        <form className={styles.root}>
          <div className={styles.root__groups}>
            <div className={cx(styles.root__group, styles['root__number-group'])}>
              <label className={styles.root__label}>Card Number</label>
              <div id='bink-spreedly-number' className={styles.root__input} />
            </div>

            <label className={cx(styles.root__label, styles['root__label--hidden'])}>CVV</label>
            <div id='bink-spreedly-cvv' className={cx(styles.root__input, styles['root__input--hidden'])} />

            <div className={cx(styles.root__group, styles['root__expiry-group'])}>
              <label className={styles.root__label}>Expiry</label>
              <input
                value={expiry}
                onChange={event => setExpiry(event.target.value)}
                className={styles.root__input}
                placeholder='MM/YY'
              />
            </div>

            <div className={cx(styles.root__group, styles['root__name-group'])}>
              <label className={styles.root__label}>Name on card</label>
              <input
                value={fullName}
                onChange={event => setFullName(event.target.value)}
                className={styles.root__input}
                placeholder='Name on card'
              />
            </div>
          </div>

          <div className={styles['root__privacy-and-security']}>
            {/* todo: find out what the link should be and set it */}
            <a href='https://www.bink.com' target='_blank' rel='noreferrer'>Privacy and security</a>
          </div>

          <Button
            primary
            className={styles.root__button}
            onClick={(e) => {
              e.preventDefault()
              setFormPhase(2)
            }}
          >Next</Button>
        </form>
      </div>
      <div className={cx(formPhase !== 2 && styles['root__form-phase--hidden'])}>
        <Modal.Header>Terms & Conditions</Modal.Header>
        <p>
          I authorise Mastercard, Visa and American Express to monitor activity on my payment card to
          determine when I have made a qualifying transaction, and for Mastercard, Visa and American Express
          to share such transaction details with Bink to enable my card-linked offer(s) and target offers
          that may be of interest to me.
        </p>
        <p>
          For information about Bink’s privacy practices please see Bin’s Privacy Policy. You may opt-out
          of transaction monitoring on the payment card(s) you entered at any time by deleting your payment card
          from your Bink Wallet.
        </p>
        <Button primary className={styles.root__button} onClick={submitForm} disabled={!iframeLoaded}>I accept</Button>
        <Button secondary className={styles.root__button} onClick={() => setFormPhase(1)}>I decline</Button>
      </div>
    </Modal>
  )
}

export default PaymentCardAddForm
