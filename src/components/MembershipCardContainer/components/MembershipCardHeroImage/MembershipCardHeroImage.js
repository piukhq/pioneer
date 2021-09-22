import React from 'react'
import cx from 'classnames'

import { useModals } from 'hooks/useModals'
import { MEMBERSHIP_CARD_IMAGE_TYPES } from 'utils/enums'

import styles from './MembershipCardHeroImage.module.scss'

const MembershipCardHeroImage = ({ membershipCard }) => {
  const imageUrl = membershipCard?.images?.filter(image => image.type === MEMBERSHIP_CARD_IMAGE_TYPES.HERO)?.[0]?.url
  const backgroundColor = membershipCard?.card?.colour
  const membershipId = membershipCard?.card?.membership_id

  const { requestMembershipCardHeroModal } = useModals()

  const shouldRenderHeroImage = () => {
    // If wasabi, use custom asset
    if (Config.theme === 'wasabi') {
      return <div className={cx(styles.root__image, styles['root__image--wasabi'])} data-testid='membership-card-image'></div>
    } else if (imageUrl) {
      return <img className={styles.root__image} src={imageUrl} alt='' data-testid='membership-card-image' />
    }
    return null
  }

  return (
    <>
      <div className={styles['root__image-section']} style={{ backgroundColor }} onClick={requestMembershipCardHeroModal}>
        {shouldRenderHeroImage()}
        { membershipId && (
          <div className={styles['root__card-number']}>
            <div>Card number: {membershipId}</div>
          </div>
        )}
      </div>
    </>
  )
}

export default MembershipCardHeroImage
