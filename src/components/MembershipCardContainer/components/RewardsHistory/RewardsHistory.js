import React, { useCallback } from 'react'
import cx from 'classnames'
import NonActiveVouchersModal from 'components/Modals/NonActiveVouchersModal'
import TransactionsRewardsEmptyStateModal from 'components/Modals/TransactionsRewardsEmptyStateModal'
import TransactionsModal from 'components/Modals/TransactionsModal'
import { useMembershipCardStateById } from 'hooks/membershipCards'
import { useMembershipCardDetailsByCardId } from 'hooks/useMembershipCardDetailsByCardId'
import { useModals } from 'hooks/useModals'
import { ReactComponent as StateAuthorisedSvg } from 'images/state-authorised.svg'
import { ReactComponent as StateAuthorisedGreySvg } from 'images/state-authorised-grey.svg'
import { ReactComponent as StateFailedSvg } from 'images/state-failed.svg'
import { ReactComponent as StatePendingSvg } from 'images/state-pending.svg'
import { useCalculateWindowDimensions } from 'utils/windowDimensions'
import styles from './RewardsHistory.module.scss'

const RewardsHistory = ({ membershipCard, state }) => {
  const membershipCardId = membershipCard?.id
  const balance = membershipCard?.balances?.[0]
  const { transactions, nonActiveVouchers } = useMembershipCardStateById(membershipCardId)
  const { planName } = useMembershipCardDetailsByCardId()
  const { isDesktopViewportDimensions } = useCalculateWindowDimensions()

  const { dispatchModal, modalToRender } = useModals()
  const handleTransactionHistoryClick = useCallback(() => { dispatchModal('MEMBERSHIP_CARD_TRANSACTIONS') }, [dispatchModal])
  const handleNoTransactionHistoryClick = useCallback(() => { dispatchModal('MEMBERSHIP_CARD_NO_TRANSACTIONS') }, [dispatchModal])
  const handleNonActiveVouchersClick = useCallback(() => { dispatchModal('MEMBERSHIP_CARD_NON_ACTIVE_VOUCHERS') }, [dispatchModal])
  const handleNoNonActiveVouchersClick = useCallback(() => { dispatchModal('MEMBERSHIP_CARD_NO_REWARDS') }, [dispatchModal])
  const handleNoPaymentCardsClick = useCallback(() => { dispatchModal('PAYMENT_CARD_ADD_FORM') }, [dispatchModal])

  return (
    <>
      { state === 'authorised' && (
        <>
          { transactions?.length > 0 ? (
            <>
              {/* todo: would there ever be an unhappy path ever where balance is missing? */}
              <div data-testid='transaction-history' className={styles['root__transaction-history']} onClick={ handleTransactionHistoryClick}>
                <StateAuthorisedSvg key={state} className={cx(styles['root__authorised-svg'], styles[`root__authorised-svg--${Config.theme}`])} />
                <div className={styles.root__subtitle}>{balance?.value} {balance?.suffix}</div>
                <div className={styles.root__explainer}>View history</div>
              </div>
              { modalToRender === 'MEMBERSHIP_CARD_TRANSACTIONS' && (
                <div data-testid='transaction-modal'>
                  <TransactionsModal membershipCardId={membershipCardId}/>
                </div>
              )}
            </>
          ) : (
            <>
              <div data-testid='no-transaction-history' className={cx(styles['root__transaction-history'], styles['root__transaction-history--disabled'])} onClick={handleNoTransactionHistoryClick}>
                <StateAuthorisedGreySvg key={state} />
                <div className={styles.root__subtitle}>{balance?.value} {balance?.suffix}</div>
                <div className={cx(styles.root__explainer)}>{isDesktopViewportDimensions ? 'No transactions to show' : 'Not available'}</div>
              </div>
              { modalToRender === 'MEMBERSHIP_CARD_NO_TRANSACTIONS' && (
                <div data-testid='no-transaction-history-modal'>
                  <TransactionsRewardsEmptyStateModal
                    title='Transaction History'
                    description='No transactions available to display.'
                    balance={balance}
                  />
                </div>
              )}
            </>
          ) }

          { nonActiveVouchers?.length > 0 ? (
            <>
              <div data-testid='non-active-vouchers' className={styles['root__voucher-history']} onClick={handleNonActiveVouchersClick}>
                <StateAuthorisedSvg key={state} className={cx(styles['root__authorised-svg'], styles[`root__authorised-svg--${Config.theme}`])} />
                <div className={cx(styles.root__subtitle)}>{isDesktopViewportDimensions ? 'Reward history' : 'History'}</div>
                <div className={cx(styles.root__explainer)}>{isDesktopViewportDimensions ? 'See your past rewards' : 'Past rewards'}</div>
              </div>
              { modalToRender === 'MEMBERSHIP_CARD_NON_ACTIVE_VOUCHERS' && (
                <div data-testid='non-active-vouchers-modal'>
                  <NonActiveVouchersModal membershipCardId={membershipCardId}/>
                </div>
              )}
            </>
          ) : (
            <>
              <div data-testid='no-non-active-vouchers' className={cx(styles['root__voucher-history'], styles['root__voucher-history--disabled'])} onClick={handleNoNonActiveVouchersClick}>
                <StateAuthorisedGreySvg key={state} />
                <div className={cx(styles.root__subtitle)}>{isDesktopViewportDimensions ? 'Reward history' : 'History'}</div>
                <div className={cx(styles.root__explainer)}>{isDesktopViewportDimensions ? 'No vouchers to show' : 'Not available'}</div>
              </div>
              { modalToRender === 'MEMBERSHIP_CARD_NO_REWARDS' && (
                  <div data-testid='no-non-active-vouchers-modal'>
                    <TransactionsRewardsEmptyStateModal
                      title='Reward History'
                      description='No past rewards available to display.'
                      balance={balance}
                    />
                  </div>
              )}
            </>
          ) }
        </>
      ) }
      { state === 'no-payment-cards' && (
        <div data-testid='no-payment-cards' className={styles['root__no-payment-card-state']} onClick={handleNoPaymentCardsClick}>
          <StateFailedSvg key={state} />
          <div className={styles.root__subtitle}>Add a credit/debit card</div>
          <div className={styles.root__explainer}>
            <div className={styles['root__explainer-paragraph']}>To collect rewards you need to add a credit/debit card to { planName }.</div>
            <div>Click here to get started.</div>
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
              <div>Click here to resolve.</div>
            </div>
          </div>
      ) }
      { state === 'pending' && (
          <div data-testid='pending-state' className={styles['root__pending-state']}>
            <StatePendingSvg key={state} />
            <div className={styles.root__subtitle}>Pending</div>
            <div className={styles.root__explainer}>
              <div className={styles['root__explainer-paragraph']}>We are getting everything ready for you.</div>
              <div>
                You will need a credit/debit card to start collecting rewards.
                This can be done alongside this process.
              </div>
            </div>
          </div>
      ) }
    </>
  )
}

export default RewardsHistory
