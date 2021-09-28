import { useDispatch, useSelector } from 'react-redux'
import { actions as modalActions, selectors as modalSelectors } from 'ducks/modals'

export const useModals = () => {
  const dispatch = useDispatch()

  // configure action to set modal state
  const closeModals = () => dispatch(modalActions.requestModalsClosed())
  const requestPaymentCardLimitModal = () => dispatch(modalActions.requestModal('PAYMENT_CARD_LIMIT'))
  const requestPaymentCardAddFormModal = () => dispatch(modalActions.requestModal('PAYMENT_CARD_ADD_FORM'))
  const requestPaymentCardDeleteFormModal = () => dispatch(modalActions.requestModal('PAYMENT_CARD_DELETE_FORM'))
  const requestPaymentCardLinkingSuccessModal = () => dispatch(modalActions.requestModal('PAYMENT_CARD_LINKING_SUCCESS'))
  const requestPaymentCardLinkingErrorModal = () => dispatch(modalActions.requestModal('PAYMENT_CARD_LINKING_FAILURE'))
  const requestMembershipCardHeroModal = () => dispatch(modalActions.requestModal('MEMBERSHIP_CARD_HERO'))
  const requestMembershipCardTransactionsModal = () => dispatch(modalActions.requestModal('MEMBERSHIP_CARD_TRANSACTIONS'))
  const requestMembershipCardNoTransactionsModal = () => dispatch(modalActions.requestModal('MEMBERSHIP_CARD_NO_TRANSACTIONS'))
  const requestMembershipCardNoRewardsModal = () => dispatch(modalActions.requestModal('MEMBERSHIP_CARD_NO_REWARDS'))
  const requestMembershipCardNonActiveVouchersModal = () => dispatch(modalActions.requestModal('MEMBERSHIP_CARD_NON_ACTIVE_VOUCHERS'))
  const requestMembershipCardDeleteModal = () => dispatch(modalActions.requestModal('MEMBERSHIP_CARD_DELETE'))
  const requestVoucherModal = () => dispatch(modalActions.requestModal('VOUCHER'))
  const requestAccountMenuModal = () => dispatch(modalActions.requestModal('ACCOUNT_MENU'))

  // selectors to get modal state

  const shouldPaymentCardLimitModalRender = useSelector(state => modalSelectors.shouldPaymentCardLimitModalRender(state))
  const shouldPaymentCardAddFormModalRender = useSelector(state => modalSelectors.shouldPaymentCardAddFormModalRender(state))
  const shouldPaymentCardDeleteFormModalRender = useSelector(state => modalSelectors.shouldPaymentCardDeleteFormModalRender(state))
  const shouldPaymentCardLinkingSuccessModalRender = useSelector(state => modalSelectors.shouldPaymentCardLinkingSuccessModalRender(state))
  const shouldPaymentCardLinkingErrorModalRender = useSelector(state => modalSelectors.shouldPaymentCardLinkingErrorModalRender(state))
  const shouldMembershipCardHeroModalRender = useSelector(state => modalSelectors.shouldMembershipCardHeroModalRender(state))
  const shouldMembershipCardTransactionsModalRender = useSelector(state => modalSelectors.shouldMembershipCardTransactionsModalRender(state))
  const shouldMembershipCardNoTransactionsModalRender = useSelector(state => modalSelectors.shouldMembershipCardNoTransactionsModalRender(state))
  const shouldMembershipCardNoRewardsModalRender = useSelector(state => modalSelectors.shouldMembershipCardNoRewardsModalRender(state))
  const shouldMembershipCardNonActiveVouchersModalRender = useSelector(state => modalSelectors.shouldMembershipCardNonActiveVouchersModalRender(state))
  const shouldMembershipCardDeleteModalRender = useSelector(state => modalSelectors.shouldMembershipCardDeleteModalRender(state))
  const shouldVoucherModalRender = useSelector(state => modalSelectors.shouldVoucherModalRender(state))
  const shouldAccountMenuModalRender = useSelector(state => modalSelectors.shouldAccountMenuModalRender(state))

  return {
    closeModals,
    requestPaymentCardLimitModal,
    shouldPaymentCardLimitModalRender,
    requestPaymentCardAddFormModal,
    shouldPaymentCardAddFormModalRender,
    requestPaymentCardDeleteFormModal,
    shouldPaymentCardDeleteFormModalRender,
    requestPaymentCardLinkingSuccessModal,
    shouldPaymentCardLinkingSuccessModalRender,
    requestPaymentCardLinkingErrorModal,
    shouldPaymentCardLinkingErrorModalRender,
    requestMembershipCardHeroModal,
    shouldMembershipCardHeroModalRender,
    requestMembershipCardTransactionsModal,
    shouldMembershipCardTransactionsModalRender,
    requestMembershipCardNoTransactionsModal,
    shouldMembershipCardNoTransactionsModalRender,
    requestMembershipCardNoRewardsModal,
    shouldMembershipCardNoRewardsModalRender,
    requestMembershipCardNonActiveVouchersModal,
    shouldMembershipCardNonActiveVouchersModalRender,
    requestMembershipCardDeleteModal,
    shouldMembershipCardDeleteModalRender,
    requestVoucherModal,
    shouldVoucherModalRender,
    requestAccountMenuModal,
    shouldAccountMenuModalRender,
  }
}
