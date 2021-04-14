import React from 'react'
import useLogout from 'hooks/useLogout'
import { Link } from 'react-router-dom'
import { useMembershipCardsState } from 'hooks/membershipCards'
import styles from './MultichannelMembershipCards.module.scss'
import cx from 'classnames'
import Config from 'Config'
import Loading from 'components/Loading'

const MultichannelMembershipCards = () => {
  const { membershipCards, loading } = useMembershipCardsState()
  const { logout } = useLogout()

  return (
    <div className={styles.root}>
      <h1 className={cx(styles.root__heading, styles['root__heading--first'])}>Membership Cards</h1>
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
      <Link to={'/payment-cards'}>Payment Cards</Link>
      <br />
      <Link to={'/membership-plans'}>Membership Plans</Link>
      <button onClick={logout}>Logout</button>
      { loading && <Loading /> }
    </div>
  )
}

export default MultichannelMembershipCards
