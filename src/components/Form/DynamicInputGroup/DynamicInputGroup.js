import React from 'react'
import TextInputGroup from 'components/Form/TextInputGroup'

const DynamicInputGroup = ({ className, data, fieldType, value, onChange }) => {
  const {
    // choice,
    column,
    common_name,
    description,
    type,
    validation,
  } = data

  const handleChange = React.useCallback(
    (...params) => { onChange(...params, data, fieldType) },
    [onChange, data, fieldType],
  )

  switch (type) {
    case 0:
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
    default:
      return null
  }
}

export default DynamicInputGroup
