import React from 'react'
import cx from 'classnames'
import styles from './Button.module.scss'

const Button = ({ primary, secondary, tertiary, className, children, ...props }) => {
  return (
    <button
      className={cx(
        styles.root,
        className,
        (primary || (!secondary && !tertiary)) && styles['root--primary'],
        secondary && styles['root--secondary'],
        tertiary && styles['root--tertiary'],
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
