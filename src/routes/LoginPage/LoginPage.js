import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import LoginForm from 'components/LoginForm'

const HomePage = () => {
  const history = useHistory()
  const apiKey = useSelector(state => state.users.authentication.api_key)
  useEffect(() => {
    if (apiKey) {
      history.replace('/')
    }
  }, [apiKey, history])

  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
    </div>
  )
}

export default HomePage
