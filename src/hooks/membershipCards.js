import { useSelector } from 'react-redux'
import { selectors as membershipCardsSelectors } from 'ducks/membershipCards'

export const useMembershipCardsState = () => {
  const membershipCards = useSelector(state => membershipCardsSelectors.cardsList(state))
  const loading = useSelector(state => state.membershipCards.loading)
  const error = useSelector(state => state.membershipCards.error)

  return {
    error,
    loading,
    membershipCards,
  }
}
