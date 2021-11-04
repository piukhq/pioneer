import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { actions as usersActions } from 'ducks/users'

export const useLogout = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const logout = () => {
    dispatch(usersActions.logout())
    history.push('/')
  }
  return {
    logout,
  }
}
