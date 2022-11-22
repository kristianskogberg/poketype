export const formatPokedexNumber = (number) => {
  let formatNumber = ''
  const numberString = number.toString()

  if (numberString.length == 1) {
    formatNumber = '00' + numberString
  } else if (numberString.length == 2) {
    formatNumber = '0' + numberString
  } else {
    formatNumber = numberString
  }

  return formatNumber
}
