import React from 'react'
import Config from 'Config'
import useLoadMembershipCards from './hooks/useLoadMembershipCards'
import MerchantMembershipCards from 'components/MerchantMembershipCards'
import MultichannelMembershipCards from 'components/MultichannelMembershipCards'

const MembershipCardsPage = () => {
  const { error } = useLoadMembershipCards()

  return (
    error ? (
      <p>There was an error</p>
    ) : (
      Config.isMerchantChannel ? (
        <MerchantMembershipCards />
      ) : (
        <MultichannelMembershipCards />
      )
    )
  )
}

export default MembershipCardsPage
