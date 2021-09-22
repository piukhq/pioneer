import { createSelector } from 'reselect'

export const types = {
  PAYMENT_CARD_LIMIT_MODAL_REQUESTED: 'modals/PAYMENT_LIMIT_MODAL_REQUESTED',
  PAYMENT_CARD_ADD_FORM_MODAL_REQUESTED: 'modals/PAYMENT_ADD_FORM_MODAL_REQUESTED',
  PAYMENT_CARD_DELETE_FORM_MODAL_REQUESTED: 'modal/PAYMENT_DELETE_FORM_MODAL_REQUESTED',
  PAYMENT_CARD_LINKING_SUCCESS_MODAL_REQUESTED: 'modals/PAYMENT_CARD_LINKING_SUCCESS_MODAL_REQUESTED',
  PAYMENT_CARD_LINKING_ERROR_MODAL_REQUESTED: 'modals/PAYMENT_CARD_LINKING_ERROR_MODAL_REQUESTED',
  MEMBERSHIP_CARD_HERO_MODAL_REQUESTED: 'modals/MEMBERSHIP_CARD_HERO_MODAL_REQUESTED',
  MEMBERSHIP_CARD_TRANSACTIONS_MODAL_REQUESTED: 'modals/MEMBERSHIP_CARD_TRANSACTIONS_MODAL_REQUESTED',
  MEMBERSHIP_CARD_NO_TRANSACTIONS_MODAL_REQUESTED: 'modals/MEMBERSHIP_CARD_NO_TRANSACTIONS_MODAL_REQUESTED',
  MEMBERSHIP_CARD_NO_REWARDS_MODAL_REQUESTED: 'modals/MEMBERSHIP_CARD_NO_REWARDS_MODAL_REQUESTED',
  MEMBERSHIP_CARD_NON_ACTIVE_VOUCHERS_MODAL_REQUESTED: 'modals/MEMBERSHIP_CARD_NON_ACTIVE_VOUCHERS_MODAL_REQUESTED',
  MEMBERSHIP_CARD_DELETE_MODAL_REQUESTED: 'modals/MEMBERSHIP_CARD_DELETE_MODAL_REQUESTED',
  VOUCHER_MODAL_REQUESTED: 'modals/VOUCHER_MODAL_REQUESTED',
  MODALS_CLOSED: 'modals/MODALS_CLOSED',
}

const initialState = {
  paymentCardLimitModalRequested: false,
  paymentCardAddFormModalRequested: false,
  paymentCardDeleteFormModalRequested: false,
  paymentCardLinkingSuccessModalRequested: false,
  paymentCardLinkingErrorModalRequested: false,
  membershipCardHeroModalRequested: false,
  membershipCardTransactionsModalRequested: false,
  membershipCardNoTransactionsModalRequested: false,
  membershipCardNoRewardsModalRequested: false,
  membershipCardNonActiveVouchersModalRequested: false,
  membershipCardDeleteModalRequested: false,
  voucherModalRequested: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PAYMENT_CARD_LIMIT_MODAL_REQUESTED:
      return {
        ...state,
        paymentCardLimitModalRequested: true,
      }
    case types.PAYMENT_CARD_ADD_FORM_MODAL_REQUESTED:
      return {
        ...state,
        paymentCardAddFormModalRequested: true,
      }
    case types.PAYMENT_CARD_DELETE_FORM_MODAL_REQUESTED:
      return {
        ...state,
        paymentCardDeleteFormModalRequested: true,
      }
    case types.PAYMENT_CARD_LINKING_SUCCESS_MODAL_REQUESTED:
      return {
        ...state,
        paymentCardLinkingSuccessModalRequested: true,
      }
    case types.PAYMENT_CARD_LINKING_ERROR_MODAL_REQUESTED:
      return {
        ...state,
        paymentCardLinkingErrorModalRequested: true,
      }
    case types.MEMBERSHIP_CARD_HERO_MODAL_REQUESTED:
      return {
        ...state,
        membershipCardHeroModalRequested: true,
      }
    case types.MEMBERSHIP_CARD_TRANSACTIONS_MODAL_REQUESTED:
      return {
        ...state,
        membershipCardTransactionsModalRequested: true,
      }
    case types.MEMBERSHIP_CARD_NO_TRANSACTIONS_MODAL_REQUESTED:
      return {
        ...state,
        membershipCardNoTransactionsModalRequested: true,
      }
    case types.MEMBERSHIP_CARD_NO_REWARDS_MODAL_REQUESTED:
      return {
        ...state,
        membershipCardNoRewardsModalRequested: true,
      }
    case types.MEMBERSHIP_CARD_NON_ACTIVE_VOUCHERS_MODAL_REQUESTED:
      return {
        ...state,
        membershipCardNonActiveVouchersModalRequested: true,
      }
    case types.MEMBERSHIP_CARD_DELETE_MODAL_REQUESTED:
      return {
        ...state,
        membershipCardDeleteModalRequested: true,
      }
    case types.VOUCHER_MODAL_REQUESTED:
      return {
        ...state,
        voucherModalRequested: true,
      }
    case types.MODALS_CLOSED:
      return initialState
    default:
      return state
  }
}

export default reducer

const modalSelector = state => state?.modals

export const selectors = {
  isAnyModalRequested: createSelector(
    modalSelector,
    (modals) => modals?.some(modal => true), // TODO: Is some ok?
  ),
  isPaymentCardLimitModalRequested: createSelector(
    modalSelector,
    (modals) => modals?.paymentCardLimitModalRequested,
  ),
  isPaymentCardAddFormModalRequested: createSelector(
    modalSelector,
    (modals) => modals?.paymentCardAddFormModalRequested,
  ),
  isPaymentCardDeleteFormModalRequested: createSelector(
    modalSelector,
    (modals) => modals?.paymentCardDeleteFormModalRequested,
  ),
  isPaymentCardLinkingSuccessModalRequested: createSelector(
    modalSelector,
    (modals) => modals?.paymentCardLinkingSuccessModalRequested,
  ),
  isPaymentCardLinkingErrorModalRequested: createSelector(
    modalSelector,
    (modals) => modals?.paymentCardLinkingErrorModalRequested,
  ),
  isMembershipCardHeroModalRequested: createSelector(
    modalSelector,
    (modals) => modals?.membershipCardHeroModalRequested,
  ),
  isMembershipCardTransactionsModalRequested: createSelector(
    modalSelector,
    (modals) => modals?.membershipCardTransactionsModalRequested,
  ),
  isMembershipCardNoTransactionsModalRequested: createSelector(
    modalSelector,
    (modals) => modals?.membershipCardNoTransactionsModalRequested,
  ),
  isMembershipCardNoRewardsModalRequested: createSelector(
    modalSelector,
    (modals) => modals?.membershipCardNoRewardsModalRequested,
  ),
  isMembershipCardNonActiveVouchersModalRequested: createSelector(
    modalSelector,
    (modals) => modals?.membershipCardNonActiveVouchersModalRequested,
  ),
  isMembershipCardDeleteModalRequested: createSelector(
    modalSelector,
    (modals) => modals?.membershipCardDeleteModalRequested,
  ),
  isVoucherModalRequested: createSelector(
    modalSelector,
    (modals) => modals?.voucherModalRequested,
  ),
}

export const actions = {
  requestPaymentCardLimitModal: () => dispatch => {
    dispatch({ type: types.PAYMENT_CARD_LIMIT_MODAL_REQUESTED })
  },
  requestPaymentCardAddFormModal: () => dispatch => {
    dispatch({ type: types.PAYMENT_CARD_ADD_FORM_MODAL_REQUESTED })
  },
  requestPaymentCardDeleteFormModal: () => dispatch => {
    dispatch({ type: types.PAYMENT_CARD_DELETE_FORM_MODAL_REQUESTED })
  },
  requestPaymentCardLinkingSuccessModal: () => dispatch => {
    dispatch({ type: types.PAYMENT_CARD_LINKING_SUCCESS_MODAL_REQUESTED })
  },
  requestPaymentCardLinkingErrorModal: () => dispatch => {
    dispatch({ type: types.PAYMENT_CARD_LINKING_ERROR_MODAL_REQUESTED })
  },
  requestMembershipCardHeroModal: () => dispatch => {
    dispatch({ type: types.MEMBERSHIP_CARD_HERO_MODAL_REQUESTED })
  },
  requestMembershipCardTransactionsModal: () => dispatch => {
    dispatch({ type: types.MEMBERSHIP_CARD_TRANSACTIONS_MODAL_REQUESTED })
  },
  requestMembershipCardNoTransactionsModal: () => dispatch => {
    dispatch({ type: types.MEMBERSHIP_CARD_NO_TRANSACTIONS_MODAL_REQUESTED })
  },
  requestMembershipCardNoRewardsModal: () => dispatch => {
    dispatch({ type: types.MEMBERSHIP_CARD_NO_REWARDS_MODAL_REQUESTED })
  },
  requestMembershipCardNonActiveVouchersModal: () => dispatch => {
    dispatch({ type: types.MEMBERSHIP_CARD_NON_ACTIVE_VOUCHERS_MODAL_REQUESTED })
  },
  requestMembershipCardDeleteModal: () => dispatch => {
    dispatch({ type: types.MEMBERSHIP_CARD_DELETE_MODAL_REQUESTED })
  },
  requestVoucherModal: () => dispatch => {
    dispatch({ type: types.VOUCHER_MODAL_REQUESTED })
  },
  requestModalsClosed: () => dispatch => {
    dispatch({ type: types.MODALS_CLOSED })
  },
}
