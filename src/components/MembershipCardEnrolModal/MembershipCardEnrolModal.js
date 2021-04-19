import React, { useRef } from 'react'
import Modal from 'components/Modal'
import { selectors as usersSelectors } from 'ducks/users'
import useLoadMembershipPlans from './hooks/useLoadMembershipPlans'
import useCloseModalOnSuccess from './hooks/useCloseModalOnSuccess'
import Loading from 'components/Loading'
import MembershipCardForm from 'components/MembershipCardForm'
import { useMembershipCardsState } from 'hooks/membershipCards'
import Config from 'Config'
import { useSelector } from 'react-redux'

const MembershipCardEnrolModal = ({ onClose, planId }) => {
  const { plan, loading } = useLoadMembershipPlans(planId)
  const { add: { loading: addLoading } } = useMembershipCardsState()
  useCloseModalOnSuccess(onClose)
  const fieldTypes = useRef(['enrol_fields']).current
  const linkingFeature = 'ENROL'
  const userId = useSelector(state => usersSelectors.accountUserId(state))
  let initialValues, disabledFields
  if (Config.isMerchantChannel) {
    initialValues = { enrol_fields: { Email: userId } }
    disabledFields = { enrol_fields: { Email: true } }
  }

  return (
    <Modal onClose={onClose}>
      { (loading || addLoading) && <Loading /> }
      <Modal.Header>Sign up for { plan?.account?.plan_name }</Modal.Header>
      <p>{ plan?.account?.plan_summary }</p>
      <MembershipCardForm
        plan={plan}
        planId={planId}
        fieldTypes={fieldTypes}
        linkingFeature={linkingFeature}
        initialValues={initialValues}
        disabledFields={disabledFields}
      />
    </Modal>
  )
}

export default MembershipCardEnrolModal
