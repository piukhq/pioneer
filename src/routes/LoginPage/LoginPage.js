import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import LoginForm from 'components/LoginForm'
import Loading from 'components/Loading'
import RequestMagicLink from 'components/RequestMagicLink'

const HomePage = () => {
  const history = useHistory()
  const apiKey = useSelector(state => state.users.authentication.api_key)
  const loading = useSelector(state => state.users.authentication.loading)
  useEffect(() => {
    if (apiKey) {
      history.replace('/')
    }
  }, [apiKey, history])

  return (
    <div>
      <RequestMagicLink />
      <LoginForm />
      { loading && (
        <Loading />
      ) }
    </div>
  )
}

export default HomePage
