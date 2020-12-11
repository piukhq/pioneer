import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const HomePageView = ({ api_key, login }) => {
  const history = useHistory()
  useEffect(() => {
    if (api_key) {
      history.replace('/')
    }
  }, [api_key, history])

  return (
    <div>
      <h1>Login</h1>
      <button onClick={ () => login('bink_web_user_1@bink.com', 'BinkWeb01') }>Login</button>
    </div>
  )
}

export default HomePageView
