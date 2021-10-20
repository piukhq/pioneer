import { useSelector } from 'react-redux'
import { selectors as membershipCardsSelectors } from 'ducks/membershipCards'
import { useMembershipCardsState } from 'hooks/membershipCards'
import { MEMBERSHIP_CARD_IMAGE_TYPES } from 'utils/enums'

export const useMembershipCardDetailsByCardId = () => {
  const { membershipCards } = useMembershipCardsState()

  const membershipCardId = membershipCards?.[0]?.id

  const planName = useSelector(
    state => membershipCardsSelectors.plan(state, membershipCardId)?.account?.plan_name,
  )
  const planNameSuffix = useSelector(
    state => membershipCardsSelectors.plan(state, membershipCardId)?.account?.plan_name_card,
  )?.toLowerCase()

  const planOffers = useSelector( // TODO: Update this if offers are moved to its own section in a future version of the API.
    state => membershipCardsSelectors.plan(state, membershipCardId)?.images,
  )?.filter(image => image.type === MEMBERSHIP_CARD_IMAGE_TYPES.OFFER)

  return {
    planName,
    planNameSuffix,
    planOffers,
  }
}
