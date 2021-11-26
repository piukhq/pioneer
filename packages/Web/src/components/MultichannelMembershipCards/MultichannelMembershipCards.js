import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import AccountMenu from 'components/AccountMenu'
import LoadingIndicator from 'components/LoadingIndicator'
import TermsAndConditionsCheck from 'components/TermsAndConditionsCheck'
import { useMembershipCardsState } from 'hooks/membershipCards'
import { ReactComponent as FuelGaugeSvg } from 'images/fuel.svg'

import styles from './MultichannelMembershipCards.module.scss'
import MembershipCard from './components/MembershipCard'

const MultichannelMembershipCards = () => {
  const { membershipCards, loading } = useMembershipCardsState()
  const { error: serviceError, post: postService } = useSelector(state => state.service)
  const [shouldRenderTermsAndConditionsCheck, setShouldRenderTermsAndConditionsCheck] = useState(false)

  useEffect(() => {
    if (serviceError) {
      setShouldRenderTermsAndConditionsCheck(true)
    }
    if (postService?.success) {
      setShouldRenderTermsAndConditionsCheck(false)
    }
  }, [setShouldRenderTermsAndConditionsCheck, serviceError, postService])

  const getTermsAndConditionsProps = () => {
    if (membershipCards.length === 0) {
      return {
        heading: 'Welcome to Bink',
        paragraphTwoPrefix: 'To use Bink services,',
      }
    }
    return {
      heading: 'We found you',
      paragraphOne: 'You already have an account with Bink.',
      paragraphTwoPrefix: 'To login to your account,',
    }
  }

  if (shouldRenderTermsAndConditionsCheck) {
    return <TermsAndConditionsCheck {...getTermsAndConditionsProps()} />
  }

  const renderMembershipCardsContent = () => {
    if (membershipCards.length > 0) {
      return (
        membershipCards.map((card, index) => (
            <MembershipCard card={card} key={index} />
        ))
      )
    }
    return (
      <div className={styles['root__empty-state-container']} data-testid='empty-state-container' id='multichannel-membership-cards-empty-state-container'>
        <FuelGaugeSvg className={styles['root__empty-state-icon']} data-testid='empty-state-icon' />
        <div className={styles['root__empty-state-text']}>You have no cards</div>
      </div>
    )
  }

  if (loading) {
    return <LoadingIndicator />
  }

  return (
    <div className={styles.root} data-testid='root-container' id='multichannel-membership-cards-container'>
      <div data-testid='account-menu-container'>
        <AccountMenu />
      </div>

      <h1 className={styles.root__heading}>Wallet</h1>
      <div className={styles['root__cards-container']} data-testid='cards-container'>
        {renderMembershipCardsContent()}
      </div>
    </div>
  )
}

export default MultichannelMembershipCards
