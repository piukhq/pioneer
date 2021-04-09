import React from 'react'
import TextInputGroup from 'components/Form/TextInputGroup'

// todo: Remove SVGs if no longer needed for MultiMerchant/future designs
// import { ReactComponent as MagicLinkDefaultSvg } from 'images/magic-link-default.svg'
// import { ReactComponent as MagicLinkErrorSvg } from 'images/magic-link-error.svg'
// import { ReactComponent as MagicLinkWarningSvg } from 'images/magic-link-warning.svg'
import Button from 'components/Button'
import Loading from 'components/Loading'
import useRequestMagicLink from './hooks/useRequestMagicLink'

import styles from './RequestMagicLink.module.scss'
import useMagicLinkAuthenticationStatus from './hooks/useMagicLinkAuthenticationStatus'
import Config from 'Config'

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
    <h1 className={styles.root__headline}>Check your inbox!</h1>
    <div className={styles.root__description}>
        <p>We have just emailed a link to <span className={styles.root__email}>{email}.</span></p>
        <p>Click the link and you’ll be signed in.</p>
      <p>
        <span className={styles.root__note}>Note:</span>{' '}
        The device you open the link on will be the device you are signed in on.
        For example, if you open the link on your phone you will be logged in on your phone.
      </p>
    </div>
  </div>
)

const MagicLinkRequestForm = ({ handleSubmit, email, setEmail }) => (
  <div className={styles.root}>
    <h1 className={styles.root__headline}>{Config.planTitle}</h1>
    <form onSubmit={handleSubmit} className={styles.root__form}>
      <div className={styles.root__description}>
        {Config.magicLinkRequestFormDescription.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      <TextInputGroup
        className={styles['root__email-field']}
        placeholder='Enter email address'
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        />
      <Button disabled={email.length === 0} className={styles.root__button}>Continue</Button>
    </form>
  </div>
)

const MagicLinkRequestOrAuthenticationError = ({ handleSubmit, email, setEmail }) => (
  <div className={styles.root}>
    <h1 className={styles.root__headline}>Something went wrong</h1>
    <form onSubmit={handleSubmit} className={styles.root__form}>
      <div className={styles.root__description}>
        <p>There was a problem, please try again</p>
      </div>
      <TextInputGroup
        className={styles['root__email-field']}
        placeholder='Enter email address'
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        />
      <Button disabled={email.length === 0} className={styles.root__button}>Continue</Button>
    </form>
  </div>
)

const MagicLinkAuthenticationExpired = ({ handleSubmit, email, setEmail }) => (
  <div className={styles.root}>
    <h1 className={styles.root__headline}>Link expired</h1>
    <form onSubmit={handleSubmit} className={styles.root__form}>
      <div className={styles.root__description}>
        <p>Links are only valid for a short period of time and this one has expired!</p>
        <p>Enter your email again and we will send you another.</p>
      </div>
      <TextInputGroup
        className={styles['root__email-field']}
        placeholder='Enter email address'
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <Button disabled={email.length === 0} className={styles.root__button}>Continue</Button>
    </form>
  </div>
)
