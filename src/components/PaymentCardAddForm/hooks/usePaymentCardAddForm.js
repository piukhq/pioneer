import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { actions as paymentCardsActions } from 'ducks/paymentCards'

// todo: to further break down this hook
const usePaymentCardAddForm = (onClose) => {
  const [formPhase, setFormPhase] = useState(1)
  const [fullName, setFullName] = useState('')
  const [expiry, setExpiry] = useState('')
  const [iframeLoaded, setIframeLoaded] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    const Spreedly = window.Spreedly

    Spreedly.on('ready', function () {
      Spreedly.setStyle('number', 'width: 100%; font-size: 16px; line-height: 23px; box-sizing: border-box')
      Spreedly.setPlaceholder('number', 'Card number')
      Spreedly.setNumberFormat('prettyFormat')
      setIframeLoaded(true)
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

      if (newCard) {
        onClose && onClose()
      }
    })

    Spreedly.on('errors', function (errors) {
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

  const submitForm = (event) => {
    event.preventDefault()

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
    formPhase,
    setFormPhase,
    fullName,
    setFullName,
    expiry,
    setExpiry,
    iframeLoaded,
    submitForm,
  }
}

export default usePaymentCardAddForm
