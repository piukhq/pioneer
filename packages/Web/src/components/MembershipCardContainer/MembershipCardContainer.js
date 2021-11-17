import React from 'react'
import cx from 'classnames'
import MembershipCardHeroImage from './components/MembershipCardHeroImage'

import styles from './MembershipCardContainer.module.scss'
import AuthorisedState from './components/AuthorisedState'
import NoPaymentCardsState from './components/NoPaymentCardsState'
import UnauthorisedState from './components/UnauthorisedState'

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

  const renderTileContents = () => {
    switch (state) {
      case 'authorised': return <AuthorisedState membershipCard={membershipCard} state={state} />
      case 'no-payment-cards': return <NoPaymentCardsState state={state} />
      default: return <UnauthorisedState membershipCard={membershipCard} state={state} />
    }
  }

  return (
    <section data-testid='membership-card-rewards-history-section' className={cx(
      styles.root,
      styles[`root--${state}`],
    )}>
      <MembershipCardHeroImage membershipCard={membershipCard} />
      {renderTileContents()}
    </section>
  )
}

export default React.memo(MembershipCardContainer)
