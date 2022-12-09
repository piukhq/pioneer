import { useSelector } from 'react-redux'

export const useMagicLinkAuthenticationStatus = () => {
  const { error } = useSelector(state => state.users.magicLinkAuthentication)
  const isExpiredToken = error?.response?.status === 401

  return {
    error,
    isExpiredToken,
  }
}
