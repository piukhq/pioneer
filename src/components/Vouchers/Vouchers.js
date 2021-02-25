import React from 'react'
import { useMembershipCardStateById } from 'hooks/membershipCards'

const Vouchers = ({ membershipCardId }) => {
  const { activeVouchers, nonActiveVouchers } = useMembershipCardStateById(membershipCardId)
  if (!activeVouchers || activeVouchers.length === 0) {
    return null
  }
  return (
    <div>
      <h2>Active vouchers</h2>
      { activeVouchers.map?.((voucher, index) => (
        <div key={index}>
          <div>state: {voucher.state} ({voucher?.earn?.value}/{voucher?.earn?.target_value} {voucher?.earn?.suffix})</div>
        </div>
      )) }
      {/* TODO: temporary. to remove once history is implemented */}
      { process.env.NODE_ENV === 'development' && (
        nonActiveVouchers?.length > 0 && (
          <div style={{ color: '#999', fontSize: '0.8rem' }} className='dev-only'>
            {nonActiveVouchers.length} non active cards in history
          </div>
        )
      )}
    </div>
  )
}

export default Vouchers
