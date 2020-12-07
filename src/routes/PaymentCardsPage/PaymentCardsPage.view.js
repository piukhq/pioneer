import React from 'react'
import PaymentCards from 'components/PaymentCards'

import styles from './PaymentCardsPage.module.scss'

const PaymentCardsPageView = () => (
  <div className={styles['payment-cards-page']}>
    <h1>Payment cards</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci culpa doloremque
      iusto nam odit repellat repellendus tempora vitae voluptatum.
    </p>
    <PaymentCards />
  </div>
)

export default PaymentCardsPageView
