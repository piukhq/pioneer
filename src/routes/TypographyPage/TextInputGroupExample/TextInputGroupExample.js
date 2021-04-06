import React from 'react'
import TextInputGroup from 'components/Form/TextInputGroup'

const TextInputGroupExample = () => (
  <div>
      <TextInputGroup
        label='Title / label'
        value='some value'
      />
    <TextInputGroup
      value=''
      placeholder='No value placeholder'
    />
    <TextInputGroup
      label='Title / label for error'
      value='Value in error state'
      error='Error message'
    />
    <TextInputGroup
      placeholder='No value placeholder in error state'
      error='Very long error message. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur cumque doloremque, enim neque obcaecati tempore! Atque dolorem eveniet excepturi impedit, iusto laboriosam molestias nobis nostrum nulla perspiciatis, quaerat quod quos saepe sit voluptatum. Ad alias corporis, et facilis illum maiores modi numquam placeat porro provident rem reprehenderit rerum, sit voluptatem!'
    />
    <TextInputGroup
      label='Title / label for disabled'
      placeholder='Value in disabled state'
      disabled
    />
    <TextInputGroup
      placeholder='No value placeholder in disabled state'
      disabled
    />
  </div>
)

export default TextInputGroupExample
