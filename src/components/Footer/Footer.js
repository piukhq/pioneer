import React from 'react'

import { ReactComponent as BinkLogoSvg } from 'images/logo-bink.svg'
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <div className={styles.root}>
      <a href="https://www.bink.com" target="_blank" rel="noreferrer">
        <BinkLogoSvg className={styles.root__logo}/>
      </a>
    </div>
  )
}

export default Footer
