import { useState, useEffect, useCallback } from 'react'
import { useMembershipCardsDispatch } from 'hooks/membershipCards'
import Config from 'Config'
import usePlanDocumentsValues from './usePlanDocumentsValues'
import useRedirectToNewMembershipCard from './useRedirectToNewMembershipCard'
import { useSelector } from 'react-redux'

const useForm = (plan, planId, fieldTypes, linkingFeature, initialValues) => {
  useRedirectToNewMembershipCard()
  const [values, setValues] = useState(null)
  const [errors, setErrors] = useState(null)
  const [binkTermsValue, setBinkTermsValue] = useState(false)
  const [entireFormValid, setEntireFormValid] = useState(null)
  const {
    allPlanDocumentsAccepted,
    documentValues,
    handleDocumentChange,
  } = usePlanDocumentsValues(plan, linkingFeature)

  useEffect(() => {
    const getDefaultFieldValuesFromPlan = () => {
      if (!plan) {
        return null
      }

      const defaultFieldValues = {}
      fieldTypes.forEach(fieldType => {
        defaultFieldValues[fieldType] = plan?.account?.[fieldType].reduce(
          (acc, field) => {
            let defaultValue
            if (initialValues?.[fieldType]?.[field.column] !== undefined) {
              // if an initial value is defined then use it
              defaultValue = initialValues?.[fieldType]?.[field.column]
            } else if (field.choice?.length > 0) {
              // otherwise if it is a dropdown then have the first value pre-selected
              defaultValue = field.choice[0]
            } else if (field.type === 3) {
              // if it's a checkbox then the default value should be false
              defaultValue = false
            } else {
              // otherwise it should be a text field and its default value should be empty string
              defaultValue = ''
            }
            return {
              ...acc,
              [field.column]: defaultValue,
            }
          },
          {},
        )
      })

      return defaultFieldValues
    }
    setValues(getDefaultFieldValuesFromPlan)
  }, [plan, fieldTypes, initialValues])

  useEffect(() => {
    const isEntireFormValid = () => {
      let formFieldsAreValid = true
      if (!plan || !values) {
        return false
      }

      if (Config.isMerchantChannel && !binkTermsValue) {
        return false
      }

      fieldTypes.forEach(fieldType => {
        plan?.account?.[fieldType].forEach(field => {
          const fieldName = field.column
          const value = values[fieldType][fieldName]

          let valid
          if (field.validation) {
            const re = new RegExp(field.validation)
            valid = value.toString().match(re)
          } else {
            valid = true
          }

          if (!valid) {
            formFieldsAreValid = false
          }
        })
      })

      return formFieldsAreValid && allPlanDocumentsAccepted
    }

    setEntireFormValid(isEntireFormValid())
  }, [values, binkTermsValue, plan, fieldTypes, allPlanDocumentsAccepted])

  useEffect(() => {
    const getDefaultFieldErrorsFromPlan = () => {
      if (!plan) {
        return null
      }

      const defaultFieldErrors = {}
      fieldTypes.forEach(fieldType => {
        defaultFieldErrors[fieldType] = plan?.account?.[fieldType].reduce(
          (acc, field) => ({
            ...acc,
            [field.column]: null,
          }),
          {},
        )
      })

      return defaultFieldErrors
    }
    setErrors(getDefaultFieldErrorsFromPlan)
  }, [plan, fieldTypes])

  const handleChange = useCallback((event, data, fieldType) => {
    setValues({
      ...values,
      [fieldType]: {
        ...values[fieldType],
        [data.column]: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
      },
    })

    setErrors({
      ...errors,
      [fieldType]: {
        ...errors[fieldType],
        [data.column]: null,
      },
    })
  }, [values, errors])

  const handleBlur = useCallback((event, data, fieldType) => {
    const value = values[fieldType][data.column]

    let valid
    if (data.validation) {
      const re = new RegExp(data.validation)
      valid = value.toString().match(re)
    } else {
      valid = true
    }

    setErrors({
      ...errors,
      [fieldType]: {
        ...errors[fieldType],
        [data.column]: valid ? null : 'Incorrect format',
      },
    })
  }, [values, errors])

  const handleBinkTermsChange = useCallback((event) => {
    setBinkTermsValue(event.target.checked)
  }, [setBinkTermsValue])

  const { addMembershipCard, addMembershipCardOnMerchantChannel } = useMembershipCardsDispatch()

  const handleSubmit = useCallback((e) => {
    e.preventDefault()

    const accountData = {}
    fieldTypes.forEach(fieldType => {
      accountData[fieldType] = plan?.account?.[fieldType].map(
        ({ column }) => ({ column, value: values[fieldType][column] }),
      )
    })
    if (Config.isMerchantChannel) {
      addMembershipCardOnMerchantChannel(accountData, planId)
      // once a card has been added the useRedirectToNewMembershipCard hook will deal with the redirect
    } else {
      addMembershipCard(accountData, planId)
    }
  }, [plan, values, addMembershipCard, addMembershipCardOnMerchantChannel, planId, fieldTypes])

  const deleteError = useSelector(state => state.membershipCards.delete.error)

  const serviceError = useSelector(state => state.service.post.error)
  const submitError = useSelector(state => state.membershipCards.add.error)

  const serviceLoading = useSelector(state => state.service.post.loading)
  const submitLoading = useSelector(state => state.membershipCards.add.loading)

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    entireFormValid,
    binkTermsValue,
    documentValues,
    handleDocumentChange,
    handleBinkTermsChange,
    serviceError,
    deleteError,
    submitError,
    serviceLoading,
    submitLoading,
  }
}

export default useForm
