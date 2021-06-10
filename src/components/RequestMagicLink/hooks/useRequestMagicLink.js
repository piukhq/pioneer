import { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions as usersActions } from 'ducks/users'
import { isValidEmail } from 'utils/validation'

const useRequestMagicLink = () => {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(undefined)
  const { error, loading, success } = useSelector(state => state.users.magicLinkRequest)
  const dispatch = useDispatch()

  const handleBlur = () => {
    setEmailError(isValidEmail(email) ? undefined : ' ')
  }

  const handleChange = (event) => {
    setEmailError(undefined)
    setEmail(event.target.value)
  }
  const handleSubmit = useCallback((event) => {
    event.preventDefault()
    dispatch(usersActions.requestMagicLink(email))
  }, [dispatch, email])

  return {
    isValidEmail,
    email,
    setEmail,
    error,
    loading,
    success,
    emailError,
    handleChange,
    handleBlur,
    handleSubmit,
  }
}

export default useRequestMagicLink
