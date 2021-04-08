import React, { useCallback, useState } from 'react'
import { useMembershipCardsState } from 'hooks/membershipCards'
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

  const { loading } = useMembershipCardsState()
  useLoadMembershipCards(handleError)
  return error ? <p>There was an error</p> : (
    <>
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

export default MembershipCardsPage
