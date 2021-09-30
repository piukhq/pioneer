import React, { useCallback } from 'react'

import Modal from 'components/Modal'
import Button from 'components/Button'
import { ReactComponent as RightChevronSvg } from 'images/right-chevron.svg'
import { ReactComponent as MenuCogSvg } from 'images/menu-cog.svg'

import useLogout from './hooks/useLogout'
import { useModals } from 'hooks/useModals'
import { MODAL_ACTION_TYPES as modalEnum } from 'utils/enums'

import styles from './AccountMenu.module.scss'

const AccountMenu = () => {
  const { dispatchModal, modalToRender } = useModals()

  const handleAccountMenuClick = useCallback(() => { dispatchModal(modalEnum.ACCOUNT_MENU) }, [dispatchModal])

  return (
    <>
      <AccountMenuButton onClick={ handleAccountMenuClick }/>
      { modalToRender === 'ACCOUNT_MENU' && (
       <AccountMenuModal/>
      )}
    </>
  )
}
export default AccountMenu

const AccountMenuButton = ({ onClick }) => (
  <div className={styles['root__menu-button-container']}>
      <button aria-label="menu" onClick={onClick} className={styles['root__menu-button']}>
        {Config.accountTitle}
        <MenuCogSvg className={ styles['root__menu-button-icon'] } />
      </button>
  </div>
)

const AccountMenuModal = () => {
  const { logout } = useLogout()
  const { planTitle, urls: { merchantFaq, termsAndConditions, binkFaq } } = Config
  return (
    <Modal>
      <Modal.Header>{ Config.accountTitle }</Modal.Header>
      <div className={styles.root}>
        <div className={styles['root__modal-body']}>
          Bink is a service which links credit/debit cards to loyalty memberships allowing you to earn rewards automatically when you shop.
        </div>
        { Config.isMerchantChannel && (
          <>
            {merchantFaq && <AccountMenuModalItem label={`${planTitle} FAQs`} link={merchantFaq} />}
            {termsAndConditions && <AccountMenuModalItem label={`${planTitle} Terms & Conditions`} link={termsAndConditions} />}
            <br/>
            {binkFaq && <AccountMenuModalItem label="Bink FAQs" link={binkFaq} />}
          </>
        )}
        <AccountMenuModalItem label="Bink Terms & Conditions" link="https://bink.com/terms-and-conditions/" />
        <AccountMenuModalItem label="Bink Privacy Policy" link="https://bink.com/privacy-policy/" />
        {/* TODO: Should be merchant specific url? */}
        <AccountMenuModalItem label="Bink Cookies Policy" link="https://policies.gb.bink.com/web/wasabi-cp.html" />
        <Button className={styles['root__modal-button']} onClick={logout}>Logout</Button>
      </div>
    </Modal>
  )
}

const AccountMenuModalItem = ({ label, link }) => (
    <a className={styles['root__modal-item']} href={link} target="_blank" rel="noreferrer">{label}<RightChevronSvg /></a>
)
