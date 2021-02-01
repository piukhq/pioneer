import React from 'react'
import DynamicInputGroup from 'components/Form/DynamicInputGroup'
import Button from 'components/Button'
import useForm from './hooks/useForm'
import styles from './MembershipCardForm.module.scss'

const MembershipCardForm = ({ plan, planId, fieldTypes }) => {
  const { values, errors, handleChange, handleSubmit, handleBlur, entireFormValid } = useForm(plan, planId, fieldTypes)

  return (
    values ? (
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
    ) : null
  )
}

export default MembershipCardForm
