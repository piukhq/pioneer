import { serializeError } from 'serialize-error'
import { getPaymentCards, addPaymentCard, deletePaymentCard } from 'api/paymentCards'
import { actions as membershipCardsActions } from 'ducks/membershipCards'
import { createSelector } from 'reselect'

export const types = {
  PAYMENT_CARDS_REQUEST: 'paymentCards/PAYMENT_CARDS_REQUEST',
  PAYMENT_CARDS_SUCCESS: 'paymentCards/PAYMENT_CARDS_SUCCESS',
  PAYMENT_CARDS_FAILURE: 'paymentCards/PAYMENT_CARDS_FAILURE',

  ADD_PAYMENT_CARDS_REQUEST: 'paymentCards/ADD_PAYMENT_CARDS_REQUEST',
  ADD_PAYMENT_CARDS_SUCCESS: 'paymentCards/ADD_PAYMENT_CARDS_SUCCESS',
  ADD_PAYMENT_CARDS_FAILURE: 'paymentCards/ADD_PAYMENT_CARDS_FAILURE',
  ADD_PAYMENT_CARDS_RESET_SUCCESS_STATUS: 'paymentCards/ADD_PAYMENT_CARDS_RESET_SUCCESS_STATUS',

  DELETE_PAYMENT_CARDS_REQUEST: 'paymentCards/DELETE_PAYMENT_CARDS_REQUEST',
  DELETE_PAYMENT_CARDS_SUCCESS: 'paymentCards/DELETE_PAYMENT_CARDS_SUCCESS',
  DELETE_PAYMENT_CARDS_FAILURE: 'paymentCards/DELETE_PAYMENT_CARDS_FAILURE',
  DELETE_PAYMENT_CARDS_RESET_SUCCESS_STATUS: 'paymentCards/DELETE_PAYMENT_CARDS_RESET_SUCCESS_STATUS',
}

const initialState = {
  loading: false,
  error: false,
  cards: {},
  add: {
    loading: false,
    error: false,
    success: false,
  },
  delete: {
    loading: false,
    error: false,
    success: false,
  },
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PAYMENT_CARDS_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      }
    case types.PAYMENT_CARDS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        cards: action.payload.reduce((acc, card) => { acc[card.id] = card; return acc }, {}),
      }
    case types.PAYMENT_CARDS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        cards: {},
      }
    case types.ADD_PAYMENT_CARDS_REQUEST:
      return {
        ...state,
        add: {
          loading: true,
          error: false,
          success: false,
        },
      }
    case types.ADD_PAYMENT_CARDS_SUCCESS:
      return {
        ...state,
        add: {
          loading: false,
          error: false,
          success: true,
        },
      }
    case types.ADD_PAYMENT_CARDS_FAILURE:
      return {
        ...state,
        add: {
          loading: false,
          error: action.payload,
          success: false,
        },
      }
    case types.ADD_PAYMENT_CARDS_RESET_SUCCESS_STATUS:
      return {
        ...state,
        add: {
          loading: false,
          error: false,
          success: false,
        },
      }
    case types.DELETE_PAYMENT_CARDS_REQUEST:
      return {
        ...state,
        delete: {
          loading: true,
          error: false,
          success: false,
        },
      }
    case types.DELETE_PAYMENT_CARDS_SUCCESS:
      return {
        ...state,
        delete: {
          loading: false,
          error: false,
          success: true,
        },
      }
    case types.DELETE_PAYMENT_CARDS_FAILURE:
      return {
        ...state,
        delete: {
          loading: false,
          error: action.payload,
          success: false,
        },
      }
    case types.DELETE_PAYMENT_CARDS_RESET_SUCCESS_STATUS:
      return {
        ...state,
        delete: {
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

const paymentCardsSelector = state => state.paymentCards.cards
export const selectors = {
  cardsList: createSelector(
    paymentCardsSelector,
    // todo: cardsObject is always going to be an object. The `|| {}` seems redundant
    cardsObject => Object.keys(cardsObject || {}).map(cardId => cardsObject[cardId]),
  ),
}

export const actions = {
  getPaymentCardsRequest: () => ({ type: types.PAYMENT_CARDS_REQUEST }),
  getPaymentCardsFailure: () => ({ type: types.PAYMENT_CARDS_FAILURE }),
  getPaymentCardsSuccess: (payload) => ({ type: types.PAYMENT_CARDS_SUCCESS, payload }),
  getPaymentCards: () => async dispatch => {
    dispatch(actions.getPaymentCardsRequest())
    try {
      const response = await getPaymentCards()
      dispatch(actions.getPaymentCardsSuccess(response.data))
    } catch (e) {
      dispatch(actions.getPaymentCardsFailure())
    }
  },
  addPaymentCardRequest: () => ({ type: types.ADD_PAYMENT_CARDS_REQUEST }),
  addPaymentCardFailure: (error) => ({ type: types.ADD_PAYMENT_CARDS_FAILURE, payload: serializeError(error) }),
  addPaymentCardSuccess: () => ({ type: types.ADD_PAYMENT_CARDS_SUCCESS }),
  addPaymentCardResetSuccessStatus: () => ({ type: types.ADD_PAYMENT_CARDS_RESET_SUCCESS_STATUS }),
  addPaymentCard: (
    token,
    last_four_digits,
    first_six_digits,
    month,
    year,
    country,
    currency_code,
    name_on_card,
    provider,
    type,
    fingerprint,
  ) => async (dispatch) => {
    dispatch(actions.addPaymentCardRequest())
    try {
      await addPaymentCard(
        token,
        last_four_digits,
        first_six_digits,
        month,
        year,
        country,
        currency_code,
        name_on_card,
        provider,
        type,
        fingerprint,
      )
      dispatch(actions.addPaymentCardSuccess())
      // refresh payment and membership cards
      dispatch(actions.getPaymentCards())
      dispatch(membershipCardsActions.getMembershipCards())
    } catch (e) {
      dispatch(actions.addPaymentCardFailure(e))
    }
  },
  deletePaymentCardRequest: () => ({ type: types.DELETE_PAYMENT_CARDS_REQUEST }),
  deletePaymentCardFailure: (error) => ({ type: types.DELETE_PAYMENT_CARDS_FAILURE, payload: serializeError(error) }),
  deletePaymentCardSuccess: () => ({ type: types.DELETE_PAYMENT_CARDS_SUCCESS }),
  deletePaymentCardResetSuccessStatus: () => ({ type: types.DELETE_PAYMENT_CARDS_RESET_SUCCESS_STATUS }),
  deletePaymentCard: (id) => async (dispatch) => {
    dispatch(actions.deletePaymentCardRequest())
    try {
      await deletePaymentCard(id)
      dispatch(actions.deletePaymentCardSuccess())
      // refresh payment and membership cards
      dispatch(actions.getPaymentCards())
      dispatch(membershipCardsActions.getMembershipCards())
    } catch (e) {
      dispatch(actions.deletePaymentCardFailure(e))
    }
  },
}
