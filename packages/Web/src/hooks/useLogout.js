import { useDispatch } from 'react-redux'
import { actions as usersActions } from 'ducks/users'

export const useLogout = () => {
  const dispatch = useDispatch()
  const logout = () => {
    dispatch(usersActions.logout())
  }
  return {
    logout,
  }
}
