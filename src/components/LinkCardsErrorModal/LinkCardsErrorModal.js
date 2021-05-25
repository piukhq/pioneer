import React from 'react'
import Modal from 'components/Modal'
import Button from 'components/Button'
import useContactSupport from 'hooks/useContactSupport'

import styles from './LinkedCardsErrorModal.module.scss'

const LinkCardsErrorModal = ({ onClose }) => {
  const { contactSupport } = useContactSupport()
  return (
  <Modal onClose={onClose}>
    <Modal.Header>Card cannot be linked</Modal.Header>
    <p className={styles.root__paragraph}>
      Your credit/debit card cannot be linked to your {Config.planTitle} card. This usually happens when you have already linked it to a different {Config.planTitle} card.
    </p>
    {/* todo: consider replacing button with link tag to match its functionality */}
    <Button className={styles.root__button} onClick={onClose}>Delete credit/debit card</Button>
    <Button onClick={contactSupport} secondary className={styles.root__button}>Contact Support</Button>
  </Modal>
  )
}

export default LinkCardsErrorModal
