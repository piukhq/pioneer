import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addTestMembershipCard } from 'api/membershipCards'
import { actions as membershipCardsActions, selectors as membershipCardsSelectors } from 'ducks/membershipCards'

// todo: this is a temporary way of quickly recreate a membership card. To be removed once the functionality to addind a membership card was intorduced
const RecreateRemovedMembershipCard = () => {
  const dispatch = useDispatch()
  const membershipCards = useSelector(state => membershipCardsSelectors.cardsList(state))
  return (!membershipCards || membershipCards.length === 0) && (
    <>
      DEV mode only. No membership card was found.
      <button onClick={async () => {
        await addTestMembershipCard()
        dispatch(membershipCardsActions.getMembershipCards())
      } }>
        Create one
      </button>
    </>
  )
}

const MembershipCards = ({ onError }) => {
  const dispatch = useDispatch()
  const membershipCards = useSelector(state => membershipCardsSelectors.cardsList(state))
  const error = useSelector(state => state.membershipCards.error)
  useEffect(() => {
    dispatch(membershipCardsActions.getMembershipCards())
  }, [dispatch])

  useEffect(() => {
    error && onError && onError(error)
  }, [error, onError])

  return (
    <>
      {(membershipCards || []).map(card => (
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
