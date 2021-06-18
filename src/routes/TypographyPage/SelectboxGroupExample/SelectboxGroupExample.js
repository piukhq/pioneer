import React, { useState } from 'react'
import SelectboxGroup from 'components/Form/SelectboxGroup'

const SelectboxGroupExample = () => {
  const key = 'Options'
  const values = { [key]: ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'] }
  const [selectedValues1, setSelectedValues1] = useState({ [key]: undefined })
  const [selectedValues2, setSelectedValues2] = useState({ [key]: undefined })

  const changeValues1 = (key, event) => {
    const newValues = {
      ...selectedValues1,
      [key]: event.target.value,
    }
    setSelectedValues1(newValues)
  }

  const changeValues2 = (key, event) => {
    const newValues = {
      ...selectedValues2,
      [key]: event.target.value,
    }
    setSelectedValues2(newValues)
  }

  return (
    <>
      <SelectboxGroup
        selectedValues={selectedValues1}
        values={values}
        onChange={changeValues1}
        name='selectbox'
        label='Title/label for selectbox dropdown'
      />

      <SelectboxGroup
        selectedValues={selectedValues2}
        values={values}
        onChange={changeValues2}
        name='selectbox-error'
        label='Title/label for selectbox dropdown error'
        error='Error message'
      />

      <SelectboxGroup
        values={values}
        name='selectbox-disabled'
        label='Title/label for disabled selectbox dropdown'
        disabled
      />
  </>
  )
}

export default SelectboxGroupExample
