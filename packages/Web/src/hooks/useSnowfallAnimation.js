import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectors as membershipCardsSelectors } from 'ducks/membershipCards'
import { useMembershipCardsState } from 'hooks/membershipCards'
import { useUserState } from 'hooks/users'
import { getIsChristmasDate } from 'utils/dates'

export const useSnowfallAppropriateness = () => {
  const [shouldDisplaySnowfall, setShouldDisplaySnowfall] = useState(true)
  const { apiKey } = useUserState()
  const isReenrolRequired = useSelector(state => membershipCardsSelectors.isReenrolRequired(state))
  const isReaddRequired = useSelector(state => membershipCardsSelectors.isReaddRequired(state))
  const { error: serviceError } = useSelector(state => state.service)
  const { membershipCards } = useMembershipCardsState()

  const isOnJoinJourney = (Config.isMerchantChannel && membershipCards.length === 0) || (isReenrolRequired || isReaddRequired) || serviceError

  useEffect(() => {
    if (apiKey && !isOnJoinJourney && getIsChristmasDate()) {
      setShouldDisplaySnowfall(true)
    } else {
      setShouldDisplaySnowfall(false)
    }
  }, [apiKey, isOnJoinJourney])

  return { shouldDisplaySnowfall }
}
