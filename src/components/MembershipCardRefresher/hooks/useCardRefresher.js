import { useCallback, useEffect, useState } from 'react'
import { useMembershipCardsDispatch, useMembershipCardStateById } from 'hooks/membershipCards'

const retryIntervals = [3, 6, 10, 20, 60, 120, 300]
const PENDING_STATE = 'pending'

const useCardRefresher = (membershipCardId) => {
  const [initialCardState, setCardState] = useState(null)
  const [retryIndex, setRetryIndex] = useState(0)
  const [timeoutId, setTimeoutId] = useState(null)
  const [lastUpdateTime, setLastUpdateTime] = useState(null)
  const { membershipCard, loading } = useMembershipCardStateById(membershipCardId)
  const { getMembershipPlans } = useMembershipCardsDispatch()

  // useEffect(() => {
  //   // For debugging purposes. Display in console amount of attempts so far and seconds waited
  //   console.log('attempt times', retryIndex)
  //   const t0 = new Date().getTime()
  //   if (retryIntervals[retryIndex] !== undefined) {
  //     const intervalId = setInterval(() => {
  //       console.log('waited seconds', Math.floor((new Date().getTime() - t0) / 1000))
  //     }, 1000)
  //     return () => clearInterval(intervalId)
  //   }
  // }, [retryIndex])

  const setTimerToCheckAgain = useCallback(() => {
    // if no timer is running, and we got a non-undefined time interval (i.e. didn't reach the end of the array)
    if (timeoutId === null && retryIntervals[retryIndex]) {
      const timeoutId = setTimeout(() => {
        getMembershipPlans()
        setTimeoutId(null)
        setLastUpdateTime(new Date().toString())
      }, retryIntervals[retryIndex] * 1000)

      setRetryIndex(retryIndex + 1)

      // mark the timer as running and store the timeoutId to clear the timer if needed
      setTimeoutId(timeoutId)
    }
  }, [retryIndex, timeoutId, setTimeoutId, getMembershipPlans])

  useEffect(() => {
    if (membershipCard?.status?.state === PENDING_STATE && !loading) {
      setTimerToCheckAgain()
    }
  }, [membershipCard, loading, setTimerToCheckAgain])

  useEffect(() => {
    if (!initialCardState && membershipCard) {
      setCardState(membershipCard?.status?.state)
    }
  }, [membershipCard, initialCardState])

  useEffect(() => () => clearTimeout(timeoutId), [timeoutId])

  return {
    PENDING_STATE,
    initialCardState,
    membershipCard,
    retryIndex,
    isQueuingInProgress: timeoutId !== null,
    lastUpdateTime,
  }
}

export default useCardRefresher
