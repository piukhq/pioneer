import { useDispatch, useSelector } from 'react-redux'
import { actions as modalActions, selectors as modalSelectors } from 'ducks/modals'

export const useModals = () => {
  const dispatch = useDispatch()

  // actions to set modal state
  const closeModals = () => dispatch(modalActions.requestModalsClosed())
  const requestPaymentCardLimitModal = () => dispatch(modalActions.requestPaymentCardLimitModal())
  const requestPaymentCardAddFormModal = () => dispatch(modalActions.requestPaymentCardAddFormModal())
  const requestPaymentCardDeleteFormModal = () => dispatch(modalActions.requestPaymentCardDeleteFormModal())
  const requestPaymentCardLinkingSuccessModal = () => dispatch(modalActions.requestPaymentCardLinkingSuccessModal())
  const requestPaymentCardLinkingErrorModal = () => dispatch(modalActions.requestPaymentCardLinkingErrorModal())
  const requestMembershipCardHeroModal = () => dispatch(modalActions.requestMembershipCardHeroModal())
  const requestMembershipCardTransactionsModal = () => dispatch(modalActions.requestMembershipCardTransactionsModal())
  const requestMembershipCardNoTransactionsModal = () => dispatch(modalActions.requestMembershipCardNoTransactionsModal())
  const requestMembershipCardNoRewardsModal = () => dispatch(modalActions.requestMembershipCardNoRewardsModal())
  const requestMembershipCardNonActiveVouchersModal = () => dispatch(modalActions.requestMembershipCardNonActiveVouchersModal())
  const requestMembershipCardDeleteModal = () => dispatch(modalActions.requestMembershipCardDeleteModal())
  const requestVoucherModal = () => dispatch(modalActions.requestVoucherModal())
  const requestAccountMenuModal = () => dispatch(modalActions.requestAccountMenuModal())

  // selectors to get modal state

  const shouldPaymentCardLimitModalRender = useSelector(state => modalSelectors.shouldPaymentCardLimitModalRender(state))
  const shouldPaymentCardAddFormModalRender = useSelector(state => modalSelectors.shouldPaymentCardAddFormModalRender(state))
  const shouldPaymentCardDeleteFormModalRender = useSelector(state => modalSelectors.shouldPaymentCardDeleteFormModalRender(state))
  const shouldPaymentCardLinkingSuccessModalRender = useSelector(state => modalSelectors.shouldPaymentCardLinkingSuccessModalRender(state))
  const shouldPaymentCardLinkingErrorModalRender = useSelector(state => modalSelectors.shouldPaymentCardLinkingErrorModalRequested(state))
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
