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
  ACCOUNT_MENU_MODAL_REQUESTED: 'modals/ACCOUNT_MENU_MODAL_REQUESTED',
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
  accountMenuModalRequested: false,
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
    case types.ACCOUNT_MENU_MODAL_REQUESTED:
      return {
        ...state,
        accountMenuModalRequested: true,
      }
    case types.MODALS_CLOSED:
      return initialState
    default:
      return state
  }
}

export default reducer

const modalSelector = state => state.modals

export const selectors = {
  shouldPaymentCardLimitModalRender: createSelector(
    modalSelector,
    (modals) => modals?.paymentCardLimitModalRequested,
  ),
  shouldPaymentCardAddFormModalRender: createSelector(
    modalSelector,
    (modals) => modals?.paymentCardAddFormModalRequested,
  ),
  shouldPaymentCardDeleteFormModalRender: createSelector(
    modalSelector,
    (modals) => modals?.paymentCardDeleteFormModalRequested,
  ),
  shouldPaymentCardLinkingSuccessModalRender: createSelector(
    modalSelector,
    (modals) => modals?.paymentCardLinkingSuccessModalRequested,
  ),
  shouldPaymentCardLinkingErrorModalRender: createSelector(
    modalSelector,
    (modals) => modals?.paymentCardLinkingErrorModalRequested,
  ),
  shouldMembershipCardHeroModalRender: createSelector(
    modalSelector,
    (modals) => modals?.membershipCardHeroModalRequested,
  ),
  shouldMembershipCardTransactionsModalRender: createSelector(
    modalSelector,
    (modals) => modals?.membershipCardTransactionsModalRequested,
  ),
  shouldMembershipCardNoTransactionsModalRender: createSelector(
    modalSelector,
    (modals) => modals?.membershipCardNoTransactionsModalRequested,
  ),
  shouldMembershipCardNoRewardsModalRender: createSelector(
    modalSelector,
    (modals) => modals?.membershipCardNoRewardsModalRequested,
  ),
  shouldMembershipCardNonActiveVouchersModalRender: createSelector(
    modalSelector,
    (modals) => modals?.membershipCardNonActiveVouchersModalRequested,
  ),
  shouldMembershipCardDeleteModalRender: createSelector(
    modalSelector,
    (modals) => modals?.membershipCardDeleteModalRequested,
  ),
  shouldVoucherModalRender: createSelector(
    modalSelector,
    (modals) => modals?.voucherModalRequested,
  ),
  shouldAccountMenuModalRender: createSelector(
    modalSelector,
    (modals) => modals?.accountMenuModalRequested,
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
  requestAccountMenuModal: () => dispatch => {
    dispatch({ type: types.ACCOUNT_MENU_MODAL_REQUESTED })
  },
  requestModalsClosed: () => dispatch => {
    dispatch({ type: types.MODALS_CLOSED })
  },
}
