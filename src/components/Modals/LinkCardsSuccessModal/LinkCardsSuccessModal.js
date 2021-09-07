import React from 'react'
import Modal from 'components/Modal'
import Button from 'components/Button'

import styles from './LinkedCardsSuccessModal.module.scss'

const LinkCardsSuccessModal = ({ onClose }) => (
  <Modal onClose={onClose}>
    <Modal.Header>Card linked</Modal.Header>
    <div className={styles.root__paragraph}>
      Your credit/debit card is now linked! You can now collect points and rewards when you spend.
    </div>
    <Button className={styles.root__button} onClick={onClose}>Dismiss</Button>
  </Modal>
)

export default LinkCardsSuccessModal
