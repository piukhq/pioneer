import React from 'react'
import Button from 'components/Button'
import Modal from 'components/Modal'
import { useMembershipCardsDispatch } from 'hooks/membershipCards'

import styles from './MembershipCardDeleteModal.module.scss'

const MembershipCardDeleteModal = ({ onClose, cardId, planString }) => {
  const { deleteMembershipCard } = useMembershipCardsDispatch()

  const handleCardDelete = () => {
    deleteMembershipCard(cardId)
    onClose()
  }

  return (
    <Modal>
      <div className={styles.root__paragraph}>Are you sure you want to delete your {planString}?</div>
      <Button tertiary className={styles.root__button} onClick={handleCardDelete}>Delete</Button>
    </Modal>
  )
}

export default MembershipCardDeleteModal
