import React from 'react'

import styles from './LoginForm.module.scss'
import useLoginForm from './hooks/useLoginForm'

const LoginForm = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    submit: handleSubmit,
  } = useLoginForm()

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
      <button className={styles.root__submit} onClick={handleSubmit}>Login</button>
    </div>
  )
}

export default LoginForm
