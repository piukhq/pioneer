import React from 'react'
import {
  useMembershipCardsState,
} from 'hooks/membershipCards'
import useLoadMembershipCards from './hooks/useLoadMembershipCards'
// import useLoadMembershipPlans from './hooks/useLoadMembersipPlans'

import Loading from 'components/Loading'

import Config from 'Config'
import MerchantMultipleMemberships from './components/MerchantMultipleMemberships'
import BinkMultipleMemberships from './components/BinkMultipleMemberships'
import MembershipCardsList from './components/MembershipCardsList'

const MembershipCards = ({ onError }) => {
  const { membershipCards, loading } = useMembershipCardsState()
  useLoadMembershipCards(onError)

  // // todo: might not be used anymore. to check and remove if possible
  // useLoadMembershipPlans()
  return (
    <>
      {/* todo: probably should filter by membership plan id if merchant channel */}
      { !Config.isMerchantChannel && (
        <BinkMultipleMemberships />
      ) }
      { !Config.isMerchantChannel && membershipCards.length > 1 && (
        <>
          {/* todo: copy and format TBD */}
          You have more than one membership card associated to your account.
          You'll have to remove {membershipCards.length - 1} cards to continue.
          <MembershipCardsList/>
        </>
      ) }
      { Config.isMerchantChannel && membershipCards.length > 1 && (
        <MerchantMultipleMemberships />
      ) }
      {/* <RecreateRemovedMembershipCard /> */}
      {/* todo: to decide on the visuals of loading */}
      { loading && (
        <Loading />
      ) }
    </>
  )
}

export default MembershipCards
