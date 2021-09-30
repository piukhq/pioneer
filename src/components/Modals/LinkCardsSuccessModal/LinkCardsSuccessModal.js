import React, { useCallback } from 'react'
import Modal from 'components/Modal'
import Button from 'components/Button'
import { useModals } from 'hooks/useModals'

import styles from './LinkedCardsSuccessModal.module.scss'

const LinkCardsSuccessModal = ({ onClose }) => {
  const { dispatchModal } = useModals()
  const handleDismissButtonClick = useCallback(() => { dispatchModal('NO_MODAL') }, [dispatchModal])
  return (
    <Modal onClose={onClose}>
      <Modal.Header>Card linked</Modal.Header>
      <div className={styles.root__paragraph}>
        Your credit/debit card is now linked! You can now collect points and rewards when you spend.
      </div>
      <Button className={styles.root__button} onClick={handleDismissButtonClick}>Dismiss</Button>
    </Modal>
  )
}

export default LinkCardsSuccessModal
