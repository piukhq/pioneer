import React, { useState, useCallback } from 'react'
import cx from 'classnames'
import styles from './TextInputGroup.module.scss'

const TextInputGroup = ({
  className,
  value,
  onChange,
  name,
  label,
  placeholder,
  validation,
}) => {
  const [valid, setValid] = useState(true)

  const validate = useCallback(() => {
    // todo: temporarily disable validation as it will be implemented by another task
    return
    const re = new RegExp(validation)
    setValid(value.match(re))
  }, [value, validation])

  const handleChange = useCallback((...params) => {
    setValid(true)
    onChange && onChange(...params)
  }, [onChange])
  return (
    <div className={cx(styles.root, className, !valid && styles['root--invalid'])}>
      <label
        className={cx(
          styles.root__label,
          !valid && styles['root__label--invalid'],
        )}
        htmlFor={`bink-form-field-${name}`}
      >{label}</label>
      <input
        className={cx(
          styles.root__input,
          !valid && styles['root__input--invalid'],
        )}
        type='text'
        name={name}
        id={`bink-form-field-${name}`}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={validate}
      />
    </div>
  )
}

export default TextInputGroup
