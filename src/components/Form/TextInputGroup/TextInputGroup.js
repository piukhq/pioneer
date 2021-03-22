import React from 'react'
import cx from 'classnames'
import styles from './TextInputGroup.module.scss'

const TextInputGroup = ({
  className,
  value,
  onChange,
  name,
  label,
  placeholder,
  onBlur,
  error,
  type = 'text',
}) => {
  return (
    <div className={cx(styles.root, className)}>
      <label
        className={styles.root__label}
        htmlFor={`bink-form-field-${name}`}
      >{label}</label>
      <input
        className={cx(
          styles.root__input,
        )}
        type={type}
        name={name}
        id={`bink-form-field-${name}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <div className={styles.root__error}>
        { error }
      </div>
    </div>
  )
}

export default TextInputGroup
