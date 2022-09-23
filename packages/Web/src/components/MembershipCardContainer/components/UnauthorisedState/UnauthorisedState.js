import React from 'react'
import { MEMBERSHIP_CARD_REASON_CODES } from 'utils/enums'
import StateFailedSvg from 'images/state-failed.svg'
import StatePendingSvg from 'images/state-pending.svg'

import styles from './UnauthorisedState.module.scss'

const UnauthorisedState = ({ membershipCard, state }) => {
  const {
    PENDING_CODES: pendingCodes,
    GENERIC_ERROR_CODES: errorCodes,
    ACCOUNT_NOT_REGISTERED_CODE: accountNotRegisteredCode,
    ENROL_REJECTED_CODE: enrolRejectedCode,
    ACCOUNT_ALREADY_EXISTS_CODE: accountAlreadyExists,
  } = MEMBERSHIP_CARD_REASON_CODES

  const reasonCode = membershipCard?.status?.reason_codes[0]

  const renderPendingState = () => (
    <div data-testid='pending-state' className={styles['root__pending-state']}>
        <StatePendingSvg key={state} />
        <div className={styles.root__subtitle}>Pending</div>
        <div className={styles.root__explainer}>
          <div className={styles['root__explainer-paragraph']}>Please wait</div>
        </div>
      </div>
  )
  const renderAccountNotRegisteredFailedState = () => (
    <>
      <div className={styles.root__subtitle}>{reasonCode === accountNotRegisteredCode ? 'Account not registered' : 'Error'}</div>
      <div className={styles.root__explainer}>
        <div className={styles['root__explainer-paragraph']}>Try again later</div>
      </div>
    </>
  )
  const renderEnrolRejectedFailedState = () => (
    <>
      <div className={styles.root__subtitle}>{reasonCode === enrolRejectedCode ? 'Enrol failed' : 'Account already exists'}</div>
      <div className={styles.root__explainer}>
        <a className={styles['root__explainer-paragraph']} href='https://help.bink.com/hc/en-gb/requests/new?' target='_blank' rel='noreferrer'>Contact support</a>
      </div>
    </>
  )
  const renderGeneralFailedState = () => (
    <>
      <div className={styles.root__subtitle}>Something's not right</div>
      <div className={styles.root__explainer}>
        <div className={styles['root__explainer-paragraph']}>There was a problem setting up your account.</div>
        <div className={styles['root__explainer-paragraph']}>We need some additional information to resolve this.</div>
      </div>
    </>
  )

  if (pendingCodes.includes(reasonCode)) {
    return renderPendingState()
  }

  const renderFailState = () => {
    if (errorCodes.includes(reasonCode) || reasonCode === accountNotRegisteredCode) return renderAccountNotRegisteredFailedState()
    if (reasonCode === enrolRejectedCode || reasonCode === accountAlreadyExists) return renderEnrolRejectedFailedState()
    return renderGeneralFailedState()
  }

  return (
    <div data-testid='failed-state' className={styles['root__failed-state']}>
      <StateFailedSvg key={state} />
      {renderFailState()}
    </div>
  )
}

export default UnauthorisedState
