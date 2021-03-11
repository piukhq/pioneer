import React from 'react'
import { useMembershipCardStateById } from 'hooks/membershipCards'
import useLoadMembershipPlans from './hooks/useLoadMembershipPlans'
import Button from 'components/Button'
import NonActiveVouchersModal from 'components/NonActiveVouchersModal'
import Voucher from 'components/Voucher'

const Vouchers = ({ membershipCardId }) => {
  const { activeVouchers, nonActiveVouchers, plan } = useMembershipCardStateById(membershipCardId)
  useLoadMembershipPlans()

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
      </div>
    ) : null
  )
}

export default Vouchers
