import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { isTokenUsed } from 'utils/magicLink'

const HomePage = () => {
  const apiKey = useSelector(state => state.users.authentication.api_key)
  const history = useHistory()

  useEffect(() => {
    const search = window.location.search
    const uParams = new URLSearchParams(search)
    const magicLinkToken = uParams.get('magic-link')

    if (magicLinkToken && !isTokenUsed(magicLinkToken)) {
      history.replace(`/magic-link/${magicLinkToken}`)
    } else if (apiKey) {
      history.replace('/membership-cards')
    } else {
      history.replace('/login')
    }
  }, [apiKey, history])
  return null
}

export default HomePage
