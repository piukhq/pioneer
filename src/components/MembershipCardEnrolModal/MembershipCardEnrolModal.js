import React from 'react'
import Modal from 'components/Modal'
import useLoadMembershipPlans from './hooks/useLoadMembershipPlans'
import useForm from './hooks/useForm'
import useCloseModalOnSuccess from './hooks/useCloseModalOnSuccess'
import Loading from 'components/Loading'
import DynamicInputGroup from 'components/Form/DynamicInputGroup'
import Button from 'components/Button'

import styles from './MembershipCardEnrolModal.module.scss'

const MembershipCardEnrolModal = ({ onClose, planId }) => {
  const { plan, loading } = useLoadMembershipPlans(planId)
  const { values, errors, handleChange, handleSubmit, handleBlur, entireFormValid } = useForm(plan, planId)
  useCloseModalOnSuccess(onClose)

  // const fieldTypes = ['add_fields', 'authorise_fields']
  const fieldTypes = ['enrol_fields']

  return (
    <Modal onClose={onClose}>
      { loading && <Loading /> }
      <Modal.Header>Enrol</Modal.Header>
      { values && (
        <form onSubmit={handleSubmit}>
          { fieldTypes.map(fieldType => (
            plan.account[fieldType].map(fieldDescription => (
              <DynamicInputGroup
                className={styles.root__group}
                key={fieldDescription.column}
                value={values[fieldType][fieldDescription.column]}
                error={errors[fieldType][fieldDescription.column]}
                onChange={handleChange}
                onBlur={handleBlur}
                data={fieldDescription}
                fieldType={fieldType}
              />
            ))
          )) }
          <Button disabled={!entireFormValid} className={styles.root__submit}>Add my card</Button>
        </form>
      )}
    </Modal>
  )
}

export default MembershipCardEnrolModal
