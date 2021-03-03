import React from 'react'
import cx from 'classnames'
import { usePaymentCardById } from 'hooks/paymentCards'
import { ReactComponent as BinIconSvg } from 'images/bin-icon.svg'
import { ReactComponent as WarningSvg } from 'images/sign-warning.svg'
import { ReactComponent as ErrorSvg } from 'images/sign-error.svg'
import styles from './PaymentCard.module.scss'

const PaymentCard = ({ id, className, onClick, onDelete, expired, activating }) => {
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
        expired && styles['root--expired'],
        activating && styles['root--activating'],
      ) }
      data-testid='payment-card'
    >
      <div className={ styles.root__actions }>
        { onDelete && card && !expired && !activating && (
          <BinIconSvg
            onClick={(event) => { event.stopPropagation(); onDelete(card) }}
            className={ styles.root__delete }
          />
        ) }
        { expired && (
          <div className={ styles.root__status }>
            <ErrorSvg className={ styles['root__status-icon'] } /> <span>Expired</span>
          </div>
        ) }
        { activating && (
          <div className={ styles.root__status }>
            <WarningSvg className={ styles['root__status-icon'] } /> <span>Activating</span>
          </div>
        ) }
      </div>
      <div className={ styles.root__name }>{nameOnCard}</div>
      <div className={ styles.root__number }>
        <span className={ styles['root__number-redacted'] }>••••</span>{' '}
        <span className={ styles['root__number-digits'] }>{last4Digits}</span>
      </div>
    </div>
  )
}

export default PaymentCard
