import React from 'react'
import cx from 'classnames'
import NonActiveVouchersModal from 'components/Modals/NonActiveVouchersModal'
import TransactionsRewardsEmptyStateModal from 'components/Modals/TransactionsRewardsEmptyStateModal'
import TransactionsModal from 'components/Modals/TransactionsModal'
import { useMembershipCardStateById } from 'hooks/membershipCards'
import { useMembershipCardDetailsByCardId } from 'hooks/useMembershipCardDetailsByCardId'
import { useModals } from 'hooks/useModals'
import { MODAL_ACTION_TYPES as modalEnum } from 'utils/enums'
import { ReactComponent as StateAuthorisedSvg } from 'images/state-authorised.svg'
import { ReactComponent as StateAuthorisedGreySvg } from 'images/state-authorised-grey.svg'

import { useCalculateWindowDimensions } from 'utils/windowDimensions'

import styles from './AuthorisedState.module.scss'

const AuthorisedState = ({ membershipCard, state }) => {
  const membershipCardId = membershipCard?.id
  const balance = membershipCard?.balances?.[0]
  const { transactions, nonActiveVouchers } = useMembershipCardStateById(membershipCardId)
  const { planHasVouchers, planTransactionsAvailable } = useMembershipCardDetailsByCardId()
  const { isDesktopViewportDimensions } = useCalculateWindowDimensions()
  const { dispatchModal, modalToRender } = useModals()

  const transactionHistorySubTitleText = isDesktopViewportDimensions ? 'Transaction History' : 'Transactions'
  const transactionHistorySubTitle = balance?.value === 0 ? transactionHistorySubTitleText : `${balance?.prefix} ${balance?.value} ${balance?.suffix}`

  const shouldRenderTransactionHistory = () => {
    if (!planTransactionsAvailable && balance?.value === 0) {
      return null
    }
    return transactions?.length > 0 ? renderTransactionHistoryTile() : renderNoTransactionHistoryTile()
  }

  const renderTransactionHistoryTile = () => (
    <>
      {/* todo: would there ever be an unhappy path ever where balance is missing? */}
      <div data-testid='transaction-history' onClick={() => dispatchModal(modalEnum.MEMBERSHIP_CARD_TRANSACTIONS)}
        className={cx(
          styles['root__transaction-history'],
          styles['root__click-event-enabled'],
        )}
      >
        <StateAuthorisedSvg key={state}
          className={cx(
            styles['root__authorised-svg'],
            styles[`root__authorised-svg--${Config.theme}`],
          )}
        />
        <div className={styles.root__subtitle}>{transactionHistorySubTitle}</div>
        {planTransactionsAvailable && <div className={styles.root__explainer}>View history</div>}
      </div>
      { modalToRender === modalEnum.MEMBERSHIP_CARD_TRANSACTIONS && (
        <div data-testid='transaction-modal'>
          <TransactionsModal membershipCardId={membershipCardId}/>
        </div>
      )}
    </>
  )

  const renderNoTransactionHistoryTile = () => {
    const description = isDesktopViewportDimensions ? 'No transactions to show' : 'No transactions'

    return (
      <>
        <div data-testid='no-transaction-history' onClick={() => dispatchModal(modalEnum.MEMBERSHIP_CARD_NO_TRANSACTIONS)}
          className={cx(
            styles['root__transaction-history'],
            styles['root__transaction-history--greyed'],
            styles['root__click-event-enabled'],
          )}
        >
          <StateAuthorisedGreySvg key={state} />
          <div className={styles.root__subtitle}>{transactionHistorySubTitle}</div>
          { planTransactionsAvailable && <div className={styles.root__explainer}>{description}</div> }
        </div>
        { modalToRender === modalEnum.MEMBERSHIP_CARD_NO_TRANSACTIONS && (
          <div data-testid='no-transaction-history-modal'>
            <TransactionsRewardsEmptyStateModal
              title='Transaction History'
              description='No transactions available to display.'
              balance={balance}
            />
          </div>
        )}
      </>
    )
  }

  const renderNonActiveVouchersTile = () => (
    <>
      <div data-testid='non-active-vouchers' onClick={() => dispatchModal(modalEnum.MEMBERSHIP_CARD_NON_ACTIVE_VOUCHERS)}
        className={cx(
          styles['root__voucher-history'],
          styles['root__click-event-enabled'],
        )}
      >
        <StateAuthorisedSvg key={state}
          className={cx(
            styles['root__authorised-svg'],
            styles[`root__authorised-svg--${Config.theme}`],
          )}
        />
        <div className={styles.root__subtitle}>{isDesktopViewportDimensions ? 'Reward History' : 'Rewards'}</div>
        <div className={styles.root__explainer}>{isDesktopViewportDimensions ? 'See your past rewards' : 'Past rewards'}</div>
      </div>
      { modalToRender === modalEnum.MEMBERSHIP_CARD_NON_ACTIVE_VOUCHERS && (
        <div data-testid='non-active-vouchers-modal'>
          <NonActiveVouchersModal membershipCardId={membershipCardId}/>
        </div>
      )}
    </>
  )

  const renderNoNonActiveVouchersTile = () => (
    <>
      <div data-testid='no-non-active-vouchers' onClick={() => dispatchModal(modalEnum.MEMBERSHIP_CARD_NO_REWARDS)}
        className={cx(
          styles['root__voucher-history'],
          styles['root__voucher-history--greyed'],
          styles['root__click-event-enabled'],
        )}
      >
        <StateAuthorisedGreySvg key={state} />
        <div className={styles.root__subtitle}>{isDesktopViewportDimensions ? 'Reward History' : 'Rewards'}</div>
        <div className={styles.root__explainer}>{isDesktopViewportDimensions ? 'No vouchers to show' : 'Not available'}</div>
      </div>
      { modalToRender === modalEnum.MEMBERSHIP_CARD_NO_REWARDS && (
        <div data-testid='no-non-active-vouchers-modal'>
          <TransactionsRewardsEmptyStateModal
            title='Reward History'
            description='No past rewards available to display.'
            balance={balance}
          />
        </div>
      )}
   </>
  )

  return (
    <>
      {shouldRenderTransactionHistory()}
      { planHasVouchers && (
        <>
          { nonActiveVouchers?.length > 0 ? renderNonActiveVouchersTile() : renderNoNonActiveVouchersTile() }
        </>
      )}
    </>
  )
}

export default AuthorisedState
