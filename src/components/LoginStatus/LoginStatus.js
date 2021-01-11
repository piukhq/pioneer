import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { actions as usersActions } from 'ducks/users'

import styles from './LoginStatus.module.scss'

const LoginStatus = () => {
  const loggedIn = useSelector(state => state.users.authentication.api_key)
  const dispatch = useDispatch()
  const history = useHistory()
  const logout = () => {
    dispatch(usersActions.logout())
    history.push('/login')
  }
  return (
    <div className={styles.root}>
      { loggedIn ? (
        <>Hello user. <span onClick={logout} className={styles.root__logout}>Log out</span></>
      ) : (
        <>Not authenticated</>
      ) }
    </div>
  )
}

export default LoginStatus
