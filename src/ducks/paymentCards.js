import { getPaymentCards } from 'api/paymentCards'

const types = {
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
        cards: action.payload,
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

export const actions = {
  getPaymentCards: () => async (dispatch, getState) => {
    dispatch({ type: types.PAYMENT_CARDS_REQUEST })
    try {
      const response = await getPaymentCards(getState().authentication.api_key)
      dispatch({ type: types.PAYMENT_CARDS_SUCCESS, payload: response.data })
      console.log(response.data)
    } catch (e) {
      dispatch({ type: types.PAYMENT_CARDS_FAILURE })
      console.error(e)
    }
  },
}
