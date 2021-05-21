import * as api from 'api/membershipCards'
import { createSelector } from 'reselect'
import {
  selectors as paymentCardsSelectors,
  actions as paymentCardsActions,
} from 'ducks/paymentCards'
import { actions as serviceActions } from 'ducks/service'
import { serializeError } from 'serialize-error'

import { isPaymentCardExpired } from 'utils/paymentCards'

export const types = {
  MEMBERSHIP_CARDS_REQUEST: 'membershipCards/MEMBERSHIP_CARDS_REQUEST',
  MEMBERSHIP_CARDS_SUCCESS: 'membershipCards/MEMBERSHIP_CARDS_SUCCESS',
  MEMBERSHIP_CARDS_FAILURE: 'membershipCards/MEMBERSHIP_CARDS_FAILURE',

  DELETE_MEMBERSHIP_CARD_REQUEST: 'paymentCards/DELETE_MEMBERSHIP_CARD_REQUEST',
  DELETE_MEMBERSHIP_CARD_SUCCESS: 'paymentCards/DELETE_MEMBERSHIP_CARD_SUCCESS',
  DELETE_MEMBERSHIP_CARD_FAILURE: 'paymentCards/DELETE_MEMBERSHIP_CARD_FAILURE',
  DELETE_MEMBERSHIP_CARD_RESET_SUCCESS_STATUS: 'paymentCards/DELETE_MEMBERSHIP_CARD_RESET_SUCCESS_STATUS',

  ADD_MEMBERSHIP_CARD_REQUEST: 'paymentCards/ADD_MEMBERSHIP_CARD_REQUEST',
  ADD_MEMBERSHIP_CARD_SUCCESS: 'paymentCards/ADD_MEMBERSHIP_CARD_SUCCESS',
  ADD_MEMBERSHIP_CARD_FAILURE: 'paymentCards/ADD_MEMBERSHIP_CARD_FAILURE',
  ADD_MEMBERSHIP_CARD_RESET_SUCCESS_STATUS: 'paymentCards/ADD_MEMBERSHIP_CARD_RESET_SUCCESS_STATUS',

  LINK_PAYMENT_CARD_REQUEST: 'paymentCards/LINK_PAYMENT_CARD_REQUEST',
  LINK_PAYMENT_CARD_SUCCESS: 'paymentCards/LINK_PAYMENT_CARD_SUCCESS',
  LINK_PAYMENT_CARD_FAILURE: 'paymentCards/LINK_PAYMENT_CARD_FAILURE',
  LINK_PAYMENT_CARD_RESET_SUCCESS_STATUS: 'paymentCards/LINK_PAYMENT_CARD_RESET_SUCCESS_STATUS',
}

const initialState = {
  loading: false,
  error: false,
  success: false,
  cards: {},
  delete: {
    loading: false,
    error: false,
    success: false,
  },
  add: {
    loading: false,
    error: false,
    success: false,
  },
  linkPaymentCard: {
    loading: false,
    error: false,
    success: false,
  },
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.MEMBERSHIP_CARDS_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
      }
    case types.MEMBERSHIP_CARDS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        success: true,
        cards: action.payload.reduce((acc, card) => { acc[card.id] = card; return acc }, {}),
      }
    case types.MEMBERSHIP_CARDS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        success: false,
        cards: {},
      }
    case types.DELETE_MEMBERSHIP_CARD_REQUEST:
      return {
        ...state,
        delete: {
          loading: true,
          error: false,
          success: false,
        },
      }
    case types.DELETE_MEMBERSHIP_CARD_SUCCESS:
      return {
        ...state,
        delete: {
          loading: false,
          error: false,
          success: true,
        },
      }
    case types.DELETE_MEMBERSHIP_CARD_FAILURE:
      return {
        ...state,
        delete: {
          loading: false,
          error: action.payload,
          success: false,
        },
      }
    case types.DELETE_MEMBERSHIP_CARD_RESET_SUCCESS_STATUS:
      return {
        ...state,
        delete: {
          loading: false,
          error: false,
          success: false,
        },
      }
    case types.ADD_MEMBERSHIP_CARD_REQUEST:
      return {
        ...state,
        add: {
          card: null,
          loading: true,
          error: false,
          success: false,
        },
      }
    case types.ADD_MEMBERSHIP_CARD_SUCCESS:
      return {
        ...state,
        add: {
          card: action.payload,
          loading: false,
          error: false,
          success: true,
        },
      }
    case types.ADD_MEMBERSHIP_CARD_FAILURE:
      return {
        ...state,
        add: {
          card: null,
          loading: false,
          error: action.payload,
          success: false,
        },
      }
    case types.ADD_MEMBERSHIP_CARD_RESET_SUCCESS_STATUS:
      return {
        ...state,
        add: {
          ...state.add,
          loading: false,
          error: false,
          success: false,
        },
      }
    case types.LINK_PAYMENT_CARD_REQUEST:
      return {
        ...state,
        linkPaymentCard: {
          card: null,
          loading: true,
          error: false,
          success: false,
        },
      }
    case types.LINK_PAYMENT_CARD_SUCCESS:
      return {
        ...state,
        linkPaymentCard: {
          card: action.payload,
          loading: false,
          error: false,
          success: true,
        },
      }
    case types.LINK_PAYMENT_CARD_FAILURE:
      return {
        ...state,
        linkPaymentCard: {
          card: null,
          loading: false,
          error: action.payload,
          success: false,
        },
      }
    case types.LINK_PAYMENT_CARD_RESET_SUCCESS_STATUS:
      return {
        ...state,
        linkPaymentCard: {
          ...state.add,
          loading: false,
          error: false,
          success: false,
        },
      }
    default:
      return state
  }
}
export default reducer

const membershipCardsSelector = state => state.membershipCards.cards
const membershipCardsListSelector = state => selectors.cardsList(state)
const membershipCardSelector = (state, id) => state.membershipCards.cards[id]
const membershipPlansSelector = state => state.membershipPlans.plans
const paymentCardsListSelector = state => paymentCardsSelectors.cardsList(state)
const newlyAddedCardIdSelector = state => state.paymentCards?.add?.card?.id

export const selectors = {
  cardsList: createSelector(
    membershipCardsSelector,
    cardsObject => Object.keys(cardsObject || {}).map(cardId => cardsObject[cardId]),
  ),
  isReenrolRequired: createSelector(
    membershipCardsListSelector,
    (membershipCardsArray) => {
      const membershipCardReasonCode = membershipCardsArray?.[0]?.status?.reason_codes?.[0]
      const reenrolCodes = ['X101', 'X201']
      return (reenrolCodes.includes(membershipCardReasonCode) && Config.isMerchantChannel)
    },
  ),
  isReaddRequired: createSelector(
    membershipCardsListSelector,
    (membershipCardsArray) => {
      const membershipCardReasonCode = membershipCardsArray?.[0]?.status?.reason_codes?.[0]
      const readdCodes = ['X102', 'X104', 'X202', 'X302', 'X303', 'X304']
      return (readdCodes.includes(membershipCardReasonCode) && Config.isMerchantChannel)
    },
  ),

  unlinkedPaymentCards: createSelector(
    membershipCardSelector,
    paymentCardsListSelector,
    (membershipCard, allPaymentCardsList) => {
      if (!membershipCard) {
        return []
      }
      const linkedPaymentCardsIds = (
        membershipCard.payment_cards
          .filter(paymentCard => paymentCard.active_link)
          .map(paymentCard => paymentCard.id)
      )
      return allPaymentCardsList
        .filter(paymentCard => linkedPaymentCardsIds.indexOf(paymentCard.id) === -1 || isPaymentCardExpired(paymentCard))
    },
  ),
  newlyPendingPaymentCard: createSelector(
    paymentCardsListSelector,
    newlyAddedCardIdSelector,
    (allPaymentCardsList, newlyAddedCardId) => {
      return allPaymentCardsList.filter(paymentCard => paymentCard.id === newlyAddedCardId)[0]
    },
  ),
  linkedPaymentCards: createSelector(
    membershipCardSelector,
    paymentCardsListSelector,
    (membershipCard, allPaymentCardsList) => {
      if (!membershipCard) {
        return []
      }
      const linkedPaymentCards = (
        membershipCard.payment_cards
          .filter(paymentCard => paymentCard.active_link)
          .map(paymentCard => paymentCard)
      )
      return linkedPaymentCards.filter(linkedCard => allPaymentCardsList.some(card => linkedCard.id === card.id && !isPaymentCardExpired(card)))
    },
  ),
  activeVouchers: createSelector(
    membershipCardSelector,
    membershipCard => membershipCard?.vouchers?.filter(voucher => ['inprogress', 'issued'].indexOf(voucher.state) !== -1),
  ),
  currency: createSelector(
    membershipCardSelector,
    membershipCard => membershipCard?.balances?.[0]?.currency,
  ),
  nonActiveVouchers: createSelector(
    membershipCardSelector,
    membershipCard => membershipCard?.vouchers
      ?.filter(voucher => ['redeemed', 'expired', 'cancelled'].indexOf(voucher.state) !== -1)
      ?.sort((voucher1, voucher2) => voucher2.expiry_date - voucher1.expiry_date),
  ),
  plan: createSelector(
    membershipCardSelector,
    membershipPlansSelector,
    (membershipCard, membershipPlans) => membershipPlans[membershipCard?.membership_plan],
  ),
}

export const actions = {
  getMembershipCardsRequest: () => ({ type: types.MEMBERSHIP_CARDS_REQUEST }),
  getMembershipCardsFailure: () => ({ type: types.MEMBERSHIP_CARDS_FAILURE }),
  getMembershipCardsSuccess: (payload) => ({ type: types.MEMBERSHIP_CARDS_SUCCESS, payload }),
  getMembershipCards: () => async dispatch => {
    dispatch(actions.getMembershipCardsRequest())
    try {
      const response = await api.getMembershipCards()
      dispatch(actions.getMembershipCardsSuccess(response.data))
    } catch (e) {
      dispatch(actions.getMembershipCardsFailure())
    }
  },

  deleteMembershipCardRequest: () => ({ type: types.DELETE_MEMBERSHIP_CARD_REQUEST }),
  deleteMembershipCardFailure: (error) => ({ type: types.DELETE_MEMBERSHIP_CARD_FAILURE, payload: serializeError(error) }),
  deleteMembershipCardSuccess: () => ({ type: types.DELETE_MEMBERSHIP_CARD_SUCCESS }),
  deleteMembershipCardResetSuccessStatus: () => ({ type: types.DELETE_MEMBERSHIP_CARD_RESET_SUCCESS_STATUS }),
  deleteMembershipCard: (id) => async (dispatch) => {
    dispatch(actions.deleteMembershipCardRequest())
    try {
      await api.deleteMembershipCard(id)
      dispatch(actions.deleteMembershipCardSuccess())
      // refresh payment and membership cards
      dispatch(paymentCardsActions.getPaymentCards())
      dispatch(actions.getMembershipCards())
    } catch (e) {
      dispatch(actions.deleteMembershipCardFailure(e))
    }
  },
  deleteAllMerchantMembershipCards: () => async (dispatch, getState) => {
    const state = getState()
    const membershipCardsArray = selectors.cardsList(state)
    for (const index in membershipCardsArray) {
      await dispatch(actions.deleteMembershipCard(membershipCardsArray[index].id))
    }
    dispatch(paymentCardsActions.getPaymentCards())
    await dispatch(actions.getMembershipCards())
  },
  addMembershipCardRequest: () => ({ type: types.ADD_MEMBERSHIP_CARD_REQUEST }),
  addMembershipCardFailure: (error) => ({ type: types.ADD_MEMBERSHIP_CARD_FAILURE, payload: serializeError(error) }),
  addMembershipCardSuccess: (payload) => ({ type: types.ADD_MEMBERSHIP_CARD_SUCCESS, payload }),
  addMembershipCardResetSuccessStatus: () => ({ type: types.ADD_MEMBERSHIP_CARD_RESET_SUCCESS_STATUS }),
  addMembershipCard: (accountData, planId) => async (dispatch) => {
    dispatch(actions.addMembershipCardRequest())
    try {
      const response = await api.addMembershipCard(accountData, planId)
      dispatch(actions.addMembershipCardSuccess(response.data))
      // refresh payment and membership cards
      dispatch(paymentCardsActions.getPaymentCards())
      dispatch(actions.getMembershipCards())
    } catch (e) {
      dispatch(actions.addMembershipCardFailure(e))
    }
  },
  addMembershipCardOnMerchantChannel: (accountData, planId) => async (dispatch, getState) => {
    dispatch(actions.addMembershipCardRequest())
    try {
      if (Config.isMerchantChannel) {
        await dispatch(actions.deleteAllMerchantMembershipCards())
      }
      const state = getState()
      const membershipCards = selectors.cardsList(state)
      if (membershipCards.length > 0) {
        throw new Error('Failed to delete prior membership cards')
      }
      await dispatch(serviceActions.postService())
      if (!getState().service.post.success) {
        throw new Error('Failed to post to /service')
      }
      const response = await api.addMembershipCard(accountData, planId)
      dispatch(actions.addMembershipCardSuccess(response.data))
      // refresh payment and membership cards
      dispatch(paymentCardsActions.getPaymentCards())
      dispatch(actions.getMembershipCards())
    } catch (e) {
      dispatch(actions.addMembershipCardFailure(e))
    }
  },

  linkPaymentCardRequest: () => ({ type: types.LINK_PAYMENT_CARD_REQUEST }),
  linkPaymentCardFailure: (error) => ({ type: types.LINK_PAYMENT_CARD_FAILURE, payload: serializeError(error) }),
  linkPaymentCardSuccess: (payload) => ({ type: types.LINK_PAYMENT_CARD_SUCCESS, payload }),
  linkPaymentCardResetSuccessStatus: () => ({ type: types.LINK_PAYMENT_CARD_RESET_SUCCESS_STATUS }),
  linkPaymentCard: (paymentCardId, membershipCardId) => async (dispatch) => {
    dispatch(actions.linkPaymentCardRequest())
    try {
      const response = await api.linkPaymentCard(paymentCardId, membershipCardId)
      dispatch(actions.linkPaymentCardSuccess(response.data))
      // refresh payment and membership cards
      dispatch(paymentCardsActions.getPaymentCards())
      dispatch(actions.getMembershipCards())
    } catch (e) {
      dispatch(actions.linkPaymentCardFailure(e))
    }
  },

  // todo: temporarily introduced
  unLinkPaymentCard: (paymentCardId, membershipCardId) => async (dispatch) => {
    // dispatch(actions.linkPaymentCardRequest())
    try {
      await api.unLinkPaymentCard(paymentCardId, membershipCardId)
      // const response = await api.unLinkPaymentCard(paymentCardId, membershipCardId)
      // dispatch(actions.linkPaymentCardSuccess(response.data))
      // refresh payment and membership cards
      dispatch(paymentCardsActions.getPaymentCards())
      dispatch(actions.getMembershipCards())
    } catch (e) {
      // dispatch(actions.linkPaymentCardFailure(e))
    }
  },
}
