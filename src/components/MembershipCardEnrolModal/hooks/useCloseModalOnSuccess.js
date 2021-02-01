import { useMembershipCardsDispatch, useMembershipCardsState } from 'hooks/membershipCards'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const useCloseModalOnSuccess = onClose => {
  const { add: { card, success } } = useMembershipCardsState()
  const { addMembershipCardReset } = useMembershipCardsDispatch()
  const history = useHistory()

  useEffect(() => {
    if (success) {
      history.replace(`/membership-card/${card.id}`)
      addMembershipCardReset()
      onClose()
    }
  }, [success, onClose, addMembershipCardReset, history, card])
}

export default useCloseModalOnSuccess
