// TODO: Temporary measure for Web-464, in future, storage location function could be adapted to change based on 'remember me' input

const storageLocation = () => {
  return Config.disabledPersistentSessions ? sessionStorage : localStorage
}
const getAuthToken = () => {
  return storageLocation().getItem('token')
}
const getAuthTokenString = () => {
  return `Token ${storageLocation().getItem('token')}`
}

const removeAuthToken = () => {
  return storageLocation().removeItem('token')
}

export { storageLocation, getAuthToken, getAuthTokenString, removeAuthToken }
