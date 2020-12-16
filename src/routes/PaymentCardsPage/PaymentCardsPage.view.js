import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import PaymentCards from 'components/PaymentCards'

import styles from './PaymentCardsPage.module.scss'

const PaymentCardsPageView = () => {
  const history = useHistory()
  const handleError = useCallback(() => {
    // todo: currently it redirects to the login page regardless of the error. Should do that only when the error is due to a 401 HTTP like response
    history.replace('/login')
  }, [history])
  return (
    <div className={styles['payment-cards-page']}>
      <h1>Payment cards</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci culpa doloremque
        iusto nam odit repellat repellendus tempora vitae voluptatum.
      </p>
      <PaymentCards onError={handleError}/>
    </div>
  )
}

export default PaymentCardsPageView
