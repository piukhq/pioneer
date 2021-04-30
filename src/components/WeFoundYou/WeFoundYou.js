import React from 'react'
import Button from 'components/Button'
import useAcceptTerms from './hooks/useAcceptTerms'
import useLogout from 'hooks/useLogout'
import styles from './WeFoundYou.module.scss'

// TODO: determine whether to display 'a' or 'an' either as a result from the API
// or using a library to determine string variations
const WeFoundYou = ({ account = {} }) => {
  const { plan_name: planName = '', plan_name_card: planCardName = '' } = account
  const { acceptTerms } = useAcceptTerms()
  const { logout } = useLogout()

  return (
    <div className={styles.root}>
      <h1 className={styles.root__heading}>We found you!</h1>
      <div className={styles.root__description}>
        <p className={styles.root__paragraph}>You already have a {planName} {planCardName}.</p>
        <p className={styles.root__paragraph}>To view your card details you need to accept the <a className={styles.root__url} href='https://bink.com/terms-and-conditions/' target='_blank' rel='noreferrer'>Bink Terms & Conditions.</a></p>
        <p className={styles.root__paragraph}>Please also read the <a className={styles.root__url} href='https://bink.com/privacy-policy/' target='_blank' rel='noreferrer'>Bink Privacy Policy</a> for futher details on how your data will be processed.</p>
      </div>
      <div className={styles.root__buttons}>
        <Button
          primary
          className={styles.root__button}
          onClick={acceptTerms}
        >I agree</Button>

        <Button
          secondary
          className={styles.root__button}
          onClick={logout}
        >I disagree</Button>
      </div>
    </div>
  )
}

export default WeFoundYou
