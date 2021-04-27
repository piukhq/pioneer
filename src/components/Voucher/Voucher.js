import React from 'react'
import cx from 'classnames'
import styles from './Voucher.module.scss'
import dayjs from 'dayjs'

const Voucher = ({ voucher }) => {
  console.log(voucher)
  return (
    <div className={styles.root}>
      <div className={styles.root__title}>
        {voucher?.burn?.prefix}{voucher?.burn?.value} {voucher?.burn?.suffix}
      </div>
      <div className={styles.root__description}>
        for collecting {voucher?.earn?.prefix}{voucher?.earn?.target_value} {voucher?.earn?.suffix}
      </div>
      <div className={styles.root__headline}>
        { (() => {
          const stampsToGo = voucher?.earn?.target_value - voucher?.earn?.value
          switch (voucher?.state) {
            case 'issued': return 'Earned'
            case 'inprogress': return `${stampsToGo} stamp${stampsToGo > 1 ? 's' : ''} to go`
            default: return voucher.state
          }
        })() }
      </div>
      <div className={styles.root__progress}>
        { Array.from({ length: voucher?.earn?.target_value }).map((value, index) => (
          index < voucher?.earn?.value ? (
            <span
              className={cx(
                styles['root__progress-step'],
                styles['root__progress-step--filled'],
                styles[`root__progress-step--filled-${voucher?.state}`],
              )}
              key={index}
              data-testid={`filled progress-step ${index}`}
            />
          ) : (
            <span
              className={cx(
                styles['root__progress-step'],
                styles['root__progress-step--empty'],
                styles[`root__progress-step--empty-${voucher?.state}`],
              )}
              key={index}
              data-testid={`empty progress-step ${index}`}
            />
          )
        )) }
      </div>
      { (voucher.state === 'inprogress' || voucher.state === 'earned') && (
        <div className={styles.root__footer}>
          Collected:
          <span className={styles['root__progress-value']}>
            {voucher?.earn?.prefix}{voucher?.earn?.value}/{voucher?.earn?.prefix}{voucher?.earn?.target_value} {voucher?.earn?.suffix}
          </span>
        </div>
      ) }
      {/* TODO: to check when we have the data from the API */}
      { voucher.state === 'redeemed' && voucher?.date_redeemed && (
        <div className={styles.root__footer}>
          on {dayjs(voucher?.date_redeemed * 1000).format('DD MMM YYYY')}
        </div>
      ) }
      {/* TODO: to check the state=cancelled scenario when we have the data from the API */}
      { (voucher.state === 'expired' || voucher.state === 'cancelled') && voucher?.expiry_date && (
        <div className={styles.root__footer}>
          on {dayjs(voucher?.expiry_date * 1000).format('DD MMM YYYY')}
        </div>
      ) }
    </div>
  )
}

export default Voucher
