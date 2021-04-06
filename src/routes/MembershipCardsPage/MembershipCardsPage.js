import React, { useCallback, useState } from 'react'
import MembershipCards from 'components/MembershipCards'

const MembershipCardsPage = () => {
  const [error, setError] = useState(false)
  const handleError = useCallback(() => {
    setError(true)
  }, [setError])
  return (
    <div>
      { error ? (
        <p>There was an error</p>
      ) : (
        <MembershipCards onError={handleError}/>
      ) }
    </div>
  )
}

export default MembershipCardsPage
