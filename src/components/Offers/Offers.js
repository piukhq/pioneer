import React from 'react'
import cx from 'classnames'

import styles from './Offers.module.scss'

const Offers = ({ planOffers }) => {
  const renderOffers = () => {
    return planOffers?.map?.((offer, index) => (
      <a href={offer.cta_url || null} key={offer.id}target="_blank" rel="noreferrer">
        <img
          className={ cx(
            styles.root__offer,
            offer.cta_url && styles['root__offer__hover-enabled'],
          )}
          src={offer.url}
          alt={`Offer ${index+1}`}
       />
      </a>
    ))
  }

  return (
    <section className={styles.root}>
      <h2 className={styles.root__headline}>Offers</h2>
      <div className={styles['root__active-offers']}>
        {renderOffers()}
      </div>
    </section>
  )
}

export default Offers
