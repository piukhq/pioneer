import React from 'react'
import cx from 'classnames'

import { ReactComponent as StateAuthorisedSvg } from 'images/state-authorised.svg'
import { ReactComponent as StateFailedSvg } from 'images/state-failed.svg'
import { ReactComponent as StatePendingSvg } from 'images/state-pending.svg'

import styles from './Hero.module.scss'

// todo: duplicated code, to move both to a common place
const MEMBERSHIP_CARD_IMAGE_TYPES = {
  HERO: 0,
  BANNER: 1,
  OFFER: 2,
  ICON: 3,
  ASSET: 4,
  REFERENCE: 5,
  PERSONAL_OFFERS: 6,
  PROMOTIONS: 7,
  TIER: 8,
  ALTERNATIVE: 9,
}

const Hero = ({ membershipCard }) => {
  const imgUrl = membershipCard?.images?.filter(image => image.type === MEMBERSHIP_CARD_IMAGE_TYPES.HERO)?.[0]?.url
  const backgroundColor = membershipCard?.card?.colour
  const membershipId = membershipCard?.card?.membership_id
  const balance = membershipCard?.balances?.[0]

  // possible states: authorised, failed, pending, suggested, unauthorised
  let state = membershipCard?.status?.state
  if (state === 'suggested' || state === 'unauthorised') {
    state = 'failed'
  }

  return (
    <div className={cx(
      styles.root,
      styles[`root--${state}`],
    )}>
      <div className={styles['root__image-section']} style={{ backgroundColor }}>
        { imgUrl && <img className={styles.root__image} src={imgUrl} alt='' /> }
        { membershipId && (
          <div className={styles['root__card-number']}>
            <div className={styles['root__card-number-label']}>
              Card number
            </div>
            <div className={styles['root__card-number-value']}>
              {membershipId}
            </div>
          </div>
        )}
      </div>
      { state === 'authorised' && (
        <>
          {/* todo: would there ever be an unhappy path ever where balance is missing? */}
          <div className={styles['root__transaction-history']}>
            <StateAuthorisedSvg />
            <div className={styles.root__subtitle}>{balance?.value} {balance?.suffix}</div>
            <div className={styles.root__explainer}>View history</div>
          </div>
          <div className={styles['root__voucher-history']}>
            <StateAuthorisedSvg />
            <div className={styles.root__subtitle}>Reward history</div>
            <div className={styles.root__explainer}>See your past rewards</div>
          </div>
        </>
      ) }
      { state === 'failed' && (
        <>
          <div className={styles['root__failed-state']}>
            <StateFailedSvg />
            <div className={styles.root__subtitle}>Something's not right</div>
            <div className={styles.root__explainer}>
              <p className={styles['root__explainer-paragraph']}>There was a problem setting up your account.</p>
              <p className={styles['root__explainer-paragraph']}>We need some additional information to resolve this.</p>
              <p className={styles['root__explainer-paragraph']}>Click here to resolve.</p>
            </div>
          </div>
        </>
      ) }
      { state === 'pending' && (
        <>
          <div className={styles['root__pending-state']}>
            <StatePendingSvg />
            <div className={styles.root__subtitle}>Pending</div>
            <div className={styles.root__explainer}>
              <p className={styles['root__explainer-paragraph']}>We are getting everything ready for you.</p>
              <p className={styles['root__explainer-paragraph']}>You will need a payment card to start collecting rewards.</p>
              <p className={styles['root__explainer-paragraph']}>This can be done alongside this process.</p>
            </div>
          </div>
        </>
      ) }
    </div>
  )
}

export default Hero
