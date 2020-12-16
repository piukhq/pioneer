import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import LoginForm from 'components/LoginForm'

const HomePageView = ({ api_key }) => {
  const history = useHistory()
  useEffect(() => {
    if (api_key) {
      history.replace('/')
    }
  }, [api_key, history])

  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
    </div>
  )
}

export default HomePageView
