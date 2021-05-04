import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectors as membershipCardsSelectors } from 'ducks/membershipCards'

const useDetermineMembershipCardDetails = () => {
  const { id } = useParams()

  const planName = useSelector(
    state => membershipCardsSelectors.plan(state, id)?.account?.plan_name,
  )
  const cardName = useSelector(
    state => membershipCardsSelectors.plan(state, id)?.account?.plan_name_card,
  )

  return {
    planName,
    cardName,
  }
}

export default useDetermineMembershipCardDetails
