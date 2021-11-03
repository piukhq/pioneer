import React from 'react'
import TextInputGroup from 'components/Form/TextInputGroup'

const TextInputGroupExample = () => (
  <div>
      <TextInputGroup
        label='Title / label'
        value='some value'
        onChange={() => null}
        name='typography-1'
      />
    <TextInputGroup
      value=''
      placeholder='No value placeholder'
      onChange={() => null}
      name='typography-2'
    />
    <TextInputGroup
      label='Title / label for error'
      value='Value in error state'
      onChange={() => null}
      error='Error message'
      name='typography-3'
    />
    <TextInputGroup
      placeholder='No value placeholder in error state'
      error='Very long error message. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur cumque doloremque, enim neque obcaecati tempore! Atque dolorem eveniet excepturi impedit, iusto laboriosam molestias nobis nostrum nulla perspiciatis, quaerat quod quos saepe sit voluptatum. Ad alias corporis, et facilis illum maiores modi numquam placeat porro provident rem reprehenderit rerum, sit voluptatem!'
      name='typography-4'
    />
    <TextInputGroup
      label='Title / label for disabled'
      placeholder='Value in disabled state'
      disabled
      name='typography-5'
    />
    <TextInputGroup
      placeholder='No value placeholder in disabled state'
      disabled
      name='typography-6'
    />
  </div>
)

export default TextInputGroupExample
