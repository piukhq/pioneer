import React from 'react'
import Button from 'components/Button'
import Modal from 'components/Modal'
import { useMembershipCardsDispatch } from 'hooks/membershipCards'
import { useModals } from 'hooks/useModals'

import styles from './MembershipCardDeleteModal.module.scss'

const MembershipCardDeleteModal = ({ onClose, cardId, planString }) => {
  const { deleteMembershipCard } = useMembershipCardsDispatch()
  const { closeModals } = useModals()

  const handleCardDelete = () => {
    deleteMembershipCard(cardId)
    onClose()
    closeModals()
  }

  return (
    <Modal>
      <div className={styles.root__paragraph}>Are you sure you want to delete your {planString}?</div>
      <Button tertiary className={styles.root__button} onClick={handleCardDelete}>Delete</Button>
    </Modal>
  )
}

export default MembershipCardDeleteModal
