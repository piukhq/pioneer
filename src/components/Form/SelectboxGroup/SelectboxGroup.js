import React from 'react'
import cx from 'classnames'
import { ReactComponent as DownIconSvg } from 'images/down-chevron.svg'

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
  const getAutocompleteValue = (key, name) => {
    let prefix, suffix
    if (name === 'payment-card-expiry') {
      prefix = 'cc-exp-'
    } else if (name === 'date_of_birth') {
      prefix = 'bday-'
    } else {
      prefix = 'on'
    }
    if (key === 'DD') {
      suffix = 'day'
    } else if (key === 'MM') {
      suffix = 'month'
    } else if (key === 'YY' || key === 'YYYY') {
      suffix = 'year'
    }
    return `${prefix}${suffix}`
  }

  return (
    <div className={cx(
      styles.root,
      className,
      error && styles['root--error'],
    )}>
      <label
        className={cx(
          styles.root__label,
          error && styles['root__label--error'],
        )}
        htmlFor={`bink-form-field-${name}`}
      >{label}</label>

      <div className={styles.root__container}>
        {Object.keys(values).map(key => {
          return (
            <div className={styles['root__select-container']} key={key}>
              {/* This will render on top of the select element and display our own styled placeholder and arrow icon */}
              <div className={cx(styles.root__input, styles['root__overlay-container'])}>
                {selectedValues[key] === undefined && (
                  <div className={cx(
                    styles.root__placeholder,
                    error && styles['root__placeholder--error'],
                  )}>{key}</div>
                )}
                <DownIconSvg className={cx(
                  styles['root__down-arrow'],
                  error && styles['root__down-arrow--error'],
                )} />
              </div>
              <select
                className={cx(
                  styles.root__input,
                  error && styles['root__input--error'],
                )}
                onChange={(event) => onChange(key, event)}
                onBlur={(event) => onBlur(key, event)}
                name={getAutocompleteValue(key, name)}
                key={key}
                autoComplete={getAutocompleteValue(key, name)}
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
