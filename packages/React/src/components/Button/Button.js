import React from 'react'
import cx from 'classnames'
import { ReactComponent as LoadingSpinnerSvg } from 'images/loading-spinner.svg'
import styles from './Button.module.scss'

const Button = ({ primary, secondary, tertiary, className, disabled, error, loading, children, ...props }) => {
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
        {loading ? <LoadingSpinnerSvg className={styles['root__loading-spinner']} /> : children}
      </button>

      { error && (
        <div className={styles.root__error} data-testid='error'>
          { error }
        </div>
      )}
    </>
  )
}

export default Button
