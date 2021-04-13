import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions as membershipCardsActions } from 'ducks/membershipCards'

const useLoadMembershipCards = () => {
  const error = useSelector(state => state.membershipCards.error)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(membershipCardsActions.getMembershipCards())
  }, [dispatch])

  return {
    error,
  }
}

export default useLoadMembershipCards
