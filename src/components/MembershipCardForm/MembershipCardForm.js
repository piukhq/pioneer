import React from 'react'
import DynamicInputGroup from 'components/Form/DynamicInputGroup'
import Button from 'components/Button'
import useForm from './hooks/useForm'
import styles from './MembershipCardForm.module.scss'
import CheckboxGroup from 'components/Form/CheckboxGroup'

const MembershipCardForm = ({ plan, planId, fieldTypes, linkingFeature, initialValues, disabledFields }) => {
  const {
    values,
    documentValues,
    errors,
    handleChange,
    handleDocumentChange,
    handleSubmit,
    handleBlur,
    entireFormValid,
  } = useForm(plan, planId, fieldTypes, linkingFeature, initialValues)

  const documentText = document => (
    <>
      {document.description}{' '}
      { document.url ? (
        <a href={document.url} target='_blank' rel='noreferrer'>{document.name}</a>
      ) : (
        document.name
      ) }
    </>
  )

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
              disabled={disabledFields?.[fieldType]?.[fieldDescription?.column]}
            />
          ))
        )) }
        {/* todo: indentation */}
         { plan?.account?.plan_documents
           ?.filter(document => document?.display?.includes(linkingFeature))
           ?.map(document => (
             document.checkbox ? (
               <CheckboxGroup
                 className={styles.root__group}
                 key={document.name}
                 label={documentText(document)}
                 name={document.name}
                 value={documentValues[document.name]}
                 onChange={event => handleDocumentChange(event, document.name)}
               />
             ) : (
               <div key={document.name} className={styles.root__group}>{documentText(document)} </div>
             )
           ))
         }
        <Button disabled={!entireFormValid} className={styles.root__submit}>Add my card</Button>
      </form>
    ) : null
  )
}

export default MembershipCardForm
