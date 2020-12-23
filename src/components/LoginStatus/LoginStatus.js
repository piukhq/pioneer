import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { actions as userActions } from 'ducks/user'

import styles from './LoginStatus.module.scss'

const LoginStatus = () => {
  const loggedIn = useSelector(state => state.user.authentication.api_key)
  const dispatch = useDispatch()
  const history = useHistory()
  const logout = () => {
    dispatch(userActions.logout())
    history.push('/login')
  }
  return (
    <div className={styles['login-status']}>
      { loggedIn ? (
        <>Hello user. <span onClick={logout} className={styles['login-status__logout']}>Log out</span></>
      ) : (
        <>Not authenticated</>
      ) }
    </div>
  )
}

export default LoginStatus
