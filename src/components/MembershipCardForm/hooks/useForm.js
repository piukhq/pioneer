import { useState, useEffect, useCallback } from 'react'
import { useMembershipCardsDispatch } from 'hooks/membershipCards'

const useForm = (plan, planId, fieldTypes) => {
  const [values, setValues] = useState(null)
  const [errors, setErrors] = useState(null)
  const [entireFormValid, setEntireFormValid] = useState(null)

  useEffect(() => {
    const getDefaultFieldValuesFromPlan = () => {
      if (!plan) {
        return null
      }

      const defaultFieldValues = {}
      fieldTypes.forEach(fieldType => {
        defaultFieldValues[fieldType] = plan?.account?.[fieldType].reduce(
          (acc, field) => ({
            ...acc,
            [field.column]: field.choice?.length > 0 ? field.choice[0] : field.type === 3 ? false : '',
          }),
          {},
        )
      })

      return defaultFieldValues
    }
    setValues(getDefaultFieldValuesFromPlan)
  }, [plan, fieldTypes])

  useEffect(() => {
    const isEntireFormValid = () => {
      let isFormValid = true
      if (!plan || !values) {
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
            isFormValid = false
          }
        })
      })

      return isFormValid
    }

    setEntireFormValid(isEntireFormValid())
  }, [values, plan, fieldTypes])

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

  const { addMembershipCard } = useMembershipCardsDispatch()

  const handleSubmit = useCallback((e) => {
    e.preventDefault()

    const accountData = {}
    fieldTypes.forEach(fieldType => {
      accountData[fieldType] = plan?.account?.[fieldType].map(
        ({ column }) => ({ column, value: values[fieldType][column] }),
      )
    })

    addMembershipCard(accountData, planId)
  }, [plan, values, addMembershipCard, planId, fieldTypes])

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    entireFormValid,
  }
}

export default useForm
