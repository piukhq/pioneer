import React from 'react'
import HangTight from 'components/HangTight'
import useRedirectLogic from './hooks/useRedirectLogic'

const MagicLinkPage = () => {
  useRedirectLogic()

  return <HangTight />
}

export default MagicLinkPage
