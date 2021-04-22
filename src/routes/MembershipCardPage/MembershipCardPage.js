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
import AccountMenu from 'components/AccountMenu'
import DevDeleteMembershipCard from 'components/DevDeleteMembershipCard'
import LinkCardsErrorModal from 'components/LinkCardsErrorModal'
import LinkCardsSuccessModal from 'components/LinkCardsSuccessModal'
import MembershipCardRefresher from 'components/MembershipCardRefresher'
import PaymentCardRefresher from 'components/PaymentCardRefresher'
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
  const loading = useSelector(state => allSelectors.loadingSelector(state))
  const error = useSelector(state => allSelectors.errorSelector(state))

  const membershipCardCurrency = useSelector(
    state => membershipCardsSelectors.currency(state, id),
  )
  const membershipCardName = useSelector(
    state => membershipCardsSelectors.plan(state, id)?.account?.plan_name_card,
  )
  const linkedPaymentCards = useSelector(
    state => membershipCardsSelectors.linkedPaymentCards(state, id),
  )
  const unlinkedPaymentCards = useSelector(
    state => membershipCardsSelectors.unlinkedPaymentCards(state, id),
  )
  const newlyPendingPaymentCard = useSelector(
    state => membershipCardsSelectors.newlyPendingPaymentCard(state),
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
      <AccountMenu />
      { linkingErrorModalVisible && (
        <LinkCardsErrorModal onClose={() => setLinkingErrorModalVisible(false)} />
      )}
      { linkingSuccessModalVisible && (
        <LinkCardsSuccessModal onClose={() => setLinkingSuccessModalVisible(false)} />
      )}
      <MembershipCardRefresher membershipCardId={id} />
      <PaymentCardRefresher paymentCardId={newlyPendingPaymentCard?.id} />
      { membershipCard && (
        <>
          <Hero membershipCard={membershipCard} />
          <Vouchers membershipCardId={id} />
          <h2>Payment cards</h2>
          {(linkedPaymentCards.length > 0 || newlyPendingPaymentCard) ? (
            <p>
              The payment cards below are linked to this {membershipCardName}. Simply pay with one to collect {membershipCardCurrency}.
            </p>
          ) : (
            <p>
              You have yet to add any payment cards. By adding a payment card to your account,
              you will unlock the ability to auto-collect {membershipCardCurrency} when you shop.
            </p>
          ) }
          <PaymentCards>
            {linkedPaymentCards.map(paymentCard => (
              <PaymentCard
                id={paymentCard.id}
                onDelete={handleDeletePaymentCard}
                key={paymentCard.id}
              />
            ))
            }
            { newlyPendingPaymentCard && unlinkedPaymentCards.filter(paymentCard => paymentCard.id === newlyPendingPaymentCard?.id).length > 0 && (
                <PaymentCard
                  id={newlyPendingPaymentCard.id}
                  onClick={handleClickOnPaymentCard}
                  onDelete={handleDeletePaymentCard}
                  key={newlyPendingPaymentCard.id}
                  expired={isPaymentCardExpired(newlyPendingPaymentCard)}
                  activating={(newlyPendingPaymentCard.status === 'pending' && !isPaymentCardExpired(newlyPendingPaymentCard))}
                />
            )}
            <PaymentCardAdd onClick={() => setPaymentCardAddFormVisible(true)} />
          </PaymentCards>
          { paymentCardAddFormVisible && (
            <PaymentCardAddForm onClose={handleCloseAddPaymentCardForm} />
          )}
          { deleteFormVisible && (
            <PaymentCardDeleteForm
              paymentCardId={cardIdToBeDeleted}
              membershipCardId={id}
              onClose={ handleCloseDeletePaymentCardForm } />
          ) }
          { unlinkedPaymentCards.filter(paymentCard => paymentCard.id !== newlyPendingPaymentCard?.id).length > 0 && (
            <>
              <h2>Unlinked payment cards</h2>
              <p>
                These are payment cards that you have added but are not currently linked to your {membershipCardName}.
                Making purchases with one of these cards <span className={styles.root__warning}>will not collect you {membershipCardCurrency}</span>.
                Select the card to see how this can be resolved.
              </p>
              <PaymentCards>
                { unlinkedPaymentCards
                  .filter(paymentCard => paymentCard.id !== newlyPendingPaymentCard?.id)
                  .map(paymentCard => (
                    <PaymentCard
                      id={paymentCard.id}
                      onClick={handleClickOnPaymentCard}
                      key={paymentCard.id}
                      expired={isPaymentCardExpired(paymentCard)}
                      activating={(paymentCard.status === 'pending' && !isPaymentCardExpired(paymentCard))}
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
      {/**
       * Note that if the loyalty card was just created and is in pending state then we keep loading the card details at
       * certain intervals until the loyalty card becomes either authorized or goes into a failed state.
       * The Loading component is disabled, because otherwise it would become visible at those intervals.
       */}
      {/* todo: TBD how we show visually loading state */}
      {/* loading && (
        <Loading />
      ) */}
      { (error || (!loading && !membershipCard)) && (
        <>
          Something is wrong.
        </>
      )}
    </div>
  )
}

export default MembershipCardPage
