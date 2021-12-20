import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
// import { useDispatch, useSelector } from 'react-redux'
import { usePrevious } from 'react-use'
import { useUserState } from 'hooks/users'
import { useLogout } from 'hooks/useLogout'
import { getAuthToken } from 'utils/storage'
// import { getServerVersion } from 'api/version'

// import { selectors as versionSelectors, actions as versionActions } from 'ducks/clientVersion'
import {
  actions as allActions,
} from 'ducks/all'

import { convertMinutesToMilliseconds } from 'utils/format'

export const useInitialVersionCheck = () => {
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(versionActions.setClientVersion())
  // }, [dispatch])
}
export function useActivityCheck () {
  const [isIdle, setIsIdle] = useState(false)
  const { apiKey } = useUserState()
  const { logout } = useLogout()
  const dispatch = useDispatch()

  const setIdle = () => setIsIdle(true)
  const setActive = () => setIsIdle(false)

  // const clientVersion = useSelector(state => versionSelectors.clientVersion(state))
  const previousIsIdle = usePrevious(isIdle)
  const onActiveCheck = useCallback(async () => {
    // const currentServerVersion = await getServerVersion()

    if (!apiKey || apiKey !== getAuthToken()) {
      logout()
    // } else if (clientVersion !== currentServerVersion) {
    //   window.location.reload(true)
    } else {
      dispatch(allActions.fullRefresh())
    }
  // }, [apiKey, clientVersion, dispatch, logout])
  }, [apiKey, dispatch, logout])

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
