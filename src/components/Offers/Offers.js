import React from 'react'
import Offer from 'components/Offer'

import styles from './Offers.module.scss'

const Offers = ({ planOffers }) => (
  <section className={styles.root}>
    <h2 className={styles.root__headline}>Offers</h2>
    <div className={styles['root__active-offers']}>
    {planOffers?.map?.((offer, index) => (
      <Offer offer={offer} index={index} key={index} />
    ))}
    </div>
  </section>
)

export default Offers
