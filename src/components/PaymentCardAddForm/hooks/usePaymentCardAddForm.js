import { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions as paymentCardsActions } from 'ducks/paymentCards'
import { isValidName, isValidExpiry } from 'utils/validation'

const usePaymentCardAddForm = (onClose) => {
  const [fullName, setFullName] = useState('')
  const [expiry, setExpiry] = useState('')
  const [fullNameError, setFullNameError] = useState(undefined)
  const [expiryError, setExpiryError] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [cardNumberValid, setCardNumberValid] = useState(false)
  const [cardNumberError, setCardNumberError] = useState(false)
  const [genericSpreedlyError, setGenericSpreedlyError] = useState(false)

  const dispatch = useDispatch()

  const handlePaymentCardBlur = useCallback(() => {
    if (!cardNumberValid) {
      setCardNumberError('Invalid card number')
    } else {
      setCardNumberError(false)
    }
  }, [cardNumberValid, setCardNumberError])

  const handlePaymentCardChange = useCallback(({ valid }) => {
    setCardNumberError(false)
    setCardNumberValid(valid)
  }, [setCardNumberError])

  useEffect(() => {
    const Spreedly = window.Spreedly

    Spreedly.on('paymentMethod', async function (token, pmData) {
      const newCard = await dispatch(paymentCardsActions.addPaymentCard(
        token,
        pmData.last_four_digits,
        pmData.first_six_digits,
        pmData.month,
        pmData.year,
        pmData.country,
        pmData.currency_code,
        pmData.full_name,
        pmData.card_type,
        pmData.payment_method_type,
        pmData.fingerprint,
      ))
      setIsLoading(false)

      if (newCard) {
        onClose && onClose()
      }
    })

    Spreedly.on('errors', function (errors) {
      setIsLoading(false)

      let anyNonFieldRelatedError = false
      let anyFieldRelatedError = false
      //   Most of field related errors here would mean that local validation passed while Spreedly returned an error.
      //   Once / if we'll have any logging implemented it would be worth logging it for refining further the local validation.
      errors.forEach(error => {
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

      for (let i = 0; i < errors.length; i++) {
        const error = errors[i]
        console.log(error)
      }
    })

    return () => {
      Spreedly.removeHandlers()
    }
  }, [dispatch, onClose])

  const handleExpiryChange = (event) => {
    setExpiry(event.target.value)
    setExpiryError(undefined)
  }
  const handleNameChange = (event) => {
    setFullName(event.target.value)
    setFullNameError(undefined)
  }

  const handleExpiryBlur = useCallback(() => {
    const errorMessage = isValidExpiry(expiry) ? undefined : 'Invalid date'
    setExpiryError(errorMessage)
  }, [expiry])

  const handleNameBlur = useCallback(() => {
    const errorMessage = isValidName(fullName) ? undefined : 'Invalid name'
    setFullNameError(errorMessage)
  }, [fullName])

  const isPaymentFormValid = useCallback(
    () => isValidName(fullName) && isValidExpiry(expiry) && cardNumberValid,
    [fullName, expiry, cardNumberValid],
  )

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
    const [, month, year] = expiry.match(/^(\d\d)\/(\d\d)$/) || []

    Spreedly.tokenizeCreditCard({
      month,
      year: `20${year}`,
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
    handleExpiryBlur,
    handleNameChange,
    handleNameBlur,
    cardNumberError,
    handlePaymentCardChange,
    handlePaymentCardBlur,
    genericSpreedlyError,
    genericBinkError,
    isPaymentFormValid,
    isLoading,
    submitForm,
  }
}

export default usePaymentCardAddForm
