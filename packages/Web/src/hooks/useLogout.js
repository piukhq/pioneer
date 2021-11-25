import { useDispatch } from 'react-redux'
import { actions as usersActions } from 'ducks/users'

export const useLogout = () => {
  const dispatch = useDispatch()
  const logout = async () => {
    await dispatch(usersActions.logout())
    window.location.href = '/'
  }
  return {
    logout,
  }
}
