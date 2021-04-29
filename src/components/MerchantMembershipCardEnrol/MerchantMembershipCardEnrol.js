import React, { useRef } from 'react'
import { selectors as usersSelectors } from 'ducks/users'
import useLoadMembershipPlans from './hooks/useLoadMembershipPlans'
import MembershipCardForm from 'components/MembershipCardForm'
import useLogout from 'hooks/useLogout'
import { useSelector } from 'react-redux'
import Button from 'components/Button'

import styles from './MerchantMembershipCardEnrol.module.scss'

const MerchantMembershipCardEnrol = ({ planId }) => {
  const { plan } = useLoadMembershipPlans(planId)
  const fieldTypes = useRef(['enrol_fields']).current
  const linkingFeature = 'ENROL'
  const userId = useSelector(state => usersSelectors.accountUserId(state))
  const { logout } = useLogout()
  // Email should be predefined and disabled for Merchant channels
  const initialValues = useRef({ enrol_fields: { Email: userId } }).current
  const disabledFields = useRef({ enrol_fields: { Email: true } }).current

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
        submitCaption='Register'
        submittingCaption='Registering'
        currentCardId={null}
      />
      <Button secondary onClick={logout} className={styles.root__cancel}>Cancel</Button>
    </div>
  )
}

export default MerchantMembershipCardEnrol
