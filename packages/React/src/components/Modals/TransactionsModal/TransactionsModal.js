import React from 'react'
import cx from 'classnames'
import Modal from 'components/Modal'
import { useMembershipCardStateById } from 'hooks/membershipCards'
import dayjs from 'dayjs'

import styles from './TransactionsModal.module.scss'

const TransactionsModal = ({ membershipCardId }) => {
  const { transactions } = useMembershipCardStateById(membershipCardId)

  return (
    <Modal className={styles.root}>
      <Modal.Header>Transaction history</Modal.Header>
      { transactions?.length > 0 ? (
        <>
          <div className={styles.root__description}>
            Your recent transaction history
          </div>
          { transactions.map(transaction => {
            const id = transaction?.id
            const value = transaction?.amounts?.[0]?.value
            const suffix = transaction?.amounts?.[0]?.suffix
            const timestamp = transaction?.timestamp * 1000
            const description = transaction?.description

            return (
              <div
                key={id}
                className={cx(
                  styles.root__transaction,
                  value < 0 && styles['root__transaction--negative'],
                  value === 0 && styles['root__transaction--neutral'],
                  value > 0 && styles['root__transaction--positive'],

                )}
              >
                <div className={cx(
                  styles.root__value,
                  value < 0 && styles['root__value--negative'],
                  value === 0 && styles['root__value--neutral'],
                  value > 0 && styles['root__value--positive'],
                )}>
                  {value > 0 && '+'}{value}{' '}{suffix}
                </div>
                <div className={styles.root__date}>{dayjs(timestamp).format('DD MMM YYYY')}</div>
                <div className={styles['root__transaction-description']}>{description}</div>
              </div>
            )
          }) }
        </>
      ) : (
        <div className={styles.root__description}>
          You don't have any transactions yet.
        </div>
      ) }
    </Modal>
  )
}

export default TransactionsModal
