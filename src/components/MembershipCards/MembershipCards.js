import React from 'react'
import { Link } from 'react-router-dom'

import {
  useMembershipCardsState,
  useMembershipCardsDispatch,
} from 'hooks/membershipCards'
import useLoadMembershipCards from './hooks/useLoadMembershipCards'
// import useLoadMembershipPlans from './hooks/useLoadMembersipPlans'

import Loading from 'components/Loading'

import Config from 'Config'

const MembershipCards = ({ onError }) => {
  const { membershipCards, loading } = useMembershipCardsState()
  const { deleteMembershipCard } = useMembershipCardsDispatch()
  useLoadMembershipCards(onError)

  // // todo: might not be used anymore. to check and remove if possible
  // useLoadMembershipPlans()
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

          {/* todo: temporary to allow adding cards more easily in dev mode */}
          { process.env.NODE_ENV === 'development' && (
            <div className='dev-only'>
              <Link to={`/membership-card/add/${Config.membershipPlanId}`}>Add a card</Link>
            </div>
          ) }
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
