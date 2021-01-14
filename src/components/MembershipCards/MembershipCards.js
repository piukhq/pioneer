import React from 'react'
import { Link } from 'react-router-dom'

import { useMembershipCardsState } from 'hooks/membershipCards'
import useLoadMembershipCards from './hooks/useLoadMembershipCards'

import RecreateRemovedMembershipCard from './RecreateRemovedMembershipCard'
import Loading from 'components/Loading'
import Button from 'components/Button'

const MembershipCards = ({ onError }) => {
  const { membershipCards, loading } = useMembershipCardsState()
  useLoadMembershipCards(onError)

  return (
    <>
      {/* todo: probably should filter by membership plan id if merchant channel */}
      {membershipCards.map(card => (
        <div key={card.id}>
          <Link to={`/membership-card/${card.id}`}>
            Id: {card.id} (plan: {card.membership_plan})
          </Link>
        </div>
      ))}
      { membershipCards.length === 0 && !loading && (
        <>
          <Button>I already have a card</Button>
          <Button>Get a new card</Button>
        </>
      ) }
      {/* <RecreateRemovedMembershipCard /> */}
      {/* todo: to decide on the visuals of loading */}
      { loading && (
        <Loading />
      ) }
    </>
  )
}

export default MembershipCards
