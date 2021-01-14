import React from 'react'
import { Link } from 'react-router-dom'

import {
  useMembershipCardsState,
  useMembershipCardsDispatch,
} from 'hooks/membershipCards'
import useLoadMembershipCards from './hooks/useLoadMembershipCards'

import RecreateRemovedMembershipCard from './RecreateRemovedMembershipCard'
import Loading from 'components/Loading'
import Button from 'components/Button'

import Config from 'Config'

const MembershipCards = ({ onError }) => {
  const { membershipCards, loading } = useMembershipCardsState()
  const { deleteMembershipCard } = useMembershipCardsDispatch()
  useLoadMembershipCards(onError)
  return (
    <>
      {/* todo: probably should filter by membership plan id if merchant channel */}
      { !Config.isMerchantChannel && (
        membershipCards.map(card => (
          <div key={card.id}>
            <Link to={`/membership-card/${card.id}`}>
              Id: {card.id} (plan: {card.membership_plan})
            </Link>
          </div>
        ))
      ) }
      { membershipCards.length === 0 && !loading && (
        <>
          <Button>I already have a card</Button>
          <Button>Get a new card</Button>
        </>
      ) }
      { Config.isMerchantChannel && membershipCards.length > 1 && (
        <>
          {/* todo: copy TBD */}
          You have more than one membership card associated to your account.
          You'll have to remove {membershipCards.length - 1} cards to continue.

          {membershipCards.map(card => (
            <div key={card.id}>
              Card number {card.card.membership_id}{' '}
              <button onClick={() => deleteMembershipCard(card.id)}>Remove</button>
            </div>
          ))}
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
