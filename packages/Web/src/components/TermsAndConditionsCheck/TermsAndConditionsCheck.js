import React from 'react'
import cx from 'classnames'
import Button from 'components/Button'
import { useTermsAndConditionsCheck } from './hooks/useTermsAndConditionsCheck'
import { useLogout } from 'hooks/useLogout'
import { useCheckSessionEnded } from 'hooks/useCheckSessionEnded'
import styles from './TermsAndConditionsCheck.module.scss'

// TODO: Check with Jack determine whether to display 'a' or 'an' either as a result from the API
// or using a library to determine string variations
const TermsAndConditionsCheck = ({ heading, paragraphOne, paragraphTwoPrefix }) => {
  useCheckSessionEnded() // TODO: Temporary redirect for Web-464

  const { acceptTerms, postError } = useTermsAndConditionsCheck()
  const { logout } = useLogout()

  const errorMessage = postError ? 'Something went wrong. Please try again.' : null
  return (
    <div className={cx(
      styles.root,
      styles['root--terms-and-conditions'],
    )}>
      <h1 className={styles.root__heading}>{heading}</h1>
      <div className={styles.root__description}>
        {paragraphOne && <div className={styles.root__paragraph}>{paragraphOne}</div>}
        <div className={styles.root__paragraph} data-testid='paragraphTwo'>{paragraphTwoPrefix} you need to accept the <a className={styles.root__url} href='https://bink.com/terms-and-conditions/' target='_blank' rel='noreferrer'>Bink Terms & Conditions.</a> You only need to do this once.</div>
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

export default TermsAndConditionsCheck
