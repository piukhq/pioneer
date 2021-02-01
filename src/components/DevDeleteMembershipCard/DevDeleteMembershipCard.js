import React from 'react'
import { useMembershipCardsDispatch } from 'hooks/membershipCards'
import styles from './DevDeleteMembershipCard.module.scss'

const DevDeleteMembershipCard = ({ cardId }) => {
  const { deleteMembershipCard } = useMembershipCardsDispatch()
  return (
    process.env.NODE_ENV == 'development' ? (
      <button className={styles.root} onClick={() => deleteMembershipCard(cardId)}>Delete card with id {cardId}</button>
    ) : null
  )
}

export default DevDeleteMembershipCard
