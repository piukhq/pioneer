import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { selectors as membershipCardsSelectors, actions as membershipCardsActions } from 'ducks/membershipCards'
import { actions as serviceActions } from 'ducks/service'

import { useMembershipCardsState } from 'hooks/membershipCards'

const useMerchantMembershipCardsLogic = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(membershipCardsActions.getMembershipCards())
    dispatch(serviceActions.getService())
  }, [dispatch])

  const { membershipCards } = useMembershipCardsState()
  const membershipCard = membershipCards?.[0]
  const isMembershipCardPending = membershipCard?.status?.state === 'pending'

  // note: a 404 response means serviceError. The user has to accept Bink T&C. error is also assumed on a network error
  const { success: serviceSuccess, error: serviceError, post: { success: postServiceSuccess } } = useSelector(state => state.service)

  const isReenrolRequired = useSelector(state => membershipCardsSelectors.isReenrolRequired(state))
  const isReaddRequired = useSelector(state => membershipCardsSelectors.isReaddRequired(state))

  const [shouldDisplayWeFoundYou, setShouldDisplayWeFoundYou] = useState(false)

  const history = useHistory()
  const { success } = useSelector(state => state.membershipCards)
  useEffect(() => {
    if (success) {
      switch (membershipCards.length) {
        case 0:
          history.replace(`/membership-card/add/${Config.membershipPlanId}`)
          break
        case 1:
          if (serviceError) {
            setShouldDisplayWeFoundYou(true)
          } else if (isReenrolRequired || isReaddRequired) {
            history.replace(`/membership-card/add/${Config.membershipPlanId}`)
          } else if ((serviceSuccess || postServiceSuccess) && !isMembershipCardPending) {
            history.replace(`/membership-card/${membershipCards[0].id}`)
          }
          // otherwise do nothing. Means that the `service` endpoint is still pending
          break
        default:
        // do nothing, this is an error state, the component will display the appropriate error
      }
    }
  }, [success, membershipCards, history, serviceError, serviceSuccess, postServiceSuccess, isReenrolRequired, isReaddRequired, isMembershipCardPending])

  return {
    tooManyCardsError: membershipCards.length > 1,
    shouldDisplayWeFoundYou,
    membershipCard,
    isMembershipCardPending,
  }
}

export default useMerchantMembershipCardsLogic
