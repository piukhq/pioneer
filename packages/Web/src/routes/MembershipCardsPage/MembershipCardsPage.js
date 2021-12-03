import React from 'react'
import useLoadMembershipCards from './hooks/useLoadMembershipCards'
import MerchantMembershipCards from 'components/MerchantMembershipCards'
import MultichannelMembershipCards from 'components/MultichannelMembershipCards'
import { useCheckSessionEnded } from 'hooks/useCheckSessionEnded'

const MembershipCardsPage = () => {
  useCheckSessionEnded() // TODO: Temporary - redirect for Web-464 and inactivity logout issue
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
