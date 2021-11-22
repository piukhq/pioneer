import React, { useRef, useEffect } from 'react'
import Modal from 'components/Modal'
import {
  useMembershipPlansState,
  useMembershipPlansDispatch,
} from 'hooks/membershipPlans'
import useCloseModalOnSuccess from './hooks/useCloseModalOnSuccess'
import LoadingIndicator from 'components/LoadingIndicator'
import MembershipCardForm from 'components/MembershipCardForm'
import { useMembershipCardsState } from 'hooks/membershipCards'

import styles from './MembershipCardAddModal.module.scss'

const MembershipCardAddModal = ({ onClose, planId }) => {
  const { getMembershipPlans } = useMembershipPlansDispatch()

  useEffect(() => {
    getMembershipPlans()
  }, [getMembershipPlans])

  const {
    membershipPlanById: plan,
    loading,
  } = useMembershipPlansState(planId)

  const { add: { loading: addLoading } } = useMembershipCardsState()
  useCloseModalOnSuccess(onClose)
  const fieldTypes = useRef(['add_fields', 'authorise_fields']).current
  const linkingFeature = 'ADD'

  return (
    <Modal onClose={onClose}>
      { (loading || addLoading) && <LoadingIndicator /> }
      <Modal.Header>Add your card</Modal.Header>
      <div className={styles.root__paragraph}>Please enter the following information to add your existing card to your account.</div>
      <MembershipCardForm
        plan={plan}
        planId={planId}
        fieldTypes={fieldTypes}
        linkingFeature={linkingFeature}
      />
    </Modal>
  )
}

export default MembershipCardAddModal
