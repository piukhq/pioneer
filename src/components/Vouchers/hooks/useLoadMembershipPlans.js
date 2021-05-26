import { useEffect } from 'react'
import { useMembershipPlansDispatch } from 'hooks/membershipPlans'

const useLoadMembershipPlans = () => {
  /*
   todo: to consider the soft loading approach used through the app with regards to plans.
   where data can be loaded only if not present or not in the process of being loaded so that is only called once.
  */

  const { getMembershipPlans } = useMembershipPlansDispatch()
  useEffect(() => {
    getMembershipPlans()
  }, [getMembershipPlans])
}

export default useLoadMembershipPlans
