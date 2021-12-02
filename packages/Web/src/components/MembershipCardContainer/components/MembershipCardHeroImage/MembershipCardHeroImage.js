import React, { useCallback } from 'react'
import cx from 'classnames'

import MembershipCardHeroModal from 'components/Modals/MembershipCardHeroModal'
import { useModals } from 'hooks/useModals'

import { MEMBERSHIP_CARD_IMAGE_TYPES, MODAL_ACTION_TYPES as modalEnum } from 'utils/enums'

import styles from './MembershipCardHeroImage.module.scss'

const MembershipCardHeroImage = ({ membershipCard }) => {
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
      return <img className={styles.root__image} src={imageUrl} alt='' data-testid='membership-card-image' />
    }
    return null
  }

  return (
    <>
      <div className={styles['root__image-section']} style={{ backgroundColor }} onClick={handleMembershipCardHeroImageClick}>
        {shouldRenderHeroImage()}
        { membershipId && (
          <div className={styles['root__card-number']}>
            <div>Card number: {membershipId}</div>
          </div>
        )}
      </div>
      { modalToRender === modalEnum.MEMBERSHIP_CARD_HERO && (
        <div data-testid='membership-card-hero-modal'>
          <MembershipCardHeroModal membershipCard={membershipCard} />
        </div>
      ) }
    </>
  )
}

export default MembershipCardHeroImage
