import React from 'react'
import Modal from 'components/Modal'
import HighVisibilityLabel from 'components/HighVisibilityLabel'
import { MEMBERSHIP_CARD_IMAGE_TYPES } from 'utils/enums'

import styles from './MembershipCardHeroModal.module.scss'

const MembershipCardHeroModal = ({ membershipCard }) => {
  const imageUrl = membershipCard?.images?.filter(image => image.type === MEMBERSHIP_CARD_IMAGE_TYPES.ALTERNATIVE)?.[0]?.url
  const backgroundColor = membershipCard?.card?.colour
  const cardId = membershipCard?.card?.membership_id

  return (
    <Modal className={styles.root}>
      <div className={styles.root__container}>
        <div className={styles['root__image-container']} style={{ backgroundColor }}>
          <img src={imageUrl} className={styles.root__image} alt='' />
        </div>

        <HighVisibilityLabel value={cardId} />

        {Config.membershipCardModalText && (
          <div className={styles.root__text}>{Config.membershipCardModalText}</div>
        )}
      </div>
    </Modal>
  )
}

export default MembershipCardHeroModal
