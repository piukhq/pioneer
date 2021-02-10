import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {
  actions as allActions,
  selectors as allSelectors,
} from 'ducks/all'
import { selectors as membershipCardsSelectors } from 'ducks/membershipCards'
import { isPaymentCardExpired, areCardsLinked } from 'utils/paymentCards'

import useLinkPaymentCard from './hooks/useLinkPaymentCard'

import PaymentCard from 'components/PaymentCard'
import PaymentCards from 'components/PaymentCards'
import PaymentCardAdd from 'components/PaymentCardAdd'
import PaymentCardAddForm from 'components/PaymentCardAddForm'
import PaymentCardDeleteForm from 'components/PaymentCardDeleteForm'
import Loading from 'components/Loading'

import styles from './MembershipCardPage.module.scss'
import DevDeleteMembershipCard from 'components/DevDeleteMembershipCard'
import { useMembershipCardsDispatch } from 'hooks/membershipCards'

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

  const [deleteFormVisible, setDeleteFormVisible] = useState(false)
  const [cardIdToBeDeleted, setCardIdToBeDeleted] = useState(null)

  const handleLinkingSuccess = useCallback(() => {
    console.log('link success')
  }, [])
  const handleLinkingError = useCallback(() => {
    console.log('link error')
  }, [])
  const { linkCard } = useLinkPaymentCard(membershipCard, handleLinkingSuccess, handleLinkingError)

  const { unLinkPaymentCard } = useMembershipCardsDispatch()

  const handleClickOnPaymentCard = useCallback(async (card) => {
    if (!areCardsLinked(card, membershipCard)) {
      if (isPaymentCardExpired(card)) {
        setCardIdToBeDeleted(card.id)
        setDeleteFormVisible(true)
      } else {
        console.log('card not expired')
        linkCard(card)
      }
    } else {
      console.log('card is linked')
      // todo: temporarily unlink
      unLinkPaymentCard(card.id, membershipCard.id)
    }
  }, [membershipCard, linkCard, unLinkPaymentCard])

  const handleCloseDeletePaymentCardForm = useCallback(() => {
    setDeleteFormVisible(false)
    setCardIdToBeDeleted(null)
  }, [])

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
                 <PaymentCard id={paymentCard.id} onClick={handleClickOnPaymentCard} key={paymentCard.id} />
               ))
             }
            <PaymentCardAdd onClick={() => setPaymentCardAddFormVisible(true)} />
          </PaymentCards>
          { paymentCardAddFormVisible && (
            <PaymentCardAddForm onClose={handleCloseAddPaymentCardForm} />
          )}
          { deleteFormVisible && (
            <PaymentCardDeleteForm id={cardIdToBeDeleted} onClose={ handleCloseDeletePaymentCardForm } />
          ) }
          { unlinkedPaymentCards.length > 0 && (
            <>
              <h2>Unlinked payment cards</h2>
              <p>
                These are payment cards you have added to your account but
                are not currently linked to this loyalty card. Making purchases
                with these cards <span className={styles.root__warning}>will not collect you rewards</span>. Select the card
                to see how this can be resolved.
              </p>
              <PaymentCards>
                { unlinkedPaymentCards.map(paymentCard => (
                  <PaymentCard id={paymentCard.id} onClick={handleClickOnPaymentCard} key={paymentCard.id} />
                )) }
              </PaymentCards>
            </>
          ) }
          <DevDeleteMembershipCard cardId={membershipCard.id} />
        </>
      ) }
      {/* todo: TBD how we show visually loading state */}
      { loading && (
        <Loading />
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
