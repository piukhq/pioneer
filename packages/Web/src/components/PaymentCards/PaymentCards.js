import React, { useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import PaymentCard from 'components/PaymentCard'
import PaymentCardAdd from 'components/PaymentCardAdd'
import PaymentCardLimitAdd from 'components/PaymentCardLimitAdd'
import BinkPaymentCardAdd from 'components/BinkPaymentCardAdd'
import PaymentCardRefresher from 'components/PaymentCardRefresher'

import { selectors as membershipCardsSelectors } from 'ducks/membershipCards'
import { useModals } from 'hooks/useModals'
import { MODAL_ACTION_TYPES as modalEnum } from 'utils/enums'

import { useMembershipCardDetailsByCardId } from 'hooks/useMembershipCardDetailsByCardId'
import { useLinkPaymentCard } from './hooks/useLinkPaymentCard'

import { isPaymentCardExpired, isPaymentCardPending, areCardsLinked } from 'utils/paymentCards'

import styles from './PaymentCards.module.scss'

const PaymentCards = ({ handleLinkingSuccess, handleLinkingError, handleDeletePaymentCard }) => {
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

  const { dispatchModal } = useModals()

  const [isPaymentCardLimitReached, setIsPaymentCardLimitReached] = React.useState(false)

  const { linkCard } = useLinkPaymentCard(membershipCard, handleLinkingSuccess, handleLinkingError)
  const { planName, planNameSuffix } = useMembershipCardDetailsByCardId(membershipCardId)

  const numberOfCardsInLinkedSection = newlyPendingPaymentCard ? linkedPaymentCards?.length + 1 : linkedPaymentCards?.length

  // Check to see if the payment card limit is reached
  useEffect(() => {
    // The user can have no more than 5 payment cards, regardless of the card's state
    const totalCards = numberOfCardsInLinkedSection + unlinkedPaymentCards?.length
    const paymentCardLimitReached = totalCards >= 5
    setIsPaymentCardLimitReached(paymentCardLimitReached)
  }, [numberOfCardsInLinkedSection, unlinkedPaymentCards, newlyPendingPaymentCard, setIsPaymentCardLimitReached])

  const handlePaymentCardClick = useCallback(async (card) => {
    if (!areCardsLinked(card, membershipCard)) {
      if (isPaymentCardExpired(card)) {
        // card is not liked but is expired
        handleDeletePaymentCard(card)
      } else if (numberOfCardsInLinkedSection >= 5) {
        // card can be linked but too many cards are already linked
        dispatchModal(modalEnum.PAYMENT_CARD_LIMIT)
      } else {
        // card is not linked as is not expired
        linkCard(card)
      }
    } else {
    // card is linked. should do nothing if clicked
    }
  }, [membershipCard, linkCard, handleDeletePaymentCard, numberOfCardsInLinkedSection, dispatchModal])

  const handlePaymentCardLimitAddClick = useCallback(() => { dispatchModal(modalEnum.PAYMENT_CARD_LIMIT) }, [dispatchModal])
  const handlePaymentCardAddClick = useCallback(() => { dispatchModal(modalEnum.PAYMENT_CARD_ADD_FORM) }, [dispatchModal])

  const renderAddPaymentCardButton = () => {
    if (isPaymentCardLimitReached) {
      return <PaymentCardLimitAdd onClick={ handlePaymentCardLimitAddClick} />
    }
    return Config.theme === 'bink' ? <BinkPaymentCardAdd onClick={handlePaymentCardAddClick} /> : <PaymentCardAdd onClick={handlePaymentCardAddClick} />
  }

  const isActivating = (card) => isPaymentCardPending(card) && !isPaymentCardExpired(card)

  return (
    <>
      {/* Only mount component if there is a newly added payment card in a pending state */}
      { newlyPendingPaymentCard && <PaymentCardRefresher paymentCardId={newlyPendingPaymentCard.id} /> }

      <section className={styles.root} data-testid='linked-payment-cards-section' >
        <h2 className={styles.root__headline}>Credit/debit cards</h2>
        {(linkedPaymentCards.length > 0 || newlyPendingPaymentCard) ? (
          <div className={styles.root__paragraph}>
            The credit/debit cards below are linked to your {planName} {planNameSuffix}. Simply pay with them to automatically collect {membershipCardCurrency}.
          </div>
        ) : (
          <div className={styles.root__paragraph}>
            You have yet to add any credit/debit cards. By adding a credit/debit card to your account,
            you will auto-collect {membershipCardCurrency} when you shop.
          </div>
        ) }

        <div className={styles['root__payment-cards']}>
          {linkedPaymentCards.map(paymentCard => (
            <div data-testid='linked-payment-card' key={paymentCard.id}>
              <PaymentCard
                id={paymentCard.id}
                onDelete={() => handleDeletePaymentCard(paymentCard)}
              />
            </div>
          ))}

          { newlyPendingPaymentCard && unlinkedPaymentCards.filter(paymentCard => paymentCard.id === newlyPendingPaymentCard?.id).length > 0 && (
            <div data-testid={`newly-pending-payment-card-${newlyPendingPaymentCard.id}`}>
              <PaymentCard
                id={newlyPendingPaymentCard.id}
                onClick={handlePaymentCardClick}
                key={newlyPendingPaymentCard.id}
                expired={isPaymentCardExpired(newlyPendingPaymentCard)}
                activating={isActivating(newlyPendingPaymentCard)}
              />
            </div>
          )}
          {renderAddPaymentCardButton()}
        </div>
      </section>

      { unlinkedPaymentCards.filter(paymentCard => paymentCard.id !== newlyPendingPaymentCard?.id).length > 0 && (
        <section className={styles.root} data-testid='unlinked-payment-cards-section'>
          <h2 className={styles.root__headline}>Unlinked credit/debit cards</h2>
          <div className={styles.root__paragraph}>
            These are credit/debit cards that you have added but are not currently linked to your {planNameSuffix}.
            Making purchases with one of these cards <span className={styles.root__warning}>will not collect {membershipCardCurrency}</span>.
            Select the card to see how this can be resolved.
          </div>
          <div className={styles['root__payment-cards']}>
            { unlinkedPaymentCards
              .filter(paymentCard => paymentCard.id !== newlyPendingPaymentCard?.id)
              .map(paymentCard => (
                <div data-testid='unlinked-payment-card' key={paymentCard.id}>
                  <PaymentCard
                    id={paymentCard.id}
                    onClick={handlePaymentCardClick}
                    key={paymentCard.id}
                    expired={isPaymentCardExpired(paymentCard)}
                    activating={isActivating(paymentCard)}
                    hoverEnabled
                  />
                </div>
              ))
            }
          </div>
        </section>
      )}
    </>
  )
}

export default React.memo(PaymentCards)
