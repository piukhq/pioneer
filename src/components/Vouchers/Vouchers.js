import React from 'react'
import { useMembershipCardStateById } from 'hooks/membershipCards'
import useLoadMembershipPlans from './hooks/useLoadMembershipPlans'
import Voucher from 'components/Voucher'

import styles from './Vouchers.module.scss'

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
        <p>{plan.account?.plan_summary}</p>
        <div className={styles['root__active-vouchers']}>
        { activeVouchers.map?.((voucher, index) => (
          <Voucher key={index} voucher={voucher} />
        )) }
        </div>
      </div>
    ) : null
  )
}

export default Vouchers
