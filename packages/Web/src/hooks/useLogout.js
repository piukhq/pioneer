import { useDispatch } from 'react-redux'
import { actions as usersActions } from 'ducks/users'

export const useLogout = () => {
  const { env, theme } = Config
  const dispatch = useDispatch()
  const logout = () => {
    dispatch(usersActions.logout())
    window.location.href = `/${env}/${theme}`
  }
  return {
    logout,
  }
}
