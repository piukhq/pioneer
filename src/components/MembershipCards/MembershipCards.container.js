import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actions as membershipCardsActions } from 'ducks/membershipCards'

import MembershipCardsView from './MembershipCards.view'

const MembershipCardsContainer = ({ onError }) => {
  const dispatch = useDispatch()
  const membershipCards = useSelector(state => state.membershipCards.cards)
  const error = useSelector(state => state.membershipCards.error)
  useEffect(() => {
    dispatch(membershipCardsActions.getMembershipCards())
  }, [])

  useEffect(() => {
    error && onError && onError(error)
  }, [error, onError])

  return (
    <MembershipCardsView membershipCards={membershipCards} />
  )
}

export default MembershipCardsContainer
