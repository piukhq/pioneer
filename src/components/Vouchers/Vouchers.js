import React, { useState } from 'react'
import { useMembershipCardStateById } from 'hooks/membershipCards'
import useLoadMembershipPlans from './hooks/useLoadMembershipPlans'
import Button from 'components/Button'
import NonActiveVouchersModal from 'components/NonActiveVouchersModal'

const Vouchers = ({ membershipCardId }) => {
  const { activeVouchers, nonActiveVouchers, plan } = useMembershipCardStateById(membershipCardId)
  useLoadMembershipPlans()
  const [isNonActiveVouchersModalOpen, setNonActiveVouchersModalOpen] = useState(false)

  if (!plan?.has_vouchers || !activeVouchers || activeVouchers.length === 0) {
    return null
  }
  return (
    plan?.has_vouchers && (activeVouchers.length > 0 || nonActiveVouchers.length > 0) ? (
      <div>
        <h2>Vouchers</h2>
        { activeVouchers.map?.((voucher, index) => (
          <div key={index}>
            <div>state: {voucher.state} ({voucher?.earn?.value}/{voucher?.earn?.target_value} {voucher?.earn?.suffix})</div>
          </div>
        )) }
        { nonActiveVouchers?.length > 0 && (
          <Button onClick={() => setNonActiveVouchersModalOpen(true)}>View voucher history</Button>
        ) }
        { isNonActiveVouchersModalOpen && (
          <NonActiveVouchersModal
            membershipCardId={membershipCardId}
            onClose={() => setNonActiveVouchersModalOpen(false)}
          />
        )}
      </div>
    ) : null
  )
}

export default Vouchers
