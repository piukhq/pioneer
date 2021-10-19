import React from 'react'
import cx from 'classnames'

import styles from './Offer.module.scss'

const Offer = ({ offer, index }) => (
  <a href={offer.cta_url || null} target="_blank" rel="noreferrer">
    <img
      className={ cx(
        styles.root,
        offer.cta_url && styles['root__hover-enabled'],
      )}
      src={offer.url}
      alt={`Offer ${index}`}
    />
  </a>
)

export default Offer
