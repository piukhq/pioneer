import React, { useRef } from 'react'
import { selectors as usersSelectors } from 'ducks/users'
import useLoadMembershipPlans from './hooks/useLoadMembershipPlans'
import MembershipCardForm from 'components/MembershipCardForm'

import useContactSupport from 'hooks/useContactSupport'
import useLogout from 'hooks/useLogout'
import { useSelector } from 'react-redux'
import Button from 'components/Button'

import styles from './MerchantMembershipCardEnrol.module.scss'

const MerchantMembershipCardEnrol = ({ planId, currentMembershipCard }) => {
  const { plan } = useLoadMembershipPlans(planId)
  const { logout } = useLogout()
  const fieldTypes = useRef(['enrol_fields']).current
  const linkingFeature = 'ENROL'
  const userId = useSelector(state => usersSelectors.accountUserId(state))
  const { contactSupport } = useContactSupport()

  // Email should be predefined and disabled for Merchant channels
  const initialValues = useRef({ enrol_fields: { Email: userId } }).current
  const disabledFields = useRef({ enrol_fields: { Email: true } }).current

  const isReenrol = (currentMembershipCard?.status === 'reenrol')

  return (
    <div className={styles.root}>
      {isReenrol && (
        <>
          <h1 className={styles.root__header}>Let's try again</h1>
          <p className={styles.root__summary}>There was a problem getting your card set up. Please try again. Remember, we are always here to help if you would rather us help resolve this.</p>
        </>
      )}
      {!isReenrol && (
        <>
          <h1 className={styles.root__header}>Join {plan?.account.plan_name}</h1>
          <p className={styles.root__summary}>{ plan?.account?.plan_summary }</p>
        </>
      )}

      <MembershipCardForm
        plan={plan}
        planId={planId}
        fieldTypes={fieldTypes}
        linkingFeature={linkingFeature}
        initialValues={initialValues}
        disabledFields={disabledFields}
        submitCaption='Register'
        submittingCaption='Registering'
        currentMembershipCardId={currentMembershipCard?.id}
      />

      {isReenrol && <Button secondary onClick={contactSupport} className={styles['root__alternate-option']}>Contact Support</Button>}
      {!isReenrol && <Button secondary onClick={logout} className={styles['root__alternate-option']}>Cancel</Button>}
    </div>
  )
}

export default MerchantMembershipCardEnrol
