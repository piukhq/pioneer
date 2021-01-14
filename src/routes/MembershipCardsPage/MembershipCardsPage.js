import React, { useCallback } from 'react'
import { useHistory, Link } from 'react-router-dom'
import MembershipCards from 'components/MembershipCards'

const MembershipCardsPage = () => {
  const history = useHistory()
  const handleError = useCallback(() => {
    // todo: currently it redirects to the login page regardless of the error. Should do that only when the error is due to a 401 HTTP like response
    history.replace('/login')
  }, [history])
  return (
    <div>
      <h1>Membership cards</h1>
      <MembershipCards onError={handleError}/>

      <br /><br /><br />
      <Link to={'/payment-cards'}>Payment Cards</Link>
    </div>
  )
}

export default MembershipCardsPage
