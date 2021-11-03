import React from 'react'
import { useSelector } from 'react-redux'
import DynamicInputGroup from 'components/Form/DynamicInputGroup'
import Button from 'components/Button'
import { useForm } from './hooks/useForm'
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

  const errorMessage = (serviceError || submitError) ? 'There was an error. Please try again.' : null

  const isAddForm = useSelector(state => membershipCardsSelectors.isReaddRequired(state))

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
        <div data-testid='bink-terms-and-conditions'
          className={cx(
            styles.root__group,
            styles['root__group--full-width'],
          )}
        >
          <CheckboxGroup
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
        </div>
      ) }

      { plan?.account?.plan_documents
        ?.filter(document => document?.display?.includes(linkingFeature))
        // Sort by checkbox-using documents first and then by name
        ?.sort((a, b) => b.checkbox - a.checkbox || a.name.localeCompare(b.name))
        ?.map((document, index) => (
          document.checkbox ? (
            <div key={index} data-testid='plan-document-checkbox'>
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
            </div>
          ) : (
            <div key={index} data-testid='plan-document-text'
              className={cx(
                styles.root__group,
                styles['root__group--text-only'],
                styles['root__group--full-width'],
              )}
            >
              {renderDocumentText(document)}
            </div>
          )
        ))
      }

      { Config.isMerchantChannel && (
        <div data-testid='bink-privacy-policy'
          className={cx(
            styles.root__group,
            styles['root__group--text-only'],
            styles['root__group--full-width'],
          )}
        >
          Please read the <a className={styles.root__link} href='https://bink.com/privacy-policy/' target='_blank' rel='noreferrer'>Bink privacy policy</a>
        </div>
      )}
    </>
  )

  return (
    values ? (
      <form onSubmit={handleSubmit} data-testid='membership-card-form'
        className={cx(
          styles.root,
          isAddForm && styles['root--add-only'],
        )}
      >
        { fieldTypes.map(fieldType => (
          plan.account[fieldType].map(fieldDescription => (
            <div key={fieldDescription.column} data-testid={`input-field-${fieldType}-${fieldDescription.column}`}
              className={cx(
                styles.root__group,
                styles['root__group--dynamic-field'],
                fieldDescription.type === 3 && styles['root__group--full-width'], // span checkboxes across 2 columns
              )}
            >
              <DynamicInputGroup
                key={fieldDescription.column}
                value={values[fieldType][fieldDescription.column]}
                error={errors[fieldType][fieldDescription.column]}
                onChange={handleChange}
                onBlur={handleBlur}
                data={fieldDescription}
                fieldType={fieldType}
                disabled={disabledFields?.[fieldType]?.[fieldDescription?.column]}
              />
            </div>
          ))
        )) }

        { !isAddForm && renderEnrolFormSection() }

        <div data-testid='membership-card-form-button' className={styles.root__submit}>
          <Button
            primary
            disabled={!entireFormValid || serviceLoading || submitLoading}
            error={errorMessage}
          >
            { ((serviceLoading || submitLoading) && submittingCaption) || submitCaption || 'Add my card' }
          </Button>
        </div>
      </form>
    ) : null
  )
}

export default MembershipCardForm
