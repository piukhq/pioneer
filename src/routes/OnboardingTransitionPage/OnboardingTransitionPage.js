import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import HangTight from 'components/HangTight'
import WeFoundYou from 'components/WeFoundYou'
import MembershipCardRefresher from 'components/MembershipCardRefresher'
import PreparingYourCard from 'components/PreparingYourCard'

import useRedirectLogic from './hooks/useRedirectLogic'

const OnboardingTransitionPage = () => {
  useRedirectLogic()
  const { id: membershipCardId } = useParams()
  const membershipCard = useSelector(state => state.membershipCards.cards[membershipCardId])

  const { error: serviceError } = useSelector(state => state.service)

  if (serviceError) return <WeFoundYou />

  if (membershipCard?.status?.state === 'pending' && Config.isMerchantChannel) {
    return (
      <>
        <MembershipCardRefresher membershipCardId={membershipCardId} />
        <PreparingYourCard />
      </>
    )
  }

  return <HangTight />
}

export default OnboardingTransitionPage
