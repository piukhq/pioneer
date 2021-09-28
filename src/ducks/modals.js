import { createSelector } from 'reselect'
import { MODAL_ACTION_TYPES } from 'utils/enums'

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
    case MODAL_ACTION_TYPES.PAYMENT_CARD_LIMIT:
      return {
        ...state,
        paymentCardLimitModalRequested: true,
      }
    case MODAL_ACTION_TYPES.PAYMENT_CARD_ADD_FORM:
      return {
        ...state,
        paymentCardAddFormModalRequested: true,
      }
    case MODAL_ACTION_TYPES.PAYMENT_CARD_DELETE_FORM:
      return {
        ...state,
        paymentCardDeleteFormModalRequested: true,
      }
    case MODAL_ACTION_TYPES.PAYMENT_CARD_LINKING_SUCCESS:
      return {
        ...state,
        paymentCardLinkingSuccessModalRequested: true,
      }
    case MODAL_ACTION_TYPES.PAYMENT_CARD_LINKING_ERROR:
      return {
        ...state,
        paymentCardLinkingErrorModalRequested: true,
      }
    case MODAL_ACTION_TYPES.MEMBERSHIP_CARD_HERO:
      return {
        ...state,
        membershipCardHeroModalRequested: true,
      }
    case MODAL_ACTION_TYPES.MEMBERSHIP_CARD_TRANSACTIONS:
      return {
        ...state,
        membershipCardTransactionsModalRequested: true,
      }
    case MODAL_ACTION_TYPES.MEMBERSHIP_CARD_NO_TRANSACTIONS:
      return {
        ...state,
        membershipCardNoTransactionsModalRequested: true,
      }
    case MODAL_ACTION_TYPES.MEMBERSHIP_CARD_NO_REWARDS:
      return {
        ...state,
        membershipCardNoRewardsModalRequested: true,
      }
    case MODAL_ACTION_TYPES.MEMBERSHIP_CARD_NON_ACTIVE_VOUCHERS:
      return {
        ...state,
        membershipCardNonActiveVouchersModalRequested: true,
      }
    case MODAL_ACTION_TYPES.MEMBERSHIP_CARD_DELETE:
      return {
        ...state,
        membershipCardDeleteModalRequested: true,
      }
    case MODAL_ACTION_TYPES.VOUCHER:
      return {
        ...state,
        voucherModalRequested: true,
      }
    case MODAL_ACTION_TYPES.ACCOUNT_MENU:
      return {
        ...state,
        accountMenuModalRequested: true,
      }
    case MODAL_ACTION_TYPES.MODALS_CLOSED:
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
  requestModal: (type) => dispatch => {
    dispatch({ type })
  },
}
