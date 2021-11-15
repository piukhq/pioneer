import React, { useEffect, useState, useCallback } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {
  actions as allActions,
  selectors as allSelectors,
} from 'ducks/all'
import { selectors as membershipCardsSelectors } from 'ducks/membershipCards'

import { useMembershipCardStateById } from 'hooks/membershipCards'

import { useMembershipCardDetailsByCardId } from 'hooks/useMembershipCardDetailsByCardId'
import { useModals } from 'hooks/useModals'
import { MODAL_ACTION_TYPES as modalEnum } from 'utils/enums'

import PaymentCards from 'components/PaymentCards'
import PaymentCardAddForm from 'components/PaymentCardAddForm'
import PaymentCardDeleteForm from 'components/PaymentCardDeleteForm'
import AccountMenu from 'components/AccountMenu'
import DevDeleteMembershipCard from 'components/DevDeleteMembershipCard'
import LinkCardsErrorModal from 'components/Modals/LinkCardsErrorModal'
import LinkCardsSuccessModal from 'components/Modals/LinkCardsSuccessModal'
import PaymentCardLimitModal from 'components/Modals/PaymentCardLimitModal'
import Vouchers from 'components/Vouchers'
import Offers from 'components/Offers'
import MembershipCardContainer from 'components/MembershipCardContainer'

import useMembershipCardRefresher from 'hooks/useMembershipCardRefresher'
import { useCheckSessionEnded } from 'hooks/useCheckSessionEnded'

import { useIdleTimer } from 'react-idle-timer'
import { useHandleOnIdle, useSetClientVersion, idleTimerSettings } from 'hooks/useCheckIdle'

import { ReactComponent as LeftChevronSvg } from 'images/chevron-left.svg'

import styles from './MembershipCardPage.module.scss'

const MembershipCardPage = () => {
  useCheckSessionEnded() // TODO: Temporary redirect for Web-464
  const history = useHistory()
  const isAccountActive = useSelector(state => membershipCardsSelectors.isAccountActive(state))
  const reasonCode = useSelector(state => membershipCardsSelectors.reasonCode(state))
  const { dispatchModal, modalToRender } = useModals()

  // // Log user out if account is no longer active
  useEffect(() => {
    if (reasonCode && !isAccountActive && Config.isMerchantChannel) {
      history.replace('/')
    }
  }, [history, reasonCode, isAccountActive])

  const { id } = useParams()
  useMembershipCardRefresher(id)

  const { handleOnIdle } = useHandleOnIdle()
  const { clientVersion } = useSetClientVersion()

  // const clientVersion = useSelector(state => versionSelectors.clientVersion(state))
  const onIdle = useCallback(() => { // temporary function to test bug
    console.log(clientVersion) /// WHY IS THIS NULL???
    handleOnIdle(clientVersion)
  }, [clientVersion, handleOnIdle])

  useIdleTimer({
    ...idleTimerSettings,
    onIdle: onIdle,
  })

  // Store Bink Web version upon initial load

  const membershipCard = useSelector(state => state.membershipCards.cards[id])
  const loading = useSelector(state => allSelectors.loadingSelector(state))
  const error = useSelector(state => allSelectors.errorSelector(state))
  const { loading: serviceLoading, error: serviceError } = useSelector(state => state.service)

  const { activeVouchers, redeemableVouchers } = useMembershipCardStateById(id)
  const { planOffers } = useMembershipCardDetailsByCardId()

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(allActions.fullRefresh())
  }, [dispatch])

  const [cardIdToBeDeleted, setCardIdToBeDeleted] = useState(null)

  const handleLinkingError = useCallback((card) => {
    setCardIdToBeDeleted(card?.id)
    dispatchModal(modalEnum.PAYMENT_CARD_LINKING_ERROR)
  }, [dispatchModal])

  const handleLinkingSuccess = useCallback(() => {
    dispatchModal(modalEnum.PAYMENT_CARD_LINKING_SUCCESS)
  }, [dispatchModal])

  const handleDeletePaymentCard = useCallback(async (card) => {
    setCardIdToBeDeleted(card.id)
    dispatchModal(modalEnum.PAYMENT_CARD_DELETE_FORM)
  }, [setCardIdToBeDeleted, dispatchModal])

  const handleCloseDeletePaymentCardForm = useCallback(() => {
    setCardIdToBeDeleted(null)
    dispatchModal(modalEnum.NO_MODAL)
  }, [dispatchModal])

  const handleCloseModal = useCallback(() => {
    dispatchModal(modalEnum.NO_MODAL)
  }, [dispatchModal])

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
  const shouldRenderOffersSection = () => {
    if (planOffers && membershipCard?.payment_cards?.length !== 0) {
      return <Offers planOffers={planOffers} />
    }
    return null
  }

  const shouldRenderModalOverlay = () => {
    if (modalToRender === modalEnum.PAYMENT_CARD_LINKING_ERROR) {
      return <LinkCardsErrorModal paymentCardId={cardIdToBeDeleted} onClose={handleCloseModal} />
    } else if (modalToRender === modalEnum.PAYMENT_CARD_LINKING_SUCCESS) {
      return <LinkCardsSuccessModal />
    } else if (modalToRender === modalEnum.PAYMENT_CARD_LIMIT) {
      return <PaymentCardLimitModal />
    } else if (modalToRender === modalEnum.PAYMENT_CARD_ADD_FORM) {
      return <PaymentCardAddForm onClose={handleCloseModal}/>
    } else if (modalToRender === modalEnum.PAYMENT_CARD_DELETE_FORM) {
      return (
        <PaymentCardDeleteForm
        paymentCardId={cardIdToBeDeleted}
        membershipCardId={id}
        onClose={ handleCloseDeletePaymentCardForm }
        />
      )
    }
    return null
  }

  const shouldRenderBackButton = () => {
    if (!Config.isMerchantChannel) {
      return <LeftChevronSvg className={styles['root__left-arrow']} onClick={() => history.replace('/membership-cards')} />
    }
    return null
  }

  // Membership card active path
  return (
    <>
      { membershipCard && (
        <>
          {/* Render the various overlay modals  */}
          {shouldRenderModalOverlay()}

          <div className={styles.root__header}>
            <AccountMenu />
            {shouldRenderBackButton()}
          </div>

          <MembershipCardContainer membershipCard={membershipCard} />
          {shouldRenderVoucherSection()}
          {shouldRenderOffersSection()}

          <PaymentCards
            handleLinkingSuccess={handleLinkingSuccess}
            handleLinkingError={handleLinkingError}
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
