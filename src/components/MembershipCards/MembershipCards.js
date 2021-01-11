import React from 'react'
import { Link } from 'react-router-dom'

import { useMembershipCardsState } from 'hooks/membershipCards'
import useLoadMembershipCards from './hooks/useLoadMembershipCards'

import RecreateRemovedMembershipCard from './RecreateRemovedMembershipCard'

const MembershipCards = ({ onError }) => {
  const { membershipCards } = useMembershipCardsState()
  useLoadMembershipCards(onError)

  return (
    <>
      {membershipCards.map(card => (
        <div key={card.id}>
          <Link to={`/membership-card/${card.id}`}>
            Id: {card.id} (plan: {card.membership_plan})
          </Link>
        </div>
      ))}
      <RecreateRemovedMembershipCard />
    </>
  )
}

export default MembershipCards
