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

  const errorMessage = (serviceError || submitError) ? 'There was an error. Please try again.' : null

  const isAddForm = useSelector(state => membershipCardsSelectors.isReaddRequired(state))

  const isNonWasabiWhitelabel = Config.isMerchantChannel && Config.theme !== 'wasabi'
  const isWasabiWhitelabel = Config.isMerchantChannel && Config.theme === 'wasabi'

  const planDocuments = plan?.account?.plan_documents
    ?.filter(document => document?.display?.includes(linkingFeature))
    // Sort by checkbox-using documents first and then by name
    ?.sort((a, b) => b.checkbox - a.checkbox || a.name.localeCompare(b.name))

  const renderDocumentText = document => (
    <>
      {document.description}{' '}
      { document.url ? (
        <a className={styles.root__link} href={document.url} target='_blank' rel='noreferrer'>{document.name}.</a>
      ) : (
        `${document.name}.`
      ) }
    </>
  )

  const renderFormFields = () => (
    fieldTypes.map(fieldType => (
      plan.account[fieldType].map(fieldDescription => (
        <DynamicInputGroup
          className={cx(
            styles.root__group,
            styles['root__group--dynamic-field'],
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
    ))
  )

  const renderCheckboxDocument = (document) => (
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
  )

  const renderNonCheckboxDocument = (document) => (
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

  const renderNonWasabiEnrolFormSection = () => (
    <>
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
      { planDocuments.map(document => document.checkbox ? renderCheckboxDocument(document) : renderNonCheckboxDocument(document))}
      <div className={cx(
        styles.root__group,
        styles['root__group--text-only'],
        styles['root__group--full-width'],
      )}>
        Please read the <a className={styles.root__link} href='https://bink.com/privacy-policy/' target='_blank' rel='noreferrer'>Bink privacy policy</a>
      </div>
    </>
  )

  const renderWasabiEnrolFormSection = () => (
    <>
      { planDocuments.map(document => document.checkbox && renderCheckboxDocument(document))}
      <div className={cx(
        styles.root__group,
        styles['root__group--text-only'],
        styles['root__group--full-width'],
        styles['root__wasabi-enrol-box'],
      )}>
        <div className={styles['root__wasabi-enrol-box-content']}>
          Wasabi Club is powered by <a className={styles['root__wasabi-enrol-box-content--link']} href='https://bink.com' target='_blank' rel='noreferrer'>Bink</a> technology. To find out more, please read Bink's <a className={styles['root__wasabi-enrol-box-content--link']} href='https://bink.com/privacy-policy/' target='_blank' rel='noreferrer'>Privacy Policy</a> and <a className={styles['root__wasabi-enrol-box-content--link']} href='https://policies.gb.bink.com/web/wasabi-cp.html' target='_blank' rel='noreferrer'>Cookie Policy</a>.
        </div>
        <CheckboxGroup
          className={cx(
            styles.root__group,
            styles['root__group--full-width'],
            styles['root__wasabi-enrol-box-content'],
          )}
          value={binkTermsValue}
          onChange={handleBinkTermsChange}
          label={
            <>
              I agree to
              <a
                href='https://bink.com/terms-and-conditions/'
                target='_blank'
                rel='noreferrer'
                className={styles['root__wasabi-enrol-box-content--link']}
              > Bink's terms & conditions</a>.
            </>
          }
        />
      </div>
    </>
  )

  const renderSubmitButton = () => (
    <Button
      primary
      disabled={!entireFormValid || serviceLoading || submitLoading}
      className={styles.root__submit}
      error={errorMessage}
    >
     { ((serviceLoading || submitLoading) && submittingCaption) || submitCaption || 'Add my card' }
    </Button>
  )

  return (
    values ? (
      <form onSubmit={handleSubmit}
        className={cx(
          styles.root,
          isAddForm && styles['root--add-only'],
        )}
      >
        {renderFormFields()}
        { !isAddForm && isNonWasabiWhitelabel && renderNonWasabiEnrolFormSection() }
        { !isAddForm && isWasabiWhitelabel && renderWasabiEnrolFormSection() }
        { renderSubmitButton()}
      </form>
    ) : null
  )
}

export default MembershipCardForm
