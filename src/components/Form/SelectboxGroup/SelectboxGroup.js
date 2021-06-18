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
                  <p className={cx(
                    styles.root__placeholder,
                    error && styles['root__placeholder--error'],
                  )}>{key}</p>
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
                name={key}
                key={key}
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
