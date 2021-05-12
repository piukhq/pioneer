import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectors as membershipCardsSelectors,
  actions as membershipCardsActions,
} from 'ducks/membershipCards'

const useLoadMembershipCardsReenrol = () => {
  const error = useSelector(state => state.membershipCards.error)
  const dispatch = useDispatch()
  const [reenrolFormVisible, setReenrolFormVisible] = useState(false)

  useEffect(() => {
    dispatch(membershipCardsActions.getMembershipCards())
  }, [dispatch])

  const isReenrolRequired = useSelector(state => membershipCardsSelectors.isReenrolRequired(state))

  // todo: potentially add other state checks here
  useEffect(() => {
    if (isReenrolRequired) {
      setReenrolFormVisible(true)
    }
  }, [isReenrolRequired, setReenrolFormVisible])
  return {
    error, reenrolFormVisible,
  }
}

export default useLoadMembershipCardsReenrol
