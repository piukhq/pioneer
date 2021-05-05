import React, { useState, useCallback } from 'react'
import PaymentCardInputGroup from 'components/Form/PaymentCardInputGroup'

const PaymentCardInputGroupExample = () => {
  const [error, setError] = useState(false)
  const [valid, setValid] = useState(false)
  const handleBlur = useCallback(() => {
    if (!valid) {
      setError('Invalid card number')
    } else {
      setError(false)
    }
  }, [valid, setError])
  const handleChange = useCallback(({ valid }) => {
    setValid(valid)
    setError(false)
  }, [setValid, setError])
  return (
    <PaymentCardInputGroup
      label='Card number'
      placeholder='Card number'
      error={error}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  )
}

export default PaymentCardInputGroupExample
