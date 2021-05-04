import { useEffect, useState } from 'react'
import Config from 'Config'

const useSpreedlyCardNumber = (error, onChange, onBlur, onReady) => {
  const [length, setLength] = useState(0)
  const [focus, setFocus] = useState(false)
  const [isIframeReady, setIframeReady] = useState(false)
  const [valid, setValid] = useState(false)

  useEffect(() => {
    const Spreedly = window.Spreedly

    const onSpreedlyReady = () => {
      Spreedly.setStyle('number', decodeURIComponent(Config.spreedlyCardNumberStyle.default))
      Spreedly.setPlaceholder('number', 'Card number')
      Spreedly.setNumberFormat('prettyFormat')

      onReady && onReady()
    }
    window.addEventListener('bink.spreedly.ready', onSpreedlyReady)
    return () => window.removeEventListener('bink.spreedly.ready', onSpreedlyReady)
  }, [onReady])

  useEffect(() => {
    const onSpreedlyBlur = () => {
      onBlur && onBlur()
    }
    window.addEventListener('bink.spreedly.blur', onSpreedlyBlur)
    return () => window.removeEventListener('bink.spreedly.blur', onSpreedlyBlur)
  }, [onBlur])

  useEffect(() => {
    const onSpreedlyInput = () => {
      onChange && onChange({ valid })
    }
    window.addEventListener('bink.spreedly.input', onSpreedlyInput)
    return () => window.removeEventListener('bink.spreedly.input', onSpreedlyInput)
  }, [onChange, valid])

  useEffect(() => {
    const Spreedly = window.Spreedly

    if (isIframeReady) {
      if (error) {
        Spreedly.setStyle('number', decodeURIComponent(Config.spreedlyCardNumberStyle.error))
      } else {
        Spreedly.setStyle('number', decodeURIComponent(Config.spreedlyCardNumberStyle.default))
      }
    }
  }, [error, isIframeReady])

  useEffect(() => {
    const Spreedly = window.Spreedly

    Spreedly.on('ready', function () {
      setIframeReady(true)
      window.dispatchEvent(new CustomEvent('bink.spreedly.ready'))
    })

    Spreedly.on('validation', function ({ numberLength, validNumber }) {
      setLength(numberLength)
      setValid(validNumber)
    })

    Spreedly.on('fieldEvent', function (name, event) {
      // note: for some reason Spreedly.on('input') event doesn't trigger
      if (name === 'number' && event === 'input') {
        Spreedly.validate()
        window.dispatchEvent(new CustomEvent('bink.spreedly.input'))
      }

      if (name === 'number' && event === 'focus') {
        setFocus(true)
      }
      if (name === 'number' && event === 'blur') {
        setFocus(false)
        window.dispatchEvent(new CustomEvent('bink.spreedly.blur'))
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
  }, [])

  return {
    focus,
    length,
  }
}

export default useSpreedlyCardNumber
