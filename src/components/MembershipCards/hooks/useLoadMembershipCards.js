import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions as membershipCardsActions } from 'ducks/membershipCards'

const useLoadMembershipCards = (onError) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(membershipCardsActions.getMembershipCards())
  }, [dispatch])

  const error = useSelector(state => state.membershipCards.error)
  useEffect(() => {
    error && onError && onError(error)
  }, [error, onError])

  return {}
}

export default useLoadMembershipCards
