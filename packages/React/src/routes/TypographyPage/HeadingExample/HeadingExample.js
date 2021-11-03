import React from 'react'
import cx from 'classnames'
import styles from './HeadingExample.module.scss'

const HeadingExample = () => (
  <div>
    <h1 className={cx(styles.root__heading)}>This is a heading</h1>
  </div>
)

export default HeadingExample
