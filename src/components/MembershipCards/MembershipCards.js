import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { actions as membershipCardsActions, selectors as membershipCardsSelectors } from 'ducks/membershipCards'

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
    </>
  )
}

export default MembershipCards
