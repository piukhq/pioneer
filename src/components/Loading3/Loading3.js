import React from 'react'
import styles from './Loading3.module.scss'
import { ReactComponent as LoadingSpinnerSvg } from 'images/loading-spinner.svg'

const Loading3 = () => (
  <LoadingSpinnerSvg className={styles['root__loading-spinner']} />
)

export default Loading3
