import { useEffect } from 'react'
import { useMembershipPlansDispatch } from 'hooks/membershipPlans'

export const useLoadMembershipPlans = () => {
  const { getMembershipPlans } = useMembershipPlansDispatch()
  useEffect(() => {
    getMembershipPlans()
  }, [getMembershipPlans])
}