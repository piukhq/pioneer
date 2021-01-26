import React from 'react'
import cx from 'classnames'
import styles from './CheckboxGroup.module.scss'

const CheckboxGroup = ({
  className,
  value,
  values,
  onChange,
  name,
  label,
  placeholder,
  validation,
  type = 'text',
}) => {
  return (
    <div className={cx(className, styles.root)}>
      <input
        className={styles.root__box}
        checked={value}
        onChange={onChange}
        type='checkbox'
        name={name}
        id={`bink-form-field-${name}`}
      />
      <label
        className={styles.root__label}
        htmlFor={`bink-form-field-${name}`}
      >
        {label}
      </label>
    </div>
  )
}

export default CheckboxGroup
