import React from 'react'
import { ReactComponent as PaymentAddSvg } from 'images/payment-add.svg'
import styles from './BinkPaymentCardAdd.module.scss'

const BinkPaymentCardAdd = ({ onClick }) => (
  <div className={styles.root} onClick={onClick}>
    <div className={styles.root__border}>
      <div className={styles.root__inner}>
        <PaymentAddSvg className={styles['root__payment-add-svg']} />
      </div>
    </div>
  </div>
)

export default BinkPaymentCardAdd
