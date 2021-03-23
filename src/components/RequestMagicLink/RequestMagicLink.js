import React from 'react'
import TextInputGroup from 'components/Form/TextInputGroup'

import { ReactComponent as MagicLinkDefaultSvg } from 'images/magic-link-default.svg'
import { ReactComponent as MagicLinkErrorSvg } from 'images/magic-link-error.svg'
import { ReactComponent as MagicLinkWarningSvg } from 'images/magic-link-warning.svg'
import Button from 'components/Button'
import Loading from 'components/Loading'
import useRequestMagicLink from './hooks/useRequestMagicLink'

import styles from './RequestMagicLink.module.scss'
import useMagicLinkAuthenticationStatus from './hooks/useMagicLinkAuthenticationStatus'

const RequestMagicLink = () => {
  const {
    email,
    setEmail,
    success: requestSuccess,
    loading: requestLoading,
    error: requestError,
    handleSubmit,
  } = useRequestMagicLink()

  const {
    error: authenticationError,
    isExpiredToken,
  } = useMagicLinkAuthenticationStatus()

  return (
    <>
      { requestLoading && <Loading /> }
      { requestSuccess ? (
        <MagicLinkRequestSuccess email={email} />
      ) : (
        (requestError || authenticationError) ? (
          isExpiredToken ? (
            <MagicLinkAuthenticationExpired handleSubmit={ handleSubmit } email={ email } setEmail={ setEmail } />
          ) : (
            <MagicLinkRequestOrAuthenticationError handleSubmit={ handleSubmit } email={ email } setEmail={ setEmail } />
          )
        ) : (
          <MagicLinkRequestForm handleSubmit={ handleSubmit } email={ email } setEmail={ setEmail } />
        )
      ) }
    </>
  )
}

export default RequestMagicLink

const MagicLinkRequestSuccess = ({ email }) => (
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
        <span className={styles.root__note}>Note:</span>{' '}
        The device you open the link on will be the device you are signed in on.
        For example, if you open the link on your phone you will be logged in on your phone.
      </p>
    </div>
  </div>
)

const MagicLinkRequestForm = ({ handleSubmit, email, setEmail }) => (
  <form onSubmit={handleSubmit} className={styles.root}>
    <MagicLinkDefaultSvg className={styles.root__icon} />
    <h1 className={styles.root__headline}>
      Access your <span className={styles['root__text--desktop-only']}>loyalty</span> account
    </h1>
    <div className={styles.root__description}>
      Get a link sent to your inbox so you can register or login instantly!
    </div>
    <TextInputGroup
      className={styles['root__email-field']}
      label='Email address'
      placeholder='Enter email address'
      value={email}
      onChange={(event) => setEmail(event.target.value)}
    />
    <Button className={styles.root__button}>Continue</Button>
  </form>
)

const MagicLinkRequestOrAuthenticationError = ({ handleSubmit, email, setEmail }) => (
  <form onSubmit={handleSubmit} className={styles.root}>
    <MagicLinkErrorSvg className={styles.root__icon} />
    <h1 className={styles.root__headline}>Something went wrong</h1>
    <div className={styles.root__description}>
      There was a problem authenticating you.<br />
      Please try again.
    </div>
    <TextInputGroup
      className={styles['root__email-field']}
      label='Email address'
      placeholder='Enter email address'
      value={email}
      onChange={(event) => setEmail(event.target.value)}
    />
    <Button className={styles.root__button}>Continue</Button>
  </form>
)

const MagicLinkAuthenticationExpired = ({ handleSubmit, email, setEmail }) => (
  <form onSubmit={handleSubmit} className={styles.root}>
    <MagicLinkWarningSvg className={styles.root__icon} />
    <h1 className={styles.root__headline}>Link expired</h1>
    <div className={styles.root__description}>
      To keep your account safe, links are only valid for a short period of time.
      Enter your email again and we will send you another!
    </div>
    <TextInputGroup
      className={styles['root__email-field']}
      label='Email address'
      placeholder='Enter email address'
      value={email}
      onChange={(event) => setEmail(event.target.value)}
    />
    <Button className={styles.root__button}>Continue</Button>
  </form>
)
