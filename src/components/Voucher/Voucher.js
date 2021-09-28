import React, { useCallback } from 'react'
import cx from 'classnames'
import VoucherModal from 'components/Modals/VoucherModal'
import AccumulatorVoucher from './components/AccumulatorVoucher'
import StampVoucher from './components/StampVoucher'
import { useModals } from 'hooks/useModals'

import styles from './Voucher.module.scss'

const Voucher = ({ voucher, plan }) => {
  const { requestVoucherModal, shouldVoucherModalRender } = useModals()
  const isVoucherIssued = voucher.state === 'issued'

  const handleVoucherClick = useCallback(() => {
    isVoucherIssued && requestVoucherModal()
  }, [isVoucherIssued, requestVoucherModal])

  const isAccumulatorVoucher = voucher?.earn?.type === 'accumulator'

  const { state = null } = voucher
  return (
    <>
      { shouldVoucherModalRender && voucher && (
        <div data-testid='voucher-modal'>
          <VoucherModal voucher={voucher} plan={plan} />
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

export default React.memo(Voucher)
