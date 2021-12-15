import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  actions as membershipPlansActions,
  selectors as membershipPlansSelectors,
} from 'ducks/membershipPlans'
import Brands from 'components/Brands'

const MembershipPlansPage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(membershipPlansActions.getMembershipPlans())
  }, [dispatch])

  const plans = useSelector(state => membershipPlansSelectors.plansList(state))
    .filter(plan => plan.feature_set?.card_type === 0)
    .sort((a, b) => {
      return a.account.company_name.localeCompare(b.account.company_name)
    })

  return (
    <Brands plans={plans} />
  )
}

export default MembershipPlansPage
