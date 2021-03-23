import React from 'react'
import Loading from 'components/Loading'
import useRedirectLogic from './hooks/useRedirectLogic'

const MagicLinkPage = () => {
  const { loading } = useRedirectLogic()

  return (
    loading ? <Loading /> : null
  )
}

export default MagicLinkPage
