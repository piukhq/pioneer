import { useState } from 'react'
import { isValidEmail } from 'utils/validation'

const useEmailErrorFormatting = (email, setEmail) => {
  const [emailError, setEmailError] = useState(undefined)

  const handleBlur = () => {
    setEmailError(isValidEmail(email) ? undefined : ' ')
  }

  const handleChange = (event) => {
    setEmailError(undefined)
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
