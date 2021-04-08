import React, { useCallback, useState } from 'react'
import { useMembershipCardsState } from 'hooks/membershipCards'
// todo: refactor useLoadMembershipCards in light of new structure
import useLoadMembershipCards from './hooks/useLoadMembershipCards'

import Config from 'Config'
import Loading from 'components/Loading'

import MerchantMembershipCards from 'components/MerchantMembershipCards'
import MultichannelMembershipCards from 'components/MultichannelMembershipCards'

const MembershipCardsPage = () => {
  const [error, setError] = useState(false)
  const handleError = useCallback(() => {
    setError(true)
  }, [setError])
  useLoadMembershipCards(handleError)
  const { loading, membershipCards } = useMembershipCardsState()
  const cards = membershipCards.filter(
    card => card.membership_plan === Config.membershipPlanId,
  )
  return error ? <p>There was an error</p> : (
    <>
    { !Config.isMerchantChannel && (
      <MultichannelMembershipCards />
    ) }
    { Config.isMerchantChannel && cards.length > 1 && (
      <MerchantMembershipCards />
    ) }
     {/* todo: to decide on the visuals of loading */}
    { loading && (
      <Loading />
    ) }
  </>
  )
}

export default MembershipCardsPage
