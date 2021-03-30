import React from 'react'
import cx from 'classnames'
import styles from './Heading.module.scss'

const Heading = () => (
  <h1 className={cx(styles.root, styles['root--first'])}>This is a heading</h1>
)

export default Heading
