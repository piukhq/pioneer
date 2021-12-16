import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useCheckSessionEnded } from 'hooks/useCheckSessionEnded'
import {
  actions as membershipPlansActions,
  selectors as membershipPlansSelectors,
} from 'ducks/membershipPlans'
import Brands from 'components/Brands'

const MembershipPlansPage = () => {
  useCheckSessionEnded()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(membershipPlansActions.getMembershipPlans())
  }, [dispatch])

  const plans = useSelector(state => membershipPlansSelectors.sortedNonPLLPlansList(state))

  return (
    <Brands plans={plans} />
  )
}

export default MembershipPlansPage
