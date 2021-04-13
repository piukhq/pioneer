import { useMembershipCardsState } from 'hooks/membershipCards'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import Config from 'Config'

const useMerchantMembershipCardsLogic = () => {
  const { membershipCards } = useMembershipCardsState()

  const history = useHistory()
  const { success } = useSelector(state => state.membershipCards)
  useEffect(() => {
    if (success) {
      switch (membershipCards.length) {
        case 0:
          history.replace(`/membership-card/add/${Config.membershipPlanId}`)
          break
        case 1:
          history.replace(`/membership-card/${membershipCards[0].id}`)
          break
        default:
        // do nothing, this is an error state, the component will display the appropriate error
      }
    }
  }, [success, membershipCards, history])

  return {
    tooManyCardsError: membershipCards.length > 1,
  }
}

export default useMerchantMembershipCardsLogic
