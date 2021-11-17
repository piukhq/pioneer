import { useDispatch, useSelector } from 'react-redux'
import { useUserState } from 'hooks/users'
import { useLogout } from 'hooks/useLogout'
import { getAuthToken } from 'utils/storage'
import { getServerVersion } from 'utils/version'

import { selectors as versionSelectors, actions as versionActions } from 'ducks/version'

import {
  actions as allActions,
} from 'ducks/all'
// import { convertMinutesToMilliseconds } from 'utils/format'

export const useActivityStatus = () => {
  const dispatch = useDispatch()
  const setIdle = () => dispatch(versionActions.setIdle())
  const setActive = async () => {
    dispatch(versionActions.setActive())
  }
  return { setIdle, setActive }
}

export function useHandleOnActive () {
  const { apiKey } = useUserState()
  const { logout } = useLogout()
  const dispatch = useDispatch()
  const serverVersionNumber = async () => await getServerVersion()
  const clientVersion = useSelector(state => versionSelectors.clientVersion(state))

  const handleOnActive = async () => {
    const currentServerVersion = await serverVersionNumber()
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
  }

  return {
    handleOnActive,
  }
}

export const idleTimerSettings = {
  timeout: 3000, // convertMinutesToMilliseconds(Config.idleTimeoutMinutes),
  crossTab: true,
}
