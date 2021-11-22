import useCardRefresher from './useCardRefresher'
import { useMembershipCardsDispatch, useMembershipCardStateById } from 'hooks/membershipCards'

const useMembershipCardRefresher = (membershipCardId) => {
  const PENDING_STATE = 'pending'
  const { membershipCard, loading } = useMembershipCardStateById(membershipCardId)
  const cardStatus = membershipCard?.status?.state
  const { getMembershipCards } = useMembershipCardsDispatch()
  useCardRefresher(membershipCard, getMembershipCards, cardStatus, PENDING_STATE, loading)
}

export default useMembershipCardRefresher
