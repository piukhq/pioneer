import React from 'react'
import { useMembershipCardsState } from 'hooks/membershipCards'
import useLoadMembershipCards from './hooks/useLoadMembershipCards'
// import useLoadMembershipPlans from './hooks/useLoadMembersipPlans'

import Loading from 'components/Loading'

import Config from 'Config'
import MerchantMembershipCards from './components/MerchantMembershipCards'
import MultichannelMembershipCards from './components/MultichannelMembershipCards'

const MembershipCards = ({ onError }) => {
  const { loading } = useMembershipCardsState()
  useLoadMembershipCards(onError)

  // // todo: might not be used anymore. to check and remove if possible
  // useLoadMembershipPlans()
  return (
    <>
      {/* todo: probably should filter by membership plan id if merchant channel */}
      { !Config.isMerchantChannel && (
        <MultichannelMembershipCards />
      ) }
      { Config.isMerchantChannel && (
        <MerchantMembershipCards />
      ) }
       {/* todo: to decide on the visuals of loading */}
      { loading && (
        <Loading />
      ) }
    </>
  )
}

export default MembershipCards
