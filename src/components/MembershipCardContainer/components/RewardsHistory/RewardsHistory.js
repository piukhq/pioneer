import React from 'react'
import cx from 'classnames'
import NonActiveVouchersModal from 'components/NonActiveVouchersModal'
import TransactionsModal from 'components/TransactionsModal'
import { useMembershipCardStateById } from 'hooks/membershipCards'
import { useMembershipCardDetailsByCardId } from 'hooks/useMembershipCardDetailsByCardId'
import { ReactComponent as StateAuthorisedSvg } from 'images/state-authorised.svg'
import { ReactComponent as StateAuthorisedGreySvg } from 'images/state-authorised-grey.svg'
import { ReactComponent as StateFailedSvg } from 'images/state-failed.svg'
import { ReactComponent as StatePendingSvg } from 'images/state-pending.svg'

import styles from './RewardsHistory.module.scss'

const RewardsHistory = ({ membershipCard, state, addPaymentCardClickHandler = () => {} }) => {
  const membershipCardId = membershipCard?.id
  const balance = membershipCard?.balances?.[0]

  const { transactions, nonActiveVouchers } = useMembershipCardStateById(membershipCardId)
  const { planName } = useMembershipCardDetailsByCardId()

  const [isNonActiveVouchersModalOpen, setNonActiveVouchersModalOpen] = React.useState(false)
  const [isTransactionsModalOpen, setTransactionsModalOpen] = React.useState(false)

  return (
    <>
      { state === 'authorised' && (
        <>
          { transactions?.length > 0 ? (
            <>
              {/* todo: would there ever be an unhappy path ever where balance is missing? */}
              <div data-testid='transaction-history' className={styles['root__transaction-history']} onClick={() => setTransactionsModalOpen(true)}>
                <StateAuthorisedSvg className={cx(styles['root__authorised-svg'], styles[`root__authorised-svg--${Config.theme}`])} />
                <p className={styles.root__subtitle}>{balance?.value} {balance?.suffix}</p>
                <p className={styles.root__explainer}>View history</p>
              </div>

              { isTransactionsModalOpen && (
                <div data-testid='transaction-modal'>
                  <TransactionsModal
                    membershipCardId={membershipCardId}
                    onClose={() => setTransactionsModalOpen(false)}
                  />
                </div>
              )}
            </>
          ) : (
            <div data-testid='no-transaction-history' className={cx(styles['root__transaction-history'], styles['root__transaction-history--disabled'])}>
              <StateAuthorisedGreySvg />
              <p className={styles.root__subtitle}>{balance?.value} {balance?.suffix}</p>
              <p className={cx(styles.root__explainer, styles['root__explainer--desktop-only'])}>No transactions to show</p>
              <p className={cx(styles.root__explainer, styles['root__explainer--mobile-only'])}>Not available</p>
            </div>
          ) }
          { nonActiveVouchers?.length > 0 ? (
            <>
              <div data-testid='non-active-vouchers' className={styles['root__voucher-history']} onClick={() => setNonActiveVouchersModalOpen(true)}>
                <StateAuthorisedSvg className={cx(styles['root__authorised-svg'], styles[`root__authorised-svg--${Config.theme}`])} />
                <p className={cx(styles.root__subtitle, styles['root__subtitle--desktop-only'])}>Rewards history</p>
                <p className={cx(styles.root__subtitle, styles['root__subtitle--mobile-only'])}>History</p>
                <p className={cx(styles.root__explainer, styles['root__explainer--desktop-only'])}>See your past rewards</p>
                <p className={cx(styles.root__explainer, styles['root__explainer--mobile-only'])}>Past rewards</p>
              </div>
              { isNonActiveVouchersModalOpen && (
                <div data-testid='non-active-vouchers-modal'>
                  <NonActiveVouchersModal
                    membershipCardId={membershipCardId}
                    onClose={() => setNonActiveVouchersModalOpen(false)}
                  />
                </div>
              )}
            </>

          ) : (
            <div data-testid='no-non-active-vouchers' className={cx(styles['root__voucher-history'], styles['root__voucher-history--disabled'])}>
              <StateAuthorisedGreySvg />
              <p className={cx(styles.root__subtitle, styles['root__subtitle--desktop-only'])}>Rewards history</p>
              <p className={cx(styles.root__subtitle, styles['root__subtitle--mobile-only'])}>History</p>
              <p className={cx(styles.root__explainer, styles['root__explainer--desktop-only'])}>No vouchers to show</p>
              <p className={cx(styles.root__explainer, styles['root__explainer--mobile-only'])}>Not available</p>
            </div>
          ) }
        </>
      ) }
      { state === 'no-payment-cards' && (
        <div data-testid='no-payment-cards' className={styles['root__no-payment-card-state']} onClick={addPaymentCardClickHandler}>
          <StateFailedSvg />
          <p className={styles.root__subtitle}>Add a payment card</p>
          <div className={styles.root__explainer}>
            <p className={styles['root__explainer-paragraph']}>To collect rewards you need to add a payment card to { planName }.</p>
            <p className={styles['root__explainer-paragraph']}>Click here to get started.</p>
          </div>
        </div>
      ) }
      { state === 'failed' && (
          <div data-testid='failed-state' className={styles['root__failed-state']}>
            <StateFailedSvg />
            <p className={styles.root__subtitle}>Something's not right</p>
            <div className={styles.root__explainer}>
              <p className={styles['root__explainer-paragraph']}>There was a problem setting up your account.</p>
              <p className={styles['root__explainer-paragraph']}>We need some additional information to resolve this.</p>
              <p className={styles['root__explainer-paragraph']}>Click here to resolve.</p>
            </div>
          </div>
      ) }
      { state === 'pending' && (
          <div data-testid='pending-state' className={styles['root__pending-state']}>
            <StatePendingSvg />
            <p className={styles.root__subtitle}>Pending</p>
            <div className={styles.root__explainer}>
              <p className={styles['root__explainer-paragraph']}>We are getting everything ready for you.</p>
              <p className={styles['root__explainer-paragraph']}>
                You will need a payment card to start collecting rewards.
                This can be done alongside this process.
              </p>
            </div>
          </div>
      ) }
    </>
  )
}

export default RewardsHistory
