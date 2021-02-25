import { useEffect } from 'react'
import { useMembershipPlansDispatch } from 'hooks/membershipPlans'

const useLoadMembershipPlans = () => {
  /*
   todo: to consider a soft loading approach
   where data can be loaded only if not present or in the process of being loaded
  */

  const { getMembershipPlans } = useMembershipPlansDispatch()
  useEffect(() => {
    getMembershipPlans()
  }, [getMembershipPlans])
}

export default useLoadMembershipPlans
