import { useSelector } from 'react-redux'

export const usePaymentCardsState = () => ({
  cards: useSelector(state => state.paymentCards.cards),
})

export const usePaymentCardById = (cardId) => {
  const { cards } = usePaymentCardsState()
  return {
    card: cards[cardId],
  }
}
