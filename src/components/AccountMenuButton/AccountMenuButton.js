import React from 'react'
import { useUserState } from 'hooks/users'
import Config from 'Config'
import styles from './AccountMenuButton.module.scss'
import { ReactComponent as MenuCogSvg } from 'images/menu-cog.svg'

const AccountMenuButton = ({ handleClick }) => {
  const { apiKey } = useUserState()

  return (
    <div className={styles.root}>
      { apiKey ? (
        <button aria-label="menu" onClick={ handleClick } className={styles['root__menu-button']}>
          {Config.accountTitle}
          <MenuCogSvg className={ styles['root__menu-icon'] } />
        </button>
      ) : (
        'Not authenticated'
      ) }
    </div>
  )
}

export default AccountMenuButton
