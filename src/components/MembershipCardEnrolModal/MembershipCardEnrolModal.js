import React, { useRef } from 'react'
import Modal from 'components/Modal'
import useLoadMembershipPlans from './hooks/useLoadMembershipPlans'
import useCloseModalOnSuccess from './hooks/useCloseModalOnSuccess'
import Loading from 'components/Loading'
import MembershipCardForm from 'components/MembershipCardForm'

const MembershipCardEnrolModal = ({ onClose, planId }) => {
  const { plan, loading } = useLoadMembershipPlans(planId)
  useCloseModalOnSuccess(onClose)
  const fieldTypes = useRef(['enrol_fields']).current

  return (
    <Modal onClose={onClose}>
      { loading && <Loading /> }
      {/* todo: to decide the title of the modal */}
      <Modal.Header>Sign up for new card</Modal.Header>
      <MembershipCardForm
        plan={plan}
        planId={planId}
        fieldTypes={fieldTypes}
      />
    </Modal>
  )
}

export default MembershipCardEnrolModal
