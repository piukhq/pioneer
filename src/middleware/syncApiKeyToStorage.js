
const syncApiKeyToStorage = store => next => action => {
  const apiKey = store.getState().users?.authentication?.api_key
  if (apiKey !== localStorage.getItem('token') && !Config.disabledLocalStorage) { // TODO: Temporary measure for web-464
    localStorage.setItem('token', apiKey)
  }
  if (apiKey !== sessionStorage.getItem('token') && Config.disabledLocalStorage) { // TODO: Temporary measure for web-464
    sessionStorage.setItem('token', apiKey)
  }
  return next(action)
}

export default syncApiKeyToStorage
