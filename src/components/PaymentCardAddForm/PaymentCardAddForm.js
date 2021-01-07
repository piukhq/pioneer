import React, { useEffect, useState } from 'react'
import Modal from 'components/Modal'
import cx from 'classnames'
import { actions as paymentCardsActions } from 'ducks/paymentCards'
import Button from 'components/Button'
import styles from './PaymentCardAddForm.module.scss'
import { useSelector, useDispatch } from 'react-redux'

// todo: to rename this component to PaymentCardAddModal
const PaymentCardAddForm = ({ onClose }) => {
  const [token, setToken] = useState('')
  const [fullName, setFullName] = useState('')
  const [expiry, setExpiry] = useState('')
  const [fingerprint, setFingerprint] = useState('')
  const [iframeLoaded, setIframeLoaded] = useState(false)

  const [formPhase, setFormPhase] = useState(1)

  const addPaymentCardSuccess = useSelector(state => state.paymentCards.add.success)

  const dispatch = useDispatch()

  useEffect(() => {
    if (addPaymentCardSuccess) {
      onClose()
    }
  }, [addPaymentCardSuccess, onClose])

  useEffect(() => {
    return () => dispatch(paymentCardsActions.addPaymentCardReset())
  }, [dispatch])

  useEffect(() => {
    const Spreedly = window.Spreedly

    Spreedly.on('ready', function () {
      Spreedly.setStyle('number', 'width: 100%; font-size: 16px; line-height: 23px; box-sizing: border-box')
      Spreedly.setPlaceholder('number', 'Card number')
      Spreedly.setNumberFormat('prettyFormat')
      setIframeLoaded(true)
    })

    Spreedly.on('paymentMethod', async function (token, pmData) {
      setToken(token)
      setFingerprint(pmData.fingerprint)

      await dispatch(paymentCardsActions.addPaymentCard(
        token,
        pmData.last_four_digits,
        pmData.first_six_digits,
        pmData.month,
        pmData.year,
        pmData.country,
        pmData.currency_code,
        pmData.full_name,
        pmData.card_type,
        pmData.payment_method_type,
        pmData.fingerprint,
      ))
    })

    Spreedly.on('errors', function (errors) {
      for (let i = 0; i < errors.length; i++) {
        const error = errors[i]
        console.log(error)
      }

      setToken('error')
    })

    Spreedly.init('Yc7xn3gDP73PPOQLEB2BYpv31EV', {
      numberEl: 'bink-spreedly-number',
      cvvEl: 'bink-spreedly-cvv',
    })

    return () => {
      Spreedly.removeHandlers()
    }
  }, [dispatch])

  const submitForm = (event) => {
    event.preventDefault()

    const Spreedly = window.Spreedly
    const [, month, year] = expiry.match(/^\s*(\d+)\/(\d+)\s*$/) || []

    setToken('')
    setFingerprint('')
    Spreedly.tokenizeCreditCard({
      month,
      year: `20${year}`,
      full_name: fullName,
    })
    return false
  }

  return (
    <Modal onClose={formPhase === 1 && onClose}>
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
