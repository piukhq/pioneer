// TODO: This component uses a mix of local validation from usePaymentCardAddForm and useSpreedlyCardNumber which can easily cause bugs, consider rewriting both and this to make this component to simply responsibility (though a valid field needs to be reported back to usePaymentCardAddForm via redux store probably to enable the submit button)

import React from 'react'
import cx from 'classnames'
import useSpreedlyCardNumber from './hooks/useSpreedlyCardNumber'

import styles from './PaymentCardInputGroup.module.scss'

const PaymentCardInputGroup = ({ className, label, error, onChange, onBlur, onReady, placeholder, onValidation }) => {
  const { focus, length, handleLabelClick, errorMessage } = useSpreedlyCardNumber(placeholder, error, onChange, onBlur, onReady, onValidation)

  return (
    <div className={cx(
      className,
      styles.root,
      focus && styles['root--focus'],
      error && styles['root--error'],
    )}>
      <label
        className={cx(
          styles.root__label,
          errorMessage && styles['root__label--error'],
        )}
        onClick={ handleLabelClick }
      >{label}</label>
      <div className={cx(
        styles.root__input,
        errorMessage && error && styles['root__input--error'],
        focus && styles['root__input--focus'],
      )}>
        <div id='bink-spreedly-number' className={cx(
          styles['root__spreedly-container'],
          length === 0 && !error && styles['root__iframe-placeholder'],
          length === 0 && error && errorMessage && styles['root__iframe-placeholder--error'],
        )} />
      </div>
      { errorMessage && (
        <div className={styles.root__error}>
          { errorMessage }
        </div>
      )}
      <div className={styles.root__cvv}>
        <label>CVV</label>
        <div id='bink-spreedly-cvv' />
      </div>
    </div>
  )
}

export default PaymentCardInputGroup
