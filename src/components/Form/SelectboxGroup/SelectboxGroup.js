import React from 'react'

import styles from './SelectGroup.module.scss'

const SelectboxGroup = ({
  className,
  value,
  values,
  onChange,
  onBlur,
  name,
  label,
  error,
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
        onBlur={onBlur}
        name={name}
        id={`bink-form-field-${name}`}
      >
        {values.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <div className={styles.root__error}>
        { error }
      </div>
    </div>
  )
}

export default SelectboxGroup
