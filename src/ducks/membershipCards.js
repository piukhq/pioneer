import { addMembershipCard, getMembershipCards, deleteMembershipCard } from 'api/membershipCards'
import { createSelector } from 'reselect'
import {
  selectors as paymentCardsSelectors,
  actions as paymentCardsActions,
} from 'ducks/paymentCards'
import { serializeError } from 'serialize-error'

export const types = {
  MEMBERSHIP_CARDS_REQUEST: 'membershipCards/MEMBERSHIP_CARDS_REQUEST',
  MEMBERSHIP_CARDS_SUCCESS: 'membershipCards/MEMBERSHIP_CARDS_SUCCESS',
  MEMBERSHIP_CARDS_FAILURE: 'membershipCards/MEMBERSHIP_CARDS_FAILURE',

  DELETE_MEMBERSHIP_CARD_REQUEST: 'paymentCards/DELETE_MEMBERSHIP_CARD_REQUEST',
  DELETE_MEMBERSHIP_CARD_SUCCESS: 'paymentCards/DELETE_MEMBERSHIP_CARD_SUCCESS',
  DELETE_MEMBERSHIP_CARD_FAILURE: 'paymentCards/DELETE_MEMBERSHIP_CARD_FAILURE',
  DELETE_MEMBERSHIP_CARD_RESET: 'paymentCards/DELETE_MEMBERSHIP_CARD_RESET',

  ADD_MEMBERSHIP_CARD_REQUEST: 'paymentCards/ADD_MEMBERSHIP_CARD_REQUEST',
  ADD_MEMBERSHIP_CARD_SUCCESS: 'paymentCards/ADD_MEMBERSHIP_CARD_SUCCESS',
  ADD_MEMBERSHIP_CARD_FAILURE: 'paymentCards/ADD_MEMBERSHIP_CARD_FAILURE',
  ADD_MEMBERSHIP_CARD_RESET: 'paymentCards/ADD_MEMBERSHIP_CARD_RESET',
}

const initialState = {
  loading: false,
  error: false,
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
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.MEMBERSHIP_CARDS_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      }
    case types.MEMBERSHIP_CARDS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        cards: action.payload.reduce((acc, card) => { acc[card.id] = card; return acc }, {}),
      }
    case types.MEMBERSHIP_CARDS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
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
    case types.DELETE_MEMBERSHIP_CARD_RESET:
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
    case types.ADD_MEMBERSHIP_CARD_RESET:
      return {
        ...state,
        add: {
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
const paymentCardsListSelector = state => paymentCardsSelectors.cardsList(state)
const membershipCardSelector = (state, id) => state.membershipCards.cards[id]

export const selectors = {
  cardsList: createSelector(
    membershipCardsSelector,
    cardsObject => Object.keys(cardsObject || {}).map(cardId => cardsObject[cardId]),
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
      return allPaymentCardsList.filter(
        paymentCard => linkedPaymentCardsIds.indexOf(paymentCard.id) === -1,
      )
    },
  ),
}

export const actions = {
  getMembershipCardsRequest: () => ({ type: types.MEMBERSHIP_CARDS_REQUEST }),
  getMembershipCardsFailure: () => ({ type: types.MEMBERSHIP_CARDS_FAILURE }),
  getMembershipCardsSuccess: (payload) => ({ type: types.MEMBERSHIP_CARDS_SUCCESS, payload }),
  getMembershipCards: () => async dispatch => {
    dispatch(actions.getMembershipCardsRequest())
    try {
      const response = await getMembershipCards()
      dispatch(actions.getMembershipCardsSuccess(response.data))
    } catch (e) {
      dispatch(actions.getMembershipCardsFailure())
    }
  },
  deleteMembershipCardRequest: () => ({ type: types.DELETE_MEMBERSHIP_CARD_REQUEST }),
  deleteMembershipCardFailure: (error) => ({ type: types.DELETE_MEMBERSHIP_CARD_FAILURE, payload: serializeError(error) }),
  deleteMembershipCardSuccess: () => ({ type: types.DELETE_MEMBERSHIP_CARD_SUCCESS }),
  deleteMembershipCardReset: () => ({ type: types.DELETE_MEMBERSHIP_CARD_RESET }),
  deleteMembershipCard: (id) => async (dispatch) => {
    dispatch(actions.deleteMembershipCardRequest())
    try {
      await deleteMembershipCard(id)
      dispatch(actions.deleteMembershipCardSuccess())
      // refresh payment and membership cards
      dispatch(paymentCardsActions.getPaymentCards())
      dispatch(actions.getMembershipCards())
    } catch (e) {
      dispatch(actions.deleteMembershipCardFailure(e))
    }
  },

  addMembershipCardRequest: () => ({ type: types.ADD_MEMBERSHIP_CARD_REQUEST }),
  addMembershipCardFailure: (error) => ({ type: types.ADD_MEMBERSHIP_CARD_FAILURE, payload: serializeError(error) }),
  addMembershipCardSuccess: (payload) => ({ type: types.ADD_MEMBERSHIP_CARD_SUCCESS, payload }),
  addMembershipCardReset: () => ({ type: types.ADD_MEMBERSHIP_CARD_RESET }),
  addMembershipCard: (accountData, planId) => async (dispatch) => {
    dispatch(actions.addMembershipCardRequest())
    try {
      const response = await addMembershipCard(accountData, planId)
      dispatch(actions.addMembershipCardSuccess(response.data))
      // refresh payment and membership cards
      dispatch(paymentCardsActions.getPaymentCards())
      dispatch(actions.getMembershipCards())
    } catch (e) {
      dispatch(actions.addMembershipCardFailure(e))
    }
  },
}
