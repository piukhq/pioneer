const dayShortMonthYear = (unformattedDate) => { // e.g. 19 Jan 1977
  return `${unformattedDate.getDate()} ${unformattedDate.toLocaleString('en-uk', { month: 'short' })} ${unformattedDate.getFullYear()}`
}

export { dayShortMonthYear }
