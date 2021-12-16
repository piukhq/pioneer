import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import cx from 'classnames'
import Button from 'components/Button'
import AccountMenu from 'components/AccountMenu'
import AppLinks from 'components/AppLinks'
import LoadingIndicator from 'components/LoadingIndicator'
import TermsAndConditionsCheck from 'components/TermsAndConditionsCheck'
import MembershipCard from './components/MembershipCard'
import { useMembershipCardsState } from 'hooks/membershipCards'
import { ReactComponent as EmptyWalletSvg } from 'images/empty-wallet.svg'

import styles from './MultichannelMembershipCards.module.scss'

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
    return (
      <div className={styles['root__cards-container']} data-testid='cards-container'>
        { membershipCards.map((card, index) => <MembershipCard card={card} key={index} />) }
      </div>
    )
  }

  const renderEmptyState = () => {
    return (
      <div className={styles['root__empty-state-container']} data-testid='empty-state-container' id='multichannel-membership-cards-empty-state-container'>
        <EmptyWalletSvg className={styles['root__empty-state-icon']} data-testid='empty-state-icon' />

        <div className={styles['root__empty-state-text-container']}>
          <div className={styles['root__empty-state-title']}>Your wallet is empty</div>
            <Link to='/membership-plans'>
              <Button data-testid='empty-state-add-button'>Add an existing loyalty card</Button>
            </Link>
          <div className={styles['root__empty-state-description']}>
            <div className={styles['root__empty-state-paragraph']}>Or</div>
            <div className={styles['root__empty-state-paragraph']}>Download the Bink mobile app to get access to even more rewards</div>
          </div>
        </div>

        <div className={styles['root__app-info-container']}>
          <div className={styles['root__app-info-header']}>
            <div className={styles['root__app-icon']} />

            <div className={styles['root__app-info-text-container']}>
              <div className={styles['root__app-info-text-header']}>Download Bink Loyalty & Rewards Wallet</div>
              <div>Store, View, Link your Loyalty</div>
            </div>
          </div>

          <div className={styles['root__app-images-container']}>
            <div className={cx(styles['root__app-image'], styles['root__app-image--image-1'])} />
            <div className={cx(styles['root__app-image'], styles['root__app-image--image-2'])} />
            <div className={cx(styles['root__app-image'], styles['root__app-image--image-3'])} />
          </div>

          <AppLinks />
        </div>
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

      { membershipCards.length > 0 ? renderMembershipCardsContent() : renderEmptyState() }
    </div>
  )
}

export default MultichannelMembershipCards
