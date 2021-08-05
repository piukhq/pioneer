import React from 'react'
import cx from 'classnames'
import dayjs from 'dayjs'

import styles from './StampVoucher.module.scss'

const StampVoucher = ({ voucher }) => {
  const { burn = {}, earn = {}, date_redeemed: dateRedeemed = null, expiry_date: expiryDate = null, state = null } = voucher
  const { prefix: burnPrefix = null, value: burnValue = null, suffix: burnSuffix = null } = burn
  const { prefix: earnPrefix = null, value: earnValue = null, target_value: earnTargetValue = null, suffix: earnSuffix = null } = earn

  return (
    <>
      <div className={styles.root__title}>
        {burnPrefix}{burnValue} {burnSuffix}
      </div>
      <div className={styles.root__description}>
        for collecting {earnPrefix}{earnTargetValue} {earnSuffix}
      </div>
      <div className={styles.root__headline}>
        { (() => {
          const stampsToGo = earnTargetValue - earnValue
          switch (state) {
            case 'issued': return 'Earned'
            case 'inprogress': return `${stampsToGo} stamp${stampsToGo > 1 ? 's' : ''} to go`
            default: return state
          }
        })() }
      </div>
      <div className={styles.root__progress}>
        { Array.from({ length: earnTargetValue }).map((value, index) => (
          index < earnValue ? (
            <span
              className={cx(
                styles['root__progress-step'],
                styles['root__progress-step--filled'],
                styles[`root__progress-step--filled-${state}`],
              )}
              key={index}
              data-testid={`filled progress-step ${index}`}
            />
          ) : (
            <span
              className={cx(
                styles['root__progress-step'],
                styles['root__progress-step--empty'],
                styles[`root__progress-step--empty-${state}`],
              )}
              key={index}
              data-testid={`empty progress-step ${index}`}
            />
          )
        )) }
      </div>
      { (state === 'inprogress' || state === 'issued') && (
        <div className={styles.root__footer}>
          Collected:
          <span className={styles['root__progress-value']}>
            {earnPrefix}{earnValue}/{earnPrefix}{earnTargetValue} {earnSuffix}
          </span>
        </div>
      ) }
      {/* TODO: Check with Jack to understand: to check when we have the data from the API */}
      { state === 'redeemed' && dateRedeemed && (
        <div className={styles.root__footer}>
          on {dayjs(dateRedeemed * 1000).format('DD MMM YYYY')}
        </div>
      ) }
      {/* TODO:  Check with Jack to understand: to check the state=cancelled scenario when we have the data from the API */}
      { (state === 'expired' || state === 'cancelled') && expiryDate && (
        <div className={styles.root__footer}>
          on {dayjs(expiryDate * 1000).format('DD MMM YYYY')}
        </div>
      ) }
    </>
  )
}

export default StampVoucher
