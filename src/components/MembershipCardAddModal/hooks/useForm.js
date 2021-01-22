import { useState, useEffect, useCallback } from 'react'
import { useMembershipCardsDispatch } from 'hooks/membershipCards'

const useForm = (plan, planId) => {
  const [values, setValues] = useState(null)

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

  const handleChange = useCallback((event, data, fieldType) => {
    setValues({
      ...values,
      [fieldType]: {
        ...values[fieldType],
        [data.column]: event.target.value,
      },
    })
  }, [values])

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
    handleChange,
    handleSubmit,
  }
}

export default useForm
