import React from 'react'
import Modal from 'components/Modal'

import styles from './VoucherModal.module.scss'

const VoucherModal = ({ onClose, voucher, plan }) => {
  const issueDate = new Date(voucher.date_issued)
  const expiryDate = new Date(voucher.expiry_date)

  const formattedIssueDate = `${issueDate.getDate()} ${issueDate.toLocaleString('en-uk', { month: 'short' })} ${issueDate.getFullYear()}`
  const formattedExpiryDate = `${expiryDate.getDate()} ${expiryDate.toLocaleString('en-uk', { month: 'short' })} ${expiryDate.getFullYear()}`
  const imgUrl = plan?.images?.filter(image => image.type === 9)[0].url

  return (
  <Modal className={styles.root} onClose={onClose}>
    { imgUrl && <img className={styles.root__image} src={imgUrl} alt='' /> }
    <Modal.Header>{voucher.code}</Modal.Header>
    <div className={styles.root__description}>
      <h2>Use the code shown to redeem your reward.</h2>
      <h2>You will get £5 off your purchase.</h2>
    </div>
    <div className={styles.root__dates}>
      <p className={styles.root__paragraph}>Added {formattedIssueDate}</p>
      <p className={styles.root__paragraph}>Expires {formattedExpiryDate}</p>
    </div>
    <a className={styles.root__link} href={Config.urls.termsAndConditions}>Terms & Conditions</a>
  </Modal>
  )
}

export default VoucherModal
