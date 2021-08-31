const shortDateFromTimestamp = (timestamp) => { // single method to convert UNIX timestamp to a JS date and format it as e.g. 1 Apr 2024
  const unformattedDate = new Date(timestamp * 1000)
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

const getDOBDates = () => {
  const currentYear = parseInt(new Date().getFullYear().toString())

  // Length of 101 allows for 100 years before the current year
  const years = Array.apply(null, { length: 101 }).map((_, index) => (currentYear - index))

  // Allows for a zero to be displayed before single digit numbers
  const months = Array.apply(null, { length: 12 }).map((_, index) => ('0' + (index + 1)).slice(-2)).reverse()

  const days = Array.apply(null, { length: 31 }).map((_, index) => ('0' + (index + 1)).slice(-2)).reverse()

  // Object keys are used in the expiry date dropdown menus
  return {
    DD: days,
    MM: months,
    YYYY: years,
  }
}

export { getExpiryDates, shortDateFromTimestamp, getDOBDates }
