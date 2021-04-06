import React from 'react'
import { Link } from 'react-router-dom'
import {
  useMembershipCardsState,
  useMembershipCardsDispatch,
} from 'hooks/membershipCards'

const MembershipCardsList = () => {
  const { membershipCards } = useMembershipCardsState()
  const { deleteMembershipCard } = useMembershipCardsDispatch()

  return (
    <>
     {membershipCards.map(card => (
            <div key={card.id}>
              Card number {card.card.membership_id}{' '}
              <button onClick={() => deleteMembershipCard(card.id)}>Remove</button>
              { process.env.NODE_ENV === 'development' && (
                <>
                  {' '}
                  <Link to={`/membership-card/${card.id}`} className='dev-only'>
                    View card
                  </Link>
                </>
              ) }
            </div>
     ))}
    </>
  )
}

export default MembershipCardsList
