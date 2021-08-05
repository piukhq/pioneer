import React from 'react'
import cx from 'classnames'
import dayjs from 'dayjs'

import styles from './AccumulatorVoucher.module.scss'

const AccumulatorVoucher = ({ voucher }) => {
  const { burn = {}, earn = {}, date_redeemed: dateRedeemed = null, expiry_date: expiryDate = null, state = null } = voucher
  const { prefix: burnPrefix = null, value: burnValue = null, type: burnType = null } = burn
  const { prefix: earnPrefix = null, value: earnValue = null, target_value: earnTargetValue = null } = earn

  const amountToGo = earnTargetValue - earnValue
  const percentageEarned = (earnValue / earnTargetValue) * 100

  return (
    <>
      <div className={styles.root__title}>
        {burnPrefix}{burnValue} {burnType}
      </div>
      <div className={styles.root__description}>
        for spending {earnPrefix}{earnTargetValue}
      </div>
      <div className={styles.root__headline}>
        { (() => {
          switch (state) {
            case 'issued': return 'Earned'
            case 'inprogress': return `${earnPrefix}${amountToGo} left to go!`
            default: return state
          }
        })() }
      </div>
      <div className={styles.root__progress}>
        <div className={styles.root__accumulator}>
          <div data-testid={`accumulator-${percentageEarned}-percent-filled`} className={cx(styles.root__accumulator, styles[`root__accumulator--${state}`])} style={{ width: `${percentageEarned}%` }}></div>
        </div>
      </div>

      { (state === 'inprogress' || state === 'issued') && (
        <div className={styles['root__progress-text']}>
          <div className={styles.root__footer}>
            Spent:
            <span className={styles['root__progress-value']}>
              {earnPrefix}{earnValue}
            </span>
          </div>

          <div className={styles.root__footer}>
            Goal:
            <span className={styles['root__progress-value']}>
              {earnPrefix}{earnTargetValue}
            </span>
          </div>
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

export default AccumulatorVoucher
