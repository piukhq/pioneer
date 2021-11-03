import { useEffect } from 'react'

import {
  useMembershipPlansState,
  useMembershipPlansDispatch,
} from 'hooks/membershipPlans'

export const useLoadMembershipPlans = (planId) => {
  const {
    membershipPlanById: plan,
    loading,
    error,
  } = useMembershipPlansState(planId)
  const { getMembershipPlans } = useMembershipPlansDispatch()

  useEffect(() => {
    getMembershipPlans()
  }, [getMembershipPlans])

  return {
    plan,
    loading,
    error,
  }
}
