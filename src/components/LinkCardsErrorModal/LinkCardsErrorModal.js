import React from 'react'
import Modal from 'components/Modal'
import Button from 'components/Button'

import styles from './LinkedCardsErrorModal.module.scss'

const LinkCardsErrorModal = ({ onClose }) => (
  <Modal onClose={onClose}>
    <Modal.Header>Card cannot be linked</Modal.Header>
    <p className={styles.root__paragraph}>
      There seems to be a problem linking your cards together.
      This usually happens when the payment card you are trying to link is linked to a different loyalty card.
    </p>

    <p className={styles.root__paragraph}>
      If you need help resolving this, please visit our FAQs or contact support
    </p>
    <Button className={styles.root__button} onClick={onClose}>Dismiss</Button>
  </Modal>
)

export default LinkCardsErrorModal
