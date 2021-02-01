import { useEffect } from 'react'
import { useMembershipPlansDispatch } from 'hooks/membershipPlans'

const useLoadMembershipPlans = () => {
  const { getMembershipPlans } = useMembershipPlansDispatch()
  useEffect(() => {
    getMembershipPlans()
  }, [getMembershipPlans])
}

export default useLoadMembershipPlans
