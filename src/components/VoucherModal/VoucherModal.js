import React, { useState } from 'react'
import Modal from 'components/Modal'
import { shortDateFromTimestamp } from 'utils/dates'

import styles from './VoucherModal.module.scss'

const VoucherModal = ({ onClose, voucher, plan }) => {
  const [imageLoading, setImageLoading] = useState(true)

  const { code = '', burn = {}, earn = {}, date_issued: issuedDate = null, expiry_date: expiryDate = null } = voucher
  const { prefix: burnPrefix = null, value: burnValue = null, suffix: burnSuffix = null } = burn
  const { prefix: earnPrefix = null, target_value: earnTargetValue = null, suffix: earnSuffix = null } = earn
  const [formattedIssuedDate, formattedExpiryDate] = [issuedDate, expiryDate].map(date => shortDateFromTimestamp(date))

  const imgUrl = plan?.images?.filter(image => image.type === 9)[0].url
  const issuedDetail = plan?.content?.filter(content => content.column === 'Voucher_Issued_Detail')[0].value

  return (
    <Modal className={styles.root} onClose={onClose}>
      {imageLoading && <div className={styles.root__placeholder} />}
      <img className={styles.root__image} src={imgUrl} alt='' onLoad={ () => setImageLoading(false)}/>
      <p className={styles.root__heading}>{burnPrefix}{burnValue} {burnSuffix} for collecting {earnPrefix}{earnTargetValue} {earnSuffix}</p>
      <p className={styles.root__code}>{code}</p>
      <div className={styles.root__information}>
        <p className={styles['root__information__issued-detail']}>{issuedDetail}</p>
        <p className={styles.root__information__date}>Added {formattedIssuedDate}</p>
        <p className={styles.root__information__date}>Expires {formattedExpiryDate}</p>
      </div>
      <a className={styles.root__link} href={Config.urls.termsAndConditions} target="_blank" rel="noreferrer">Terms & Conditions</a>
    </Modal>
  )
}

export default VoucherModal
