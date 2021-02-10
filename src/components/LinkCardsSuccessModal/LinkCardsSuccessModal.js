import React from 'react'
import Modal from 'components/Modal'
import Button from 'components/Button'

import styles from './LinkedCardsSuccessModal.module.scss'

const LinkCardsSuccessModal = ({ onClose }) => (
  <Modal onClose={onClose}>
    <Modal.Header>Card linked</Modal.Header>
    <p>
      Your payment card is now linked! You can now collect points and rewards when you spend.
    </p>
    <Button className={styles.root__button} onClick={onClose}>Dismiss</Button>
  </Modal>
)

export default LinkCardsSuccessModal
