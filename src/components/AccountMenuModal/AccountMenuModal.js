// todo: adapt based on future multi-merchant design
import React from 'react'
import { useSelector } from 'react-redux'

import Modal from 'components/Modal'
import Button from 'components/Button'
import { ReactComponent as RightChevronSvg } from 'images/right-chevron.svg'

import { selectors as membershipCardsSelectors } from 'ducks/membershipCards'
import useLogout from './hooks/useLogout'

import styles from './AccountMenuModal.module.scss'
import Config from 'Config'

const AccountMenuModal = ({ id, onClose }) => {
  const { logout } = useLogout()
  const membershipPlanName = useSelector(
    state => membershipCardsSelectors.plan(state, id)?.account?.plan_name,
  )
  return (
  <Modal onClose={onClose}>
    <Modal.Header>{membershipPlanName || 'My Account' } support</Modal.Header>
    <div className={styles.root}>
      <p className={styles.root__body}>
        Bink is a service which links payment cards to loyalty memberships allowing you to earn rewards automatically when you shop.
      </p>
      { membershipPlanName && (
        <div>
          {Config.urls.merchantFaq?.length > 10 && <AccountMenuItem label={`${membershipPlanName} FAQs`} link={Config.urls.merchantFaq} />}
          {Config.urls.termsAndConditions?.length > 10 && <AccountMenuItem label={`${membershipPlanName} Terms & Conditions`} link={Config.urls.termsAndConditions} />}
          <br/>
          {Config.urls.binkFaq?.length > 10 && <AccountMenuItem label="Bink FAQs" link={Config.urls.binkFaq} />}
        </div>
      )}
      <AccountMenuItem label="Bink Terms & Conditions" link="https://bink.com/terms-and-conditions/" />
      <AccountMenuItem label="Bink Privacy Policy" link="https://bink.com/privacy-policy/" />
      <Button className={styles.root__button} onClick={logout}>Logout</Button>
    </div>
  </Modal>
  )
}
export default AccountMenuModal

const AccountMenuItem = ({ label, link }) => (
  <div className={styles.root}>
      <a className={styles['root__menu-item']} href={link} target="_blank" rel="noreferrer">{label}<RightChevronSvg /></a>
  </div>
)
