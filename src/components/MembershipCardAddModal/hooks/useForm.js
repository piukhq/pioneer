import { useState, useEffect, useCallback } from 'react'
import { useMembershipCardsDispatch } from 'hooks/membershipCards'

const useForm = (plan, planId) => {
  const [values, setValues] = useState(null)
  const [errors, setErrors] = useState(null)

  useEffect(() => {
    const getDefaultFieldValuesFromPlan = () => {
      if (!plan) {
        return null
      }
      const addFields = plan?.account?.add_fields || []
      const authoriseFields = plan?.account?.authorise_fields || []

      return {
        add_fields: addFields.reduce(
          (acc, field) => ({
            ...acc,
            [field.column]: '',
          }),
          {},
        ),
        authorise_fields: authoriseFields.reduce(
          (acc, field) => ({
            ...acc,
            [field.column]: '',
          }),
          {},
        ),
      }
    }
    setValues(getDefaultFieldValuesFromPlan)
  }, [plan])

  useEffect(() => {
    const getDefaultFieldErrorsFromPlan = () => {
      if (!plan) {
        return null
      }
      const addFields = plan?.account?.add_fields || []
      const authoriseFields = plan?.account?.authorise_fields || []

      return {
        add_fields: addFields.reduce(
          (acc, field) => ({
            ...acc,
            [field.column]: null,
          }),
          {},
        ),
        authorise_fields: authoriseFields.reduce(
          (acc, field) => ({
            ...acc,
            [field.column]: null,
          }),
          {},
        ),
      }
    }
    setErrors(getDefaultFieldErrorsFromPlan)
  }, [plan])

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

    const accountData = {
      add_fields: plan.account.add_fields.map(
        ({ column }) => ({ column, value: values.add_fields[column] }),
      ),
      authorise_fields: plan.account.authorise_fields.map(
        ({ column }) => ({ column, value: values.authorise_fields[column] }),
      ),
    }

    addMembershipCard(accountData, planId)
  }, [plan, values, addMembershipCard, planId])

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
  }
}

export default useForm
