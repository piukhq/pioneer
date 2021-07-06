import React from 'react'
import cx from 'classnames'
import MembershipCardHeroImage from './components/MembershipCardHeroImage'
import RewardsHistory from './components/RewardsHistory'

import styles from './MembershipCardContainer.module.scss'

const MembershipCardContainer = ({ membershipCard, addPaymentCardClickHandler = () => {} }) => {
  const { payment_cards: paymentCards = [] } = membershipCard

  // possible states: authorised, failed, pending, suggested, unauthorised
  let state = membershipCard?.status?.state
  if (state === 'suggested' || state === 'unauthorised') {
    state = 'failed'
  } else if (paymentCards.length === 0) {
    state = 'no-payment-cards'
  }

  return (
    <section data-testid='membership-card-rewards-history-section' className={cx(
      styles.root,
      styles[`root--${state}`],
    )}>
      <MembershipCardHeroImage membershipCard={membershipCard} />
      <RewardsHistory membershipCard={membershipCard} state={state} addPaymentCardClickHandler={addPaymentCardClickHandler} />
    </section>
  )
}

export default MembershipCardContainer
