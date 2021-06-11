import { useState } from 'react'
import { isValidEmail } from 'utils/validation'

const useEmailErrorDisplay = (email, setEmail) => {
  const [isErrorDisplayed, setIsErrorDisplayed] = useState(false)

  const handleBlur = () => {
    setIsErrorDisplayed(!isValidEmail(email))
  }

  const handleChange = (event) => {
    isErrorDisplayed && setIsErrorDisplayed(false)
    setEmail(event.target.value)
  }

  return {
    isErrorDisplayed,
    handleChange,
    handleBlur,
    isValidEmail,
  }
}

export default useEmailErrorDisplay
