import React from 'react'
import cx from 'classnames'
import styles from './Button.module.scss'

const Button = ({ primary, secondary, tertiary, className, disabled, error, children, ...props }) => {
  return (
    <>
      <button
        className={cx(
          styles.root,
          className,
          (primary || (!secondary && !tertiary)) && styles['root--primary'],
          secondary && styles['root--secondary'],
          tertiary && styles['root--tertiary'],
          disabled && styles['root--disabled'],
        )}
        disabled={disabled}
        data-testid='button'
        {...props}
      >
        {children}
      </button>

      { error && (
        <p className={styles.root__error} data-testid='error'>
          { error }
        </p>
      )}
    </>
  )
}

export default Button
