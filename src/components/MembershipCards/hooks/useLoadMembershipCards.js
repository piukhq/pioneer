import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions as membershipCardsActions } from 'ducks/membershipCards'
import { useMembershipCardsState } from 'hooks/membershipCards'
import Config from 'Config'
import { useHistory } from 'react-router-dom'

const useLoadMembershipCards = (onError) => {
  const { membershipCards } = useMembershipCardsState()

  const [finishedRefreshing, setFinishedRefreshing] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    const refresh = async () => {
      await dispatch(membershipCardsActions.getMembershipCards())
      setFinishedRefreshing(true)
    }
    refresh()
  }, [dispatch])

  const history = useHistory()
  useEffect(() => {
    if (finishedRefreshing) {
      if (Config.isMerchantChannel) {
        const cards = membershipCards.filter(
          card => card.membership_plan === Config.membershipPlanId,
        )
        switch (cards.length) {
          case 0:
            history.replace(`/membership-card/add/${Config.membershipPlanId}`)
            break
          case 1:
            history.replace(`/membership-card/${cards[0].id}`)
            break
          default:
            // do nothing
        }
      } else {
        // current theme is not for a merchant channel
      }
    }
  }, [finishedRefreshing, membershipCards, history])

  const error = useSelector(state => state.membershipCards.error)
  useEffect(() => {
    error && onError && onError(error)
  }, [error, onError])

  return {}
}

export default useLoadMembershipCards
