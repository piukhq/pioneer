import React from 'react'

import styles from './PreparingYourCard.module.scss'
import Loading2 from 'components/Loading2'
import Config from 'Config'

const PreparingYourCard = () => (
  <div className={styles.root}>
    <h1 className={styles.root__heading}>Preparing your card</h1>
    <div className={styles.root__description}>
      <p>We are just getting your card set up.</p>
      <p>This won't take long and we will redirect you automatically when this is done.</p>
    </div>
    <div className={styles.root__loading}>
      <Loading2/>
    </div>
    <p className={styles.root__support}>If this is taking longer than you expect, <a href={Config.urls.support}>reach out to us</a> and we can help.</p>
  </div>
)

export default PreparingYourCard
