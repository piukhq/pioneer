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

  const handleChange = (e) => {
    setEmailError(undefined)
    setEmail(e.target.value)
  }
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
    emailError,
    handleSubmit,
    handleBlur,
    handleChange,
  }
}

export default useRequestMagicLink
