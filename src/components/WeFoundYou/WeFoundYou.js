import React from 'react'
import Button from 'components/Button'
import useBinkTermsAndConditions from './hooks/useBinkTermsAndConditions'
import { useMembershipCardDetailsByCardId } from 'hooks/useMembershipCardDetailsByCardId'
import useLogout from 'hooks/useLogout'
import useCheckSessionEnded from 'hooks/useCheckSessionEnded'
import styles from './WeFoundYou.module.scss'

// TODO: Check with Jack determine whether to display 'a' or 'an' either as a result from the API
// or using a library to determine string variations
const WeFoundYou = () => {
  useCheckSessionEnded() // TODO: Temporary redirect for Web-464

  const { acceptTerms, postError } = useBinkTermsAndConditions()
  const { planName } = useMembershipCardDetailsByCardId()
  const { logout } = useLogout()

  const errorMessage = postError ? 'Something went wrong. Please try again.' : null

  return (
    <div className={styles.root}>
      <h1 className={styles.root__heading}>We found you</h1>
      <div className={styles.root__description}>
        <div className={styles.root__paragraph}>You’re already a member of the {planName}!</div>
        <div className={styles.root__paragraph}>To view your card details here you need to accept the <a className={styles.root__url} href='https://bink.com/terms-and-conditions/' target='_blank' rel='noreferrer'>Bink Terms & Conditions.</a> You only need to do this once.</div>
        <div className={styles.root__paragraph}>Please also read the <a className={styles.root__url} href='https://bink.com/privacy-policy/' target='_blank' rel='noreferrer'>Bink Privacy Policy</a> for further details on how your data will be processed.</div>
      </div>
      <div className={styles.root__buttons}>
        <Button
          primary
          className={styles.root__button}
          onClick={acceptTerms}
          error={errorMessage}
        >Continue</Button>

        <Button
          secondary
          className={styles.root__button}
          onClick={logout}
        >Cancel</Button>
      </div>
    </div>
  )
}

export default WeFoundYou
