import React from 'react'
// todo: replace logout functionality with modal display (which will contain logout)
import useLogout from './hooks/useLogout'
import { useUserState } from 'hooks/users'
import Config from 'Config'

import styles from './AccountMenu.module.scss'
import { ReactComponent as MenuCog } from 'images/menu-cog.svg'

const AccountMenu = () => {
  const { apiKey } = useUserState()
  const { logout } = useLogout()
  return (
    <div className={styles.root}>
      { apiKey ? (
        <>{Config.accountTitle}<button onClick={logout} aria-label="menu" className={styles.root__menu}> <MenuCog className={ styles['root__menu-icon'] } /></button></>
      ) : (
        <>Not authenticated</>
      ) }
    </div>
  )
}

export default AccountMenu
