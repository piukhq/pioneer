import React, { useEffect, useState, useCallback } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {
  actions as allActions,
  selectors as allSelectors,
} from 'ducks/all'
import { selectors as membershipCardsSelectors } from 'ducks/membershipCards'

import { useMembershipCardStateById } from 'hooks/membershipCards'

import PaymentCards from 'components/PaymentCards'
import PaymentCardAddForm from 'components/PaymentCardAddForm'
import PaymentCardDeleteForm from 'components/PaymentCardDeleteForm'
import AccountMenu from 'components/AccountMenu'
import DevDeleteMembershipCard from 'components/DevDeleteMembershipCard'
import LinkCardsErrorModal from 'components/LinkCardsErrorModal'
import LinkCardsSuccessModal from 'components/LinkCardsSuccessModal'
import PaymentCardLimitModal from 'components/PaymentCardLimitModal'
import MembershipCardRefresher from 'components/MembershipCardRefresher'
import Vouchers from 'components/Vouchers'
import MembershipCardContainer from 'components/MembershipCardContainer'

const MembershipCardPage = () => {
  const history = useHistory()

  const isAccountActive = useSelector(state => membershipCardsSelectors.isAccountActive(state))
  const reasonCode = useSelector(state => membershipCardsSelectors.reasonCode(state))

  // Log user out if account is no longer active
  useEffect(() => {
    if (reasonCode && !isAccountActive) {
      history.replace('/')
    }
  }, [history, reasonCode, isAccountActive])

  const { id } = useParams()
  const membershipCard = useSelector(state => state.membershipCards.cards[id])
  const loading = useSelector(state => allSelectors.loadingSelector(state))
  const error = useSelector(state => allSelectors.errorSelector(state))
  const { loading: serviceLoading, error: serviceError } = useSelector(state => state.service)

  const { activeVouchers, redeemableVouchers } = useMembershipCardStateById(id)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(allActions.fullRefresh())
  }, [dispatch])

  const [paymentCardAddFormVisible, setPaymentCardAddFormVisible] = useState(false)
  const [paymentCardLimitModalVisible, setPaymentCardLimitModalVisible] = useState(false)
  const [deleteFormVisible, setDeleteFormVisible] = useState(false)
  const [cardIdToBeDeleted, setCardIdToBeDeleted] = useState(null)
  const [linkingSuccessModalVisible, setLinkingSuccessModalVisible] = useState(false)
  const [linkingErrorModalVisible, setLinkingErrorModalVisible] = useState(false)

  const handleLinkingSuccess = useCallback(() => {
    setLinkingSuccessModalVisible(true)
  }, [setLinkingSuccessModalVisible])

  const handleLinkingError = useCallback((card) => {
    setCardIdToBeDeleted(card?.id)
    setLinkingErrorModalVisible(true)
  }, [setLinkingErrorModalVisible])

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

  // Scroll screen into display if major page re-render event occurs
  useEffect(() => {
    if (serviceLoading || serviceError || membershipCard?.status?.state === 'pending') {
      window.scrollTo(0, 0)
    }
  }, [serviceLoading, serviceError, membershipCard?.status?.state])

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

  const shouldRenderModalOverlay = () => {
    if (linkingErrorModalVisible) {
      return (
        <LinkCardsErrorModal
          paymentCardId={cardIdToBeDeleted}
          onClose={() => setLinkingErrorModalVisible(false)} />
      )
    } else if (linkingSuccessModalVisible) {
      return <LinkCardsSuccessModal onClose={() => setLinkingSuccessModalVisible(false)} />
    } else if (paymentCardLimitModalVisible) {
      return <PaymentCardLimitModal onClose={() => setPaymentCardLimitModalVisible(false)} />
    } else if (paymentCardAddFormVisible) {
      return <PaymentCardAddForm onClose={handleCloseAddPaymentCardForm} />
    } else if (deleteFormVisible) {
      return (
        <PaymentCardDeleteForm
          paymentCardId={cardIdToBeDeleted}
          membershipCardId={id}
          onClose={ handleCloseDeletePaymentCardForm } />
      )
    }
    return null
  }

  // Membership card active path
  return (
    <>
      { membershipCard && (
        <>
          {/* TODO: Refresher component to be refactored */}
          <MembershipCardRefresher membershipCardId={id} />

          {/* Render the various overlay modals  */}
          {shouldRenderModalOverlay()}

          <AccountMenu />
          <MembershipCardContainer membershipCard={membershipCard} addPaymentCardClickHandler={() => setPaymentCardAddFormVisible(true)} />
          {shouldRenderVoucherSection()}

          <PaymentCards
            handleLinkingSuccess={handleLinkingSuccess}
            handleLinkingError={handleLinkingError}
            setPaymentCardLimitModalVisible={setPaymentCardLimitModalVisible}
            handleAddPaymentCard={() => setPaymentCardAddFormVisible(true)}
            handleDeletePaymentCard={handleDeletePaymentCard}
          />

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
