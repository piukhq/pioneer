import { useDispatch, useSelector } from 'react-redux'
import { actions as usersActions } from 'ducks/users'

export const useUserState = () => {
  return {
    apiKey: useSelector(state => state.users.authentication.api_key),
  }
}

export const useUsersDispatch = () => {
  const dispatch = useDispatch()
  return {
    login: (username, password) => dispatch(usersActions.login(username, password)),
  }
}
