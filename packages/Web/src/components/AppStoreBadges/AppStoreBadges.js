import React from 'react'
import { ReactComponent as AppStoreBadge } from 'images/app-store-badge.svg'
import { ReactComponent as PlayStoreBadge } from 'images/play-store-badge.svg'
import { MOBILE_OS_NAMES as osEnums } from 'utils/enums'
import { osName } from 'react-device-detect'

import styles from './AppStoreBadges.module.scss'

const AppStoreBadges = () => (
  <div className={styles.root}>
    { osName !== osEnums.ANDROID && <a className={styles.root__badge} target="_blank" rel="noreferrer" href='https://apps.apple.com/gb/app/bink-loyalty-rewards-wallet/id1142153931'><AppStoreBadge /></a> }
    { osName !== osEnums.IOS && <a className={styles.root__badge} target="_blank" rel="noreferrer" href='https://play.google.com/store/apps/details?id=com.bink.wallet&hl=en_GB&gl=US'><PlayStoreBadge /></a> }
  </div>
)

export default AppStoreBadges
