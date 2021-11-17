import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useUserState } from 'hooks/users'
import { useLogout } from 'hooks/useLogout'
import { usePrevious } from 'hooks/usePrevious'
import { getAuthToken } from 'utils/storage'
import { getServerVersion } from 'api/version'

import { selectors as versionSelectors, actions as versionActions } from 'ducks/version'

import {
  actions as allActions,
} from 'ducks/all'
import { convertMinutesToMilliseconds } from 'utils/format'

export const useInitialVersionCheck = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(versionActions.getServerVersion())
  }, [dispatch])
}
export const useActivityStatus = () => {
  const dispatch = useDispatch()
  const setIdle = () => dispatch(versionActions.setIsIdleStatus(true))
  const setActive = async () => dispatch(versionActions.setIsIdleStatus(false))
  return { setIdle, setActive }
}

export function useOnActiveCheck () {
  const { apiKey } = useUserState()
  const { logout } = useLogout()
  const dispatch = useDispatch()

  const clientVersion = useSelector(state => versionSelectors.clientVersion(state))
  const isIdle = useSelector(state => versionSelectors.isIdle(state))
  const previousClientVersion = usePrevious(clientVersion)

  const onActiveCheck = useCallback(async () => {
    const currentServerVersion = await getServerVersion()

    if (!apiKey || apiKey !== getAuthToken()) {
      logout()
    } else if (clientVersion !== currentServerVersion) {
      window.location.reload(true)
    } else {
      dispatch(allActions.fullRefresh())
    }
  }, [apiKey, clientVersion, dispatch, logout])

  useEffect(() => {
    if (!isIdle && previousClientVersion) {
      onActiveCheck()
    }
  }, [isIdle, onActiveCheck, previousClientVersion])

  return {
    onActiveCheck,
  }
}

export const idleTimerSettings = {
  timeout: convertMinutesToMilliseconds(Config.idleTimeoutMinutes),
  crossTab: true,
}
