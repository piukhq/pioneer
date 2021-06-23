import React, { useEffect, useState, useCallback } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {
  actions as allActions,
  selectors as allSelectors,
} from 'ducks/all'
import { selectors as membershipCardsSelectors } from 'ducks/membershipCards'
import { isPaymentCardExpired, areCardsLinked } from 'utils/paymentCards'

import { useMembershipCardStateById } from 'hooks/membershipCards'
import { useMembershipPlansDispatch } from 'hooks/membershipPlans'
import useLinkPaymentCard from './hooks/useLinkPaymentCard'
import useMembershipCardDetailsByParams from 'hooks/useMembershipCardDetailsByParams'
import useLoadService from 'hooks/useLoadService'

import PaymentCard from 'components/PaymentCard'
import PaymentCards from 'components/PaymentCards'
import PaymentCardAdd from 'components/PaymentCardAdd'
import PaymentCardLimitAdd from 'components/PaymentCardLimitAdd'
import BinkPaymentCardAdd from 'components/BinkPaymentCardAdd'
import PaymentCardAddForm from 'components/PaymentCardAddForm'
import PaymentCardDeleteForm from 'components/PaymentCardDeleteForm'
import PreparingYourCard from 'components/PreparingYourCard'
// import Loading from 'components/Loading'
import AccountMenu from 'components/AccountMenu'
import DevDeleteMembershipCard from 'components/DevDeleteMembershipCard'
import LinkCardsErrorModal from 'components/LinkCardsErrorModal'
import LinkCardsSuccessModal from 'components/LinkCardsSuccessModal'
import PaymentCardLimitModal from 'components/PaymentCardLimitModal'
import MembershipCardRefresher from 'components/MembershipCardRefresher'
import PaymentCardRefresher from 'components/PaymentCardRefresher'
import Vouchers from 'components/Vouchers'
import WeFoundYou from 'components/WeFoundYou'
import HangTight from 'components/HangTight'
import Hero from './components/Hero'

import styles from './MembershipCardPage.module.scss'

const MembershipCardPage = () => {
  // todo: refactor to reduce overall complexity and size of this component.
  // useLoadService()

  // todo: this is to speed up the rate at which vouchers are displayed if the user lands straight on this page
  // to further attempt optimizing the process
  const { getMembershipPlans } = useMembershipPlansDispatch()
  useEffect(() => {
    getMembershipPlans()
  }, [getMembershipPlans])

  const history = useHistory()

  const { id } = useParams()
  const membershipCard = useSelector(state => state.membershipCards.cards[id])
  const isReenrolRequired = useSelector(state => membershipCardsSelectors.isReenrolRequired(state))
  const isReaddRequired = useSelector(state => membershipCardsSelectors.isReaddRequired(state))
  const loading = useSelector(state => allSelectors.loadingSelector(state))
  const error = useSelector(state => allSelectors.errorSelector(state))

  const { success: serviceSuccess, loading: serviceLoading, error: serviceError, post: { success: postServiceSuccess } } = useSelector(state => state.service)

  const membershipCardCurrency = useSelector(
    state => membershipCardsSelectors.currency(state, id),
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

  const { activeVouchers, redeemableVouchers } = useMembershipCardStateById(id)

  const { planName, planNameSuffix } = useMembershipCardDetailsByParams()

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(allActions.fullRefresh())
  }, [dispatch])

  const [paymentCardAddFormVisible, setPaymentCardAddFormVisible] = useState(false)
  const [paymentCardLimitModalVisible, setPaymentCardLimitModalVisible] = useState(false)
  const [deleteFormVisible, setDeleteFormVisible] = useState(false)
  const [cardIdToBeDeleted, setCardIdToBeDeleted] = useState(null)
  const [linkingSuccessModalVisible, setLinkingSuccessModalVisible] = useState(false)
  const [isPaymentCardLimitReached, setIsPaymentCardLimitReached] = useState(false)

  const handleLinkingSuccess = useCallback(() => {
    setLinkingSuccessModalVisible(true)
  }, [setLinkingSuccessModalVisible])

  const [linkingErrorModalVisible, setLinkingErrorModalVisible] = useState(false)

  const handleLinkingError = useCallback((card) => {
    setCardIdToBeDeleted(card?.id)
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

  // membership reenrol/readd path
  // useEffect(() => {
  //   if ((isReenrolRequired || isReaddRequired) && Config.isMerchantChannel) {
  //     history.replace(`/membership-card/add/${Config.membershipPlanId}`)
  //   }
  // }, [isReenrolRequired, isReaddRequired, history])

  // Scroll screen into display if major page re-render event occurs
  useEffect(() => {
    if (serviceLoading || serviceError || membershipCard?.status?.state === 'pending') {
      window.scrollTo(0, 0)
    }
  }, [serviceLoading, serviceError, membershipCard?.status?.state])

  // Check to see if the payment card limit is reached
  useEffect(() => {
    const paymentCardLimitReached = linkedPaymentCards?.length > 4
    setIsPaymentCardLimitReached(paymentCardLimitReached)
  }, [linkedPaymentCards, setIsPaymentCardLimitReached])

  // if (serviceSuccess || postServiceSuccess) {
  //   // prevent next elseifs executing
  // } else if (serviceLoading) {
  //   return <HangTight />
  // } else if (serviceError) {
  //   // Displayed when service error occurs, signifying T&Cs have not yet been accepted
  //   return <WeFoundYou />
  // }

  // // Membership card pending path
  // if (membershipCard?.status?.state === 'pending' && Config.isMerchantChannel) {
  //   return (
  //     <>
  //       <MembershipCardRefresher membershipCardId={id} />
  //       <PreparingYourCard />
  //     </>
  //   )
  // }

  const renderAddPaymentCardButton = () => {
    if (isPaymentCardLimitReached) {
      return <PaymentCardLimitAdd onClick={() => setPaymentCardLimitModalVisible(true)} />
    }

    return Config.theme === 'bink' ? <BinkPaymentCardAdd onClick={() => setPaymentCardAddFormVisible(true)} /> : <PaymentCardAdd onClick={() => setPaymentCardAddFormVisible(true)} />
  }

  const shouldRenderVoucherSection = () => {
    if (!activeVouchers || activeVouchers.length === 0) {
      return null
    }

    if (membershipCard?.payment_cards?.length === 0) {
      if (redeemableVouchers.length !== 0) {
        return <Vouchers membershipCardId={id} displayRedeemableOnly />
      }
      return null
    }
    return <Vouchers membershipCardId={id} />
  }

  // Membership card active path
  return (
    <>
      { linkingErrorModalVisible && (
        <LinkCardsErrorModal
          paymentCardId={cardIdToBeDeleted}
          onClose={() => setLinkingErrorModalVisible(false)} />
      )}
      { linkingSuccessModalVisible && (
        <LinkCardsSuccessModal onClose={() => setLinkingSuccessModalVisible(false)} />
      )}
      { paymentCardLimitModalVisible && (
        <PaymentCardLimitModal onClose={() => setPaymentCardLimitModalVisible(false)} />
      )}
      <MembershipCardRefresher membershipCardId={id} />

      {/* Only mount component if there is a newly added payment card in a pending state */}
      { newlyPendingPaymentCard && <PaymentCardRefresher paymentCardId={newlyPendingPaymentCard.id} /> }

      { membershipCard && (
        <>
          <AccountMenu />
          <Hero membershipCard={membershipCard} addPaymentCardClickHandler={() => setPaymentCardAddFormVisible(true)} />
          {shouldRenderVoucherSection()}
          <section className={styles.root}>
            <h2 className={styles.root__headline}>Payment cards</h2>
            {(linkedPaymentCards.length > 0 || newlyPendingPaymentCard) ? (
              <p className={styles.root__paragraph}>
                The payment cards below are linked to your {planName} {planNameSuffix}. Simply pay with them to automatically collect {membershipCardCurrency}.
              </p>
            ) : (
              <p className={styles.root__paragraph}>
                You have yet to add any payment cards. By adding a payment card to your account,
                you will unlock the ability to auto-collect {membershipCardCurrency} when you shop.
              </p>
            ) }
            <PaymentCards>
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
          </section>
          { unlinkedPaymentCards.filter(paymentCard => paymentCard.id !== newlyPendingPaymentCard?.id).length > 0 && (
            <section className={styles.root}>
              <h2 className={styles.root__headline}>Unlinked payment cards</h2>
              <p className={styles.root__paragraph}>
                These are payment cards that you have added but are not currently linked to your {planNameSuffix}.
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
            </section>
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
    </>
  )
}

export default MembershipCardPage
