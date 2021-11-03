import React from 'react'
import cx from 'classnames'
import useSpreedly from 'hooks/useSpreedly'

import styles from './PaymentCardInputGroup.module.scss'

const PaymentCardInputGroup = ({ className, error, onValidation, handleErrors, handleSuccess }) => {
  const { focus, length, handleLabelClick, errorMessage } = useSpreedly(onValidation, handleErrors, handleSuccess)

  return (
    <div className={cx(
      className,
      styles.root,
      focus && styles['root--focus'],
      (error || errorMessage) && styles['root--error'],
    )}>
      <label
        className={cx(
          styles.root__label,
          (error || errorMessage) && styles['root__label--error'],
        )}
        onClick={ handleLabelClick }
      >Card number</label>
      <div className={cx(
        styles.root__input,
        (error || errorMessage) && styles['root__input--error'],
        focus && styles['root__input--focus'],
      )}>
        <div id='bink-spreedly-number' className={cx(
          styles['root__spreedly-container'],
          length === 0 && styles['root__iframe-placeholder'],
          length === 0 && (error || errorMessage) && styles['root__iframe-placeholder--error'],
        )} />
      </div>
      { (error || errorMessage) && (
        <div className={styles.root__error}>
          { error || errorMessage }
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
