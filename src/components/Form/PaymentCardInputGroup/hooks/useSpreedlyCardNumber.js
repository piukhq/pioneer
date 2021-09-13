import { useEffect, useState, useMemo } from 'react'

const useSpreedlyCardNumber = (placeholder, error, onChange, onBlur, onReady, setCardNumberValidation) => {
  const Spreedly = window.Spreedly
  const [length, setLength] = useState(0)
  const [focus, setFocus] = useState(false)
  const [isIframeReady, setIframeReady] = useState(false)
  const [isNumberInvalid, setIsNumberInvalid] = useState(false)
  const [isTypeInvalid, setIsTypeInvalid] = useState(false)
  const [hasBlurredFirstTime, setHasBlurredFirstTime] = useState(false) // Mechanism to prevent error messages appearing till the card number field is unfocused first time around.
  const [errorMessage, setErrorMessage] = useState(false)
  const validCardTypes = useMemo(() => ['visa', 'master', 'american_express'], [])

  useEffect(() => {
    const Spreedly = window.Spreedly

    const onSpreedlyReady = () => {
      Spreedly.setStyle('number', Config.spreedlyCardNumberStyle.default)
      Spreedly.setPlaceholder('number', placeholder)
      onReady && onReady()
    }
    window.addEventListener('bink.spreedly.ready', onSpreedlyReady)
    return () => window.removeEventListener('bink.spreedly.ready', onSpreedlyReady)
  }, [onReady, placeholder])

  useEffect(() => {
    const onSpreedlyBlur = () => {
      onBlur && onBlur(isNumberInvalid, isTypeInvalid)
    }
    setCardNumberValidation(!isNumberInvalid && !isTypeInvalid && length) // The length check here prevents a card number with no length (which is not considered invalid yet, consider refactoring) enabling the submit button.
    window.addEventListener('bink.spreedly.blur', onSpreedlyBlur)
    return () => window.removeEventListener('bink.spreedly.blur', onSpreedlyBlur)
  }, [onBlur, isNumberInvalid, isTypeInvalid, setCardNumberValidation, length])

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
    Spreedly.on('ready', function () {
      setIframeReady(true)
      window.dispatchEvent(new CustomEvent('bink.spreedly.ready'))
    })

    Spreedly.on('validation', function (inputProperties) {
      const { validNumber, cardType, numberLength } = inputProperties
      setLength(numberLength)
      setIsNumberInvalid(!validNumber)
      if (numberLength >= 8) { // the maximum amount of digits used to identify a card type in card numbers
        setIsTypeInvalid(!validCardTypes.includes(cardType))
      }
    })

    Spreedly.on('fieldEvent', function (name, type, activeEl, inputProperties) {
      const { numberLength, cardType } = inputProperties
      if (name === 'number') {
        switch (type) {
          case 'input':
            setLength(numberLength)
            window.dispatchEvent(new CustomEvent('bink.spreedly.input', { detail: inputProperties }))
            if (numberLength >= 16 || (numberLength === 15 && cardType === 'american_express')) Spreedly.validate() // To support enable an immediate validation when correcting a wrong card number on completion
            break
          case 'focus':
            setFocus(true)
            break
          case 'blur':
            Spreedly.validate()
            setFocus(false)
            window.dispatchEvent(new CustomEvent('bink.spreedly.blur'))
            setHasBlurredFirstTime(true)
            break
          default:
        }
      }
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
  }, [validCardTypes])

  return {
    focus,
    length,
    handleLabelClick,
    errorMessage,
  }
}

export default useSpreedlyCardNumber
