import React, { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import MembershipCards from 'components/MembershipCards'

const MembershipCardsPage = () => {
  const [error, setError] = useState(false)
  const handleError = useCallback(() => {
    setError(true)
  }, [setError])
  return (
    <div>
      <h1>Membership cards</h1>
      { error ? (
        <p>There was an error</p>
      ) : (
        <MembershipCards onError={handleError}/>
      ) }

      <br /><br /><br />
      <Link to={'/payment-cards'}>Payment Cards</Link>
      <br />
      <Link to={'/membership-plans'}>Membership Plans</Link>
    </div>
  )
}

export default MembershipCardsPage
