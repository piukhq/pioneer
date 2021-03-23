import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { isTokenUsed } from 'utils/magicLink'
import { actions as usersActions } from 'ducks/users'
import Loading from 'components/Loading'
import { useDispatch, useSelector } from 'react-redux'

const useRedirectOnUsedToken = () => {
  const { magicLinkToken } = useParams()

  const history = useHistory()
  useEffect(() => {
    if (isTokenUsed(magicLinkToken)) {
      history.replace('/')
    }
  }, [magicLinkToken, history])
}

const MagicLinkPage = () => {
  useRedirectOnUsedToken()

  const { loading, error, success } = useSelector(state => state.users.magicLinkAuthentication)

  const dispatch = useDispatch()
  const { magicLinkToken } = useParams()

  useEffect(() => {
    if (!isTokenUsed(magicLinkToken)) {
      dispatch(usersActions.magicLinkAuthentication(magicLinkToken))
    }
  }, [magicLinkToken, dispatch])

  const history = useHistory()
  useEffect(() => {
    if (error) {
      history.replace('/login')
    }
  }, [error, history])

  useEffect(() => {
    if (success) {
      history.replace('/')
    }
  }, [success, history])

  return (
    loading ? <Loading /> : null
  )
}

export default MagicLinkPage
