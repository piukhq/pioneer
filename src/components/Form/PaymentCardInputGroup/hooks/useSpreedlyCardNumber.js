import { useEffect, useState, useMemo } from 'react'

const useSpreedlyCardNumber = (placeholder, error, onChange, onBlur, onReady, numberValidation) => {
  const Spreedly = window.Spreedly
  const [length, setLength] = useState(0)
  const [focus, setFocus] = useState(false)
  const [isIframeReady, setIframeReady] = useState(false)
  const [isNumberInvalid, setIsNumberInvalid] = useState(false)
  const [isTypeInvalid, setIsTypeInvalid] = useState(false)
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
    window.addEventListener('bink.spreedly.blur', onSpreedlyBlur)
    return () => window.removeEventListener('bink.spreedly.blur', onSpreedlyBlur)
  }, [onBlur, isNumberInvalid, isTypeInvalid])

  // useEffect(() => {
  //   const onSpreedlyInput = (event) => {
  //     const { numberLength, validNumber } = event.detail
  //     setLength(numberLength)
  //     onChange && onChange({ isCardNumberValid: validNumber })
  //   }
  //   window.addEventListener('bink.spreedly.input', onSpreedlyInput)
  //   return () => window.removeEventListener('bink.spreedly.input', onSpreedlyInput)
  // }, [onChange, validCardTypes])

  const handleLabelClick = () => {
    Spreedly.transferFocus('number')
  }

  useEffect(() => {
    if (isIframeReady) {
      Spreedly.setStyle('number', Config.spreedlyCardNumberStyle.default)
      if (isNumberInvalid) {
        setErrorMessage('Invalid card number')
        Spreedly.setStyle('number', Config.spreedlyCardNumberStyle.error)
      } else if (isTypeInvalid) {
        setErrorMessage('You can only add Visa, Mastercard or American Express cards')
        Spreedly.setStyle('number', Config.spreedlyCardNumberStyle.error)
      } else {
        setErrorMessage(false)
      }
      numberValidation(!isNumberInvalid && !isTypeInvalid)
    }
  }, [isNumberInvalid, isTypeInvalid, numberValidation, isIframeReady, Spreedly])

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
      if (numberLength > 15) setIsTypeInvalid(!validCardTypes.includes(cardType))
    })

    Spreedly.on('fieldEvent', function (name, type, activeEl, inputProperties) {
      if (name === 'number') {
        switch (type) {
          case 'input':
            // inputProperties.numberLength > 15 && Spreedly.validate()
            window.dispatchEvent(new CustomEvent('bink.spreedly.input', { detail: inputProperties }))
            break
          case 'focus':
            setFocus(true)
            break
          case 'blur':
            Spreedly.validate()
            setFocus(false)
            window.dispatchEvent(new CustomEvent('bink.spreedly.blur'))
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
