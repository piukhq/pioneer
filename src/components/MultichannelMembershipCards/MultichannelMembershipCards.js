import React from 'react'
import { Link } from 'react-router-dom'
import { useMembershipCardsState } from 'hooks/membershipCards'
import cx from 'classnames'
import LoadingIndicator from 'components/LoadingIndicator'
import AccountMenu from 'components/AccountMenu'
import styles from './MultichannelMembershipCards.module.scss'

const MultichannelMembershipCards = () => {
  const { membershipCards, loading } = useMembershipCardsState()

  return (
    <div className={styles.root}>
       <AccountMenu />
      <h1 className={cx(styles.root__heading)}>Membership Cards</h1>
      {membershipCards.map(card => (
        <div key={card.id}>
          <Link to={`/membership-card/${card.id}`}>
            Id: {card.card.membership_id}
          </Link>{' '}
          <span style={{ color: '#999', fontSize: '0.7rem', textDecoration: 'none' }}>
            (plan: {card.membership_plan}){' '}
            (id: {card.id})
            ({card?.status?.state})
          </span>
        </div>
      ))}
      <Link to={`/membership-card/add/${Config.membershipPlanId}`}>Add a card</Link>
      <br /><br /><br />
      <Link to={'/payment-cards'}>Credit/debit cards</Link>
      <br />
      <Link to={'/membership-plans'}>Membership Plans</Link>
      { loading && <LoadingIndicator /> }
    </div>
  )
}

export default MultichannelMembershipCards
