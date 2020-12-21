import { getMembershipCards } from 'api/membershipCards'
import { createSelector } from 'reselect'
import { selectors as paymentCardsSelectors } from 'ducks/paymentCards'

export const types = {
  MEMBERSHIP_CARDS_REQUEST: 'membershipCards/MEMBERSHIP_CARDS_REQUEST',
  MEMBERSHIP_CARDS_SUCCESS: 'membershipCards/MEMBERSHIP_CARDS_SUCCESS',
  MEMBERSHIP_CARDS_FAILURE: 'membershipCards/MEMBERSHIP_CARDS_FAILURE',
}

const initialState = {
  loading: false,
  error: false,
  cards: {},
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
