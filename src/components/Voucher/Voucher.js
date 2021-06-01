import React, { useState, useCallback } from 'react'
import cx from 'classnames'
import styles from './Voucher.module.scss'
import dayjs from 'dayjs'
import VoucherModal from 'components/VoucherModal'

const Voucher = ({ voucher, plan }) => {
  const [voucherModalVisible, setVoucherModalVisible] = useState(false)
  const isVoucherIssued = voucher.state === 'issued'

  const handleCloseVoucherModal = useCallback(() => {
    setVoucherModalVisible(false)
  }, [setVoucherModalVisible])

  const handleVoucherClick = useCallback(() => {
    isVoucherIssued && setVoucherModalVisible(true)
  }, [isVoucherIssued, setVoucherModalVisible])

  const { burn = {}, earn = {}, date_redeemed: dateRedeemed = null, expiry_date: expiryDate = null, state = null } = voucher
  const { prefix: burnPrefix = null, value: burnValue = null, suffix: burnSuffix = null } = burn
  const { prefix: earnPrefix = null, value: earnValue = null, target_value: earnTargetValue = null, suffix: earnSuffix = null } = earn

  return (
    <>
      { voucherModalVisible && voucher && (
        <VoucherModal voucher={voucher} plan={plan} onClose={handleCloseVoucherModal} />
      )}
      <button onClick={handleVoucherClick} className={ cx(
        styles.root,
        styles[`root__${state}`],
      ) }>
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
        { (state === 'inprogress' || voucher.state === 'earned') && (
          <div className={styles.root__footer}>
            Collected:
            <span className={styles['root__progress-value']}>
              {earnPrefix}{earnValue}/{earnPrefix}{earnTargetValue} {earnSuffix}
            </span>
          </div>
        ) }
        {/* TODO: to check when we have the data from the API */}
        { state === 'redeemed' && dateRedeemed && (
          <div className={styles.root__footer}>
            on {dayjs(dateRedeemed * 1000).format('DD MMM YYYY')}
          </div>
        ) }
        {/* TODO: to check the state=cancelled scenario when we have the data from the API */}
        { (state === 'expired' || state === 'cancelled') && expiryDate && (
          <div className={styles.root__footer}>
            on {dayjs(expiryDate * 1000).format('DD MMM YYYY')}
          </div>
        ) }
      </button>
    </>
  )
}

export default Voucher
