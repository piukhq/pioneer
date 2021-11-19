import React, { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectors as usersSelectors } from 'ducks/users'
import {
  useMembershipPlansState,
  useMembershipPlansDispatch,
} from 'hooks/membershipPlans'

import { useContactSupport } from 'hooks/useContactSupport'
import { useLogout } from 'hooks/useLogout'
import Button from 'components/Button'
import MembershipCardForm from 'components/MembershipCardForm'

import styles from './MerchantMembershipCardAdd.module.scss'

const MerchantMembershipCardAdd = ({ planId }) => {
  const { getMembershipPlans } = useMembershipPlansDispatch()
  useEffect(() => {
    getMembershipPlans()
  }, [getMembershipPlans])

  const {
    membershipPlanById: plan,
  } = useMembershipPlansState(planId)

  const userId = useSelector(state => usersSelectors.accountUserId(state))
  const { contactSupport } = useContactSupport()
  const { logout } = useLogout()
  const fieldTypes = useRef(['add_fields']).current
  const initialValues = useRef({ authorise_fields: { Email: userId } }).current
  const linkingFeature = 'ADD'

  return (
    <div className={styles.root}>
      <h1 className={styles.root__header}>We found you</h1>
      <div className={styles.root__summary} data-testid='paragraph-1'>You’re already a member of the {plan?.account?.plan_name}! Your account is registered to <span className={styles.root__userId}>{userId}</span>.</div>
      <div className={styles.root__summary} data-testid='paragraph-2'>Please enter your details below to view your balance and voucher information. You can find your number in your Welcome email.</div>
      <MembershipCardForm
        className={styles.root__form}
        plan={plan}
        planId={planId}
        fieldTypes={fieldTypes}
        initialValues={initialValues}
        linkingFeature={linkingFeature}
        submitCaption='Continue'
      />
      <Button secondary onClick={contactSupport} data-testid='contact-support-button' className={styles['root__contact-support']}>Forgotten your card number? Contact us</Button>
      <Button secondary onClick={logout} className={styles.root__logout} data-testid='logout-button'>Logout</Button>
    </div>
  )
}

export default MerchantMembershipCardAdd
