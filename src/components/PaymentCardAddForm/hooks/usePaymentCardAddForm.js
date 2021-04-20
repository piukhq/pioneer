import { useEffect, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { actions as paymentCardsActions } from 'ducks/paymentCards'
import { isValidName, isValidExpiry } from 'utils/validation'

// todo: to further break down this hook
const usePaymentCardAddForm = (onClose) => {
  const [fullName, setFullName] = useState('')
  const [expiry, setExpiry] = useState('')
  const [shouldDisplayNameError, setDisplayNameError] = useState(false)
  const [shouldDisplayExpiryError, setDisplayExpiryError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    const Spreedly = window.Spreedly

    Spreedly.on('ready', function () {
      Spreedly.setStyle('number', 'width: 100%; font-size: 16px; line-height: 23px; box-sizing: border-box')
      Spreedly.setPlaceholder('number', 'Card number')
      Spreedly.setNumberFormat('prettyFormat')
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
    setDisplayExpiryError(!isValidExpiry(expiry))
  }, [expiry])

  const handleNameBlur = useCallback(() => {
    isValidName(fullName) ? setDisplayNameError(false) : setDisplayNameError(true)
  }, [fullName])

  const isPaymentFormValid = useCallback(() => {
    return fullName !== '' && isValidName(fullName) && expiry !== '' && isValidExpiry(expiry)
  }, [fullName, expiry])

  const submitForm = () => {
    setIsLoading(true)

    const Spreedly = window.Spreedly
    const [, month, year] = expiry.match(/^\s*(\d+)\/(\d+)\s*$/) || []

    Spreedly.tokenizeCreditCard({
      month,
      year,
      full_name: fullName,
    })
    return false
  }

  return {
    fullName,
    setFullName,
    expiry,
    setExpiry,
    shouldDisplayNameError,
    shouldDisplayExpiryError,
    handleExpiryChange,
    handleExpiryBlur,
    handleNameChange,
    handleNameBlur,
    isPaymentFormValid,
    isLoading,
    setIsLoading,
    submitForm,
  }
}

export default usePaymentCardAddForm
