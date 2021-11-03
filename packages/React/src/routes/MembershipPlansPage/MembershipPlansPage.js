import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  actions as membershipPlansActions,
  selectors as membershipPlansSelectors,
} from 'ducks/membershipPlans'

const MembershipPlansPage = () => {
  const plans = useSelector(state => membershipPlansSelectors.plansList(state))
  console.log(plans)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(membershipPlansActions.getMembershipPlans())
  }, [dispatch])

  return (
    <div>
      {plans.map((plan, index) => (
        <div key={plan.id} style={{ minHeight: 15 }}>
          {index + 1}. {plan.account.plan_name} ({plan.id})
        </div>
      ))}
    </div>
  )
}

export default MembershipPlansPage
