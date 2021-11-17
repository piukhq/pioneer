import { useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useUserState } from 'hooks/users'
import { useLogout } from 'hooks/useLogout'
import { getAuthToken } from 'utils/storage'
import { getServerVersion } from 'api/version'

import { selectors as versionSelectors, actions as versionActions } from 'ducks/version'

import {
  actions as allActions,
} from 'ducks/all'
// import { convertMinutesToMilliseconds } from 'utils/format'

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

export function useHandleOnActive () {
  const { apiKey } = useUserState()
  const { logout } = useLogout()
  const dispatch = useDispatch()

  const clientVersion = useSelector(state => versionSelectors.clientVersion(state))
  const isIdle = useSelector(state => versionSelectors.isIdle(state))

  const handleOnActive = useCallback(async () => {
    const currentServerVersion = await getServerVersion()
    console.log(`Client version Number: ${clientVersion} - Server Version: ${currentServerVersion}`)

    if (!apiKey || apiKey !== getAuthToken()) {
      console.log('user is bad')
      logout()
    } else if (clientVersion !== currentServerVersion) {
      console.log('client server mismatch')
      window.location.reload(true)
    } else {
      console.log('user and versions OK. Refreshing')
      dispatch(allActions.fullRefresh())
    }
  }, [apiKey, clientVersion, dispatch, logout])

  useEffect(() => {
    console.log(clientVersion)
    if (!isIdle && clientVersion) {
      console.log('handle on active')
      handleOnActive()
    }
  }, [isIdle, handleOnActive, clientVersion])

  return {
    handleOnActive,
  }
}

export const idleTimerSettings = {
  timeout: 4000, // convertMinutesToMilliseconds(Config.idleTimeoutMinutes),
  crossTab: true,
}
