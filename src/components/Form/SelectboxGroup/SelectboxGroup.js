import React from 'react'
import cx from 'classnames'
import styles from './SelectGroup.module.scss'

const SelectboxGroup = ({
  className,
  values,
  onChange = () => {},
  onBlur = () => {},
  name,
  label,
  error,
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

      <div className={styles['root__select-container']}>
        {Object.keys(values).map(selectBoxKey => {
          return (
            <select
              className={cx(
                styles.root__input,
                error && styles['root__input--error'],
              )}
              onChange={(event) => onChange(selectBoxKey, event)}
              onBlur={(event) => onBlur(selectBoxKey, event)}
              name={selectBoxKey}
              key={selectBoxKey}
              defaultValue=""
              id={`bink-form-field-${name}-${selectBoxKey}`}
            >
              {/* This first option refers to the defaultValue and is needed in order to display an initially blank field  */}
              <option value="" hidden></option>
              <option disabled>{selectBoxKey}</option>
              {values[selectBoxKey].map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
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
