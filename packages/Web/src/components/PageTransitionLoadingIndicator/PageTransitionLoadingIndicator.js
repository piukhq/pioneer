import React from 'react'
import { ReactComponent as LoaderSvg } from 'images/loader.svg'
import styles from './PageTransitionLoadingIndicator.module.scss'

const PageTransitionLoadingIndicator = () => (
  <LoaderSvg className={styles.root} />
)

export default PageTransitionLoadingIndicator
