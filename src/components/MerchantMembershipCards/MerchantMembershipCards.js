import React from 'react'
import cx from 'classnames'
import useLogout from 'hooks/useLogout'
import useContactSupport from 'hooks/useContactSupport'
import useMerchantMembershipCardsLogic from './hooks/useMerchantMembershipCardsLogic'
import MultichannelMembershipCards from '../MultichannelMembershipCards'
import Button from 'components/Button'
import HangTight from 'components/HangTight'

import WeFoundYou from 'components/WeFoundYou'
import MembershipCardRefresher from 'components/MembershipCardRefresher'
import PreparingYourCard from 'components/PreparingYourCard'

import styles from './MerchantMembershipCards.module.scss'

const MerchantMembershipCards = () => {
  const { contactSupport } = useContactSupport()
  const { logout } = useLogout()

  const { tooManyCardsError, shouldDisplayWeFoundYou, membershipCard, isMembershipCardPending } = useMerchantMembershipCardsLogic()

  if (tooManyCardsError) {
    return (
      <div className={styles.root}>
        <h1 className={cx(styles.root__heading)}>There is a problem</h1>
        <p className={styles.root__body}>It looks like there is a problem with your account.</p>
        <p className={styles.root__body}>Please contact us so we can help resolve this as quickly as possible.</p>
        {/* todo: consider replacing button with link tag to match its functionality */}
        <Button onClick={contactSupport} className={styles.root__button}>Get in Touch</Button>
        <Button onClick={logout} className={styles.root__button} secondary>Logout</Button>
        {/* used for development */}
        { process.env.NODE_ENV === 'development' && (
          <div className="dev-only">
            <MultichannelMembershipCards/>
          </div>
        ) }
      </div>
    )
  }

  if (shouldDisplayWeFoundYou) return <WeFoundYou />

  if (isMembershipCardPending) {
    return (
      <>
        <MembershipCardRefresher membershipCardId={membershipCard.id} />
        <PreparingYourCard />
      </>
    )
  }

  return <HangTight />
}

export default MerchantMembershipCards
