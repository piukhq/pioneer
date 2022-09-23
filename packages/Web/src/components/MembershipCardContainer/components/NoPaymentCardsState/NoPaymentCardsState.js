import React, { useCallback } from 'react'
import cx from 'classnames'
import { useMembershipCardDetailsByCardId } from 'hooks/useMembershipCardDetailsByCardId'
import { useModals } from 'hooks/useModals'
import { MODAL_ACTION_TYPES as modalEnum } from 'utils/enums'
import StateFailedSvg from 'images/state-failed.svg'

import styles from './NoPaymentCardsState.module.scss'

const NoPaymentCardsState = ({ membershipCardId, state }) => {
  const { planName } = useMembershipCardDetailsByCardId(membershipCardId)
  const { dispatchModal } = useModals()
  const handleNoPaymentCardsClick = useCallback(() => dispatchModal(modalEnum.PAYMENT_CARD_ADD_FORM), [dispatchModal])

  return (
    <div data-testid='no-payment-cards' onClick={handleNoPaymentCardsClick}
      className={cx(
        styles['root__no-payment-card-state'],
        styles['root__click-event-enabled'],
      )}
    >
      <StateFailedSvg key={state} />
      <div className={styles.root__subtitle}>Add a credit/debit card</div>
      <div className={styles.root__explainer}>
        <div className={styles['root__explainer-paragraph']}>To collect rewards you need to add a credit/debit card to {planName}.</div>
        <div>Click here to get started.</div>
      </div>
    </div>
  )
}

export default NoPaymentCardsState
