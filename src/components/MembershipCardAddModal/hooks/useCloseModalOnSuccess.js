import { useMembershipCardsDispatch, useMembershipCardsState } from 'hooks/membershipCards'
import { useEffect } from 'react'

const useCloseModalOnSuccess = onClose => {
  const { add: { success } } = useMembershipCardsState()
  const { addMembershipCardReset } = useMembershipCardsDispatch()
  useEffect(() => {
    if (success) {
      addMembershipCardReset()
      onClose()
    }
  }, [success, onClose, addMembershipCardReset])
}

export default useCloseModalOnSuccess
