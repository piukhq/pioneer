import React from 'react'
import { useMembershipCardStateById } from 'hooks/membershipCards'
import useLoadMembershipPlans from './hooks/useLoadMembershipPlans'
import Voucher from 'components/Voucher'

import styles from './Vouchers.module.scss'

const Vouchers = ({ membershipCardId, displayRedeemableOnly = false }) => {
  const { activeVouchers, redeemableVouchers, plan } = useMembershipCardStateById(membershipCardId)
  useLoadMembershipPlans()

  const renderVouchers = () => {
    const vouchersToDisplay = displayRedeemableOnly ? redeemableVouchers : activeVouchers

    return vouchersToDisplay.map?.((voucher, index) => (
      <Voucher key={index} voucher={voucher} plan={plan} />
    ))
  }

  return (
    <section className={styles.root}>
      <h2 className={styles.root__headline}>Vouchers</h2>
      <p className={styles.root__paragraph}>{plan?.account?.plan_summary}</p>
      <div className={styles['root__active-vouchers']}>
        {renderVouchers()}
      </div>
    </section>
  )
}

export default Vouchers
