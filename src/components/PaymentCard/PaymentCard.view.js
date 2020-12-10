import React from 'react'
import cx from 'classnames'
import styles from './PaymentCard.module.scss'

const PaymentCardView = ({ last4Digits, nameOnCard, provider, className }) => (
  <div
    className={ cx(
      className,
      styles['payment-card'],
      styles[`payment-card--provider-${provider.replace(/\s+/g, '-').toLowerCase()}`],
    ) }
    data-testid='payment-card'
  >
    <div className={ styles['payment-card__name'] }>{nameOnCard}</div>
    <div className={ styles['payment-card__number'] }>
      <span className={ styles['payment-card__number-redacted'] }>••••</span>{' '}
      <span className={ styles['payment-card__number-digits'] }>{last4Digits}</span>
    </div>
  </div>
)

export default PaymentCardView
