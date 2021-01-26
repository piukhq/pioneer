import React from 'react'
import TextInputGroup from 'components/Form/TextInputGroup'
import SelectboxGroup from 'components/Form/SelectboxGroup'
import CheckboxGroup from 'components/Form/CheckboxGroup'

const types = {
  TEXT_INPUT: 0,
  PASSWORD_INPUT: 1,
  SELECTBOX: 2,
  CHECKBOX: 3,
}

const DynamicInputGroup = ({ className, data, fieldType, value, onChange }) => {
  const {
    choice,
    column,
    common_name,
    description,
    type,
    validation,
  } = data

  // console.log('data', type, data)

  const handleChange = React.useCallback(
    (...params) => { onChange(...params, data, fieldType) },
    [onChange, data, fieldType],
  )

  switch (type) {
    case types.TEXT_INPUT:
      return (
        <TextInputGroup
          className={className}
          value={value}
          onChange={handleChange}
          name={common_name}
          label={column}
          placeholder={description}
          validation={validation}
        />
      )
    case types.PASSWORD_INPUT:
      return (
        <TextInputGroup
          className={className}
          value={value}
          onChange={handleChange}
          name={common_name}
          label={column}
          placeholder={description}
          validation={validation}
          type='password'
        />
      )
    case types.SELECTBOX:
      return (
        <SelectboxGroup
          className={className}
          value={value}
          values={choice}
          onChange={handleChange}
          name={common_name}
          label={column}
          placeholder={description}
          validation={validation}
        />
      )
    case types.CHECKBOX:
      return (
        <CheckboxGroup
          className={className}
          value={value}
          onChange={handleChange}
          name={common_name}
          label={description}
          // placeholder={description}
          validation={validation}
        />
      )
    default:
      return null
  }
}

export default DynamicInputGroup
