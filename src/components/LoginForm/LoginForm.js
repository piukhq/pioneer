import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { actions as usersActions } from 'ducks/users'

import styles from './LoginForm.module.scss'

const LoginForm = () => {
  // todo: to remove default values for username and password
  const [email, setEmail] = useState('bink_web_user_1@bink.com')
  const [password, setPassword] = useState('BinkWeb01')
  const dispatch = useDispatch()
  const handleLogin = () => dispatch(usersActions.login(email, password))

  return (
    <div className={styles.root}>
      <label className={styles.root__label}>
        Email
        <input className={styles.root__field} type='text' value={email} onChange={event => setEmail(event.target.value)} />
      </label>
      <label className={styles.root__label}>
        Password
        <input className={styles.root__field} type='text' value={password} onChange={event => setPassword(event.target.value)} />
      </label>
      <button className={styles.root__submit} onClick={handleLogin}>Login</button>
    </div>
  )
}

export default LoginForm
