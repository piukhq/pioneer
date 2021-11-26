import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { usePrevious } from 'react-use'
import { useUserState } from 'hooks/users'
import { useLogout } from 'hooks/useLogout'
import { getAuthToken } from 'utils/storage'
import { getServerVersion } from 'api/version'

import { selectors as versionSelectors, actions as versionActions } from 'ducks/clientVersion'
import {
  actions as allActions,
} from 'ducks/all'

// import { convertMinutesToMilliseconds } from 'utils/format'

export const useInitialVersionCheck = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(versionActions.setClientVersion())
  }, [dispatch])
}
export function useActivityCheck () {
  const [isIdle, setIsIdle] = useState(false)
  const { apiKey } = useUserState()
  const { logout } = useLogout()
  const dispatch = useDispatch()
  const setIdle = () => {
    console.log('setIdle')
    setIsIdle(true)
  }
  const setActive = () => setIsIdle(false)
  console.log('useActivityCheck' + isIdle)
  const clientVersion = useSelector(state => versionSelectors.clientVersion(state))
  const previousIsIdle = usePrevious(isIdle)
  const onActiveCheck = useCallback(async () => {
    const currentServerVersion = await getServerVersion()
    console.log('on active check ' + isIdle)
    if (!apiKey || apiKey !== getAuthToken()) {
      console.log('running logout code')
      logout()
    } else if (clientVersion !== currentServerVersion) {
      window.location.reload(true)
    } else {
      console.log('just refreshin')
      dispatch(allActions.fullRefresh())
    }
  }, [apiKey, clientVersion, dispatch, logout])

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
  timeout: 5000, // convertMinutesToMilliseconds(Config.idleTimeoutMinutes),
  crossTab: true,
}
