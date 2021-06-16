import React from 'react'
import Modal from 'components/Modal'
import cx from 'classnames'
import Button from 'components/Button'
import SelectboxGroup from 'components/Form/SelectboxGroup'
import TextInputGroup from 'components/Form/TextInputGroup'
import usePaymentCardAddForm from './hooks/usePaymentCardAddForm'
import Loading3 from 'components/Loading3'
import PaymentCardInputGroup from 'components/Form/PaymentCardInputGroup'
import { getExpiryDates } from 'utils/dates'
import styles from './PaymentCardAddForm.module.scss'

// todo: to rename this component to PaymentCardAddModal
const PaymentCardAddForm = ({ onClose }) => {
  const {
    fullName,
    fullNameError,
    handleExpiryChange,
    handleNameChange,
    handleNameBlur,
    cardNumberError,
    handlePaymentCardChange,
    handlePaymentCardBlur,
    genericSpreedlyError,
    genericBinkError,
    isPaymentFormValid,
    isLoading,
    submitForm,
  } = usePaymentCardAddForm(onClose)

  return (
    <Modal onClose={onClose} isLoading={isLoading}>
      <Modal.Header>Add payment card</Modal.Header>
      <p className={styles.root__paragraph}>Enter details below to add your payment card.</p>

      <form className={styles.root}>
        <div className={styles.root__groups}>
          <PaymentCardInputGroup
            className={styles['root__number-group']}
            label='Card number'
            placeholder='Card number'
            error={cardNumberError}
            onChange={handlePaymentCardChange}
            onBlur={handlePaymentCardBlur}
          />

          <SelectboxGroup
            className={styles['root__expiry-group']}
            values={getExpiryDates()}
            onChange={handleExpiryChange}
            name='payment-card-expiry'
            label='Expiry'
          />

          <TextInputGroup
            className={cx(styles.root__group, styles['root__name-group'])}
            label='Name on card'
            placeholder='Name on card'
            name='payment-card-cardholder-name'
            value={fullName}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
            error={fullNameError}
          />
        </div>

        <div className={styles['root__privacy-and-terms']}>
          <a className={styles.root__url} href='https://bink.com/privacy-policy/' target='_blank' rel='noreferrer'>Privacy and security</a>
          <a className={styles.root__url} href='https://bink.com/terms-and-conditions/' target='_blank' rel='noreferrer'>Terms and conditions</a>
        </div>

        { (genericSpreedlyError || genericBinkError) && (
          <div className={styles['root__generic-error']}>
            {genericSpreedlyError || genericBinkError}
          </div>
        ) }

        <div className={styles['root__button-container']}>
          <Button
            primary
            className={styles.root__button}
            onClick={submitForm}
            disabled={!isPaymentFormValid() || isLoading}
          >
            {isLoading ? <Loading3 /> : 'Add Payment Card'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default PaymentCardAddForm
