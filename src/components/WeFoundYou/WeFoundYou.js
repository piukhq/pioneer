import React from 'react'
import Config from 'Config'
import Button from 'components/Button'
import styles from './WeFoundYou.module.scss'

const WeFoundYou = () => {
  return (
  <div className={styles.root}>
    <h1 className={styles.root__heading}>We found you!</h1>
    <div className={styles.root__description}>
      <p>You already have a {Config.planTitle} Card.</p>
      <p>To view your card details you need to accept the <a className={styles.root__url} href='https://bink.com/terms-and-conditions/' target='_blank' rel='noreferrer'>Bink Terms & Conditions.</a></p>
      <p>Please also read the <a className={styles.root__url} href='https://bink.com/terms-and-conditions/' target='_blank' rel='noreferrer'>Bink Privacy Poilcy</a> for futher details on how your data will be processed.</p>
    </div>
    <div className={styles.root__buttons}>
      <Button
        primary
        className={styles.root__button}
        onClick={() => {}}
        >I agree</Button>

      <Button
        secondary
        className={styles.root__button}
        onClick={() => {}}
        >I disagree</Button>
    </div>
  </div>
  )
}

export default WeFoundYou
