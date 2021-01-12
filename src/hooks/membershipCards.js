import { useSelector } from 'react-redux'
import { selectors as membershipCardsSelectors } from 'ducks/membershipCards'

export const useMembershipCardsState = () => {
  const membershipCards = useSelector(state => membershipCardsSelectors.cardsList(state))

  return {
    membershipCards,
  }
}
