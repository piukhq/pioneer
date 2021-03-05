import React from 'react'
import cx from 'classnames'

import { ReactComponent as StateAuthorisedSvg } from 'images/state-authorised.svg'

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

  // possible states: authorised, failed, pending, suggested, unauthorised
  const state = membershipCard?.status?.state

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
          <div className={styles['root__transaction-history']}>
            <StateAuthorisedSvg />
            <div className={styles.root__subtitle}>6 stamps</div>
            <div className={styles.root__explainer}>View history</div>
          </div>
          <div className={styles['root__voucher-history']}>
            <StateAuthorisedSvg />
            <div className={styles.root__subtitle}>Reward history</div>
            <div className={styles.root__explainer}>See your past rewards</div>
          </div>
        </>
      ) }
    </div>
  )
}

export default Hero
