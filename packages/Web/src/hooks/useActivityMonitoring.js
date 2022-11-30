// Previous implementations of this hook checked for client/server mismatch, now this is just a simple logout hook
import { useCallback, useEffect, useState } from 'react'
import { usePrevious } from 'react-use'
import { useLogout } from 'hooks/useLogout'

import { convertMinutesToMilliseconds } from 'utils/format'

export function useActivityCheck () {
  const [isIdle, setIsIdle] = useState(false)
  const { logout } = useLogout()
  const setIdle = () => setIsIdle(true)
  const setActive = () => setIsIdle(false)

  // const clientVersion = useSelector(state => versionSelectors.clientVersion(state))
  const previousIsIdle = usePrevious(isIdle)
  const onActiveCheck = useCallback(async () => {
    logout()
  }, [logout])

  useEffect(() => {
    if (!isIdle && previousIsIdle) {
      onActiveCheck()
    }
  }, [isIdle, onActiveCheck, previousIsIdle])

  return {
    onActiveCheck,
    setIdle,
    setActive,
  }
}

export const idleTimerSettings = {
  timeout: convertMinutesToMilliseconds(Config.idleTimeoutMinutes),
  crossTab: true,
}
