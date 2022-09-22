import React from 'react'
import cx from 'classnames'
import CheckCircleSvg from 'images/check-circle.svg'

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
  autocomplete,
  type = 'text',
  valid,
  ...rest
}) => {
  return (
    <div className={cx(
      styles.root,
      className,
      error && styles['root--error'],
      disabled && styles['root--disabled'],
    )}>
      <div className={cx(
        styles['root__input-container'],
        styles['root__input-container--border'],
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
            valid && styles['root__input--valid'],
          )}
          type={type}
          name={name}
          id={`bink-form-field-${name}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          autoComplete={autocomplete}
          {...rest}
        />

        {/* TODO: Possible temporary check to render check icon only for Bink theme */}
        { valid && !Config.isMerchantChannel && (<CheckCircleSvg className={styles['root__validation-tick']} />) }
      </div>

      { error && (
        <div className={styles.root__error}>
          { error }
        </div>
      )}
    </div>
  )
}

export default TextInputGroup
