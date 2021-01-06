import { getPaymentCards, addPaymentCard } from 'api/paymentCards'
import { createSelector } from 'reselect'

export const types = {
  PAYMENT_CARDS_REQUEST: 'paymentCards/PAYMENT_CARDS_REQUEST',
  PAYMENT_CARDS_SUCCESS: 'paymentCards/PAYMENT_CARDS_SUCCESS',
  PAYMENT_CARDS_FAILURE: 'paymentCards/PAYMENT_CARDS_FAILURE',

  ADD_PAYMENT_CARDS_REQUEST: 'paymentCards/ADD_PAYMENT_CARDS_REQUEST',
  ADD_PAYMENT_CARDS_SUCCESS: 'paymentCards/ADD_PAYMENT_CARDS_SUCCESS',
  ADD_PAYMENT_CARDS_FAILURE: 'paymentCards/ADD_PAYMENT_CARDS_FAILURE',
  ADD_PAYMENT_CARDS_RESET: 'paymentCards/ADD_PAYMENT_CARDS_RESET',
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
    case types.ADD_PAYMENT_CARDS_RESET:
      return {
        ...state,
        add: {
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
  addPaymentCardFailure: (error) => ({ type: types.ADD_PAYMENT_CARDS_FAILURE, payload: error.toString() }),
  addPaymentCardSuccess: () => ({ type: types.ADD_PAYMENT_CARDS_SUCCESS }),
  addPaymentCardReset: () => ({ type: types.ADD_PAYMENT_CARDS_RESET }),
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
      dispatch(actions.getPaymentCards())
    } catch (e) {
      dispatch(actions.addPaymentCardFailure(e))
    }
  },
}
