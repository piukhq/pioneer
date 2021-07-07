import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import PaymentCard from 'components/PaymentCard'
import PaymentCardAddForm from 'components/PaymentCardAddForm'
import PaymentCardDeleteForm from 'components/PaymentCardDeleteForm'
import PaymentCardAdd from 'components/PaymentCardAdd'
import PaymentCardLimitAdd from 'components/PaymentCardLimitAdd'
import BinkPaymentCardAdd from 'components/BinkPaymentCardAdd'
import PaymentCardRefresher from 'components/PaymentCardRefresher'

import { selectors as membershipCardsSelectors } from 'ducks/membershipCards'

import { useMembershipCardDetailsByParams } from 'hooks/useMembershipCardDetailsByParams'
import useLinkPaymentCard from './hooks/useLinkPaymentCard'

import { isPaymentCardExpired, areCardsLinked } from 'utils/paymentCards'

import styles from './PaymentCards.module.scss'

const PaymentCards = ({ handleLinkingSuccess, handleLinkingError, setPaymentCardLimitModalVisible }) => {
  const { id: membershipCardId } = useParams()

  const membershipCard = useSelector(state => state.membershipCards.cards[membershipCardId])

  const linkedPaymentCards = useSelector(
    state => membershipCardsSelectors.linkedPaymentCards(state, membershipCardId),
  )
  const unlinkedPaymentCards = useSelector(
    state => membershipCardsSelectors.unlinkedPaymentCards(state, membershipCardId),
  )

  const membershipCardCurrency = useSelector(
    state => membershipCardsSelectors.currency(state, membershipCardId),
  )

  const newlyPendingPaymentCard = useSelector(
    state => membershipCardsSelectors.newlyPendingPaymentCard(state),
  )

  const [paymentCardAddFormVisible, setPaymentCardAddFormVisible] = useState(false)
  const [deleteFormVisible, setDeleteFormVisible] = useState(false)
  const [cardIdToBeDeleted, setCardIdToBeDeleted] = useState(null)
  const [isPaymentCardLimitReached, setIsPaymentCardLimitReached] = useState(false)

  const handleCloseAddPaymentCardForm = useCallback(() => {
    setPaymentCardAddFormVisible(false)
  }, [setPaymentCardAddFormVisible])

  const handleDeletePaymentCard = useCallback(async (card) => {
    setCardIdToBeDeleted(card.id)
    setDeleteFormVisible(true)
  }, [setCardIdToBeDeleted, setDeleteFormVisible])

  const handleCloseDeletePaymentCardForm = useCallback(() => {
    setDeleteFormVisible(false)
    setCardIdToBeDeleted(null)
  }, [])

  const { linkCard } = useLinkPaymentCard(membershipCard, handleLinkingSuccess, handleLinkingError)
  const { planName, planNameSuffix } = useMembershipCardDetailsByParams()

  // Check to see if the payment card limit is reached
  useEffect(() => {
    const paymentCardLimitReached = linkedPaymentCards?.length > 4
    setIsPaymentCardLimitReached(paymentCardLimitReached)
  }, [linkedPaymentCards, setIsPaymentCardLimitReached])

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

  const renderAddPaymentCardButton = () => {
    if (isPaymentCardLimitReached) {
      return <PaymentCardLimitAdd onClick={() => setPaymentCardLimitModalVisible(true)} />
    }

    return Config.theme === 'bink' ? <BinkPaymentCardAdd onClick={() => setPaymentCardAddFormVisible(true)} /> : <PaymentCardAdd onClick={() => setPaymentCardAddFormVisible(true)} />
  }

  return (
    <>
      {/* Only mount component if there is a newly added payment card in a pending state */}
      { newlyPendingPaymentCard && <PaymentCardRefresher paymentCardId={newlyPendingPaymentCard.id} /> }

      <section className={styles.root}>
        <h2 className={styles.root__headline}>Payment cards</h2>
        {(linkedPaymentCards.length > 0 || newlyPendingPaymentCard) ? (
          <p className={styles.root__paragraph}>
            The payment cards below are linked to your {planName} {planNameSuffix}. Simply pay with them to automatically collect {membershipCardCurrency}.
          </p>
        ) : (
          <p className={styles.root__paragraph}>
            You have yet to add any payment cards. By adding a payment card to your account,
            you will auto-collect {membershipCardCurrency} when you shop.
          </p>
        ) }

        <div className={styles.root__cards}>
          {linkedPaymentCards.map(paymentCard => (
            <PaymentCard
              id={paymentCard.id}
              key={paymentCard.id}
              onDelete={handleDeletePaymentCard}
            />
          ))
          }
          { newlyPendingPaymentCard && unlinkedPaymentCards.filter(paymentCard => paymentCard.id === newlyPendingPaymentCard?.id).length > 0 && (
              <PaymentCard
                id={newlyPendingPaymentCard.id}
                onClick={handleClickOnPaymentCard}
                key={newlyPendingPaymentCard.id}
                expired={isPaymentCardExpired(newlyPendingPaymentCard)}
                activating={(newlyPendingPaymentCard.status === 'pending' && !isPaymentCardExpired(newlyPendingPaymentCard))}
              />
          )}

          {renderAddPaymentCardButton()}
        </div>
        { paymentCardAddFormVisible && (
          <PaymentCardAddForm onClose={handleCloseAddPaymentCardForm} />
        )}
        { deleteFormVisible && (
          <PaymentCardDeleteForm
            paymentCardId={cardIdToBeDeleted}
            membershipCardId={membershipCardId}
            onClose={ handleCloseDeletePaymentCardForm } />
        ) }
      </section>
      { unlinkedPaymentCards.filter(paymentCard => paymentCard.id !== newlyPendingPaymentCard?.id).length > 0 && (
        <section className={styles.root}>
          <h2 className={styles.root__headline}>Unlinked payment cards</h2>
          <p className={styles.root__paragraph}>
            These are payment cards that you have added but are not currently linked to your {planNameSuffix}.
            Making purchases with one of these cards <span className={styles.root__warning}>will not collect {membershipCardCurrency}</span>.
            Select the card to see how this can be resolved.
          </p>
          <div className={styles.root__cards}>
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
          </div>
        </section>
      ) }
    </>
  )
}

export default PaymentCards
