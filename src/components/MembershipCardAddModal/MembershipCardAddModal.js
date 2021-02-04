import React, { useRef } from 'react'
import Modal from 'components/Modal'
import useLoadMembershipPlans from './hooks/useLoadMembershipPlans'
import useCloseModalOnSuccess from './hooks/useCloseModalOnSuccess'
import Loading from 'components/Loading'
import MembershipCardForm from 'components/MembershipCardForm'
import { useMembershipCardsState } from 'hooks/membershipCards'

const MembershipCardAddModal = ({ onClose, planId }) => {
  const { plan, loading } = useLoadMembershipPlans(planId)
  const { add: { loading: addLoading } } = useMembershipCardsState()
  useCloseModalOnSuccess(onClose)
  const fieldTypes = useRef(['add_fields', 'authorise_fields']).current
  const linkingFeature = 'ADD'

  return (
    <Modal onClose={onClose}>
      { (loading || addLoading) && <Loading /> }
      <Modal.Header>Add your card</Modal.Header>
      <p>Please enter the following information to add your existing card to your account.</p>
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
