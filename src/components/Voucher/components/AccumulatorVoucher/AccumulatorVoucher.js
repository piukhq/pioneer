import React from 'react'
import cx from 'classnames'
import dayjs from 'dayjs'
import { formatValueToDecimalPlace } from 'utils/format'

import styles from './AccumulatorVoucher.module.scss'

const AccumulatorVoucher = ({ voucher }) => {
  const { burn = {}, earn = {}, date_redeemed: dateRedeemed = null, expiry_date: expiryDate = null, state = null } = voucher
  const { prefix: burnPrefix = null, value: burnValue = null, type: burnType = null } = burn
  const { prefix: earnPrefix = null, value: earnValue = null, target_value: earnTargetValue = null } = earn

  const [formattedEarnValue, formattedEarnTargetValue] = [earnValue, earnTargetValue].map(value => formatValueToDecimalPlace(value, 2))

  const amountToGo = formatValueToDecimalPlace(formattedEarnTargetValue - formattedEarnValue, 2)
  const percentageEarned = (formattedEarnValue / formattedEarnTargetValue) * 100

  const shouldRenderFooter = () => {
    switch (state) {
      case 'inprogress':
      case 'issued':
        return (
          <div className={styles['root__progress-text']}>
            <div className={styles.root__footer}>
              Spent:
              <span className={styles['root__progress-value']}>
                {earnPrefix}{formattedEarnValue}
              </span>
            </div>

            <div className={styles.root__footer}>
              Goal:
              <span className={styles['root__progress-value']}>
                {earnPrefix}{formattedEarnTargetValue}
              </span>
            </div>
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

      {shouldRenderFooter()}
    </>
  )
}

export default React.memo(AccumulatorVoucher)
