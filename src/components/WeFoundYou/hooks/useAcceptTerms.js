import { useDispatch } from 'react-redux'
import { actions as usersActions } from 'ducks/users'

const useAcceptTerms = () => {
  const dispatch = useDispatch()
  const acceptTerms = () => {
    dispatch(usersActions.acceptTerms())
  }
  return {
    acceptTerms,
  }
}

export default useAcceptTerms
