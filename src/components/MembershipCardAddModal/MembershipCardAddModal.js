import React from 'react'
import Modal from 'components/Modal'
import useLoadMembershipPlans from './hooks/useLoadMembershipPlans'
import useForm from './hooks/useForm'
import useCloseModalOnSuccess from './hooks/useCloseModalOnSuccess'
import Loading from 'components/Loading'
import DynamicInputGroup from 'components/Form/DynamicInputGroup'
import Button from 'components/Button'

import styles from './MembershipCardAddModal.module.scss'

const MembershipCardAddModal = ({ onClose, planId }) => {
  const { plan, loading } = useLoadMembershipPlans(planId)
  const { values, errors, handleChange, handleSubmit, handleBlur, entireFormValid } = useForm(plan, planId)
  useCloseModalOnSuccess(onClose)

  return (
    <Modal onClose={onClose}>
      { loading && <Loading /> }
      <Modal.Header>Add your card</Modal.Header>
      { values && (
        <form onSubmit={handleSubmit}>
          { plan.account.add_fields.map(fieldDescription => (
            <DynamicInputGroup
              className={styles.root__group}
              key={fieldDescription.column}
              value={values.add_fields[fieldDescription.column]}
              error={errors.add_fields[fieldDescription.column]}
              onChange={handleChange}
              onBlur={handleBlur}
              data={fieldDescription}
              fieldType='add_fields'
            />
          )) }
          { plan.account.authorise_fields.map(fieldDescription => (
            <DynamicInputGroup
              className={styles.root__group}
              key={fieldDescription.column}
              value={values.authorise_fields[fieldDescription.column]}
              error={errors.authorise_fields[fieldDescription.column]}
              onChange={handleChange}
              onBlur={handleBlur}
              data={fieldDescription}
              fieldType='authorise_fields'
            />
          )) }
          <Button disabled={!entireFormValid} className={styles.root__submit}>Add my card</Button>
        </form>
      )}
    </Modal>
  )
}

export default MembershipCardAddModal
