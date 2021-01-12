import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const HomePage = () => {
  const apiKey = useSelector(state => state.users.authentication.api_key)
  const history = useHistory()
  useEffect(() => {
    if (apiKey) {
      history.replace('/membership-cards')
    } else {
      history.replace('/login')
    }
  }, [apiKey, history])
  return null
}

export default HomePage
