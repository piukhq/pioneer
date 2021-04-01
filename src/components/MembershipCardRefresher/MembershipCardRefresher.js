// import React from 'react'
import useCardRefresher from '../../hooks/useCardRefresher'
import { useMembershipCardsDispatch, useMembershipCardStateById } from 'hooks/membershipCards'

const MembershipCardRefresher = ({ membershipCardId }) => {
  const PENDING_STATE = 'pending'
  const { membershipCard, loading } = useMembershipCardStateById(membershipCardId)
  const cardStatus = membershipCard?.status?.state
  const { getMembershipPlans } = useMembershipCardsDispatch()
  useCardRefresher(membershipCard, getMembershipPlans, cardStatus, PENDING_STATE, loading)

  return null
}

export default MembershipCardRefresher
