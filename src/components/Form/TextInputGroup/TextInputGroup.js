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
  disabled,
  type = 'text',
  ...rest
}) => {
  return (
    <div className={cx(
      styles.root,
      className,
      error && styles['root--error'],
      disabled && styles['root--disabled'],
    )}>
      <label
        className={cx(
          styles.root__label,
          error && styles['root__label--error'],
          disabled && styles['root__label--disabled'],
        )}
        htmlFor={`bink-form-field-${name}`}
      >{label}</label>
      <input
        className={cx(
          styles.root__input,
          error && styles['root__input--error'],
          disabled && styles['root__input--disabled'],
        )}
        type={type}
        name={name}
        id={`bink-form-field-${name}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        {...rest}
      />
      { error && (
        <div className={styles.root__error}>
          { error }
        </div>
      )}
    </div>
  )
}

export default TextInputGroup
