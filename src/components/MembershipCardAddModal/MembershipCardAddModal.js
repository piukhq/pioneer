import React, { useRef } from 'react'
import Modal from 'components/Modal'
import useLoadMembershipPlans from './hooks/useLoadMembershipPlans'
import useCloseModalOnSuccess from './hooks/useCloseModalOnSuccess'
import Loading from 'components/Loading'
import MembershipCardForm from 'components/MembershipCardForm'

const MembershipCardAddModal = ({ onClose, planId }) => {
  const { plan, loading } = useLoadMembershipPlans(planId)
  useCloseModalOnSuccess(onClose)
  const fieldTypes = useRef(['add_fields', 'authorise_fields']).current

  return (
    <Modal onClose={onClose}>
      { loading && <Loading /> }
      <Modal.Header>Add your card</Modal.Header>
      <MembershipCardForm
        plan={plan}
        planId={planId}
        fieldTypes={fieldTypes}
      />
    </Modal>
  )
}

export default MembershipCardAddModal
