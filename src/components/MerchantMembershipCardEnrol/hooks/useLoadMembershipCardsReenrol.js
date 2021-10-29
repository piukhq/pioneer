import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectors as membershipCardsSelectors,
  actions as membershipCardsActions,
} from 'ducks/membershipCards'

export const useLoadMembershipCardsReenrol = () => {
  const dispatch = useDispatch()
  const [reenrolFormVisible, setReenrolFormVisible] = useState(false)

  useEffect(() => {
    dispatch(membershipCardsActions.getMembershipCards())
  }, [dispatch])

  const isReenrolRequired = useSelector(state => membershipCardsSelectors.isReenrolRequired(state))

  useEffect(() => {
    if (isReenrolRequired) {
      setReenrolFormVisible(true)
    }
  }, [isReenrolRequired, setReenrolFormVisible])
  return {
    reenrolFormVisible,
  }
}

