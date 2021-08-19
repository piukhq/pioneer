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
import { useCalculateWindowDimensions } from './hooks/useCalculateWindowDimensions'
import styles from './RewardsHistory.module.scss'

const RewardsHistory = ({ membershipCard, state, addPaymentCardClickHandler = () => {} }) => {
  const membershipCardId = membershipCard?.id
  const balance = membershipCard?.balances?.[0]

  const { transactions, nonActiveVouchers } = useMembershipCardStateById(membershipCardId)
  const { planName } = useMembershipCardDetailsByCardId()
  const { shouldRenderDesktopText } = useCalculateWindowDimensions()

  const [isNonActiveVouchersModalOpen, setNonActiveVouchersModalOpen] = React.useState(false)
  const [isTransactionsModalOpen, setTransactionsModalOpen] = React.useState(false)

  const handleNoPaymentCardsOnClick = () => {
    addPaymentCardClickHandler(true)
  }

  return (
    <>
      { state === 'authorised' && (
        <>
          { transactions?.length > 0 ? (
            <>
              {/* todo: would there ever be an unhappy path ever where balance is missing? */}
              <div data-testid='transaction-history' className={styles['root__transaction-history']} onClick={() => setTransactionsModalOpen(true)}>
                <StateAuthorisedSvg key={state} className={cx(styles['root__authorised-svg'], styles[`root__authorised-svg--${Config.theme}`])} />
                <div className={styles.root__subtitle}>{balance?.value} {balance?.suffix}</div>
                <div className={styles.root__explainer}>View history</div>
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
              <StateAuthorisedGreySvg key={state} />
              <div className={styles.root__subtitle}>{balance?.value} {balance?.suffix}</div>
              <div className={cx(styles.root__explainer)}>{shouldRenderDesktopText ? 'No transactions to show' : 'Not available'}</div>
            </div>
          ) }
          { nonActiveVouchers?.length > 0 ? (
            <>
              <div data-testid='non-active-vouchers' className={styles['root__voucher-history']} onClick={() => setNonActiveVouchersModalOpen(true)}>
                <StateAuthorisedSvg key={state} className={cx(styles['root__authorised-svg'], styles[`root__authorised-svg--${Config.theme}`])} />
                <div className={cx(styles.root__subtitle)}>{shouldRenderDesktopText ? 'Rewards history' : 'History'}</div>
                <div className={cx(styles.root__explainer)}>{shouldRenderDesktopText ? 'See your past rewards' : 'Past rewards'}</div>
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
              <StateAuthorisedGreySvg key={state} />
              <div className={cx(styles.root__subtitle)}>{shouldRenderDesktopText ? 'Rewards history' : 'History'}</div>
              <div className={cx(styles.root__explainer)}>{shouldRenderDesktopText ? 'No vouchers to show' : 'Not available'}</div>
            </div>
          ) }
        </>
      ) }
      { state === 'no-payment-cards' && (
        <div data-testid='no-payment-cards' className={styles['root__no-payment-card-state']} onClick={handleNoPaymentCardsOnClick}>
          <StateFailedSvg key={state} />
          <div className={styles.root__subtitle}>Add a payment card</div>
          <div className={styles.root__explainer}>
            <div className={styles['root__explainer-paragraph']}>To collect rewards you need to add a payment card to { planName }.</div>
            <div className={styles['root__explainer-paragraph']}>Click here to get started.</div>
          </div>
        </div>
      ) }
      { state === 'failed' && (
          <div data-testid='failed-state' className={styles['root__failed-state']}>
            <StateFailedSvg key={state} />
            <div className={styles.root__subtitle}>Something's not right</div>
            <div className={styles.root__explainer}>
              <div className={styles['root__explainer-paragraph']}>There was a problem setting up your account.</div>
              <div className={styles['root__explainer-paragraph']}>We need some additional information to resolve this.</div>
              <div className={styles['root__explainer-paragraph']}>Click here to resolve.</div>
            </div>
          </div>
      ) }
      { state === 'pending' && (
          <div data-testid='pending-state' className={styles['root__pending-state']}>
            <StatePendingSvg key={state} />
            <div className={styles.root__subtitle}>Pending</div>
            <div className={styles.root__explainer}>
              <div className={styles['root__explainer-paragraph']}>We are getting everything ready for you.</div>
              <div className={styles['root__explainer-paragraph']}>
                You will need a payment card to start collecting rewards.
                This can be done alongside this process.
              </div>
            </div>
          </div>
      ) }
    </>
  )
}

export default RewardsHistory
