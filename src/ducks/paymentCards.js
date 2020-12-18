import { getPaymentCards } from 'api/paymentCards'
import { createSelector } from 'reselect'

export const types = {
  PAYMENT_CARDS_REQUEST: 'paymentCards/PAYMENT_CARDS_REQUEST',
  PAYMENT_CARDS_SUCCESS: 'paymentCards/PAYMENT_CARDS_SUCCESS',
  PAYMENT_CARDS_FAILURE: 'paymentCards/PAYMENT_CARDS_FAILURE',
}

const initialState = {
  loading: false,
  error: false,
  cards: null,
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
        cards: null,
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
  getPaymentCards: () => async (dispatch, getState) => {
    dispatch(actions.getPaymentCardsRequest())
    try {
      const response = await getPaymentCards(getState().user.authentication.api_key)
      dispatch(actions.getPaymentCardsSuccess(response.data))
    } catch (e) {
      dispatch(actions.getPaymentCardsFailure())
    }
  },
}
