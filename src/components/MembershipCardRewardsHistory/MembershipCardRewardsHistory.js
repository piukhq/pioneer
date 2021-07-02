import React from 'react'
import cx from 'classnames'
import MembershipCardHeroImage from './components/MembershipCardHeroImage'
import RewardsHistory from './components/RewardsHistory'

import styles from './MembershipCardRewardsHistory.module.scss'

const MembershipCardRewardsHistory = ({ membershipCard, addPaymentCardClickHandler = () => {} }) => {
  const { payment_cards: paymentCards = [] } = membershipCard

  // possible states: authorised, failed, pending, suggested, unauthorised
  // let state = membershipCard?.status?.state
  // if (state === 'suggested' || state === 'unauthorised') {
  //   state = 'failed'
  // } else if (paymentCards.length === 0) {
  //   state = 'no-payment-cards'
  // }

  const state = 'pending'

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

export default MembershipCardRewardsHistory
