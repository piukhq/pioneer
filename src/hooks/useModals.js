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

  // selectors to get modal state

  const isPaymentCardLimitModalRequested = useSelector(state => modalSelectors.isPaymentCardLimitModalRequested(state))
  const isPaymentCardAddFormRequested = useSelector(state => modalSelectors.isPaymentCardAddFormModalRequested(state))
  const isPaymentCardDeleteFormRequested = useSelector(state => modalSelectors.isPaymentCardDeleteFormModalRequested(state))
  const isPaymentCardLinkingSuccessModalRequested = useSelector(state => modalSelectors.isPaymentCardLinkingSuccessModalRequested(state))
  const isPaymentCardLinkingErrorModalRequested = useSelector(state => modalSelectors.isPaymentCardLinkingErrorModalRequested(state))
  const isMembershipCardHeroModalRequested = useSelector(state => modalSelectors.isMembershipCardHeroModalRequested(state))
  const isMembershipCardTransactionsModalRequested = useSelector(state => modalSelectors.isMembershipCardTransactionsModalRequested(state))
  const isMembershipCardNoTransactionsModalRequested = useSelector(state => modalSelectors.isMembershipCardNoTransactionsModalRequested(state))
  const isMembershipCardNoRewardsModalRequested = useSelector(state => modalSelectors.isMembershipCardNoRewardsModalRequested(state))
  const isMembershipCardNonActiveVouchersModalRequested = useSelector(state => modalSelectors.isMembershipCardNonActiveVouchersModalRequested(state))
  const isMembershipCardDeleteModalRequested = useSelector(state => modalSelectors.isMembershipCardDeleteModalRequested(state))
  const isVoucherModalRequested = useSelector(state => modalSelectors.isVoucherModalRequested(state))

  return {
    closeModals,
    requestPaymentCardLimitModal,
    isPaymentCardLimitModalRequested,
    requestPaymentCardAddFormModal,
    isPaymentCardAddFormRequested,
    requestPaymentCardDeleteFormModal,
    isPaymentCardDeleteFormRequested,
    requestPaymentCardLinkingSuccessModal,
    isPaymentCardLinkingSuccessModalRequested,
    requestPaymentCardLinkingErrorModal,
    isPaymentCardLinkingErrorModalRequested,
    requestMembershipCardHeroModal,
    isMembershipCardHeroModalRequested,
    requestMembershipCardTransactionsModal,
    isMembershipCardTransactionsModalRequested,
    requestMembershipCardNoTransactionsModal,
    isMembershipCardNoTransactionsModalRequested,
    requestMembershipCardNoRewardsModal,
    isMembershipCardNoRewardsModalRequested,
    requestMembershipCardNonActiveVouchersModal,
    isMembershipCardNonActiveVouchersModalRequested,
    requestMembershipCardDeleteModal,
    isMembershipCardDeleteModalRequested,
    requestVoucherModal,
    isVoucherModalRequested,
  }
}
