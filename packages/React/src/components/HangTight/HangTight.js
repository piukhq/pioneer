import React from 'react'

import styles from './HangTight.module.scss'
import PageTransitionLoadingIndicator from 'components/PageTransitionLoadingIndicator'

const HangTight = () => (
  <div className={styles.root}>
    <h1 className={styles.root__heading}>Hang tight</h1>
    <div className={styles.root__description}>
      <div className={styles.root__paragraph}>We are just getting you set up.</div>
      <div className={styles.root__paragraph}>This won't take long and we will redirect you automatically when this is done.</div>
    </div>
    <PageTransitionLoadingIndicator className={styles.root__loading} />
  </div>
)

export default HangTight
