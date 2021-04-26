import { useMembershipCardsState } from 'hooks/membershipCards'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import Config from 'Config'

const useMerchantMembershipCardsLogic = () => {
  const { membershipCards } = useMembershipCardsState()
  // note: a 404 response means serviceError. The user has to accept Bink T&C. error is also assumed on a network error
  const { success: serviceSuccess, error: serviceError } = useSelector(state => state.service)

  const history = useHistory()
  const { success } = useSelector(state => state.membershipCards)
  useEffect(() => {
    if (success) {
      switch (membershipCards.length) {
        case 0:
          history.replace(`/membership-card/add/${Config.membershipPlanId}`)
          break
        case 1:
          if (serviceSuccess) {
            history.replace(`/membership-card/${membershipCards[0].id}`)
          }
          if (serviceError) {
            // todo:
            //  - will have to decide where we redirect the user when this happens
            //  - for now we will direct the user the the membership card details page
            console.log('Service request failed. Might mean the the user needs to accept T&C')
            history.replace(`/membership-card/${membershipCards[0].id}`)
          }
          // otherwise do nothing. Means that the `service` endpoint is still pending
          break
        default:
        // do nothing, this is an error state, the component will display the appropriate error
      }
    }
  }, [success, membershipCards, history, serviceError, serviceSuccess])

  return {
    tooManyCardsError: membershipCards.length > 1,
  }
}

export default useMerchantMembershipCardsLogic
