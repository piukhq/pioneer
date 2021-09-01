import React, { useCallback, useState } from 'react'
import TextInputGroup from 'components/Form/TextInputGroup'
import SelectboxGroup from 'components/Form/SelectboxGroup'
import CheckboxGroup from 'components/Form/CheckboxGroup'
import { getDateOfBirthsDates } from 'utils/dates'
import { isValidDateOfBirth } from 'utils/validation'

const types = {
  TEXT_INPUT: 0,
  PASSWORD_INPUT: 1,
  SELECTBOX: 2,
  CHECKBOX: 3,
}

const DynamicInputGroup = ({ className, data, fieldType, value, onChange, onBlur, error, ...rest }) => {
  const {
    choice,
    column,
    common_name,
    description,
    type,
  } = data

  const [dateOfBirth, setDateOfBirth] = useState({})
  const [isInvalidDateOfBirth, setIsInvalidDateOfBirth] = useState(false)

  const isDOBField = type === 0 && common_name === 'date_of_birth'

  const [inputType, selectboxValues] = isDOBField ? [2, getDateOfBirthsDates()] : [type, choice]

  const handleChange = useCallback(
    (event) => { onChange(event, data, fieldType) },
    [onChange, data, fieldType],
  )

  const handleBlur = useCallback(
    (event) => { onBlur(event, data, fieldType) },
    [onBlur, data, fieldType],
  )

  const handleSelectboxChange = useCallback(
    (key, event) => {
      const updatedDateOfBirthValues = {
        ...dateOfBirth,
        [key]: event.target.value,
      }
      setDateOfBirth(updatedDateOfBirthValues)

      const { DD: day, MM: month, YYYY: year } = updatedDateOfBirthValues

      // Only perform filed specific validation and set form values if all fields are defined
      if (day !== undefined && month !== undefined && year !== undefined) {
        const invalidDateOfBirth = !isValidDateOfBirth(updatedDateOfBirthValues)
        // Only set state if value has changed
        if (isInvalidDateOfBirth !== invalidDateOfBirth) {
          setIsInvalidDateOfBirth(invalidDateOfBirth)
        }

        const dateString = `${day}/${month}/${year}`

        // Nested spread necessary in order to maintain current implementation of form validation in hook i.e. useForm hook expects `event.target.value`
        const customEvent = {
          ...event,
          target: {
            ...event.target,
            value: dateString,
          },
        }

        onChange(customEvent, data, fieldType)
      }
    }, [onChange, data, dateOfBirth, isInvalidDateOfBirth, fieldType],
  )

  const handleSelectboxBlur = useCallback(
    (event) => {
      const { DD: day, MM: month, YYYY: year } = dateOfBirth

      // Only perform form validation if all fields are defined
      if (day !== undefined && month !== undefined && year !== undefined) {
        onBlur(event, data, fieldType)
      }
    },
    [dateOfBirth, data, onBlur, fieldType],
  )

  const getSelectboxError = useCallback(() => {
    return error || isInvalidDateOfBirth ? 'Invalid date' : ''
  }, [error, isInvalidDateOfBirth])

  switch (inputType) {
    case types.TEXT_INPUT:
      return (
        <TextInputGroup
          className={className}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          error={error}
          name={common_name}
          label={column}
          placeholder={description}
          {...rest}
        />
      )
    case types.PASSWORD_INPUT:
      return (
        <TextInputGroup
          className={className}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          error={error}
          name={common_name}
          label={column}
          placeholder={description}
          type='password'
          {...rest}
        />
      )
    case types.SELECTBOX:
      return (
        <SelectboxGroup
          className={className}
          value={value}
          values={selectboxValues}
          selectedValues={dateOfBirth}
          onChange={handleSelectboxChange}
          onBlur={handleSelectboxBlur}
          error={getSelectboxError()}
          name={common_name}
          label={column}
          {...rest}
        />
      )
    case types.CHECKBOX:
      return (
        <CheckboxGroup
          className={className}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          error={error}
          name={column}
          label={description}
          {...rest}
        />
      )
    default:
      return null
  }
}

export default DynamicInputGroup
