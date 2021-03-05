import React from 'react'

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
  return (
    <div className={styles.root}>
      <div className={styles['root__image-section']} style={{ backgroundColor }}>
        { imgUrl && <img className={styles.root__image} src={imgUrl} alt='' /> }
        { membershipId && (
          <div className={styles['root__card-number']}>
            <div className={styles['root__card-number-label']}>
              Card number
            </div>
            <div className={styles['root__card-number-value']}>
              1234567890
            </div>
          </div>
        )}
      </div>

      <div className={styles['root__transaction-history']}>Todo: Balance and transaction history</div>
      <div className={styles['root__voucher-history']}>TODO: Rewards history</div>
    </div>
  )
}

export default Hero
