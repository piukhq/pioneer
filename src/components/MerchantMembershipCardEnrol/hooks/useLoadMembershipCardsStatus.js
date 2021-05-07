import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  selectors as membershipCardsSelectors,
  actions as membershipCardsActions,
} from 'ducks/membershipCards'

const useLoadMembershipCardsStatus = () => {
  const error = useSelector(state => state.membershipCards.error)
  const dispatch = useDispatch()
  const history = useHistory()

  const [isReenrol, setIsReenrol] = useState(false)

  useEffect(() => {
    dispatch(membershipCardsActions.getMembershipCards())
  }, [dispatch])

  const membershipCardsStatus = useSelector(state => membershipCardsSelectors.membershipCardsStatus(state))

  // todo: potentially add other state checks here
  useEffect(() => {
    if (membershipCardsStatus === 'reenrol') {
      setIsReenrol(true)
    } else if (membershipCardsStatus === 'active') {
      history.replace('/membership-cards')
    }
  }, [membershipCardsStatus, setIsReenrol, history])
  return {
    error, isReenrol,
  }
}

export default useLoadMembershipCardsStatus
