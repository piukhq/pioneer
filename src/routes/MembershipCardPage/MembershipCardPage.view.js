import React, { useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { actions as allActions } from 'ducks/all'

const MembershipCardPageView = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(allActions.fullRefresh())
  }, [dispatch])

  return (
    <div>
      Membership card details
    </div>
  )
}

export default MembershipCardPageView
