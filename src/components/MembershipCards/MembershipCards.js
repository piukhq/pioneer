import React from 'react'
import { Link } from 'react-router-dom'

import {
  useMembershipCardsState,
  useMembershipCardsDispatch,
} from 'hooks/membershipCards'
import useLoadMembershipCards from './hooks/useLoadMembershipCards'
import useAddMembershipCard from './hooks/useAddMembershipCard'
import MembershipCardAddModal from 'components/MembershipCardAddModal'

import RecreateRemovedMembershipCard from './RecreateRemovedMembershipCard'
import Loading from 'components/Loading'
import Button from 'components/Button'

import Config from 'Config'

const MembershipCards = ({ onError }) => {
  const { membershipCards, loading } = useMembershipCardsState()
  const { deleteMembershipCard } = useMembershipCardsDispatch()
  useLoadMembershipCards(onError)

  const {
    isAddMembershipCardModalOpen,
    setAddMembershipCardModalOpen,
  } = useAddMembershipCard()
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
          <Button onClick={() => setAddMembershipCardModalOpen(true)}>I already have a card</Button>
          <Button>Get a new card</Button>
        </>
      ) }
      { Config.isMerchantChannel && isAddMembershipCardModalOpen && (
        <MembershipCardAddModal planId={Config.membershipPlanId} onClose={() => setAddMembershipCardModalOpen(false)} />
      )}

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

          {/* todo: temporary. to remove button */}
          <Button onClick={() => setAddMembershipCardModalOpen(true)}>I already have a card</Button>
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
