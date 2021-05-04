import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Button from 'components/Button'
import { selectors as membershipCardsSelectors } from 'ducks/membershipCards'
import useAcceptTerms from './hooks/useAcceptTerms'
import useLogout from 'hooks/useLogout'
import styles from './WeFoundYou.module.scss'

// TODO: determine whether to display 'a' or 'an' either as a result from the API
// or using a library to determine string variations
const WeFoundYou = () => {
  const { id } = useParams()
  const { acceptTerms } = useAcceptTerms()
  const { logout } = useLogout()
  const { post: { error } } = useSelector(state => state.service)

  const planName = useSelector(
    state => membershipCardsSelectors.plan(state, id)?.account?.plan_name,
  )
  const planCardName = useSelector(
    state => membershipCardsSelectors.plan(state, id)?.account?.plan_name_card,
  )

  // TODO: possibly consolidate error message into generic Button error
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

        {error && <p className={styles['root__paragraph--errorMessage']}>Something went wrong. Please try again.</p>}
      </div>
    </div>
  )
}

export default WeFoundYou
