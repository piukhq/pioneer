import React from 'react'
import { MEMBERSHIP_CARD_IMAGE_TYPES } from 'utils/enums'
import heroImage from 'images/wasabi-hero.png'

import styles from './MembershipCardHeroImage.module.scss'

const MembershipCardHeroImage = ({ membershipCard }) => {
  const imageUrl = membershipCard?.images?.filter(image => image.type === MEMBERSHIP_CARD_IMAGE_TYPES.HERO)?.[0]?.url
  const backgroundColor = membershipCard?.card?.colour
  const membershipId = membershipCard?.card?.membership_id

  const shouldRenderHeroImage = () => {
    // If wasabi, use custom asset
    const imageSrc = Config.theme === 'wasabi' ? heroImage : imageUrl

    if (imageSrc) {
      return <img className={styles.root__image} src={imageSrc} alt='' data-testid='membership-card-image' />
    }
    return null
  }

  return (
    <div className={styles['root__image-section']} style={{ backgroundColor }}>
      {shouldRenderHeroImage()}
      { membershipId && (
        <div className={styles['root__card-number']}>
          <div>Card number: {membershipId}</div>
        </div>
      )}
    </div>
  )
}

export default MembershipCardHeroImage
