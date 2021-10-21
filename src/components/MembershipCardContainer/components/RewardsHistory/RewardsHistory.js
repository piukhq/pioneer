import React, { useCallback } from 'react'
import cx from 'classnames'
import NonActiveVouchersModal from 'components/Modals/NonActiveVouchersModal'
import TransactionsRewardsEmptyStateModal from 'components/Modals/TransactionsRewardsEmptyStateModal'
import TransactionsModal from 'components/Modals/TransactionsModal'
import { useMembershipCardStateById } from 'hooks/membershipCards'
import { useMembershipCardDetailsByCardId } from 'hooks/useMembershipCardDetailsByCardId'
import { useModals } from 'hooks/useModals'
import { MODAL_ACTION_TYPES as modalEnum, MEMBERSHIP_CARD_REASON_CODES } from 'utils/enums'
import { ReactComponent as StateAuthorisedSvg } from 'images/state-authorised.svg'
import { ReactComponent as StateAuthorisedGreySvg } from 'images/state-authorised-grey.svg'
import { ReactComponent as StateFailedSvg } from 'images/state-failed.svg'
import { ReactComponent as StatePendingSvg } from 'images/state-pending.svg'
import { useCalculateWindowDimensions } from 'utils/windowDimensions'

import styles from './RewardsHistory.module.scss'

// TODO: Refactor componnet into small pieces
const RewardsHistory = ({ membershipCard, state }) => {
  const membershipCardId = membershipCard?.id
  const balance = membershipCard?.balances?.[0]
  const { transactions, nonActiveVouchers } = useMembershipCardStateById(membershipCardId)
  const { planName, planHasVouchers } = useMembershipCardDetailsByCardId()
  const { isDesktopViewportDimensions } = useCalculateWindowDimensions()

  const { dispatchModal, modalToRender } = useModals()
  const handleTransactionHistoryClick = useCallback(() => dispatchModal(modalEnum.MEMBERSHIP_CARD_TRANSACTIONS), [dispatchModal])
  const handleNoTransactionHistoryClick = useCallback(() => dispatchModal(modalEnum.MEMBERSHIP_CARD_NO_TRANSACTIONS), [dispatchModal])
  const handleNonActiveVouchersClick = useCallback(() => dispatchModal(modalEnum.MEMBERSHIP_CARD_NON_ACTIVE_VOUCHERS), [dispatchModal])
  const handleNoNonActiveVouchersClick = useCallback(() => dispatchModal(modalEnum.MEMBERSHIP_CARD_NO_REWARDS), [dispatchModal])
  const handleNoPaymentCardsClick = useCallback(() => dispatchModal(modalEnum.PAYMENT_CARD_ADD_FORM), [dispatchModal])

  const renderAuthorisedState = () => {
    return (
      <>
        { transactions?.length > 0 ? (
          <>
            {/* todo: would there ever be an unhappy path ever where balance is missing? */}
            <div data-testid='transaction-history' className={cx(styles['root__transaction-history'], styles['root__click-event-enabled'])} onClick={handleTransactionHistoryClick}>
              <StateAuthorisedSvg key={state} className={cx(styles['root__authorised-svg'], styles[`root__authorised-svg--${Config.theme}`])} />
              <div className={styles.root__subtitle}>{balance?.prefix} {balance?.value} {balance?.suffix}</div>
              <div className={styles.root__explainer}>View history</div>
            </div>
            { modalToRender === modalEnum.MEMBERSHIP_CARD_TRANSACTIONS && (
              <div data-testid='transaction-modal'>
                <TransactionsModal membershipCardId={membershipCardId}/>
              </div>
            )}
          </>
        ) : (
          <>
            <div data-testid='no-transaction-history' className={cx(styles['root__transaction-history'], styles['root__transaction-history--greyed'], styles['root__click-event-enabled'])} onClick={handleNoTransactionHistoryClick}>
              <StateAuthorisedGreySvg key={state} />
              <div className={styles.root__subtitle}>{balance?.value} {balance?.suffix}</div>
              <div className={cx(styles.root__explainer)}>{isDesktopViewportDimensions ? 'No transactions to show' : 'Not available'}</div>
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
        ) }

        { planHasVouchers && (
          <>
            { nonActiveVouchers?.length > 0 ? (
              <>
                <div data-testid='non-active-vouchers' className={cx(styles['root__voucher-history'], styles['root__click-event-enabled'])} onClick={handleNonActiveVouchersClick}>
                  <StateAuthorisedSvg key={state} className={cx(styles['root__authorised-svg'], styles[`root__authorised-svg--${Config.theme}`])} />
                  <div className={cx(styles.root__subtitle)}>{isDesktopViewportDimensions ? 'Reward history' : 'History'}</div>
                  <div className={cx(styles.root__explainer)}>{isDesktopViewportDimensions ? 'See your past rewards' : 'Past rewards'}</div>
                </div>
                { modalToRender === modalEnum.MEMBERSHIP_CARD_NON_ACTIVE_VOUCHERS && (
                  <div data-testid='non-active-vouchers-modal'>
                    <NonActiveVouchersModal membershipCardId={membershipCardId}/>
                  </div>
                )}
              </>
            ) : (
              <>
                <div data-testid='no-non-active-vouchers' className={cx(styles['root__voucher-history'], styles['root__voucher-history--greyed'], styles['root__click-event-enabled'])} onClick={handleNoNonActiveVouchersClick}>
                  <StateAuthorisedGreySvg key={state} />
                  <div className={cx(styles.root__subtitle)}>{isDesktopViewportDimensions ? 'Reward history' : 'History'}</div>
                  <div className={cx(styles.root__explainer)}>{isDesktopViewportDimensions ? 'No vouchers to show' : 'Not available'}</div>
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
            )}
          </>
        )}
      </>
    )
  }

  const renderNoPaymentCardsState = () => {
    return (
      <div data-testid='no-payment-cards' className={cx(styles['root__no-payment-card-state'], styles['root__click-event-enabled'])} onClick={handleNoPaymentCardsClick}>
        <StateFailedSvg key={state} />
        <div className={styles.root__subtitle}>Add a credit/debit card</div>
        <div className={styles.root__explainer}>
          <div className={styles['root__explainer-paragraph']}>To collect rewards you need to add a credit/debit card to {planName}.</div>
          <div>Click here to get started.</div>
        </div>
      </div>
    )
  }

  // This will render the various error messages if the membership card is not authorised
  const renderUnauthorisedState = () => {
    const {
      PENDING_CODES: pendingCodes,
      GENERIC_ERROR_CODES: errorCodes,
      ACCOUNT_NOT_REGISTERED_CODE: accountNotRegisteredCode,
      ENROL_REJECTED_CODE: enrolRejectedCode,
      ACCOUNT_ALREADY_EXISTS_CODE: accountAlreadyExists,
    } = MEMBERSHIP_CARD_REASON_CODES

    const { reason_codes: reasonCodes } = membershipCard.status
    const reasonCode = reasonCodes[0]

    if (pendingCodes.includes(reasonCode)) {
      return (
        <div data-testid='pending-state' className={styles['root__pending-state']}>
          <StatePendingSvg key={state} />
          <div className={styles.root__subtitle}>Pending</div>
          <div className={styles.root__explainer}>
            <div className={styles['root__explainer-paragraph']}>Please wait</div>
          </div>
        </div>
      )
    } else if (errorCodes.includes(reasonCode) || reasonCode === accountNotRegisteredCode) {
      return (
        <div data-testid='failed-state' className={styles['root__failed-state']}>
          <StateFailedSvg key={state} />
          <div className={styles.root__subtitle}>{reasonCode === accountNotRegisteredCode ? 'Account not registered' : 'Error'}</div>
          <div className={styles.root__explainer}>
            <div className={styles['root__explainer-paragraph']}>Try again later</div>
          </div>
        </div>
      )
    } else if (reasonCode === enrolRejectedCode || reasonCode === accountAlreadyExists) {
      return (
        <div data-testid='failed-state' className={styles['root__failed-state']}>
          <StateFailedSvg key={state} />
          <div className={styles.root__subtitle}>{reasonCode === enrolRejectedCode ? 'Enrol failed' : 'Account already exists'}</div>
          <div className={styles.root__explainer}>
            <a className={styles['root__explainer-paragraph']} href='https://help.bink.com/hc/en-gb/requests/new?' target='_blank' rel='noreferrer'>Contact support</a>
          </div>
        </div>
      )
    }

    return (
      <div data-testid='failed-state' className={styles['root__failed-state']}>
        <StateFailedSvg key={state} />
        <div className={styles.root__subtitle}>Something's not right</div>
        <div className={styles.root__explainer}>
          <div className={styles['root__explainer-paragraph']}>There was a problem setting up your account.</div>
          <div className={styles['root__explainer-paragraph']}>We need some additional information to resolve this.</div>
        </div>
      </div>
    )
  }

  const renderTileContents = () => {
    switch (state) {
      case 'authorised': return renderAuthorisedState()
      case 'no-payment-cards': return renderNoPaymentCardsState()
      default: return renderUnauthorisedState()
    }
  }

  return renderTileContents()
}

export default RewardsHistory
