import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { selectors as usersSelectors } from 'ducks/users'
import useLoadMembershipPlans from './hooks/useLoadMembershipPlans'
import useLoadMembershipCardsReenrol from './hooks/useLoadMembershipCardsReenrol'
import MembershipCardForm from 'components/MembershipCardForm'

import useContactSupport from 'hooks/useContactSupport'
import useLogout from 'hooks/useLogout'
import Button from 'components/Button'

import styles from './MerchantMembershipCardEnrol.module.scss'

const MerchantMembershipCardEnrol = ({ planId }) => {
  const { plan } = useLoadMembershipPlans(planId)
  const { isReenrol } = useLoadMembershipCardsReenrol()
  const { logout } = useLogout()
  const fieldTypes = useRef(['enrol_fields']).current
  const linkingFeature = 'ENROL'
  const userId = useSelector(state => usersSelectors.accountUserId(state))
  const { contactSupport } = useContactSupport()

  // Email should be predefined and disabled for Merchant channels
  const initialValues = useRef({ enrol_fields: { Email: userId } }).current
  const disabledFields = useRef({ enrol_fields: { Email: true } }).current

  const [headerText, summaryText] = isReenrol ? ['Let\'s try again', 'There was a problem getting your card set up. Please try again. Remember, we are always here to help if you would rather us help resolve this.'] : [plan?.account?.plan_name, plan?.account?.plan_summary]

  return (
    <div className={styles.root}>
      <h1 className={styles.root__header}>{headerText}</h1>
      <p className={styles.root__summary}>{summaryText}</p>
      <MembershipCardForm
        plan={plan}
        planId={planId}
        fieldTypes={fieldTypes}
        linkingFeature={linkingFeature}
        initialValues={initialValues}
        disabledFields={disabledFields}
        submitCaption='Register'
        submittingCaption='Registering'
      />
      {isReenrol && <Button secondary onClick={contactSupport} className={styles['root__alternate-option']}>Contact Support</Button>}
      {!isReenrol && <Button secondary onClick={logout} className={styles['root__alternate-option']}>Cancel</Button>}
  </div>
  )
}

export default MerchantMembershipCardEnrol
