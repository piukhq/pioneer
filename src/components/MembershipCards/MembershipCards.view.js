import React from 'react'
import { Link } from 'react-router-dom'

const MembershipCardsView = ({ membershipCards }) => (
  <>
    {(membershipCards || []).map(card => (
      <div key={card.id}>
        <Link to={`/membership-card/${card.id}`}>
          Id: {card.id} (plan: {card.membership_plan})
        </Link>
      </div>
    ))}
  </>
)

export default MembershipCardsView
