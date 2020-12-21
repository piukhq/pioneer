import React from 'react'
import { useSelector } from 'react-redux'
import cx from 'classnames'
import styles from './PaymentCard.module.scss'

const PaymentCard = ({ id, className }) => {
  const card = useSelector(state => state.paymentCards.cards[id])
  const provider = card?.card?.provider || ''
  const nameOnCard = card?.card?.name_on_card
  const last4Digits = card?.card?.last_four_digits

  return (
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
}

export default PaymentCard
