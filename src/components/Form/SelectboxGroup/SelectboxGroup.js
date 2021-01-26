import React from 'react'

import styles from './SeelectGroup.module.scss'

const SelectboxGroup = ({
  className,
  value,
  values,
  onChange,
  name,
  label,
  placeholder,
  validation,
}) => {
  return (
    <div className={className}>
      <label
        className={styles.root__label}
        htmlFor={`bink-form-field-${name}`}
      >{label}</label>
      <select
        className={styles.root__select}
        value={value}
        onChange={onChange}
        name={name}
        id={`bink-form-field-${name}`}
      >
        <option disabled value=''>[{placeholder}]</option>
        {values.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  )
}

export default SelectboxGroup
