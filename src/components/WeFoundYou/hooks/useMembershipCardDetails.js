import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectors as membershipCardsSelectors } from 'ducks/membershipCards'

const useMembershipCardDetails = () => {
  const { id } = useParams()

  const planName = useSelector(
    state => membershipCardsSelectors.plan(state, id)?.account?.plan_name,
  )
  const planNameSuffix = useSelector(
    state => membershipCardsSelectors.plan(state, id)?.account?.plan_name_card,
  )

  return {
    planName,
    planNameSuffix,
  }
}

export default useMembershipCardDetails
