import React from 'react'
import Modal from 'components/Modal'
import cx from 'classnames'
import Button from 'components/Button'
import TextInputGroup from 'components/Form/TextInputGroup'
import usePaymentCardAddForm from './hooks/usePaymentCardAddForm'
import styles from './PaymentCardAddForm.module.scss'

// todo: to rename this component to PaymentCardAddModal
const PaymentCardAddForm = ({ onClose }) => {
  const {
    fullName,
    setFullName,
    expiry,
    setExpiry,
    invalidNameField,
    invalidExpiryField,
    checkForInvalidExpiry,
    checkForInvalidName,
    isPaymentFormValid,
    submitForm,
  } = usePaymentCardAddForm(onClose)
  return (
    <Modal onClose={onClose}>
      <Modal.Header>Add payment card</Modal.Header>
      <p className={styles['root__sub-header']}>Enter details below to add your payment card.</p>

      <form className={styles.root}>
        <div className={styles.root__groups}>
          <div className={cx(styles.root__group, styles['root__number-group'])}>
            <label className={styles.root__label}>Card number</label>
            <div id='bink-spreedly-number' className={styles.root__input} />
          </div>

          <label className={cx(styles.root__label, styles['root__label--hidden'])}>CVV</label>
          <div id='bink-spreedly-cvv' className={cx(styles.root__input, styles['root__input--hidden'])} />

          <TextInputGroup
            className={cx(styles.root__group, styles['root__expiry-group'])}
            label='Expiry'
            placeholder='MM/YY'
            value={expiry}
            onChange={event => setExpiry(event.target.value)}
            onBlur={checkForInvalidExpiry}
            error={invalidExpiryField && 'Invalid expiry'}
          />

          <TextInputGroup
            className={cx(styles.root__group, styles['root__name-group'])}
            label='Name on card'
            placeholder='Name on card'
            value={fullName}
            onChange={event => setFullName(event.target.value)}
            onBlur={checkForInvalidName}
            error={invalidNameField && 'Invalid name'}
          />
        </div>

        <div className={styles['root__privacy-and-terms']}>
          <a href='https://bink.com/privacy-policy/' target='_blank' rel='noreferrer'>Privacy and security</a>
          <a href='https://bink.com/terms-and-conditions/' target='_blank' rel='noreferrer'>Terms and conditions</a>
        </div>

        <Button
          primary
          className={styles.root__button}
          onClick={(e) => {
            e.preventDefault()
            submitForm()
          }}
          disabled={!isPaymentFormValid()}
        >Add Payment Card</Button>
      </form>
    </Modal>
  )
}

export default PaymentCardAddForm
