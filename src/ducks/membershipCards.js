import { getMembershipCards } from 'api/membershipCards'

export const types = {
  MEMBERSHIP_CARDS_REQUEST: 'membershipCards/MEMBERSHIP_CARDS_REQUEST',
  MEMBERSHIP_CARDS_SUCCESS: 'membershipCards/MEMBERSHIP_CARDS_SUCCESS',
  MEMBERSHIP_CARDS_FAILURE: 'membershipCards/MEMBERSHIP_CARDS_FAILURE',
}

const initialState = {
  loading: false,
  error: false,
  cards: null,
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
        cards: action.payload,
      }
    case types.MEMBERSHIP_CARDS_FAILURE:
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
  getMembershipCardsRequest: () => ({ type: types.MEMBERSHIP_CARDS_REQUEST }),
  getMembershipCardsFailure: () => ({ type: types.MEMBERSHIP_CARDS_FAILURE }),
  getMembershipCardsSuccess: (payload) => ({ type: types.MEMBERSHIP_CARDS_SUCCESS, payload }),
  getMembershipCards: () => async (dispatch, getState) => {
    dispatch(actions.getMembershipCardsRequest())
    try {
      const response = await getMembershipCards(getState().user.authentication.api_key)
      dispatch(actions.getMembershipCardsSuccess(response.data))
    } catch (e) {
      dispatch(actions.getMembershipCardsFailure())
    }
  },
}
