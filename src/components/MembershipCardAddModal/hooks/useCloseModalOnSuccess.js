import { useMembershipCardsDispatch, useMembershipCardsState } from 'hooks/membershipCards'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const useCloseModalOnSuccess = onClose => {
  const { add: { card, success } } = useMembershipCardsState()
  const { addMembershipCardResetSuccessStatus } = useMembershipCardsDispatch()
  const history = useHistory()

  useEffect(() => {
    if (success) {
      history.replace(`/membership-card/${card.id}`)
      addMembershipCardResetSuccessStatus()
      onClose()
    }
  }, [success, onClose, addMembershipCardResetSuccessStatus, history, card])
}

export default useCloseModalOnSuccess
