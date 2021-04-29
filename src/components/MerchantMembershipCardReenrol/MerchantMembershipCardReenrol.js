import React, { useRef } from 'react'
import { selectors as usersSelectors } from 'ducks/users'
// import { selectors as membershipCardsSelectors } from 'ducks/membershipCards'
import useLoadMembershipPlans from './hooks/useLoadMembershipPlans'
import MembershipCardForm from 'components/MembershipCardForm'

import useContactSupport from 'hooks/useContactSupport'
import { useSelector } from 'react-redux'
import Button from 'components/Button'
import { useParams } from 'react-router-dom'

import styles from './MerchantMembershipCardReenrol.module.scss'

const MerchantMembershipCardReenrol = () => {
  const { id } = useParams()
  const membershipCard = useSelector(state => state.membershipCards.cards[id])
  const planId = membershipCard.membership_plan
  const { plan } = useLoadMembershipPlans(planId)
  const fieldTypes = useRef(['enrol_fields']).current
  const linkingFeature = 'ENROL'
  const userId = useSelector(state => usersSelectors.accountUserId(state))
  const { contactSupport } = useContactSupport()

  // Email should be predefined and disabled for Merchant channels
  const initialValues = useRef({ enrol_fields: { Email: userId } }).current
  const disabledFields = useRef({ enrol_fields: { Email: true } }).current

  return (
    <div className={styles.root}>
      <h1 className={styles.root__header}>Let's try again</h1>
      <p className={styles.root__summary}>There was a problem getting your card set up. Please try again. Remember, we are always here to help if you would rather us help resolve this.</p>
      <MembershipCardForm
        plan={plan}
        planId={planId}
        fieldTypes={fieldTypes}
        linkingFeature={linkingFeature}
        initialValues={initialValues}
        disabledFields={disabledFields}
        submitCaption='Register'
        submittingCaption='Registering'
        existingCardId={id}
      />
      <Button secondary onClick={contactSupport} className={styles.root__cancel}>Contact Support</Button>
    </div>
  )
}

export default MerchantMembershipCardReenrol
