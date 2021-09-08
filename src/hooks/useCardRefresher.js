import { useCallback, useEffect, useState } from 'react'

const retryIntervals = [2, 3, 6, 8, 10, 20, 60, 120, 300]

const useCardRefresher = (card, updateCard, cardStatus, pendingState, loadingState, handlePaymentCardStateChange) => {
  const [initialCardState, setCardState] = useState(null)
  const [retryIndex, setRetryIndex] = useState(0)
  const [timeoutId, setTimeoutId] = useState(null)
  const [lastUpdateTime, setLastUpdateTime] = useState(null)

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
        updateCard()
        setTimeoutId(null)
        setLastUpdateTime(new Date().toString())
      }, retryIntervals[retryIndex] * 1000)

      setRetryIndex(retryIndex + 1)

      // mark the timer as running and store the timeoutId to clear the timer if needed
      setTimeoutId(timeoutId)
    }
  }, [retryIndex, timeoutId, setTimeoutId, updateCard])

  useEffect(() => {
    if (cardStatus === pendingState && !loadingState) {
      setTimerToCheckAgain()
    } else if (cardStatus !== pendingState && !loadingState) {
      // If the card is no longer pending, remove it from the pending card state in redux
      handlePaymentCardStateChange && handlePaymentCardStateChange()
    }
  }, [setTimerToCheckAgain, cardStatus, pendingState, loadingState, handlePaymentCardStateChange])

  useEffect(() => {
    if (!initialCardState && card) {
      setCardState(cardStatus)
    }
  }, [initialCardState, cardStatus, card])

  useEffect(() => () => clearTimeout(timeoutId), [timeoutId])

  return {
    pendingState,
    initialCardState,
    card,
    retryIndex,
    isQueuingInProgress: timeoutId !== null,
    lastUpdateTime,
  }
}

export default useCardRefresher
