import React, { useCallback } from 'react'
import TextInputGroup from 'components/Form/TextInputGroup'
import SelectboxGroup from 'components/Form/SelectboxGroup'
import CheckboxGroup from 'components/Form/CheckboxGroup'

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

  const handleChange = useCallback(
    (event) => { onChange(event, data, fieldType) },
    [onChange, data, fieldType],
  )

  const handleBlur = useCallback(
    (event) => { onBlur(event, data, fieldType) },
    [onBlur, data, fieldType],
  )

  switch (type) {
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
          values={choice}
          onChange={handleChange}
          onBlur={handleBlur}
          error={error}
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
