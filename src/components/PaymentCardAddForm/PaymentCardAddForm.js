import React, { useEffect, useState } from 'react'
import Modal from 'components/Modal'
import cx from 'classnames'
import { actions as paymentCardsActions } from 'ducks/paymentCards'
import styles from './PaymentCardAddForm.module.scss'
import { useSelector, useDispatch } from 'react-redux'

const PaymentCardAddForm = ({ onClose }) => {
  const [token, setToken] = useState('')
  const [fullName, setFullName] = useState('')
  const [expiry, setExpiry] = useState('')
  const [fingerprint, setFingerprint] = useState('')
  const [iframeLoaded, setIframeLoaded] = useState(false)

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
    <Modal onClose={onClose}>
      <Modal.Header>Add payment card</Modal.Header>
      Enter details below to add your payment card.

      <form className={styles['payment-card-add-form']}>
        <label className={styles['payment-card-add-form__label']}>Card Number</label>
        <div id='bink-spreedly-number' className={styles['payment-card-add-form__input']} />

        <label className={cx(styles['payment-card-add-form__label'], styles['payment-card-add-form__label--hidden'])}>CVV</label>
        <div id='bink-spreedly-cvv' className={cx(styles['payment-card-add-form__input'], styles['payment-card-add-form__input--hidden'])} />

        <label className={styles['payment-card-add-form__label']}>Expiry</label>
        <input
          value={expiry}
          onChange={event => setExpiry(event.target.value)}
          className={styles['payment-card-add-form__input']}
          placeholder='MM/YY'
        />

        <label className={styles['payment-card-add-form__label']}>Name on card</label>
        <input
          value={fullName}
          onChange={event => setFullName(event.target.value)}
          className={styles['payment-card-add-form__input']}
          placeholder='Name on card'
        />

        <div>
          {/* todo: find out what the link should be and set it */}
          <a href='https://www.bink.com' target='_blank' rel='noreferrer'>Privacy and security</a>
        </div>

        <button onClick={submitForm} disabled={!iframeLoaded}>Next</button>

        <div className={styles['payment-card-add-form__info']}>
          token:
          <span>{token}</span>
          <br/>
          fingerprint:
          <span>{fingerprint}</span>
        </div>
      </form>
    </Modal>
  )
}

export default PaymentCardAddForm
