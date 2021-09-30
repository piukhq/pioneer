import React from 'react'
import Modal from 'components/Modal'

import styles from './TransactionsRewardsEmptyStateModal.module.scss'

const TransactionsRewardsEmptyStateModal = ({ title, description, balance }) => {
  const calculateLastUpdatedValue = () => {
    const lastUpdatedTime = new Date(0) // The 0 there is the key, which sets the date to the epoch
    lastUpdatedTime.setUTCSeconds(balance?.updated_at)

    const currentTime = new Date()

    // Difference in milliseconds
    const diffTime = Math.abs(currentTime - lastUpdatedTime)

    const minutes = Math.floor(diffTime / 60000)
    const hours = Math.round(minutes / 60)
    const days = Math.round(hours / 24)
    const weeks = Math.round(days / 7)

    // Only return 1 variation of time unit
    return (
      (weeks && `${weeks}w`) ||
      (days && `${days}d`) ||
      (hours && `${hours}h`) ||
      (minutes && `${minutes}m`) ||
      '0m'
    )
  }

  return (
  <Modal>
    <Modal.Header>{title}</Modal.Header>
    <div className={styles.root__paragraph}>{description}</div>
    <div className={styles['root__last-updated-text']}>Last updated {calculateLastUpdatedValue()} ago</div>
  </Modal>
  )
}

export default React.memo(TransactionsRewardsEmptyStateModal)
