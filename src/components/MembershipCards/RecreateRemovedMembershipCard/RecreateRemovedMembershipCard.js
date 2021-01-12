import { useDispatch, useSelector } from 'react-redux'
import { addTestMembershipCard } from 'api/membershipCards'
import { actions as membershipCardsActions, selectors as membershipCardsSelectors } from 'ducks/membershipCards'

// todo: this is a temporary way of quickly recreate a membership card. To be removed once the functionality to addind a membership card was intorduced
const RecreateRemovedMembershipCard = () => {
  const dispatch = useDispatch()
  const membershipCards = useSelector(state => membershipCardsSelectors.cardsList(state))
  return (!membershipCards || membershipCards.length === 0) && (
    <>
      DEV mode only. No membership card was found.
      <button onClick={async () => {
        await addTestMembershipCard()
        dispatch(membershipCardsActions.getMembershipCards())
      } }>
        Create one
      </button>
    </>
  )
}

export default RecreateRemovedMembershipCard
