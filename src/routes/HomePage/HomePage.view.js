import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const HomePageView = ({ api_key }) => {
  const history = useHistory()
  useEffect(() => {
    if (api_key) {
      history.replace('/membership-cards')
    } else {
      history.replace('/login')
    }
  }, [api_key, history])
  return null
}

export default HomePageView
