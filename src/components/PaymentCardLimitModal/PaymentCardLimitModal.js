import React from 'react'
import Modal from 'components/Modal'
import Button from 'components/Button'

import styles from './PaymentCardLimitModal.module.scss'

const PaymentCardLimitModal = ({ onClose }) => (
  <Modal onClose={onClose}>
    <Modal.Header>Limit Reached</Modal.Header>
    <p className={styles.root__paragraph}>
      You have reached your limit of 5 linked credit/debit cards. Please delete one before attempting to add another.
    </p>
    <Button className={styles.root__button} onClick={onClose}>Dismiss</Button>
  </Modal>
)

export default PaymentCardLimitModal
