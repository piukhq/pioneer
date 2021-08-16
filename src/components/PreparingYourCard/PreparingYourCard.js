import React from 'react'

import PageTransitionLoadingIndicator from 'components/PageTransitionLoadingIndicator'
import useMembershipCardRefresher from 'hooks/useMembershipCardRefresher'

import styles from './PreparingYourCard.module.scss'

const PreparingYourCard = ({ membershipCardId }) => {
  useMembershipCardRefresher(membershipCardId)

  return (
    <div className={styles.root}>
      <h1 className={styles.root__heading}>Preparing your card</h1>
      <div className={styles.root__description}>
        <div className={styles['root__description-paragraph']}>We are just getting your card set up.</div>
        <div className={styles['root__description-paragraph']}>This won't take long and we will redirect you automatically when this is done.</div>
      </div>
      <div className={styles.root__loading}>
        <PageTransitionLoadingIndicator/>
      </div>
      <div className={styles.root__support}>If this is taking longer than you expect, <a className={styles['root__support--link']} href={Config.urls.support} target="_blank" rel="noreferrer">reach out to us</a> and we can help.</div>
    </div>
  )
}

export default PreparingYourCard
