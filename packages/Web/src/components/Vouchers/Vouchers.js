import React, { useEffect } from 'react'
import { useMembershipCardStateById } from 'hooks/membershipCards'
import { useMembershipPlansDispatch } from 'hooks/membershipPlans'
import Voucher from 'components/Voucher'

import styles from './Vouchers.module.scss'

const Vouchers = ({ membershipCardId, displayRedeemableOnly = false }) => {
  const { activeVouchers, redeemableVouchers, plan } = useMembershipCardStateById(membershipCardId)
  const { getMembershipPlans } = useMembershipPlansDispatch()
  useEffect(() => {
    getMembershipPlans()
  }, [getMembershipPlans])

  const renderVoucherPlanSummary = () => Config.voucherPlanSummary || plan?.account?.plan_summary

  const renderVouchers = () => {
    const vouchersToDisplay = displayRedeemableOnly ? redeemableVouchers : activeVouchers
    return vouchersToDisplay.map?.((voucher, index) => (
      <Voucher key={index} voucher={voucher} plan={plan} />
    ))
  }

  return (
    <section className={styles.root}>
      <h2 className={styles.root__headline}>Vouchers</h2>
      <div className={styles.root__paragraph}>{renderVoucherPlanSummary()}</div>
      <div className={styles['root__active-vouchers']}>
        {renderVouchers()}
      </div>
    </section>
  )
}

export default Vouchers
