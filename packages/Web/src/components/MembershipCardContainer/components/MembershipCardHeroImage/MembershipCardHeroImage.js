import React, { useCallback, useState } from 'react'
import cx from 'classnames'

import MembershipCardHeroModal from 'components/Modals/MembershipCardHeroModal'
import { useModals } from 'hooks/useModals'

import { MEMBERSHIP_CARD_IMAGE_TYPES, MODAL_ACTION_TYPES as modalEnum } from 'utils/enums'

import styles from './MembershipCardHeroImage.module.scss'

const MembershipCardHeroImage = ({ membershipCard }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const imageUrl = membershipCard?.images?.filter(image => image.type === MEMBERSHIP_CARD_IMAGE_TYPES.HERO)?.[0]?.url
  const backgroundColor = membershipCard?.card?.colour
  const membershipId = membershipCard?.card?.membership_id

  const { dispatchModal, modalToRender } = useModals()

  const handleMembershipCardHeroImageClick = useCallback(() => dispatchModal(modalEnum.MEMBERSHIP_CARD_HERO), [dispatchModal])

  const shouldRenderHeroImage = () => {
    // If wasabi, use custom asset
    if (Config.theme === 'wasabi') {
      return <div className={cx(styles.root__image, styles['root__image--wasabi'])} data-testid='membership-card-image'></div>
    } else if (imageUrl) {
      return <img className={styles.root__image} src={imageUrl} alt='' data-testid='membership-card-image' onLoad={() => setImageLoaded(true)} />
    }
    return null
  }

  const conditionalStyles = imageLoaded ? {} : { backgroundColor }

  return (
    <>
      { modalToRender === modalEnum.MEMBERSHIP_CARD_HERO && <MembershipCardHeroModal membershipCard={membershipCard} /> }
      <div className={styles['root__image-section']} style={conditionalStyles} onClick={handleMembershipCardHeroImageClick}>
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
