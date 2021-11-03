
const isValidEmail = (email) => {
  const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
  return email.match(re)
}

const isValidName = (fullName) => {
  const re = /\S/
  return fullName.match(re)
}

const isValidExpiry = (expiry) => {
  const { MM: month, YY: year } = expiry
  if (month !== undefined && year !== undefined) {
    return !checkIsPaymentCardExpired(month, `20${year}`)
  }
  return false
}

// Check if date of birth is in the past
const isValidDateOfBirth = (dateOfBirth) => {
  const { DD: day, MM: month, YYYY: year } = dateOfBirth
  if (day !== undefined && month !== undefined && year !== undefined) {
    const date = new Date(year, month - 1, day)
    const currentDate = new Date()
    return (date < currentDate)
  }
  return false
}

const checkIsPaymentCardExpired = (expiryMonth, expiryYear) => {
  const now = new Date()
  const currentMonthDate = new Date(now.getFullYear(), now.getMonth(), 1)
  const expiryDate = new Date(expiryYear, expiryMonth - 1, 1)

  return expiryDate.getTime() < currentMonthDate.getTime()
}

export { isValidEmail, isValidName, isValidExpiry, isValidDateOfBirth, checkIsPaymentCardExpired }
