import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions as membershipCardsActions } from 'ducks/membershipCards'
import { actions as serviceActions } from 'ducks/service'
import { useMembershipPlansDispatch } from 'hooks/membershipPlans'

const useLoadMembershipCards = () => {
  const dispatch = useDispatch()

  const error = useSelector(state => state.membershipCards.error)

  const { getMembershipPlans } = useMembershipPlansDispatch()

  useEffect(() => {
    dispatch(serviceActions.getService())
    getMembershipPlans()
    dispatch(membershipCardsActions.getMembershipCards())
  }, [dispatch, getMembershipPlans])

  return {
    error,
  }
}

export default useLoadMembershipCards
