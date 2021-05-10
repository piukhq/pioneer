import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  selectors as membershipCardsSelectors,
  actions as membershipCardsActions,
} from 'ducks/membershipCards'

const useLoadMembershipCardsReenrol = () => {
  const error = useSelector(state => state.membershipCards.error)
  const dispatch = useDispatch()
  const history = useHistory()

  const [isReenrol, setIsReenrol] = useState(false)

  useEffect(() => {
    dispatch(membershipCardsActions.getMembershipCards())
  }, [dispatch])

  const isReenrolSelector = useSelector(state => membershipCardsSelectors.isReenrol(state))

  // todo: potentially add other state checks here
  useEffect(() => {
    if (isReenrolSelector) {
      setIsReenrol(true)
    }
  }, [isReenrolSelector, setIsReenrol, history])
  return {
    error, isReenrol,
  }
}

export default useLoadMembershipCardsReenrol
