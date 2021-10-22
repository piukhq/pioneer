import React from 'react'
import cx from 'classnames'
import MembershipCardHeroImage from './components/MembershipCardHeroImage'
import RewardsHistory from './components/RewardsHistory'

import styles from './MembershipCardContainer.module.scss'

const MembershipCardContainer = ({ membershipCard }) => {
  let state = membershipCard?.status?.state
  if (state === 'authorised') {
    const { payment_cards: paymentCards = [] } = membershipCard

    if (paymentCards.length === 0) {
      state = 'no-payment-cards'
    }
  } else {
    state = 'unauthorised'
  }

  return (
    <section data-testid='membership-card-rewards-history-section' className={cx(
      styles.root,
      styles[`root--${state}`],
    )}>
      <MembershipCardHeroImage membershipCard={membershipCard} />
      <RewardsHistory membershipCard={membershipCard} state={state} />
    </section>
  )
}

export default React.memo(MembershipCardContainer)
