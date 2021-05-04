import { useEffect, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { actions as paymentCardsActions } from 'ducks/paymentCards'
import { isValidName, isValidExpiry } from 'utils/validation'

// todo: to further break down this hook
const usePaymentCardAddForm = (onClose) => {
  const Spreedly = window.Spreedly
  const [fullName, setFullName] = useState('')
  const [expiry, setExpiry] = useState('')
  const [fullNameError, setFullNameError] = useState(undefined)
  const [expiryError, setExpiryError] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [cardNumberValid, setCardNumberValid] = useState(false)
  const [cardNumberError, setCardNumberError] = useState(false)
  const [cardNumberFocus, setCardNumberFocus] = useState(false)
  const [cardNumberLength, setCardNumberLength] = useState(0)
  const [isIframeLoaded, setIframeLoaded] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    const onSpreedlyBlur = () => {
      if (!cardNumberValid) {
        setCardNumberError('Invalid card number')
      } else {
        setCardNumberError(false)
      }
    }
    window.addEventListener('bink.spreedly.onblur', onSpreedlyBlur)
    return () => window.removeEventListener('bink.spreedly.onblur', onSpreedlyBlur)
  }, [cardNumberValid, setCardNumberError])

  useEffect(() => {
    const onSpreedlyInput = () => {
      setCardNumberError(false)
    }
    window.addEventListener('bink.spreedly.input', onSpreedlyInput)
    return () => window.removeEventListener('bink.spreedly.input', onSpreedlyInput)
  }, [setCardNumberError])

  useEffect(() => {
    if (isIframeLoaded) {
      if (cardNumberError) {
        Spreedly.setStyle('number', 'width: 100%; font-size: 18px; line-height: 62px; box-sizing: border-box; color: #a30f27')
      } else {
        Spreedly.setStyle('number', 'width: 100%; font-size: 18px; line-height: 62px; box-sizing: border-box; color: #054127')
      }
    }
  }, [cardNumberError])

  useEffect(() => {
    Spreedly.on('ready', function () {
      console.log('spreedly ready 1')
      Spreedly.setStyle('number', 'width: 100%; font-size: 18px; line-height: 62px; box-sizing: border-box; color: #054127')
      Spreedly.setPlaceholder('number', 'Card number')
      Spreedly.setNumberFormat('prettyFormat')

      setIframeLoaded(true)
    })

    Spreedly.on('validation', function ({ numberLength, validNumber }) {
      setCardNumberLength(numberLength)
      setCardNumberValid(validNumber)
    })

    Spreedly.on('fieldEvent', function (name, event) {
      // note: for some reason Spreedly.on('input') event doesn't trigger
      if (name === 'number' && event === 'input') {
        Spreedly.validate()
        window.dispatchEvent(new CustomEvent('bink.spreedly.input'))
      }

      if (name === 'number' && event === 'focus') {
        setCardNumberFocus(true)
      }
      if (name === 'number' && event === 'blur') {
        setCardNumberFocus(false)
        window.dispatchEvent(new CustomEvent('bink.spreedly.onblur'))
      }
    })

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

      for (let i = 0; i < errors.length; i++) {
        const error = errors[i]
        console.log(error)
      }
    })

    // todo: to move into config
    Spreedly.init('Yc7xn3gDP73PPOQLEB2BYpv31EV', {
      numberEl: 'bink-spreedly-number',
      cvvEl: 'bink-spreedly-cvv',
    })

    return () => {
      Spreedly.removeHandlers()
    }
  }, [dispatch, onClose])

  const handleExpiryChange = (event) => setExpiry(event.target.value)
  const handleNameChange = (event) => setFullName(event.target.value)

  const handleExpiryBlur = useCallback(() => {
    const errorMessage = isValidExpiry(expiry) ? undefined : 'Invalid expiry'
    setExpiryError(errorMessage)
  }, [expiry])

  const handleNameBlur = useCallback(() => {
    const errorMessage = isValidName(fullName) ? undefined : 'Invalid name'
    setFullNameError(errorMessage)
  }, [fullName])

  const isPaymentFormValid = useCallback(() => isValidName(fullName) && isValidExpiry(expiry), [fullName, expiry])

  const submitForm = (event) => {
    event.preventDefault()
    setIsLoading(true)

    const Spreedly = window.Spreedly
    const [, month, year] = expiry.match(/^\s*(\d+)\/(\d+)\s*$/) || []

    Spreedly.tokenizeCreditCard({
      month,
      year: `20${year}`,
      full_name: fullName,
    })
    return false
  }

  return {
    fullName,
    setFullName,
    fullNameError,
    expiry,
    setExpiry,
    expiryError,
    cardNumberFocus,
    cardNumberError,
    cardNumberLength,
    handleExpiryChange,
    handleExpiryBlur,
    handleNameChange,
    handleNameBlur,
    isPaymentFormValid,
    isLoading,
    submitForm,
  }
}

export default usePaymentCardAddForm
