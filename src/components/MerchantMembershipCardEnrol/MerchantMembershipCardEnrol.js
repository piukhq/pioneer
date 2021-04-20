import React, { useRef } from 'react'
import { selectors as usersSelectors } from 'ducks/users'
import useLoadMembershipPlans from './hooks/useLoadMembershipPlans'
import Loading from 'components/Loading'
import MembershipCardForm from 'components/MembershipCardForm'
import { useMembershipCardsState } from 'hooks/membershipCards'
import Config from 'Config'
import { useSelector } from 'react-redux'

import styles from './MerchantMembershipCardEnrol.module.scss'

const MerchantMembershipCardEnrol = ({ planId }) => {
  const { plan, loading } = useLoadMembershipPlans(planId)
  const { add: { loading: addLoading } } = useMembershipCardsState()
  const fieldTypes = useRef(['enrol_fields']).current
  const linkingFeature = 'ENROL'
  const userId = useSelector(state => usersSelectors.accountUserId(state))
  console.log('userId', userId)
  let initialValues, disabledFields
  // todo: this condition shouldn't be necessary. It should have been checked prior to including this component
  if (Config.isMerchantChannel) {
    initialValues = { enrol_fields: { Email: userId } }
    disabledFields = { enrol_fields: { Email: true } }
  }

  return (
    <div className={styles.root}>
      <h1 className={styles.root__header}>Join {plan.account.plan_name}</h1>
      <p className={styles.root__summary}>{ plan?.account?.plan_summary }</p>
      <MembershipCardForm
        plan={plan}
        planId={planId}
        fieldTypes={fieldTypes}
        linkingFeature={linkingFeature}
        initialValues={initialValues}
        disabledFields={disabledFields}
      />
      { (loading || addLoading) && <Loading /> }
    </div>
  )
}

export default MerchantMembershipCardEnrol
