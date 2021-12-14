import React, { useEffect } from 'react'
// todo: Check with Jack to Remove SVGs if no longer needed for MultiMerchant/future designs
// import { ReactComponent as MagicLinkDefaultSvg } from 'images/magic-link-default.svg'
// import { ReactComponent as MagicLinkErrorSvg } from 'images/magic-link-error.svg'
// import { ReactComponent as MagicLinkWarningSvg } from 'images/magic-link-warning.svg'
import Button from 'components/Button'
import LoadingIndicator from 'components/LoadingIndicator'
import TextInputGroup from 'components/Form/TextInputGroup'
import AppLinks from 'components/AppLinks'

import useRequestMagicLink from './hooks/useRequestMagicLink'
import useMagicLinkAuthenticationStatus from './hooks/useMagicLinkAuthenticationStatus'
import useEmailErrorDisplay from './hooks/useEmailErrorDisplay'

import cx from 'classnames'
import styles from './RequestMagicLink.module.scss'

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

  // Scroll screen into display if major page re-render event occurs
  useEffect(() => {
    if (requestLoading || requestSuccess || requestError || authenticationError || isExpiredToken) {
      window.scrollTo(0, 0)
    }
  }, [requestLoading, requestSuccess, requestError, authenticationError, isExpiredToken])

  return (
    <div className={cx(
      styles.root,
    )}>
      { requestLoading && <LoadingIndicator /> }
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
      {!Config.isMerchantChannel && <BinkFooter/>}
    </div>
  )
}

export default RequestMagicLink

const BinkFooter = () => (
  <div className={styles['root__bink-footer']}>
    <span>Bink makes loyalty simpler. By connecting your loyalty account to your credit/debit card you can earn rewards every time you shop. Find out more about how our site works and how we put you in control by viewing </span>
    <a className={cx(
      styles.root__note,
      styles.root__link,
    )} href='https://policies.gb.bink.com/web/wasabi-cp.html' target="_blank" rel="noreferrer">Bink's Cookies Policy.
    </a>
  </div>
)

const MagicLinkRequestSuccess = ({ email }) => (
  <div className={styles['root__content-wrapper']}>
    {!Config.isMerchantChannel && <div className={styles.root__hero} />}
    <h1 className={styles.root__headline}>Check your inbox</h1>
    <div className={styles.root__description}>
      <div className={styles.root__paragraph}>We have just emailed a link to <span className={styles.root__email}>{email}.</span></div>
      <div className={styles.root__paragraph}>Click the link and you’ll be signed in.</div>
      <div className={styles.root__note}>
        <span className={styles['root__note--bold']}>Note: </span>
        The device you open the link on will be the device you are signed in on.
      </div>
    </div>
  </div>
)

const MagicLinkRequestForm = ({ handleSubmit, email, setEmail }) => {
  const { isErrorDisplayed, handleChange, handleBlur, isValidEmail } = useEmailErrorDisplay(email, setEmail)

  return (
      <div className={styles['root__content-wrapper']}>
        {!Config.isMerchantChannel && <div className={styles.root__hero} />}
        <h1 className={styles.root__headline}>{Config.planTitlePrefix} {Config.planTitle}{Config.planTitleSuffix}</h1>
        <form onSubmit={handleSubmit} className={styles.root__form}>
          <div className={styles.root__description}>
            {Config.magicLinkRequestFormDescription.map((paragraph, index) => (
              <div className={styles.root__paragraph} key={index}>{paragraph}</div>
            ))}
            {!Config.isMerchantChannel && <div className={styles.root__paragraph}><strong>Note:</strong> We will send you a <a className={styles.root__link} target="_blank" rel="noreferrer" href='https://help.bink.com/hc/en-gb/articles/4404303824786-Magic-Link'>Magic Link</a></div>}
          </div>
          <div className={styles['root__form-ui']}>
            <TextInputGroup
              className={styles['root__email-field']}
              label={!Config.isMerchantChannel ? 'Email' : null}
              placeholder='Enter email address'
              autocomplete='email'
              value={email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={isErrorDisplayed}
            />
            <Button disabled={!isValidEmail(email)} className={styles.root__button}>Continue</Button>
          </div>
          { !Config.isMerchantChannel && (
            <>
              <div className={styles['root__secondary-description']}>
                <div className={styles.root__description}>
                  <div className={styles.root__paragraph}>This version of Bink Loyalty & Rewards Wallet is for a quick view of your account only </div>
                </div>
                <div className={styles.root__description}>
                  <div className={styles.root__paragraph}><strong>Download the Bink app to take full control of loyalty</strong></div>
                </div>
              </div>
            <AppLinks />
            </>
          )}
          { Config.magicLinkRequestFormFooterNote && (
            <>
              <div className={styles.root__footerNote}>
                <span className={styles.root__note}>{Config.magicLinkRequestFormFooterNote}</span>
                <a className={cx(
                  styles.root__note,
                  styles.root__link,
                )} href={Config.urls.termsAndConditions} target="_blank" rel="noreferrer">{Config.magicLinkRequestFormFooterLink}.</a>
              </div>

              <div className={styles.root__footerNote}>
                <span className={styles.root__note}>**Bink is technology that makes loyalty simpler.
                  By connecting your loyalty account to your credit/debit card you can earn rewards every time you shop.
                  Find out more about how our site works and how we put you in control by viewing </span>
                {/* TODO: Should be merchant specific url? */}
                <a className={cx(
                  styles.root__note,
                  styles.root__link,
                )} href='https://policies.gb.bink.com/web/wasabi-cp.html' target="_blank" rel="noreferrer">Bink's Cookies Policy.</a>
              </div>
            </>
          )}
        </form>
      </div>
  )
}

const MagicLinkRequestOrAuthenticationError = ({ handleSubmit, email, setEmail }) => {
  const { isErrorDisplayed, handleChange, handleBlur, isValidEmail } = useEmailErrorDisplay(email, setEmail)

  return (
    <div className={styles['root__content-wrapper']}>
      {!Config.isMerchantChannel && <div className={styles.root__hero} />}
      <h1 className={styles.root__headline}>Something went wrong</h1>
      <form onSubmit={handleSubmit} className={cx(
        styles.root__form,
      )}>
        <div className={styles.root__description}>
          <div className={styles.root__paragraph}>There was a problem, please try again</div>
        </div>
        <div className={styles['root__form-ui']}>
          <TextInputGroup
            className={styles['root__email-field']}
            placeholder='Enter email address'
            autocomplete='email'
            value={email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={isErrorDisplayed}
          />
          <Button disabled={!isValidEmail(email)} className={styles.root__button}>Continue</Button>
        </div>
      </form>
    </div>
  )
}

const MagicLinkAuthenticationExpired = ({ handleSubmit, email, setEmail }) => {
  const { isErrorDisplayed, handleChange, handleBlur, isValidEmail } = useEmailErrorDisplay(email, setEmail)

  return (
    <div className={styles['root__content-wrapper']}>
      {!Config.isMerchantChannel && <div className={styles.root__hero} />}
      <h1 className={styles.root__headline}>Link expired</h1>
      <form onSubmit={handleSubmit} className={styles.root__form}>
        <div className={styles.root__description}>
          <div className={styles.root__paragraph}>Links are only valid for 10 minutes and this one has expired.</div>
          <div className={styles.root__paragraph}>Enter your email again and we will send you a new one.</div>
        </div>
        <div className={styles['root__form-ui']}>
          <TextInputGroup
            className={styles['root__email-field']}
            placeholder='Enter email address'
            autocomplete='email'
            value={email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={isErrorDisplayed}
          />
          <Button disabled={!isValidEmail(email)} className={styles.root__button}>Continue</Button>
        </div>
      </form>
    </div>
  )
}
