import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectors as membershipCardsSelectors,
  actions as membershipCardsActions,
} from 'ducks/membershipCards'

const useLoadMembershipCardsStatus = () => {
  const error = useSelector(state => state.membershipCards.error)
  const dispatch = useDispatch()

  const [isReenrol, setIsReenrol] = useState(false)

  useEffect(() => {
    dispatch(membershipCardsActions.getMembershipCards())
  }, [dispatch])

  const membershipCardStatus = useSelector(state => membershipCardsSelectors.membershipCardsStatus(state))

  useEffect(() => {
    if (membershipCardStatus === 'reenrol') {
      setIsReenrol(true)
    }
  }, [membershipCardStatus, setIsReenrol])
  return {
    error, isReenrol,
  }
}

export default useLoadMembershipCardsStatus
