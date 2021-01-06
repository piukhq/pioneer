import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {
  actions as allActions,
  selectors as allSelectors,
} from 'ducks/all'
import { selectors as membershipCardsSelectors } from 'ducks/membershipCards'

import PaymentCard from 'components/PaymentCard'
import PaymentCards from 'components/PaymentCards'
import PaymentCardAdd from 'components/PaymentCardAdd'
import PaymentCardAddForm from 'components/PaymentCardAddForm'
import styles from './MembershipCardsPage.module.scss'

const MembershipCardPage = () => {
  const { id } = useParams()
  const membershipCard = useSelector(state => state.membershipCards.cards[id])
  const loading = useSelector(state => allSelectors.loadingSelector(state))
  const error = useSelector(state => allSelectors.errorSelector(state))

  const unlinkedPaymentCards = useSelector(
    state => membershipCardsSelectors.unlinkedPaymentCards(state, id),
  )

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(allActions.fullRefresh())
  }, [dispatch])

  const [paymentCardAddFormVisible, setPaymentCardAddFormVisible] = useState(false)

  const handleCloseAddPaymentCardForm = useCallback(() => {
    setPaymentCardAddFormVisible(false)
  }, [setPaymentCardAddFormVisible])

  return (
    <div>
      <h1>Membership card</h1>
      <p>Membership card id is {id}</p>
      { membershipCard && (
        <>
          <h2>Payment cards</h2>
          {/* todo: create selector for linked payment cards */}
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
            <PaymentCardAdd onClick={() => setPaymentCardAddFormVisible(true)} />
          </PaymentCards>
          { paymentCardAddFormVisible && (
            <PaymentCardAddForm onClose={handleCloseAddPaymentCardForm} />
          )}
          { unlinkedPaymentCards.length > 0 && (
            <>
              <h2>Unlinked payment cards</h2>
              <p>
                These are payment cards you have added to your account but
                are not currently linked to this loyalty card. Making purchases
                with these cards <span className={styles['membership-cards-page__warning']}>will not collect you rewards</span>. Select the card
                to see how this can be resolved.
              </p>
              <PaymentCards>
                { unlinkedPaymentCards.map(paymentCard => (
                  <PaymentCard id={paymentCard.id} key={paymentCard.id} />
                )) }
              </PaymentCards>
            </>
          ) }
        </>
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
