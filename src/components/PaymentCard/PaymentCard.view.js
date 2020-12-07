import React from 'react'
import cx from 'classnames'
import styles from './PaymentCard.module.scss'

const PaymentCardView = ({ last4Digits, nameOnCard, provider, className }) => (
  <div
    className={ cx(
      className,
      styles['payment-card'],
      styles[`payment-card--provider-${provider.toLowerCase()}`],
    ) }
    data-testid='payment-card'
  >
    <div className={ styles['payment-card__ratio-wrapper-1'] }>
      <div className={ styles['payment-card__ratio-wrapper-2'] }>
        <div className={ styles['payment-card__provider'] }>{provider}</div>
        <div className={ styles['payment-card__name'] }>{nameOnCard}</div>
        <div className={ styles['payment-card__number'] }>**** **** **** {last4Digits}</div>
      </div>
    </div>
  </div>
)

export default PaymentCardView
