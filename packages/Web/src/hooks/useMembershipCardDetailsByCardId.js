import { useSelector } from 'react-redux'
import { selectors as membershipCardsSelectors } from 'ducks/membershipCards'
import { MEMBERSHIP_CARD_IMAGE_TYPES } from 'utils/enums'

export const useMembershipCardDetailsByCardId = (id) => {
  console.log(id)
  const planName = useSelector(
    state => membershipCardsSelectors.plan(state, id)?.account?.plan_name,
  )
  const planNameSuffix = useSelector(
    state => membershipCardsSelectors.plan(state, id)?.account?.plan_name_card,
  )?.toLowerCase()

  const planOffers = useSelector( // TODO: Update this if offers are moved to its own section in a future version of the API.
    state => membershipCardsSelectors.plan(state, id)?.images,
  )?.filter(image => image.type === MEMBERSHIP_CARD_IMAGE_TYPES.OFFER)

  const planHasVouchers = useSelector(
    state => membershipCardsSelectors.plan(state, id)?.feature_set?.has_vouchers,
  )
  const planIsPLL = useSelector(
    state => membershipCardsSelectors.plan(state, id)?.feature_set?.card_type === 2,
  )
  const planTransactionsAvailable = useSelector(
    state => membershipCardsSelectors.plan(state, id)?.feature_set?.transactions_available,
  )

  return {
    planName,
    planNameSuffix,
    planOffers,
    planHasVouchers,
    planIsPLL,
    planTransactionsAvailable,
  }
}
