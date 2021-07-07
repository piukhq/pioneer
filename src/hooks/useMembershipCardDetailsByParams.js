import { useSelector } from 'react-redux'
import { selectors as membershipCardsSelectors } from 'ducks/membershipCards'
import { useMembershipCardsState } from 'hooks/membershipCards'

export const useMembershipCardDetailsByParams = () => {
  const { membershipCards } = useMembershipCardsState()

  const membershipCardId = membershipCards?.[0]?.id

  const planName = useSelector(
    state => membershipCardsSelectors.plan(state, membershipCardId)?.account?.plan_name,
  )
  const planNameSuffix = useSelector(
    state => membershipCardsSelectors.plan(state, membershipCardId)?.account?.plan_name_card,
  )?.toLowerCase()

  return {
    planName,
    planNameSuffix,
  }
}
