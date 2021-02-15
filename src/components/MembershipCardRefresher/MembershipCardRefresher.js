import React from 'react'
import useCardRefresher from './hooks/useCardRefresher'
import styles from './MembershipCardRefresher.module.scss'

const MembershipCardRefresher = ({ membershipCardId }) => {
  const {
    PENDING_STATE,
    initialCardState,
    membershipCard,
    retryIndex,
    isQueuingInProgress,
    lastUpdateTime,
  } = useCardRefresher(membershipCardId)

  return (
    initialCardState === PENDING_STATE ? (
      <div className={styles.root}>
        {/* todo: to decide on the way we want to visually display this */}
        Membership card id: {membershipCardId}<br />
        Status: {membershipCard?.status?.state} <br />
        Refreshes queued so far: {retryIndex} {isQueuingInProgress && ' (in progress)'}<br />
        Last update time: {lastUpdateTime}<br />
      </div>
    ) : null
  )
}

export default MembershipCardRefresher
