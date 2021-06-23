import { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { isTokenUsed } from 'utils/magicLink'
import { selectors as membershipCardsSelectors, actions as membershipCardsActions } from 'ducks/membershipCards'
import { actions as serviceActions } from 'ducks/service'
import { actions as usersActions } from 'ducks/users'

const useRedirectLogic = () => {
  const { magicLinkToken } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const {
    loading: magicLinkAuthenticationLoading,
    error: magicLinkAuthenticationError,
    success: magicLinkAuthenticationSuccess,
  } = useSelector(state => state.users.magicLinkAuthentication)

  const isReenrolRequired = useSelector(state => membershipCardsSelectors.isReenrolRequired(state))
  const isReaddRequired = useSelector(state => membershipCardsSelectors.isReaddRequired(state))
  const membershipCardList = useSelector(state => membershipCardsSelectors.cardsList(state))
  const { success: serviceSuccess, loading: serviceLoading, post: { success: postServiceSuccess } } = useSelector(state => state.service)

  useEffect(() => {
    if (magicLinkAuthenticationError) {
      history.replace('/login')
    } else if (magicLinkAuthenticationSuccess || isTokenUsed(magicLinkToken)) {
      // history.replace('/')

      // Check user consent
      dispatch(serviceActions.getService())

      // Get the membership card
      dispatch(membershipCardsActions.getMembershipCards())
    } else if (!isTokenUsed(magicLinkToken)) {
      dispatch(usersActions.magicLinkAuthentication(magicLinkToken))
    }
  }, [magicLinkToken, magicLinkAuthenticationSuccess, magicLinkAuthenticationError, history, dispatch])

  useEffect(() => {
    if (membershipCardList.length > 0) {
      // Navigate to join/enrol journey
      if ((isReenrolRequired || isReaddRequired) && Config.isMerchantChannel) {
        history.replace(`/membership-card/add/${Config.membershipPlanId}`)
      } else if (serviceSuccess || postServiceSuccess) {
        // Navigate to Loyalty Card Details screen on successful login
        history.replace('/')
      }
    }
  }, [isReenrolRequired, isReaddRequired, history, membershipCardList, serviceSuccess, postServiceSuccess])
}

export default useRedirectLogic
