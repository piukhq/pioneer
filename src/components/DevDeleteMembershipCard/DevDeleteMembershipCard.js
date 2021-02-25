import React from 'react'
import { useMembershipCardsDispatch } from 'hooks/membershipCards'
import cx from 'classnames'
import styles from './DevDeleteMembershipCard.module.scss'

const DevDeleteMembershipCard = ({ cardId }) => {
  const { deleteMembershipCard } = useMembershipCardsDispatch()
  return (
    process.env.NODE_ENV === 'development' ? (
      <button className={cx(styles.root, 'dev-only')} onClick={() => deleteMembershipCard(cardId)}>Delete card with id {cardId}</button>
    ) : null
  )
}

export default DevDeleteMembershipCard
