import { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { isTokenUsed } from 'utils/magicLink'
import { actions as usersActions } from 'ducks/users'

const useRedirectLogic = () => {
  const { magicLinkToken } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const {
    error: magicLinkAuthenticationError,
    success: magicLinkAuthenticationSuccess,
  } = useSelector(state => state.users.magicLinkAuthentication)

  useEffect(() => {
    if (magicLinkAuthenticationError) {
      history.replace('/login')
    } else if (magicLinkAuthenticationSuccess || isTokenUsed(magicLinkToken)) {
      history.replace('/')
    } else if (!isTokenUsed(magicLinkToken)) {
      dispatch(usersActions.magicLinkAuthentication(magicLinkToken))
    }
  }, [magicLinkToken, magicLinkAuthenticationSuccess, magicLinkAuthenticationError, history, dispatch])
}

export default useRedirectLogic
