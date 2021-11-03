import React, { useState } from 'react'
import HighVisibilityLabel from 'components/HighVisibilityLabel'
import Modal from 'components/Modal'
import { shortDateFromTimestamp } from 'utils/dates'

import styles from './VoucherModal.module.scss'

const VoucherModal = ({ voucher, plan }) => {
  const [imageLoading, setImageLoading] = useState(true)

  const { code = '', burn = {}, earn = {}, date_issued: issuedDate = null, expiry_date: expiryDate = null } = voucher
  const { prefix: burnPrefix = null, value: burnValue = null, suffix: burnSuffix = null } = burn
  const { prefix: earnPrefix = null, target_value: earnTargetValue = null, suffix: earnSuffix = null } = earn
  const [formattedIssuedDate, formattedExpiryDate] = [issuedDate, expiryDate].map(date => shortDateFromTimestamp(date))

  const imgUrl = plan?.images?.filter(image => image.type === 9)[0].url
  const issuedDetail = plan?.content?.filter(content => content.column === 'Voucher_Issued_Detail')[0].value

  return (
    <Modal className={styles.root}>
      {imageLoading && <div className={styles.root__placeholder} />}
      <img className={styles.root__image} src={imgUrl} alt='' onLoad={() => setImageLoading(false)}/>
      <div className={styles.root__heading}>{burnPrefix}{burnValue} {burnSuffix} for collecting {earnPrefix}{earnTargetValue} {earnSuffix}</div>

      {code && (
        <div className={styles.root__code}>
          <HighVisibilityLabel value={code} />
        </div>
      )}

      <div className={styles.root__information}>
        <div className={styles['root__information__issued-detail']}>{issuedDetail}</div>
        <div className={styles.root__information__date}>Added {formattedIssuedDate}</div>
        <div className={styles.root__information__date}>Expires {formattedExpiryDate}</div>
      </div>
      <a className={styles.root__link} href={Config.urls.termsAndConditions} target="_blank" rel="noreferrer">Terms & Conditions</a>
    </Modal>
  )
}

export default VoucherModal
