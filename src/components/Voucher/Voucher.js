import React, { useCallback } from 'react'
import cx from 'classnames'
import VoucherModal from 'components/VoucherModal'
import AccumulatorVoucher from './components/AccumulatorVoucher'
import StampVoucher from './components/StampVoucher'

import styles from './Voucher.module.scss'

const Voucher = ({ voucher, plan }) => {
  const [voucherModalVisible, setVoucherModalVisible] = React.useState(false)
  const isVoucherIssued = voucher.state === 'issued'

  const handleCloseVoucherModal = useCallback(() => {
    setVoucherModalVisible(false)
  }, [setVoucherModalVisible])

  const handleVoucherClick = useCallback(() => {
    isVoucherIssued && setVoucherModalVisible(true)
  }, [isVoucherIssued, setVoucherModalVisible])

  const isAccumulatorVoucher = voucher?.earn?.type === 'accumulator'

  const { state = null } = voucher
  return (
    <>
      { voucherModalVisible && voucher && (
        <div data-testid='voucher-modal'>
          <VoucherModal voucher={voucher} plan={plan} onClose={handleCloseVoucherModal} />
        </div>
      )}
      <button data-testid='voucher-container' onClick={handleVoucherClick} className={ cx(
        styles.root,
        styles[`root__${state}`],
      ) }>
        {isAccumulatorVoucher ? <AccumulatorVoucher voucher={voucher} /> : <StampVoucher voucher={voucher} />}
      </button>
    </>
  )
}

export default Voucher
