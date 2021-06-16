
const isValidEmail = (email) => {
  const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
  return email.match(re)
}

const isValidName = (fullName) => {
  const re = /\S/
  return fullName.match(re)
}

const isValidExpiry = (expiry) => {
  // Spreedly API handles expiry date validation
  return expiry.MM !== undefined && expiry.YY !== undefined
}

const checkIsPaymentCardExpired = (expiryMonth, expiryYear) => {
  const now = new Date()
  const currentMonthDate = new Date(now.getFullYear(), now.getMonth(), 1)
  const expiryDate = new Date(expiryYear, expiryMonth - 1, 1)

  return expiryDate.getTime() < currentMonthDate.getTime()
}

export { isValidEmail, isValidName, isValidExpiry, checkIsPaymentCardExpired }
