import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { isTokenUsed } from 'utils/magicLink'
import { selectors as membershipCardsSelectors, actions as membershipCardsActions } from 'ducks/membershipCards'
import { actions as serviceActions } from 'ducks/service'
import { actions as usersActions } from 'ducks/users'
import {
  actions as allActions,
} from 'ducks/all'

import { useMembershipPlansDispatch } from 'hooks/membershipPlans'

const useRedirectLogic = () => {
  const { magicLinkToken, id: membershipCardId } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const {
    loading: magicLinkAuthenticationLoading,
    error: magicLinkAuthenticationError,
    success: magicLinkAuthenticationSuccess,
  } = useSelector(state => state.users.magicLinkAuthentication)

  // const isReenrolRequired = useSelector(state => membershipCardsSelectors.isReenrolRequired(state))
  // const isReaddRequired = useSelector(state => membershipCardsSelectors.isReaddRequired(state))

  // const membershipCardList = useSelector(state => membershipCardsSelectors.cardsList(state))
  // const { success: serviceSuccess, error: serviceError, loading: serviceLoading, post: { success: postServiceSuccess } } = useSelector(state => state.service)

  const [shouldDisplayWeFoundYou, setShouldDisplayWeFoundYou] = useState(false)

  // const [shouldX, setShouldX] = useState(false)

  // const membershipCard = useSelector(state => state.membershipCards.cards[membershipCardId])

  // useEffect(() => {
  //   console.log(membershipCard)
  // }, [membershipCard])

  useEffect(() => {
    if (magicLinkAuthenticationError) {
      history.replace('/login')
    } else if (magicLinkAuthenticationSuccess || isTokenUsed(magicLinkToken)) {
      history.replace('/')

      // // Check user consent
      // dispatch(serviceActions.getService())

      // // Get the membership card
      // dispatch(membershipCardsActions.getMembershipCards())

      // setShouldX(true)
    } else if (!isTokenUsed(magicLinkToken)) {
      dispatch(usersActions.magicLinkAuthentication(magicLinkToken))
    }
  }, [magicLinkToken, magicLinkAuthenticationSuccess, magicLinkAuthenticationError, history, dispatch])

  // useEffect(() => {
  //   // console.log('membershipCardList', membershipCardList)
  //   // console.log('serviceError', serviceError)

  //   if (membershipCardList.length > 0) {
  //     if (serviceError) {
  //       setShouldDisplayWeFoundYou(true)
  //     }
  //     // Navigate to join/enrol journey
  //     if ((isReenrolRequired || isReaddRequired) && Config.isMerchantChannel) {
  //       history.replace(`/membership-card/add/${Config.membershipPlanId}`)
  //     } else if (serviceSuccess || postServiceSuccess) {
  //       // Navigate to Loyalty Card Details screen on successful login
  //       console.log('LOGGING IN')
  //       history.replace('/')
  //     }
  //   }
  // }, [isReenrolRequired, isReaddRequired, history, membershipCardList, serviceSuccess, postServiceSuccess, serviceError])

  // const { getMembershipPlans } = useMembershipPlansDispatch()

  // useEffect(() => {
  //   if (shouldX) {
  //     console.log('Calling full refresh')
  //     dispatch(allActions.fullRefresh())

  //     console.log('Calling get membership plans')
  //     getMembershipPlans()
  //   }
  // }, [dispatch, shouldX, getMembershipPlans])

  return { shouldDisplayWeFoundYou }
}

export default useRedirectLogic
