import React, { useState } from 'react'
import cx from 'classnames'

import { useMembershipCardStateById } from 'hooks/membershipCards'
import useMembershipCardDetailsByParams from 'hooks/useMembershipCardDetailsByParams'
import NonActiveVouchersModal from 'components/NonActiveVouchersModal'
import TransactionsModal from 'components/TransactionsModal'
import { ReactComponent as StateAuthorisedSvg } from 'images/state-authorised.svg'
import { ReactComponent as StateAuthorisedGreySvg } from 'images/state-authorised-grey.svg'
import { ReactComponent as StateFailedSvg } from 'images/state-failed.svg'
import { ReactComponent as StatePendingSvg } from 'images/state-pending.svg'

import { MEMBERSHIP_CARD_IMAGE_TYPES } from 'utils/enums'

import MembershipCardHeroImage from './components/MembershipCardHeroImage'
import styles from './MembershipCardRewardsHistory.module.scss'

const MembershipCardRewardsHistory = ({ membershipCard, addPaymentCardClickHandler = () => {} }) => {
  const imageUrl = membershipCard?.images?.filter(image => image.type === MEMBERSHIP_CARD_IMAGE_TYPES.HERO)?.[0]?.url
  const backgroundColor = membershipCard?.card?.colour
  const membershipId = membershipCard?.card?.membership_id
  const balance = membershipCard?.balances?.[0]

  const { payment_cards: paymentCards = [] } = membershipCard

  const { transactions, nonActiveVouchers } = useMembershipCardStateById(membershipCard?.id)
  const { planName, planNameSuffix } = useMembershipCardDetailsByParams()

  // possible states: authorised, failed, pending, suggested, unauthorised
  let state = membershipCard?.status?.state
  if (state === 'suggested' || state === 'unauthorised') {
    state = 'failed'
  } else if (paymentCards.length === 0) {
    state = 'no-payment-cards'
  }

  const [isNonActiveVouchersModalOpen, setNonActiveVouchersModalOpen] = useState(false)

  const [isTransactionsModalOpen, setTransactionsModalOpen] = useState(false)

  return (
    <section className={cx(
      styles.root,
      styles[`root--${state}`],
    )}>
      <MembershipCardHeroImage imageUrl={imageUrl} membershipId={membershipId} backgroundColor={backgroundColor} />

      { state === 'authorised' && (
        <>
          { transactions?.length > 0 ? (
            <>
              {/* todo: would there ever be an unhappy path ever where balance is missing? */}
              <div className={styles['root__transaction-history']} onClick={() => setTransactionsModalOpen(true)}>
                <StateAuthorisedSvg className={cx(styles['root__authorised-svg'], styles[`root__authorised-svg--${Config.theme}`])} />
                <div className={styles.root__subtitle}>{balance?.value} {balance?.suffix}</div>
                <div className={styles.root__explainer}>View history</div>
              </div>
              { isTransactionsModalOpen && (
                <TransactionsModal
                  membershipCardId={membershipCard?.id}
                  onClose={() => setTransactionsModalOpen(false)}
                />
              )}
            </>
          ) : (
            <div className={cx(styles['root__transaction-history'], styles['root__transaction-history--disabled'])}>
              <StateAuthorisedGreySvg />
              <div className={styles.root__subtitle}>{balance?.value} {balance?.suffix}</div>
              <div className={cx(styles.root__explainer, styles['root__explainer--desktop-only'])}>No transactions to show</div>
              <div className={cx(styles.root__explainer, styles['root__explainer--mobile-only'])}>Not available</div>
            </div>
          ) }
          { nonActiveVouchers?.length > 0 ? (
            <>
              <div className={styles['root__voucher-history']} onClick={() => setNonActiveVouchersModalOpen(true)}>
                <StateAuthorisedSvg className={cx(styles['root__authorised-svg'], styles[`root__authorised-svg--${Config.theme}`])} />
                <div className={cx(styles.root__subtitle, styles['root__subtitle--desktop-only'])}>Rewards history</div>
                <div className={cx(styles.root__subtitle, styles['root__subtitle--mobile-only'])}>History</div>
                <div className={cx(styles.root__explainer, styles['root__explainer--desktop-only'])}>See your past rewards</div>
                <div className={cx(styles.root__explainer, styles['root__explainer--mobile-only'])}>Past rewards</div>
              </div>
              { isNonActiveVouchersModalOpen && (
                <NonActiveVouchersModal
                  membershipCardId={membershipCard?.id}
                  onClose={() => setNonActiveVouchersModalOpen(false)}
                />
              )}
            </>

          ) : (
            <div className={cx(styles['root__voucher-history'], styles['root__voucher-history--disabled'])}>
              <StateAuthorisedGreySvg />
              <div className={cx(styles.root__subtitle, styles['root__subtitle--desktop-only'])}>Rewards history</div>
              <div className={cx(styles.root__subtitle, styles['root__subtitle--mobile-only'])}>History</div>
              <div className={cx(styles.root__explainer, styles['root__explainer--desktop-only'])}>No vouchers to show</div>
              <div className={cx(styles.root__explainer, styles['root__explainer--mobile-only'])}>Not available</div>
            </div>
          ) }
        </>
      ) }
      { state === 'no-payment-cards' && (
        <div className={styles['root__no-payment-card-state']} onClick={addPaymentCardClickHandler}>
        <StateFailedSvg />
        <div className={styles.root__subtitle}>Add a payment card</div>
        <div className={styles.root__explainer}>
          <p className={styles['root__explainer-paragraph']}>To collect rewards you need to add a payment card to your { planName } { planNameSuffix }.</p>
          <p className={styles['root__explainer-paragraph']}>Click here to get started.</p>
        </div>
      </div>
      ) }
      { state === 'failed' && (
        <>
          <div className={styles['root__failed-state']}>
            <StateFailedSvg />
            <div className={styles.root__subtitle}>Something's not right</div>
            <div className={styles.root__explainer}>
              <p className={styles['root__explainer-paragraph']}>There was a problem setting up your account.</p>
              <p className={styles['root__explainer-paragraph']}>We need some additional information to resolve this.</p>
              <p className={styles['root__explainer-paragraph']}>Click here to resolve.</p>
            </div>
          </div>
        </>
      ) }
      { state === 'pending' && (
        <>
          <div className={styles['root__pending-state']}>
            <StatePendingSvg />
            <div className={styles.root__subtitle}>Pending</div>
            <div className={styles.root__explainer}>
              <p className={styles['root__explainer-paragraph']}>We are getting everything ready for you.</p>
              <p className={styles['root__explainer-paragraph']}>
                You will need a payment card to start collecting rewards.
                This can be done alongside this process.
              </p>
            </div>
          </div>
        </>
      ) }
    </section>
  )
}

export default MembershipCardRewardsHistory
