// import React from 'react'
import useCardRefresher from 'hooks/useCardRefresher'
import { useMembershipCardsDispatch, useMembershipCardStateById } from 'hooks/membershipCards'

const useMembershipCardRefresher = (membershipCardId) => {
  const PENDING_STATE = 'pending'
  const { membershipCard, loading } = useMembershipCardStateById(membershipCardId)
  const cardStatus = membershipCard?.status?.state
  const { getMembershipPlans } = useMembershipCardsDispatch()
  useCardRefresher(membershipCard, getMembershipPlans, cardStatus, PENDING_STATE, loading)
}

export default useMembershipCardRefresher
