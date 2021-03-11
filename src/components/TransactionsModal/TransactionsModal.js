import React from 'react'
import cx from 'classnames'
import Modal from 'components/Modal'
import { useMembershipCardStateById } from 'hooks/membershipCards'
import dayjs from 'dayjs'

import styles from './TransactionsModal.module.scss'

const TransactionsModal = ({ membershipCardId, onClose }) => {
  const { transactions } = useMembershipCardStateById(membershipCardId)

  return (
    <Modal onClose={onClose}>
      <Modal.Header>Transaction history</Modal.Header>
      { transactions?.length > 0 ? (
        <>
          <p className={styles.root__description}>
            Your recent transaction history
          </p>
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
        <p className={styles.root__description}>
          You don't have any transactions yet. {/* todo: to decide the copy */}
        </p>
      ) }
    </Modal>
  )
}

export default TransactionsModal
