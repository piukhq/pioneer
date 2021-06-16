const dayShortMonthYear = (unformattedDate) => { // e.g. 19 Jan 1977
  return `${unformattedDate.getDate()} ${unformattedDate.toLocaleString('en-uk', { month: 'short' })} ${unformattedDate.getFullYear()}`
}

const getExpiryDates = () => {
  // Get the last 2 digits of the surrent year
  const currentYear = parseInt(new Date().getFullYear().toString().substr(-2))

  // length of 21 allows for current year plus 20 years into the future
  const years = Array.apply(null, { length: 21 }).map((_, index) => currentYear + index)
  const months = Array.apply(null, { length: 12 }).map((_, index) => index + 1)

  // Object keys are used in the expiry date dropdown menus
  return {
    MM: months,
    YY: years,
  }
}

export { dayShortMonthYear, getExpiryDates }
