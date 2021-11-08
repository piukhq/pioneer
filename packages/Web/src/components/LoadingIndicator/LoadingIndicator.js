import React from 'react'
import styles from './LoadingIndicator.module.scss'

// Generic loading indicator
const LoadingIndicator = () => (
  <div className={styles.root}>
    <div className={styles.root__loader}></div>
  </div>
)

export default LoadingIndicator
