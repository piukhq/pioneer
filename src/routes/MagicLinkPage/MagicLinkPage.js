import React from 'react'
import useRedirectLogic from './hooks/useRedirectLogic'
import HangTight from 'components/HangTight'

const MagicLinkPage = () => {
  useRedirectLogic()

  return (
    <HangTight />
  )
}

export default MagicLinkPage
