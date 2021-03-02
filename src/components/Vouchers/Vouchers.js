import React, { useState } from 'react'
import { useMembershipCardStateById } from 'hooks/membershipCards'
import useLoadMembershipPlans from './hooks/useLoadMembershipPlans'
import Button from 'components/Button'
import NonActiveVouchersModal from 'components/NonActiveVouchersModal'
import Voucher from 'components/Voucher'

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
          <Voucher key={index} voucher={voucher} />
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
