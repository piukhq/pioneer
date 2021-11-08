import React from 'react'
import cx from 'classnames'
import dayjs from 'dayjs'

import styles from './StampVoucher.module.scss'

const StampVoucher = ({ voucher }) => {
  const { burn = {}, earn = {}, date_redeemed: dateRedeemed = null, expiry_date: expiryDate = null, state = null } = voucher
  const { prefix: burnPrefix = null, value: burnValue = null, suffix: burnSuffix = null } = burn
  const { prefix: earnPrefix = null, value: earnValue = null, target_value: earnTargetValue = null, suffix: earnSuffix = null } = earn

  const shouldRenderFooter = () => {
    switch (state) {
      case 'inprogress':
      case 'issued':
        return (
          <div className={styles.root__footer}>
            Collected:
            <span className={styles['root__progress-value']}>
              {earnPrefix}{earnValue}/{earnPrefix}{earnTargetValue} {earnSuffix}
            </span>
          </div>
        )
      case 'redeemed':
        if (dateRedeemed) {
          return (
            <div className={styles.root__footer}>
              on {dayjs(dateRedeemed * 1000).format('DD MMM YYYY')}
            </div>
          )
        }
        return null
      case 'expired':
      case 'cancelled':
        if (expiryDate) {
          return (
            <div className={styles.root__footer}>
              on {dayjs(expiryDate * 1000).format('DD MMM YYYY')}
            </div>
          )
        }
        return null
      default: return null
    }
  }

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

      {shouldRenderFooter()}
    </>
  )
}

export default React.memo(StampVoucher)
