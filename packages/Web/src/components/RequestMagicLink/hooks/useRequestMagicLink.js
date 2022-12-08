import { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions as usersActions } from 'ducks/users'

export const useRequestMagicLink = () => {
  const [email, setEmail] = useState('')
  const { error, loading, success } = useSelector(state => state.users.magicLinkRequest)
  const dispatch = useDispatch()
  const handleSubmit = useCallback((event) => {
    event.preventDefault()
    dispatch(usersActions.requestMagicLink(email))
  }, [dispatch, email])

  return {
    email,
    setEmail,
    error,
    loading,
    success,
    handleSubmit,
  }
}
