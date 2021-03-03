import React from 'react'
import cx from 'classnames'
import { usePaymentCardById } from 'hooks/paymentCards'
import { ReactComponent as BinIconSvg } from 'images/bin-icon.svg'
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
        <BinIconSvg
          onClick={(event) => { event.stopPropagation(); onDelete(card) }}
          className={ styles.root__delete }
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
