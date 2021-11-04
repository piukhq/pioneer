import jwtDecode from 'jwt-decode'
import { storageLocation } from './storage'

export const isTokenUsed = token => {
  const usedMagicLinkTokens = JSON.parse(storageLocation().getItem('usedMLTokens') || '{}')
  return usedMagicLinkTokens[token]
}

export const setTokenAsUsed = token => {
  const usedMagicLinkTokens = JSON.parse(storageLocation().getItem('usedMLTokens') || '{}')

  // delete tokens that expired more that 3 days ago
  Object.keys(usedMagicLinkTokens).forEach(storedToken => {
    try {
      const tokenDetails = jwtDecode(storedToken)
      if (tokenDetails?.exp * 1000 < new Date().getTime() - 3 * 24 * 3600 * 1000) {
        delete usedMagicLinkTokens[storedToken]
      }
    } catch (e) {
      // delete a token if anything went wrong with its validation (might be a badly formatted token)
      delete usedMagicLinkTokens[storedToken]
    }
  })
  usedMagicLinkTokens[token] = true
  storageLocation().setItem('usedMLTokens', JSON.stringify(usedMagicLinkTokens))
}
