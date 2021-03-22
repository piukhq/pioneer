import React from 'react'
import cx from 'classnames'
import styles from './Button.module.scss'

const Button = ({ primary, secondary, tertiary, className, disabled, children, ...props }) => {
  return (
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
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
