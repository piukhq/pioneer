import React from 'react'
import { isMobile, osName } from 'react-device-detect'
import cx from 'classnames'
import { MOBILE_OS_NAMES as osEnums } from 'utils/enums'

import styles from './AppLinks.module.scss'

const AppLinks = () => {
  const renderAppLinks = () => {
    const iosLink = (
      <a href={Config.urls.iosStore} target="_blank" rel="noreferrer">
        <div className={cx(styles['root__app-link'], styles['root__app-link--ios-store'])} />
      </a>
    )

    const androidLink = (
      <a href={Config.urls.androidStore} target="_blank" rel="noreferrer">
        <div className={cx(styles['root__app-link'], styles['root__app-link--android-store'])} />
      </a>
    )

    if (isMobile) {
      return osName === osEnums.IOS ? iosLink : androidLink
    }

    return (
      <>
        {iosLink}
        {androidLink}
      </>
    )
  }

  return (
    <div className={styles.root}>
      { renderAppLinks() }
    </div>
  )
}

export default AppLinks
