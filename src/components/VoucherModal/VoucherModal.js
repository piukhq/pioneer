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
    <p className={styles.root__heading}>Free Meal for collecting 7 stamps.</p>
    <p className={styles.root__code}>{voucher.code}</p>
    <div className={styles.root__details}>
      <p className={styles.root__paragraph}>Use the code shown to redeem your reward.</p>
      <p className={styles.root__paragraph}>Added {formattedIssueDate}</p>
      <p className={styles.root__paragraph}>Expires {formattedExpiryDate}</p>
    </div>
    <a className={styles.root__link} href={Config.urls.termsAndConditions}>Terms & Conditions</a>
  </Modal>
  )
}

export default VoucherModal
