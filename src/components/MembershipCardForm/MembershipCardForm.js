import React from 'react'
import { useSelector } from 'react-redux'
import DynamicInputGroup from 'components/Form/DynamicInputGroup'
import Button from 'components/Button'
import useForm from './hooks/useForm'
import { selectors as membershipCardsSelectors } from 'ducks/membershipCards'
import cx from 'classnames'
import CheckboxGroup from 'components/Form/CheckboxGroup'

import styles from './MembershipCardForm.module.scss'

const MembershipCardForm = ({ plan, planId, fieldTypes, linkingFeature, initialValues, disabledFields, submitCaption, submittingCaption }) => {
  const {
    values,
    documentValues,
    binkTermsValue,
    errors,
    handleChange,
    handleDocumentChange,
    handleBinkTermsChange,
    handleSubmit,
    handleBlur,
    entireFormValid,
    serviceError,
    submitError,
    serviceLoading,
    submitLoading,
  } = useForm(plan, planId, fieldTypes, linkingFeature, initialValues)

  const isAddForm = useSelector(state => membershipCardsSelectors.isReaddRequired(state))

  // todo: Adopt the following render<Name> naming convention across the app for other functions that return JSX
  const renderDocumentText = document => (
    <>
      {document.description}{' '}
      { document.url ? (
        <a className={styles.root__link} href={document.url} target='_blank' rel='noreferrer'>{document.name}</a>
      ) : (
        document.name
      ) }
    </>
  )

  const renderEnrolFormSection = () => (
    <>
      { Config.isMerchantChannel && (
        <CheckboxGroup
          className={cx(
            styles.root__group,
            styles['root__group--full-width'],
          )}
          value={binkTermsValue}
          onChange={handleBinkTermsChange}
          label={
            <>
              I accept the{' '}
              <a
                href='https://bink.com/terms-and-conditions/'
                target='_blank'
                rel='noreferrer'
                className={styles.root__link}
              >Bink terms & conditions</a>.
            </>
          }
        />
      ) }
      { plan?.account?.plan_documents
        ?.filter(document => document?.display?.includes(linkingFeature))
        ?.map(document => (
          document.checkbox ? (
            <CheckboxGroup
              className={cx(
                styles.root__group,
                styles['root__group--full-width'],
              )}
              key={document.name}
              label={renderDocumentText(document)}
              name={document.name}
              value={documentValues[document.name]}
              onChange={event => handleDocumentChange(event, document.name)}
            />
          ) : (
            <div
              className={cx(
                styles.root__group,
                styles['root__group--text-only'],
                styles['root__group--full-width'],
              )}
              key={document.name}
            >
              {renderDocumentText(document)}
            </div>
          )
        ))
      }
      {Config.isMerchantChannel && (
        <div className={cx(
          styles.root__group,
          styles['root__group--text-only'],
          styles['root__group--full-width'],
        )}>
          Please read the <a className={styles.root__link} href='https://bink.com/privacy-policy/' target='_blank' rel='noreferrer'>Bink privacy policy</a>
        </div>
      )}
    </>
  )

  return (
    values ? (
      <form onSubmit={handleSubmit}
        className={cx(
          styles.root,
          isAddForm && styles['root--add-only'],
        )}
      >
        { fieldTypes.map(fieldType => (
          plan.account[fieldType].map(fieldDescription => (
            <DynamicInputGroup
              className={cx(
                styles.root__group,
                fieldDescription.type === 3 && styles['root__group--full-width'], // span checkboxes across 2 columns
              )}
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

        { !isAddForm && renderEnrolFormSection() }

        <Button
          primary
          disabled={!entireFormValid || serviceLoading || submitLoading}
          className={styles.root__submit}
        >
          { ((serviceLoading || submitLoading) && submittingCaption) || submitCaption || 'Add my card' }
        </Button>
        { (serviceError || submitError) && (
          <div className={styles.root__error}>There was an error. Please try again.</div>
        ) }
      </form>
    ) : null
  )
}

export default MembershipCardForm
