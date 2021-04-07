import React from 'react'
import Button from 'components/Button'
import useLogout from 'hooks/useLogout'
import useContactSupport from './hooks/useContactSupport'
import cx from 'classnames'

import styles from './MerchantMembershipCards.module.scss'
import MultichannelMembershipCards from '../MultichannelMembershipCards'

const MerchantMembershipCards = () => {
  const { contactSupport } = useContactSupport()
  const { logout } = useLogout()

  return (
    <div className={styles.root}>
      <h1 className={cx(styles.root__heading, styles['root__heading--first'])}>There is a problem</h1>
      <p className={styles.root__body}>It looks like there is a problem with your account.</p>
      <p className={styles.root__body}>Please contact us so we can help resolve this as quickly as possible.</p>
      {/* todo: consider replacing button with link tag to match its functionality */}
      <Button onClick={contactSupport} className={styles.root__wide}>Get in Touch</Button>
      <button className={styles.root__logout} onClick={logout}>Logout</button>
      { process.env.NODE_ENV === 'development' && (
      <div className="dev-only">
        <MultichannelMembershipCards/>
      </div>
      ) }
    </div>
  )
}

export default MerchantMembershipCards
