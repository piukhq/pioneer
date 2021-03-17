const syncApiKeyToLocalStorage = store => next => action => {
  const apiKey = store.getState().users?.authentication?.api_key
  if (apiKey !== localStorage.getItem('token')) {
    localStorage.setItem('token', apiKey)
  }

  return next(action)
}

export default syncApiKeyToLocalStorage
