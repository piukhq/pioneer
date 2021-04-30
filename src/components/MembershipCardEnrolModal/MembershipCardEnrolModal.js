import React, { useRef } from 'react'
import Modal from 'components/Modal'
import useLoadMembershipPlans from './hooks/useLoadMembershipPlans'
import useCloseModalOnSuccess from './hooks/useCloseModalOnSuccess'
import Loading from 'components/Loading'
import MembershipCardForm from 'components/MembershipCardForm'
import { useMembershipCardsState } from 'hooks/membershipCards'

import styles from './MembershipCardEnrolModal.module.scss'

const MembershipCardEnrolModal = ({ onClose, planId }) => {
  const { plan, loading } = useLoadMembershipPlans(planId)
  const { add: { loading: addLoading } } = useMembershipCardsState()
  useCloseModalOnSuccess(onClose)
  const fieldTypes = useRef(['enrol_fields']).current
  const linkingFeature = 'ENROL'

  return (
    <Modal onClose={onClose}>
      { (loading || addLoading) && <Loading /> }
      <Modal.Header>Sign up for { plan?.account?.plan_name }</Modal.Header>
      <p className={styles.root__paragraph}>{ plan?.account?.plan_summary }</p>
      <MembershipCardForm
        plan={plan}
        planId={planId}
        fieldTypes={fieldTypes}
        linkingFeature={linkingFeature}
      />
    </Modal>
  )
}

export default MembershipCardEnrolModal
