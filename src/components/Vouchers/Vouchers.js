import React from 'react'
import { useMembershipCardStateById } from 'hooks/membershipCards'
import useLoadMembershipPlans from './hooks/useLoadMembershipPlans'
import Voucher from 'components/Voucher'

import styles from './Vouchers.module.scss'

const Vouchers = ({ membershipCardId }) => {
  const { activeVouchers, plan } = useMembershipCardStateById(membershipCardId)
  useLoadMembershipPlans()
  if (!activeVouchers || activeVouchers.length === 0) {
    return null
  }
  return (
    (activeVouchers.length > 0) ? (
      <div>
        <h2 className={styles.root__headline}>Vouchers</h2>
        <p className={styles.root__paragraph}>{plan.account?.plan_summary}</p>
        <div className={styles['root__active-vouchers']}>
        { activeVouchers.map?.((voucher, index) => (
          <Voucher key={index} voucher={voucher} plan={plan}/>
        )) }
        </div>
      </div>
    ) : null
  )
}

export default Vouchers
