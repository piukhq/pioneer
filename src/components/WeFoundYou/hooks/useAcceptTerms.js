import { useDispatch } from 'react-redux'
import { actions as usersActions } from 'ducks/users'

const useAcceptTerms = () => {
  const dispatch = useDispatch()
  return () => {
    dispatch(usersActions.acceptTerms())
  }
}

export default useAcceptTerms
