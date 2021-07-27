// TODO: Temporary measure for Web-464

const storageLocation = () => {
  return Config.disabledLocalStorage ? sessionStorage : localStorage
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
