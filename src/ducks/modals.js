import { createSelector } from 'reselect'

export const types = {
  PAYMENT_CARD_LIMIT_MODAL_VISIBLE: 'modals/PAYMENT_LIMIT_MODAL_VISIBLE',
  PAYMENT_CARD_ADD_FORM_MODAL_VISIBLE: 'modals/PAYMENT_ADD_FORM_MODAL_VISIBLE',
  PAYMENT_CARD_DELETE_FORM_MODAL_VISIBLE: 'modal/PAYMENT_DELETE_FORM_MODAL_VISIBLE',
  PAYMENT_CARD_LINKING_SUCCESS_MODAL_VISIBLE: 'modals/PAYMENT_CARD_LINKING_SUCCESS_MODAL_VISIBLE',
  PAYMENT_CARD_LINKING_ERROR_MODAL_VISIBLE: 'modals/PAYMENT_CARD_LINKING_ERROR_MODAL_VISIBLE',
  MEMBERSHIP_CARD_HERO_MODAL_VISIBLE: 'modals/MEMBERSHIP_CARD_HERO_MODAL_VISIBLE',
  MEMBERSHIP_CARD_TRANSACTIONS_MODAL_VISIBLE: 'modals/MEMBERSHIP_CARD_TRANSACTIONS_MODAL_VISIBLE',
  MEMBERSHIP_CARD_NO_TRANSACTIONS_MODAL_VISIBLE: 'modals/MEMBERSHIP_CARD_NO_TRANSACTIONS_MODAL_VISIBLE',
  MEMBERSHIP_CARD_NO_REWARDS_MODAL_VISIBLE: 'modals/MEMBERSHIP_CARD_NO_REWARDS_MODAL_VISIBLE',
  MEMBERSHIP_CARD_NON_ACTIVE_VOUCHERS_MODAL_VISIBLE: 'modals/MEMBERSHIP_CARD_NON_ACTIVE_VOUCHERS_MODAL_VISIBLE',
  MEMBERSHIP_CARD_DELETE_MODAL_VISIBLE: 'modals/MEMBERSHIP_CARD_DELETE_MODAL_VISIBLE',
  VOUCHER_MODAL_VISIBLE: 'modals/VOUCHER_MODAL_VISIBLE',
  MODALS_CLOSED: 'modals/MODALS_CLOSED',
}

const initialState = {
  paymentCardLimitModalVisible: false,
  paymentCardAddFormModalVisible: false,
  paymentCardDeleteFormModalVisible: false,
  paymentCardLinkingSuccessModalVisible: false,
  paymentCardLinkingErrorModalVisible: false,
  membershipCardHeroModalVisible: false,
  membershipCardTransactionsModalVisible: false,
  membershipCardNoTransactionsModalVisible: false,
  membershipCardNoRewardsModalVisible: false,
  membershipCardNonActiveVouchersModalVisible: false,
  membershipCardDeleteModalVisible: false,
  voucherModalVisible: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PAYMENT_CARD_LIMIT_MODAL_VISIBLE:
      return {
        ...state,
        paymentCardLimitModalVisible: true,
      }
    case types.PAYMENT_CARD_ADD_FORM_MODAL_VISIBLE:
      return {
        ...state,
        paymentCardAddFormModalVisible: true,
      }
    case types.PAYMENT_CARD_DELETE_FORM_MODAL_VISIBLE:
      return {
        ...state,
        paymentCardDeleteFormModalVisible: true,
      }
    case types.PAYMENT_CARD_LINKING_SUCCESS_FORM_MODAL_VISIBLE:
      return {
        ...state,
        paymentCardLinkingSuccessModalVisible: true,
      }
    case types.PAYMENT_CARD_LINKING_ERROR_FORM_MODAL_VISIBLE:
      return {
        ...state,
        paymentCardLinkingErrorModalVisible: true,
      }
    case types.MEMBERSHIP_CARD_HERO_MODAL_VISIBLE:
      return {
        ...state,
        membershipCardHeroModalVisible: true,
      }
    case types.MEMBERSHIP_CARD_TRANSACTIONS_MODAL_VISIBLE:
      return {
        ...state,
        membershipCardTransactionsModalVisible: true,
      }
    case types.MEMBERSHIP_CARD_NO_TRANSACTIONS_MODAL_VISIBLE:
      return {
        ...state,
        membershipCardNoTransactionsModalVisible: true,
      }
    case types.MEMBERSHIP_CARD_NO_REWARDS_MODAL_VISIBLE:
      return {
        ...state,
        membershipCardNoRewardsModalVisible: true,
      }
    case types.MEMBERSHIP_CARD_NON_ACTIVE_VOUCHERS_MODAL_VISIBLE:
      return {
        ...state,
        membershipCardNonActiveVouchersModalVisible: true,
      }
    case types.MEMBERSHIP_CARD_DELETE_MODAL_VISIBLE:
      return {
        ...state,
        membershipCardDeleteModalVisible: true,
      }
    case types.VOUCHER_MODAL_VISIBLE:
      return {
        ...state,
        voucherModalVisible: true,
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
  isAnyModalVisible: createSelector(
    modalSelector,
    (modals) => modals?.some(modal => true), // TODO: Is some ok?
  ),
  isPaymentCardLimitModalVisible: createSelector(
    modalSelector,
    (modals) => modals?.paymentCardLimitModalVisible,
  ),
  isPaymentCardAddFormModalVisible: createSelector(
    modalSelector,
    (modals) => modals?.paymentCardAddFormModalVisible,
  ),
  isPaymentCardDeleteFormModalVisible: createSelector(
    modalSelector,
    (modals) => modals?.paymentCardDeleteFormModalVisible,
  ),
  isPaymentCardLinkingSuccessModalVisible: createSelector(
    modalSelector,
    (modals) => modals?.paymentCardLinkingSuccessModalVisible,
  ),
  isPaymentCardLinkingErrorModalVisible: createSelector(
    modalSelector,
    (modals) => modals?.paymentCardLinkingErrorModalVisible,
  ),
  isMembershipCardHeroModalVisible: createSelector(
    modalSelector,
    (modals) => modals?.membershipCardHeroModalVisible,
  ),
  isMembershipCardTransactionsModalVisible: createSelector(
    modalSelector,
    (modals) => modals?.membershipCardTransactionsModalVisible,
  ),
  isMembershipCardNoTransactionsModalVisible: createSelector(
    modalSelector,
    (modals) => modals?.membershipCardNoTransactionsModalVisible,
  ),
  isMembershipCardNoRewardsModalVisible: createSelector(
    modalSelector,
    (modals) => modals?.membershipCardNoRewardsModalVisible,
  ),
  isMembershipCardNonActiveVouchersModalVisible: createSelector(
    modalSelector,
    (modals) => modals?.membershipCardNonActiveVouchersModalVisible,
  ),
  isMembershipCardDeleteModalVisible: createSelector(
    modalSelector,
    (modals) => modals?.membershipCardDeleteModalVisible,
  ),
  isVoucherModalVisible: createSelector(
    modalSelector,
    (modals) => modals?.voucherModalVisible,
  ),
}

export const actions = {
  setPaymentCardLimitModalVisible: () => dispatch => {
    dispatch({ type: types.PAYMENT_CARD_LIMIT_MODAL_VISIBLE })
  },
  setPaymentCardAddFormModalVisible: () => dispatch => {
    dispatch({ type: types.PAYMENT_CARD_ADD_FORM_MODAL_VISIBLE })
  },
  setPaymentCardDeleteFormModalVisible: () => dispatch => {
    dispatch({ type: types.PAYMENT_CARD_DELETE_FORM_MODAL_VISIBLE })
  },
  setPaymentCardLinkingSuccessModalVisible: () => dispatch => {
    dispatch({ type: types.PAYMENT_CARD_LINKING_SUCCESS_MODAL_VISIBLE })
  },
  setPaymentCardLinkingErrorModalVisible: () => dispatch => {
    dispatch({ type: types.PAYMENT_CARD_LINKING_ERROR_MODAL_VISIBLE })
  },
  setMembershipCardHeroModalVisible: () => dispatch => {
    dispatch({ type: types.MEMBERSHIP_CARD_HERO_MODAL_VISIBLE })
  },
  setMembershipCardTransactionsModalVisible: () => dispatch => {
    dispatch({ type: types.MEMBERSHIP_CARD_TRANSACTIONS_MODAL_VISIBLE })
  },
  setMembershipCardNoTransactionsModalVisible: () => dispatch => {
    dispatch({ type: types.MEMBERSHIP_CARD_NO_TRANSACTIONS_MODAL_VISIBLE })
  },
  setMembershipCardNoRewardsModalVisible: () => dispatch => {
    dispatch({ type: types.MEMBERSHIP_CARD_NO_REWARDS_MODAL_VISIBLE })
  },
  setMembershipCardNonActiveVouchersModalVisible: () => dispatch => {
    dispatch({ type: types.MEMBERSHIP_CARD_NON_ACTIVE_VOUCHERS_MODAL_VISIBLE })
  },
  setMembershipCardDeleteModalVisible: () => dispatch => {
    dispatch({ type: types.MEMBERSHIP_CARD_DELETE_MODAL_VISIBLE })
  },
  setVoucherModalVisible: () => dispatch => {
    dispatch({ type: types.VOUCHER_MODAL_VISIBLE })
  },
  setModalsClosed: () => dispatch => {
    dispatch({ type: types.MODALS_CLOSED })
  },
}
