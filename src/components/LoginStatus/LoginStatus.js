import React from 'react'
import useLogout from './hooks/useLogout'
import { useUserState } from 'hooks/users'

import styles from './LoginStatus.module.scss'

const LoginStatus = () => {
  const { apiKey } = useUserState()
  const { logout } = useLogout()

  return (
    <div className={styles.root}>
      { apiKey ? (
        <>Hello user. <span onClick={logout} className={styles.root__logout}>Log out</span></>
      ) : (
        <>Not authenticated</>
      ) }
    </div>
  )
}

export default LoginStatus
