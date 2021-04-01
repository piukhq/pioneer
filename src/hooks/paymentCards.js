import { useDispatch, useSelector } from 'react-redux'

import {
  actions as paymentCardsActions,
} from 'ducks/paymentCards'

export const usePaymentCardsState = () => ({
  cards: useSelector(state => state.paymentCards.cards),
})

export const usePaymentCardById = (cardId) => {
  const { cards } = usePaymentCardsState()
  return {
    card: cards[cardId],
  }
}

export const useGetPaymentCardsDispatch = () => {
  const dispatch = useDispatch()
  return {
    getPaymentCards: () => dispatch(paymentCardsActions.getPaymentCards()),
  }
}
