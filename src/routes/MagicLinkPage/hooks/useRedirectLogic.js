import { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { isTokenUsed } from 'utils/magicLink'
import { actions as usersActions } from 'ducks/users'

const useRedirectLogic = () => {
  const { magicLinkToken } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const { loading, error, success } = useSelector(state => state.users.magicLinkAuthentication)

  useEffect(() => {
    if (error) {
      history.replace('/login')
    } else if (success) {
      history.replace('/')
    } else if (isTokenUsed(magicLinkToken)) {
      history.replace('/')
    } else if (!isTokenUsed(magicLinkToken)) {
      dispatch(usersActions.magicLinkAuthentication(magicLinkToken))
    }
  }, [magicLinkToken, success, error, history, dispatch])

  return { loading }
}

export default useRedirectLogic
