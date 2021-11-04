import { getAuthToken, storageLocation } from 'utils/storage' // TODO: Temporary measure for web-464

const syncApiKeyToStorage = store => next => action => {
  const apiKey = store.getState().users?.authentication?.api_key
  if (apiKey !== getAuthToken()) {
    storageLocation().setItem('token', apiKey)
  }
  return next(action)
}

export default syncApiKeyToStorage
