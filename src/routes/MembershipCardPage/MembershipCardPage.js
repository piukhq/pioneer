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
// import Loading from 'components/Loading'

import styles from './MembershipCardPage.module.scss'
import DevDeleteMembershipCard from 'components/DevDeleteMembershipCard'
import LinkCardsErrorModal from 'components/LinkCardsErrorModal'
import LinkCardsSuccessModal from 'components/LinkCardsSuccessModal'
import MembershipCardRefresher from 'components/MembershipCardRefresher'
import Vouchers from 'components/Vouchers'
import { useMembershipPlansDispatch } from 'hooks/membershipPlans'

import Hero from './components/Hero'

const MembershipCardPage = () => {
  // todo: this is to speed up the rate at which vouchers are displayed if the user lands straight on this page
  // to further attempt optimizing the process
  const { getMembershipPlans } = useMembershipPlansDispatch()
  useEffect(() => {
    getMembershipPlans()
  }, [getMembershipPlans])

  const { id } = useParams()
  const membershipCard = useSelector(state => state.membershipCards.cards[id])
  // const loading = useSelector(state => allSelectors.loadingSelector(state))
  const error = useSelector(state => allSelectors.errorSelector(state))

  const newlyAddedCardId = useSelector(state => state.paymentCards?.add?.card?.id)

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

  const [linkingSuccessModalVisible, setLinkingSuccessModalVisible] = useState(false)
  const handleLinkingSuccess = useCallback(() => {
    setLinkingSuccessModalVisible(true)
  }, [setLinkingSuccessModalVisible])

  const [linkingErrorModalVisible, setLinkingErrorModalVisible] = useState(false)
  const handleLinkingError = useCallback(() => {
    setLinkingErrorModalVisible(true)
  }, [setLinkingErrorModalVisible])

  const { linkCard } = useLinkPaymentCard(membershipCard, handleLinkingSuccess, handleLinkingError)

  const handleClickOnPaymentCard = useCallback(async (card) => {
    if (!areCardsLinked(card, membershipCard)) {
      if (isPaymentCardExpired(card)) {
        // card is not liked but is expired
        setCardIdToBeDeleted(card.id)
        setDeleteFormVisible(true)
      } else {
        // card is not linked as is not expired
        linkCard(card)
      }
    } else {
      // card is linked. should do nothing if clicked
    }
  }, [membershipCard, linkCard])

  const handleDeletePaymentCard = useCallback(async (card) => {
    setCardIdToBeDeleted(card.id)
    setDeleteFormVisible(true)
  }, [setCardIdToBeDeleted, setDeleteFormVisible])

  const handleCloseDeletePaymentCardForm = useCallback(() => {
    setDeleteFormVisible(false)
    setCardIdToBeDeleted(null)
  }, [])

  return (
    <div>
      { linkingErrorModalVisible && (
        <LinkCardsErrorModal onClose={() => setLinkingErrorModalVisible(false)} />
      )}
      { linkingSuccessModalVisible && (
        <LinkCardsSuccessModal onClose={() => setLinkingSuccessModalVisible(false)} />
      )}
      <h1>Membership card</h1>
      <Hero membershipCard={membershipCard} />
      <MembershipCardRefresher membershipCardId={id} />
      { membershipCard && (
        <>
          <Vouchers membershipCardId={id} />
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
                 <PaymentCard
                   id={paymentCard.id}
                   onDelete={handleDeletePaymentCard}
                   key={paymentCard.id}
                 />
               ))
             }
            { unlinkedPaymentCards
              .filter(paymentCard => paymentCard.id === newlyAddedCardId)
              .map(paymentCard => (
                <PaymentCard
                  id={paymentCard.id}
                  onClick={handleClickOnPaymentCard}
                  key={paymentCard.id}
                  expired={isPaymentCardExpired(paymentCard)}
                  activating={!isPaymentCardExpired(paymentCard)}
                />
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
                { unlinkedPaymentCards
                  .filter(paymentCard => paymentCard.id !== newlyAddedCardId)
                  .map(paymentCard => (
                    <PaymentCard
                      id={paymentCard.id}
                      onClick={handleClickOnPaymentCard}
                      key={paymentCard.id}
                      expired={isPaymentCardExpired(paymentCard)}
                      activating={!isPaymentCardExpired(paymentCard)}
                    />
                  ))
                }
              </PaymentCards>
            </>
          ) }
          {/* todo: temporary for dev purposes only. It will display only in dev mode though */}
          <DevDeleteMembershipCard cardId={membershipCard.id} />
        </>
      ) }
      {/* todo: TBD how we show visually loading state */}
      {/* loading && (
        <Loading />
      ) */}
      { error && (
        <>
          <br /><br /> There was an error
        </>
      )}
    </div>
  )
}

export default MembershipCardPage
