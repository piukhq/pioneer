import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {
  actions as allActions,
  selectors as allSelectors,
} from 'ducks/all'
import PaymentCard from 'components/PaymentCard'
import PaymentCards from 'components/PaymentCards'

const MembershipCardPage = () => {
  const { id } = useParams()
  const membershipCard = useSelector(state => state.membershipCards.cards[id])
  const loading = useSelector(state => allSelectors.loadingSelector(state))
  const error = useSelector(state => allSelectors.errorSelector(state))

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(allActions.fullRefresh())
  }, [dispatch])

  return (
    <div>
      <h1>Membership card</h1>
      <p>Membership card id is {id}</p>
      { membershipCard && (
        <div>
          <h2>Payment cards</h2>
          {membershipCard.payment_cards.filter(paymentCard => paymentCard.active_link).length > 0 ? (
            <p>
              The payment cards below are linked to this loyalty card.
              Simply pay with them to collect points.
            </p>
          ) : (
            <p>
              You have yet to add any payment cards. By adding a payment
              card to your account, you will unlock the ability to auto-collect
              points and rewards when you shop.
            </p>
          ) }
          <PaymentCards>
             {membershipCard.payment_cards
               .filter(paymentCard => paymentCard.active_link)
               .map(paymentCard => (
                 <PaymentCard id={paymentCard.id} key={paymentCard.id} />
               ))
             }
          </PaymentCards>
        </div>
      ) }
      {/* todo: TBD how we show visually loading state */}
      { loading && (
        <>
          <br /><br /> Loading
        </>
      )}
      { error && (
        <>
          <br /><br /> There was an error
        </>
      )}
    </div>
  )
}

export default MembershipCardPage
