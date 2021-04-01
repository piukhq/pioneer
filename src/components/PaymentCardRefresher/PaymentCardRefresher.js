// import React from 'react'
import useCardRefresher from '../../hooks/useCardRefresher'
import { useGetPaymentCardsDispatch, usePaymentCardById } from '../../hooks/paymentCards'

const PaymentCardRefresher = ({ newPaymentCardId }) => {
  // const {
  //   PENDING_STATE,
  //   initialCardState,
  //   membershipCard,
  //   retryIndex,
  //   isQueuingInProgress,
  //   lastUpdateTime,
  // } = useCardRefresher(membershipCardId)
  const { getPaymentCards } = useGetPaymentCardsDispatch()
  const paymentCard = usePaymentCardById(newPaymentCardId).card // move to top and pass down.
  const cardStatus = paymentCard?.status

  useCardRefresher(paymentCard, getPaymentCards, cardStatus)

  return null

  // return (
  //   initialCardState === PENDING_STATE ? (
  //     <div className={styles.root}>
  //       Membership card id: {membershipCardId}<br />
  //       Status: {membershipCard?.status?.state} <br />
  //       Refreshes queued so far: {retryIndex} {isQueuingInProgress && ' (in progress)'}<br />
  //       Last update time: {lastUpdateTime}<br />
  //     </div>
  //   ) : null
  // )
}

export default PaymentCardRefresher
