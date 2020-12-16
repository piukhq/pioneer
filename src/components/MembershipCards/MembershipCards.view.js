import React from 'react'

const MembershipCardsView = ({ membershipCards }) => (
  <>
    {(membershipCards || []).map(card => (
      <div key={card.id}>
        Id: {card.id} (plan: {card.membership_plan})
      </div>
    ))}
  </>
)

export default MembershipCardsView
