// Returns number formatted to specified decimal place
const formatValueToDecimalPlace = (value, decimalPlace) => Number(value).toFixed(decimalPlace)
const convertMinutesToMilliseconds = (value) => value * 60 * 1000

export { formatValueToDecimalPlace, convertMinutesToMilliseconds }
