import React from 'react'
import Modal from 'components/Modal'
import cx from 'classnames'
import Button from 'components/Button'
import SelectboxGroup from 'components/Form/SelectboxGroup'
import TextInputGroup from 'components/Form/TextInputGroup'
import { usePaymentCardAddForm } from './hooks/usePaymentCardAddForm'
import PaymentCardInputGroup from 'components/Form/PaymentCardInputGroup'
import { getExpiryDates } from 'utils/dates'
import styles from './PaymentCardAddForm.module.scss'

// todo: to rename this component to PaymentCardAddModal
const PaymentCardAddForm = ({ onClose }) => {
  const {
    fullName,
    fullNameError,
    isValidFullName,
    expiry,
    expiryError,
    handleExpiryChange,
    handleNameChange,
    handleNameBlur,
    cardNumberError,
    handleErrors,
    handleSuccess,
    genericSpreedlyError,
    genericBinkError,
    isLoading,
    spreedlyNumberValidation,
    isValidForm,
    submitForm,
  } = usePaymentCardAddForm(onClose)

  return (
    <Modal isLoading={isLoading}>
      <Modal.Header>Add credit/debit card</Modal.Header>
      <div className={styles.root__paragraph}>Enter details below to add your credit/debit card.</div>

      <form className={styles.root}>
        <div className={styles.root__groups}>
          <PaymentCardInputGroup
            className={styles['root__number-group']}
            onValidation={spreedlyNumberValidation}
            error={cardNumberError}
            handleErrors={handleErrors}
            handleSuccess={handleSuccess}
          />

          <SelectboxGroup
            data-testId='expiry-field'
            className={styles['root__expiry-group']}
            selectedValues={expiry}
            values={getExpiryDates()}
            onChange={handleExpiryChange}
            name='payment-card-expiry'
            label='Expiry'
            error={expiryError}
          />

          <TextInputGroup
            className={cx(styles.root__group, styles['root__name-group'])}
            label='Name on card'
            placeholder='Name on card'
            name='payment-card-cardholder-name'
            autoComplete='cc-name'
            value={fullName}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
            error={fullNameError}
            valid={isValidFullName}
          />
        </div>

        { (genericSpreedlyError || genericBinkError) && (
          <div className={styles['root__generic-error']}>
            {genericSpreedlyError || genericBinkError}
          </div>
        ) }

        <div className={styles['root__button-container']}>
          <Button
            data-testid='submit-button'
            primary
            className={styles.root__button}
            onClick={submitForm}
            disabled={!isValidForm() || isLoading}
            loading={isLoading}
          >
            Add credit/debit card
          </Button>
        </div>
        <a data-testid='bink-privacy-and-security' className={styles.root__url} href='https://bink.com/privacy-policy/' target='_blank' rel='noreferrer' >Bink Privacy and Security</a>
      </form>
    </Modal>
  )
}

export default PaymentCardAddForm
