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
  const { reenrolFormVisible } = useLoadMembershipCardsReenrol()
  const { logout } = useLogout()
  const fieldTypes = useRef(['enrol_fields']).current
  const linkingFeature = 'ENROL'
  const userId = useSelector(state => usersSelectors.accountUserId(state))
  const { contactSupport } = useContactSupport()

  // Email should be predefined and disabled for Merchant channels
  const initialValues = useRef({ enrol_fields: { Email: userId } }).current
  const disabledFields = useRef({ enrol_fields: { Email: true } }).current

  const renderPlanSummary = () => {
    // If theme specific config values are defined then use them, else default to API driven copy
    if (Config.planSummary.length > 0) {
      return Config.planSummary.map((summaryText, index) => (
        <div className={styles.root__summary} key={index}>{summaryText}</div>
      ))
    }
    return <div className={styles.root__summary}>{plan?.account?.plan_summary}</div>
  }

  return (
    <div className={styles.root}>
      {reenrolFormVisible ? (
        <>
          <h1 className={styles.root__header}>Let's try again</h1>
          <p className={styles.root__summary}>There was a problem getting your card set up. Please try again. Remember, we are always here to help if you would rather us help resolve this.</p>
        </>
      ) : (
        <>
          <h1 className={styles.root__header}>Join {plan?.account?.plan_name}</h1>
          {renderPlanSummary()}
        </>
      ) }
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
      {reenrolFormVisible ? (
        <Button secondary onClick={contactSupport} className={styles['root__contact-support']}>Contact support</Button>
      ) : (
        <Button secondary onClick={logout} className={styles.root__cancel}>Cancel</Button>
      ) }
  </div>
  )
}

export default MerchantMembershipCardEnrol
