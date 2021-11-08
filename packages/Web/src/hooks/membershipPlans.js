import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectors as membershipPlansSelectors,
  actions as membershipPlansActions,
} from 'ducks/membershipPlans'

export const useMembershipPlansState = (id) => {
  const membershipPlans = useSelector(state => membershipPlansSelectors.plansList(state))
  const loading = useSelector(state => state.membershipPlans.loading)
  const error = useSelector(state => state.membershipPlans.error)

  const membershipPlanById = useSelector(state => state.membershipPlans.plans[id])

  return {
    error,
    loading,
    membershipPlans,
    membershipPlanById,
  }
}

export const useMembershipPlansDispatch = () => {
  const dispatch = useDispatch()
  return {
    getMembershipPlans: useCallback(() => dispatch(membershipPlansActions.getMembershipPlans()), [dispatch]),
  }
}
