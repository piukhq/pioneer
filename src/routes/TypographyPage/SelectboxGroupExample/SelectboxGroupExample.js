import React from 'react'
import SelectboxGroup from 'components/Form/SelectboxGroup'

const SelectboxGroupExample = () => {
  const values = { Options: ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'] }
  return (
    <>
      <SelectboxGroup
        values={values}
        name='selectbox'
        label='Title/label for selectbox dropdown'
      />

      <SelectboxGroup
        values={values}
        name='selectbox-error'
        label='Title/label for selectbox dropdown error'
        error='Error message'
      />
  </>
  )
}

export default SelectboxGroupExample
