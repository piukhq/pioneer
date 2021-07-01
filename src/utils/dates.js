const getDateFromUnixTimestamp = (timestamp) => { // converts UNIX timestamps used in API to JS dates
  return new Date(timestamp * 1000)
}
const dayShortMonthYear = (unformattedDate) => { // returns formatted string e.g. 19 Jan 1977
  return `${unformattedDate.getDate()} ${unformattedDate.toLocaleString('en-uk', { month: 'short' })} ${unformattedDate.getFullYear()}`
}

const getExpiryDates = () => {
  // Get the last 2 digits of the current year
  const currentYear = parseInt(new Date().getFullYear().toString().substr(-2))

  // Length of 21 allows for current year plus 20 years into the future
  const years = Array.apply(null, { length: 21 }).map((_, index) => currentYear + index)

  // Allows for a zero to be displayed before single digit numbers
  const months = Array.apply(null, { length: 12 }).map((_, index) => ('0' + (index + 1)).slice(-2))

  // Object keys are used in the expiry date dropdown menus
  return {
    MM: months,
    YY: years,
  }
}

export { dayShortMonthYear, getExpiryDates, getDateFromUnixTimestamp }
