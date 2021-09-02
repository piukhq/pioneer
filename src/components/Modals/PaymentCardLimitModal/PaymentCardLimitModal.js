import React from 'react'
import Modal from 'components/Modal'
import Button from 'components/Button'

import styles from './PaymentCardLimitModal.module.scss'

const PaymentCardLimitModal = ({ onClose }) => (
  <Modal onClose={onClose}>
    <Modal.Header>Limit reached</Modal.Header>
    <div className={styles.root__paragraph}>
      You have reached your limit of 5 credit/debit cards. Please delete one before attempting to add another.
    </div>
    <Button className={styles.root__button} onClick={onClose}>Dismiss</Button>
  </Modal>
)

export default PaymentCardLimitModal
