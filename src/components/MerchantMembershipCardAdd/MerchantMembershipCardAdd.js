import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { selectors as usersSelectors } from 'ducks/users'

import useLoadMembershipPlans from './hooks/useLoadMembershipPlans'

import useContactSupport from 'hooks/useContactSupport'
import useLogout from 'hooks/useLogout'
import Button from 'components/Button'
import MembershipCardForm from 'components/MembershipCardForm'

import styles from './MerchantMembershipCardAdd.module.scss'

const MerchantMembershipCardAdd = ({ planId }) => {
  const userId = useSelector(state => usersSelectors.accountUserId(state))
  const { plan } = useLoadMembershipPlans(planId)
  const { contactSupport } = useContactSupport()
  const { logout } = useLogout()
  const fieldTypes = useRef(['add_fields']).current
  const initialValues = useRef({ authorise_fields: { Email: userId } }).current
  const linkingFeature = 'ADD'

  return (
    <div className={styles.root}>
      <h1 className={styles.root__header}>We found you</h1>
      <div className={styles.root__summary}>You already have a {plan?.account?.plan_name} {plan?.account?.plan_name_card?.toLowerCase()} registered to <span className={styles.root__userId}>{userId}</span>.</div>
      <div className={styles.root__summary}>Please enter your details below to view your balance and voucher information. You can find your number in your Welcome email.</div>
      <MembershipCardForm
        className={styles.root__form}
        plan={plan}
        planId={planId}
        fieldTypes={fieldTypes}
        initialValues={initialValues}
        linkingFeature={linkingFeature}
        submitCaption='Continue'
      />
      <Button secondary onClick={contactSupport} className={styles['root__contact-support']}>Forgotten your card number? Contact us</Button>
      <Button secondary onClick={logout} className={styles.root__logout}>Logout</Button>
    </div>
  )
}

export default MerchantMembershipCardAdd
