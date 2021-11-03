import { useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { isValidName, isValidExpiry } from 'utils/validation'

export const usePaymentCardAddForm = (onClose) => { // TODO: move onClose functionality inside component as part of refactor. Causes card number styling issue doing so atm.
  const [fullName, setFullName] = useState('')
  const [expiry, setExpiry] = useState({ MM: undefined, YY: undefined })
  const [fullNameError, setFullNameError] = useState(undefined)
  const [expiryError, setExpiryError] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [cardNumberError, setCardNumberError] = useState(false)
  const [genericSpreedlyError, setGenericSpreedlyError] = useState(false)
  const [isSpreedlyNumberValid, setIsSpreedlyNumberValid] = useState(false)

  // passed to useSpreedly and used to help determine overall form validation
  const spreedlyNumberValidation = useCallback((isValid) => {
    setIsSpreedlyNumberValid(isValid)
  }, [])

  const handleErrors = useCallback((errors) => {
    setIsLoading(false)

    let anyNonFieldRelatedError = false
    let anyFieldRelatedError = false
    //   Most of field related errors here would mean that local validation passed while Spreedly returned an error.
    //   Once / if we'll have any logging implemented it would be worth logging it for refining further the local validation.
    errors.forEach(error => {
      console.error(error)

      switch (error.attribute) {
        case 'month':
        case 'year':
          anyFieldRelatedError = true
          setExpiryError('Invalid date')
          break
        case 'first_name':
        case 'last_name':
          anyFieldRelatedError = true
          setFullNameError('Invalid name')
          break
        case 'number':
          anyFieldRelatedError = true
          setCardNumberError('Invalid card number')
          break
        default:
          anyNonFieldRelatedError = true
      }

      if (anyNonFieldRelatedError && !anyFieldRelatedError) {
        setGenericSpreedlyError('Something went wrong. Please try again later')
      }
    })
  }, [])

  const handleSuccess = useCallback(() => {
    setIsLoading(false)
    onClose && onClose()
  }, [onClose])

  const handleExpiryChange = (key, event) => {
    const newExpiry = {
      ...expiry,
      [key]: event.target.value,
    }
    setExpiry(newExpiry)

    if (newExpiry.MM !== undefined && newExpiry.YY !== undefined) {
      const errorMessage = isValidExpiry(newExpiry) ? undefined : 'Invalid date'
      setExpiryError(errorMessage)
    }
  }

  const handleNameChange = useCallback((event) => {
    setFullName(event.target.value)
    setFullNameError(undefined)
  }, [])

  const handleNameBlur = useCallback(() => {
    const errorMessage = isValidName(fullName) ? undefined : 'Invalid name'
    setFullNameError(errorMessage)
  }, [fullName])

  const isNameValid = useCallback(() => isValidName(fullName), [fullName])

  const isExpiryValid = useCallback(() => isValidExpiry(expiry), [expiry])

  const isValidForm = useCallback(() => {
    return isSpreedlyNumberValid && isNameValid() && isExpiryValid()
  }, [isSpreedlyNumberValid, isNameValid, isExpiryValid])

  const submitForm = (event) => {
    event.preventDefault()

    // Reset errors that might have come back from Spreedly.
    // Note that a form may still be valid and submittable even if it has visual errors against some of the fields.
    setExpiryError(false)
    setFullNameError(false)
    setCardNumberError(false)
    setGenericSpreedlyError(false)

    setIsLoading(true)

    const Spreedly = window.Spreedly
    const { MM, YY } = expiry

    // useSpreedly hook will detect and act upon this action
    Spreedly.tokenizeCreditCard({
      month: MM,
      year: `20${YY}`,
      full_name: fullName,
    })
    return false
  }

  const binkApiError = useSelector(state => state.paymentCards.add.error)
  const genericBinkError = binkApiError && 'Something went wrong. Please try again later'

  return {
    fullName,
    setFullName,
    expiry,
    setExpiry,
    fullNameError,
    expiryError,
    handleExpiryChange,
    handleNameChange,
    handleNameBlur,
    cardNumberError,
    handleErrors,
    handleSuccess,
    genericSpreedlyError,
    genericBinkError,
    isNameValid,
    isExpiryValid,
    isLoading,
    submitForm,
    spreedlyNumberValidation,
    isValidForm,
  }
}
