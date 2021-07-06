import React from 'react'
import { MEMBERSHIP_CARD_IMAGE_TYPES } from 'utils/enums'

import styles from './MembershipCardHeroImage.module.scss'

const MembershipCardHeroImage = ({ membershipCard }) => {
  const imageUrl = membershipCard?.images?.filter(image => image.type === MEMBERSHIP_CARD_IMAGE_TYPES.HERO)?.[0]?.url
  const backgroundColor = membershipCard?.card?.colour
  const membershipId = membershipCard?.card?.membership_id

  return (
    <div className={styles['root__image-section']} style={{ backgroundColor }}>
      { imageUrl && <img className={styles.root__image} src={imageUrl} alt='' data-testid='membership-card-image' /> }
      { membershipId && (
        <div className={styles['root__card-number']}>
          <p className={styles['root__card-number-label']}>Card number</p>
          <p>{membershipId}</p>
        </div>
      )}
    </div>
  )
}

export default MembershipCardHeroImage
