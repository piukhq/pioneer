import React from 'react'
import styles from './MembershipCardHeroImage.module.scss'

const MembershipCardHeroImage = ({ imageUrl, membershipId, backgroundColor }) => {
  return (
    <div className={styles['root__image-section']} style={{ backgroundColor }}>
      { imageUrl && <img className={styles.root__image} src={imageUrl} alt='' /> }
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
