import React, { useState } from 'react'
import Modal from 'components/Modal'
import { dayShortMonthYear } from 'utils/dates'

import styles from './VoucherModal.module.scss'

const VoucherModal = ({ onClose, voucher, plan }) => {
  const [imageLoading, setImageLoading] = useState(true)

  const formattedIssueDate = dayShortMonthYear(new Date(voucher.date_issued))
  const formattedExpiryDate = dayShortMonthYear(new Date(voucher.expiry_date))
  const imgUrl = plan?.images?.filter(image => image.type === 9)[0].url
  const issuedDetail = plan.content.filter(content => content.column === 'Voucher_Issued_Detail')[0].value

  return (
  <Modal className={styles.root} onClose={onClose}>
    {imageLoading && <div className={styles.root__placeholder} />}
    <img className={styles.root__image} src={imgUrl} alt='' onLoad={ () => setImageLoading(false)}/>
    <p className={styles.root__heading}>{voucher?.burn?.prefix}{voucher?.burn?.value} {voucher?.burn?.suffix} for collecting {voucher?.earn?.prefix}{voucher?.earn?.target_value} {voucher?.earn?.suffix}</p>
    <p className={styles.root__code}>{voucher.code}</p>
    <div className={styles.root__information}>
      <p className={styles['root__information__issued-detail']}>{issuedDetail}</p>
      <p className={styles.root__information__date}>Added {formattedIssueDate}</p>
      <p className={styles.root__information__date}>Expires {formattedExpiryDate}</p>
    </div>
    <a className={styles.root__link} href={Config.urls.termsAndConditions}>Terms & Conditions</a>
  </Modal>
  )
}

export default VoucherModal
