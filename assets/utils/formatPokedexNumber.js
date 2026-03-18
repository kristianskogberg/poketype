/**
 * format the Pokedex number with zeros if needed
 * @param {Number} number
 * @returns formatted number as a String (ex. 001)
 */
export const formatPokedexNumber = (number) => {
  return number.toString().padStart(3, '0')
}
