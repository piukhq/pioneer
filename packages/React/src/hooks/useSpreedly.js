import { useEffect, useState, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { actions as paymentCardsActions } from 'ducks/paymentCards'

const useSpreedly = (setCardNumberValidation, handleErrors, handleSuccess) => {
  const Spreedly = window.Spreedly

  const dispatch = useDispatch()
  const [length, setLength] = useState(0)
  const [focus, setFocus] = useState(false)
  const [isIframeReady, setIframeReady] = useState(false)
  const [isNumberInvalid, setIsNumberInvalid] = useState(false)
  const [isTypeInvalid, setIsTypeInvalid] = useState(false)
  const [hasBlurredFirstTime, setHasBlurredFirstTime] = useState(false) // Mechanism to prevent error messages appearing till the card number field is unfocused first time around.
  const [errorMessage, setErrorMessage] = useState(false)
  const validCardTypes = useMemo(() => ['visa', 'master', 'american_express'], [])

  const handleLabelClick = () => {
    Spreedly.transferFocus('number')
  }

  useEffect(() => {
    if (isIframeReady) {
      Spreedly.setStyle('number', Config.spreedlyCardNumberStyle.default)
      if (isNumberInvalid && hasBlurredFirstTime) {
        setErrorMessage('Invalid card number')
        Spreedly.setStyle('number', Config.spreedlyCardNumberStyle.error)
      } else if (isTypeInvalid && hasBlurredFirstTime) {
        setErrorMessage('You can only add Visa, Mastercard or American Express cards')
        Spreedly.setStyle('number', Config.spreedlyCardNumberStyle.error)
      } else {
        setErrorMessage(false)
      }
    }
  }, [isNumberInvalid, isTypeInvalid, setCardNumberValidation, isIframeReady, Spreedly, hasBlurredFirstTime])

  useEffect(() => {
    const Spreedly = window.Spreedly

    // Triggered whenever the user provided input changes
    const handleInput = (length, cardType) => {
      setLength(length)
      const validLength = cardType === 'american_express' ? 15 : 16

      // Card number is considered invalid if it is not the correct length
      if (length < validLength) {
        setCardNumberValidation(false)
      } else {
        Spreedly.validate()
      }
    }

    Spreedly.on('ready', function () {
      setIframeReady(true)

      // Sets the default field placeholder
      Spreedly.setStyle('number', Config.spreedlyCardNumberStyle.default)
      Spreedly.setPlaceholder('number', 'Card number')
    })

    Spreedly.on('validation', function (inputProperties) {
      const { validNumber, cardType, numberLength } = inputProperties
      setLength(numberLength)
      const isValidCardType = validCardTypes.includes(cardType)
      setIsNumberInvalid(!validNumber)
      setIsTypeInvalid(!isValidCardType)

      // Sent to the usePaymentCardAddForm hook to state whether this field is valid or not
      setCardNumberValidation(validNumber && isValidCardType)
    })

    Spreedly.on('fieldEvent', function (name, type, activeEl, inputProperties) {
      const { numberLength, cardType } = inputProperties
      if (name === 'number') {
        switch (type) {
          case 'input':
            handleInput(numberLength, cardType)
            break
          case 'focus':
            setFocus(true)
            break
          case 'blur':
            Spreedly.validate()
            setFocus(false)
            setHasBlurredFirstTime(true)
            break
          default:
        }
      }
    })

    Spreedly.on('paymentMethod', async function (token, pmData) {
      const successfulResponse = await dispatch(paymentCardsActions.addPaymentCard(
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

      if (successfulResponse) {
        // Sent to the usePaymentCardAddForm hook to act upon successful payment card addition
        handleSuccess()
      }
    })

    Spreedly.on('errors', function (errors) {
      // Sent to the usePaymentCardAddForm hook to handle form errors
      handleErrors(errors)
    })

    try {
      Spreedly.init(Config.spreedlyEnvironmentKey, {
        numberEl: 'bink-spreedly-number',
        cvvEl: 'bink-spreedly-cvv',
      })
    } catch (err) {
      console.error(err)
    }

    return () => {
      Spreedly.removeHandlers()
    }
  }, [dispatch, validCardTypes, handleErrors, handleSuccess, setCardNumberValidation])

  return {
    focus,
    length,
    handleLabelClick,
    errorMessage,
  }
}

export default useSpreedly
