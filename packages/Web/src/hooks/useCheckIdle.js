
import { useHistory } from 'react-router-dom'
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

export const useSetClientVersion = () => {
  const dispatch = useDispatch()
  const setClientVersion = () => dispatch(versionActions.getServerVersion())
  const clientVersion = useSelector(state => versionSelectors.clientVersion(state))
  return { setClientVersion, clientVersion }
}
export function useHandleOnIdle () {
  const { apiKey } = useUserState()
  const { logout } = useLogout()
  const history = useHistory()
  const dispatch = useDispatch()
  const serverVersionNumber = async () => await getServerVersion()
  const clientVersion = useSelector(state => versionSelectors.clientVersion(state))

  const handleOnIdle = async () => {
    const currentServerVersion = await serverVersionNumber()
    console.log(`Client version Number: ${clientVersion} - Server Version: ${currentServerVersion}`)
    if (!apiKey || apiKey !== getAuthToken()) {
      console.log('user is bad')
      logout()
    } else if (clientVersion && currentServerVersion && clientVersion !== currentServerVersion) {
      console.log('client server mismatch')
      history.replace('/')
    } else {
      console.log('user and versions OK. Refreshing')
      dispatch(allActions.fullRefresh())
    }
  }

  return {
    handleOnIdle,
  }
}

export const idleTimerSettings = {
  timeout: 5000, // convertMinutesToMilliseconds(Config.idleTimeoutMinutes),
  crossTab: true,
}

// fix update bug
// set to pages
// sort out version grabbing url
