import React from 'react'
import cx from 'classnames'
import DownIconSvg from 'images/down-chevron.svg'

import styles from './SelectGroup.module.scss'

const SelectboxGroup = ({
  className,
  selectedValues = {},
  values,
  onChange = () => {},
  onBlur = () => {},
  name,
  label,
  error,
  disabled,
}) => {
  const getAutocompletePrefix = () => {
    let prefix = 'on'
    if (name === 'payment-card-expiry') {
      prefix = 'cc-exp-'
    } else if (name === 'date_of_birth') {
      prefix = 'bday-'
    }
    return prefix
  }

  const getAutocompleteSuffix = (key) => {
    let suffix
    if (key === 'DD') {
      suffix = 'day'
    } else if (key === 'MM') {
      suffix = 'month'
    } else if (key === 'YY' || key === 'YYYY') {
      suffix = 'year'
    }
    return suffix
  }

  const prefix = getAutocompletePrefix()

  return (
    <div className={cx(
      styles.root,
      className,
      error && styles['root--error'],
    )}>
      { Config.isMerchantChannel && (
        <label
          className={cx(
            styles.root__label,
            error && styles['root__label--error'],
            disabled && styles['root__label--disabled'],
          )}
          htmlFor={`bink-form-field-${name}`}
        >{label}</label>
      ) }

      <div className={styles.root__container}>
        {Object.keys(values).map(key => {
          const suffix = getAutocompleteSuffix(key)
          const capitalizedSuffix = suffix.charAt(0).toUpperCase() + suffix.slice(1)
          const autocompleteValue = `${prefix}${suffix}`
          return (
            <div key={key} className={cx(
              styles['root__select-container'],
              styles['root__input-container--border'],
            )}>
              { !Config.isMerchantChannel && (
                <label
                  className={cx(
                    styles.root__label,
                    error && styles['root__label--error'],
                    disabled && styles['root__label--disabled'],
                  )}
                  htmlFor={`bink-form-field-${name}`}
                >{label} {capitalizedSuffix}</label>
              ) }

              {/* This will render on top of the select element and display our own styled placeholder and arrow icon */}
              <div className={cx(
                styles.root__input,
                styles['root__overlay-container'],
              )}>
                {selectedValues[key] === undefined && (
                  <div className={cx(
                    styles.root__placeholder,
                    error && styles['root__placeholder--error'],
                  )}>{key}</div>
                )}

                { !disabled && (
                  <DownIconSvg className={cx(
                    styles['root__down-arrow'],
                    error && styles['root__down-arrow--error'],
                  )} />
                ) }
              </div>
              <select
                className={cx(
                  styles.root__input,
                  error && styles['root__input--error'],
                )}
                onChange={(event) => onChange(key, event)}
                onBlur={(event) => onBlur(key, event)}
                name={autocompleteValue}
                key={key}
                autoComplete={autocompleteValue}
                title={key}
                defaultValue=""
                id={`bink-form-field-${name}-${key}`}
                disabled={disabled}
              >
                {/* First option is used to initially display an empty select field that we can then overlay with our own elements */}
                <option value="" disabled hidden />

                <option disabled>{key}</option>

                {values[key].map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          )
        })}
      </div>

      {error && (
        <div className={styles.root__error}>
          { error }
        </div>
      )}
    </div>
  )
}

export default SelectboxGroup
