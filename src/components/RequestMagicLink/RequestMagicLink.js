import React, { useState, useCallback } from 'react'
import TextInputGroup from 'components/Form/TextInputGroup'
import { actions as usersActions } from 'ducks/users'
import { useDispatch, useSelector } from 'react-redux'

import { ReactComponent as MagicLinkDefaultSvg } from 'images/magic-link-default.svg'
import { ReactComponent as MagicLinkErrorSvg } from 'images/magic-link-error.svg'
import Button from 'components/Button'
import Loading from 'components/Loading'

import styles from './RequestMagicLink.module.scss'

const RequestMagicLink = () => {
  const [email, setEmail] = useState('')
  const { error, loading, success } = useSelector(state => state.users.magicLinkRequest)
  const dispatch = useDispatch()
  const handleSubmit = useCallback((event) => {
    event.preventDefault()
    dispatch(usersActions.requestMagicLink(email))
  }, [dispatch, email])

  return (
    <>
      { loading && <Loading /> }
      { !success && (
        <form onSubmit={handleSubmit} className={styles.root}>
          { error ? (
            <>
              <MagicLinkErrorSvg className={styles.root__icon} />
              <h1 className={styles.root__headline}>Something went wrong</h1>
              <div className={styles.root__description}>
                There was a problem authenticating you.<br />
                Please try again.
              </div>
            </>
          ) : (
            <>
              <MagicLinkDefaultSvg className={styles.root__icon} />
              <h1 className={styles.root__headline}>Access your loyalty account</h1>
              <div className={styles.root__description}>
                Get a link sent to your inbox so you can register or login instantly!
              </div>
            </>
          ) }
          <TextInputGroup
            className={styles['root__email-field']}
            label='Email address'
            placeholder='Enter email address'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Button className={styles.root__button}>Continue</Button>
        </form>
      ) }
      { success && (
        <div className={styles.root}>
          <MagicLinkDefaultSvg className={styles.root__icon} />

          <h1 className={styles.root__headline}>Check your inbox!</h1>

          <div className={styles.root__description}>
            <p className={styles.root__paragraph}>
              We have just emailed a link to
              <span className={styles.root__email}>{email}.</span>
            </p>
            <p className={styles.root__paragraph}>
              Click the link and you’ll be signed in.
            </p>
            <p className={styles.root__paragraph}>
              <span className={styles.root__note}>Note:</span> The device you open the link on will be the device you are signed in on.
              For example, if you open the link on your phone you will be logged in on your phone.
            </p>
          </div>
        </div>
      ) }
    </>
  )
}

export default RequestMagicLink
