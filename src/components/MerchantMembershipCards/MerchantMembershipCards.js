import React from 'react'
import cx from 'classnames'
import useLogout from 'hooks/useLogout'
import useContactSupport from 'hooks/useContactSupport'
import { useMerchantMembershipCards } from './hooks/useMerchantMembershipCards'
import { useMembershipCardDetailsByCardId } from 'hooks/useMembershipCardDetailsByCardId'
import MultichannelMembershipCards from 'components/MultichannelMembershipCards'
import Button from 'components/Button'
import HangTight from 'components/HangTight'
import PreparingYourCard from 'components/PreparingYourCard'
import TermsAndConditionsCheck from 'components/TermsAndConditionsCheck'
import styles from './MerchantMembershipCards.module.scss'

const MerchantMembershipCards = () => {
  const { contactSupport } = useContactSupport()
  const { logout } = useLogout()
  const { planName } = useMembershipCardDetailsByCardId()

  const { tooManyCardsError, shouldDisplayTermsAndConditionsCheck, membershipCard, isMembershipCardPending } = useMerchantMembershipCards()

  if (tooManyCardsError) {
    return (
      <div className={styles.root} data-testid='too-many-cards-error'>
        <h1 className={cx(styles.root__heading)}>There is a problem</h1>
        <div className={styles.root__body}>It looks like there is a problem with your account.</div>
        <div className={styles.root__body}>Please contact us so we can help resolve this as quickly as possible.</div>
        {/* todo: consider replacing button with link tag to match its functionality */}
        <Button onClick={contactSupport} className={styles.root__button}>Get in touch</Button>
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

  if (shouldDisplayTermsAndConditionsCheck) {
    return (
      <div data-testid='we-found-you'>
        <TermsAndConditionsCheck
          heading='We found you'
          paragraphOne={`You’re already a member of the ${planName}`}
          paragraphTwoPrefix= 'To view your card details here'
        />
      </div>
    )
  }

  if (isMembershipCardPending) {
    return (
      <div data-testid='preparing-your-card'>
        <PreparingYourCard membershipCardId={membershipCard?.id} />
      </div>
    )
  }

  return (
    <div data-testid='hang-tight'>
      <HangTight />
    </div>
  )
}

export default MerchantMembershipCards
