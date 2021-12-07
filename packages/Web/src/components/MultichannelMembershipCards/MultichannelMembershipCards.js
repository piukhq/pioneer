import React, { useEffect, useState } from 'react'
import { isMobile, osName } from 'react-device-detect'
import { useSelector } from 'react-redux'
import cx from 'classnames'
import AccountMenu from 'components/AccountMenu'
import LoadingIndicator from 'components/LoadingIndicator'
import TermsAndConditionsCheck from 'components/TermsAndConditionsCheck'
import MembershipCard from './components/MembershipCard'
import { useMembershipCardsState } from 'hooks/membershipCards'
import { ReactComponent as EmptyWalletSvg } from 'images/empty-wallet.svg'
import { MOBILE_OS_NAMES as osEnums } from 'utils/enums'

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

  const renderAppLinks = () => {
    const iosLink = (
      <a href='https://apps.apple.com/gb/app/bink-loyalty-rewards-wallet/id1142153931' target="_blank" rel="noreferrer">
        <div className={cx(styles['root__app-link'], styles['root__app-link--ios-store'])} />
      </a>
    )

    const androidLink = (
      <a href='https://play.google.com/store/apps/details?id=com.bink.wallet&hl=en_GB&gl=US' target="_blank" rel="noreferrer">
        <div className={cx(styles['root__app-link'], styles['root__app-link--android-store'])} />
      </a>
    )

    if (isMobile) {
      return osName === osEnums.IOS ? iosLink : androidLink
    }

    return (
      <>
        {iosLink}
        {androidLink}
      </>
    )
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
          <div className={styles['root__empty-state-description']}>Add loyalty cards in the Bink mobile app to start earning rewards</div>
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

          <div className={styles['root__app-links-container']}>
            { renderAppLinks() }
          </div>
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
