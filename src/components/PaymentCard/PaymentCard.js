import React from 'react'
import cx from 'classnames'
import { usePaymentCardById } from 'hooks/paymentCards'
// todo: this image is temporary (added by dev) and might need to be updated when asset/design is provided
import binIconImage from 'images/bin-icon.png'
import styles from './PaymentCard.module.scss'

const PaymentCard = ({ id, className, onClick, onDelete }) => {
  const { card } = usePaymentCardById(id)
  const provider = card?.card?.provider || ''
  const nameOnCard = card?.card?.name_on_card
  const last4Digits = card?.card?.last_four_digits

  return (
    <div
      onClick={() => onClick && onClick(card)}
      className={ cx(
        className,
        styles.root,
        styles[`root--provider-${provider.replace(/\s+/g, '-').toLowerCase()}`],
      ) }
      data-testid='payment-card'
    >
      { onDelete && card && (
        <img
          alt='Delete payment card'
          title='Delete payment card'
          onClick={(event) => { event.stopPropagation(); onDelete(card) }}
          className={ styles.root__delete }
          src={binIconImage}
        />
      ) }
      <div className={ styles.root__name }>{nameOnCard}</div>
      <div className={ styles.root__number }>
        <span className={ styles['root__number-redacted'] }>••••</span>{' '}
        <span className={ styles['root__number-digits'] }>{last4Digits}</span>
      </div>
    </div>
  )
}

export default PaymentCard
