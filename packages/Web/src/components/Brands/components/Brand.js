import React from 'react'
import { MEMBERSHIP_CARD_IMAGE_TYPES } from 'utils/enums'

import styles from './Brand.module.scss'

const Brand = ({ plan }) => {
  const imageUrl = plan?.images?.filter(image => image.type === MEMBERSHIP_CARD_IMAGE_TYPES.ICON)?.[0]?.url
  return ( // TODO: Add onClick Handler once Modal exists
    <div className={styles.root} onClick={null}>
      <img src={imageUrl} className={styles.root__image} alt={plan.account.company_name} />
    </div>
  )
}

export default Brand
