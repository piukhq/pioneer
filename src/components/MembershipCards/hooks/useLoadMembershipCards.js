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
          card => card.membership_plan === 315, // todo: no hardcoded id
        )
        switch (cards.length) {
          case 0:
            break
          case 1:
            history.replace(`/membership-card/${cards[0].id}`)
          default:
            // todo: per specs for now but probably should be handled differently
            history.replace(`/membership-card/${cards[0].id}`)
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
