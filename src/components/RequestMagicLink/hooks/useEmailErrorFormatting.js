import { useState } from 'react'
import { isValidEmail } from 'utils/validation'

const useEmailErrorFormatting = (email, setEmail) => {
  const [emailError, setEmailError] = useState(false)

  const handleBlur = () => {
    setEmailError(!isValidEmail(email))
  }

  const handleChange = (event) => {
    emailError && setEmailError(false)
    setEmail(event.target.value)
  }

  return {
    emailError,
    handleChange,
    handleBlur,
    isValidEmail,
  }
}

export default useEmailErrorFormatting
