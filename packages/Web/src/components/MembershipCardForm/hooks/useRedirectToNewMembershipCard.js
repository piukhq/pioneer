import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { actions as membershipCardsActions } from 'ducks/membershipCards'
import { useHistory } from 'react-router-dom'

const useRedirectToNewMembershipCard = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(membershipCardsActions.addMembershipCardResetSuccessStatus())
  }, [dispatch])

  const addSuccess = useSelector(state => state.membershipCards.add.success)
  const newMembershipCardId = useSelector(state => state.membershipCards.add.card?.id)
  const history = useHistory()
  useEffect(() => {
    if (addSuccess && newMembershipCardId) {
      history.replace('/')
    }
  }, [addSuccess, newMembershipCardId, history])
}

export default useRedirectToNewMembershipCard
