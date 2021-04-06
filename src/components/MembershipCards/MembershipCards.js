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
import MerchantMultipleMemberships from './components/MerchantMultipleMemberships'

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
              Id: {card.card.membership_id}
            </Link>{' '}
            <span style={{ color: '#999', fontSize: '0.7rem', textDecoration: 'none' }}>
              (plan: {card.membership_plan}){' '}
              (id: {card.id})
              ({card?.status?.state})
            </span>
          </div>
        ))
      ) }
      { Config.isMerchantChannel && membershipCards.length > 1 && (
        <MerchantMultipleMemberships />
      ) }
      { !Config.isMerchantChannel && membershipCards.length > 1 && (
        <>
          {/* todo: copy TBD */}
          You have more than one membership card associated to your account.
          You'll have to remove {membershipCards.length - 1} cards to continue.

          {/* todo: temporary to allow adding cards more easily in dev mode */}

        </>
      ) }
      { process.env.NODE_ENV === 'development' && ( // todo: refactor out into own dev component
            <div className='dev-only'>
              <Link to={`/membership-card/add/${Config.membershipPlanId}`}>Add a card</Link>
              <br /><br /><br />
              <Link to={'/payment-cards'}>Payment Cards</Link>
              <br />
              <Link to={'/membership-plans'}>Membership Plans</Link>
              {membershipCards.map(card => (
                <div key={card.id}>
                  Card number {card.card.membership_id}{' '}
                  <button onClick={() => deleteMembershipCard(card.id)}>Remove</button>
                  { process.env.NODE_ENV === 'development' && (
                    <>
                      {' '}
                      <Link to={`/membership-card/${card.id}`} className='dev-only'>
                        View card
                      </Link>
                    </>
                  ) }
                </div>
              ))}
            </div>
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
