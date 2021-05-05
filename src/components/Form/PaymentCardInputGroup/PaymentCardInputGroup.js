import React from 'react'
import cx from 'classnames'
import useSpreedlyCardNumber from './hooks/useSpreedlyCardNumber'

import styles from './PaymentCardInputGroup.module.scss'

const PaymentCardInputGroup = ({ className, error, onChange, onBlur, onReady }) => {
  const { focus, length } = useSpreedlyCardNumber(error, onChange, onBlur, onReady)

  return (
    <div className={cx(
      className,
      styles.root,
      focus && styles['root--focus'],
      error && styles['root--error'],
    )}>
      <label className={cx(
        styles.root__label,
        error && styles['root__label--error'],
      )}>Card number</label>
      <div className={cx(
        styles.root__input,
        error && styles['root__input--error'],
        focus && styles['root__input--focus'],
      )}>
        <div id='bink-spreedly-number' className={cx(
          length === 0 && styles['root__iframe-placeholder'],
          length === 0 && error && styles['root__iframe-placeholder--error'],
        )} />
      </div>
      <div className={styles.root__error}>
        { error || <>&nbsp;</> }
      </div>
      <div className={styles.root__cvv}>
        <label>CVV</label>
        <div id='bink-spreedly-cvv' />
      </div>
    </div>
  )
}

export default PaymentCardInputGroup
