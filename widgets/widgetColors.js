const TYPE_BG_COLOR = {
  bug: '#8BD674',
  dark: '#6F6E78',
  dragon: '#7383B9',
  electric: '#F2CB55',
  fairy: '#EBA8C3',
  fighting: '#EB4971',
  fire: '#FFA756',
  flying: '#83A2E3',
  ghost: '#8571BE',
  grass: '#8BBE8A',
  ground: '#F78551',
  ice: '#91D8DF',
  normal: '#B5B9C4',
  poison: '#9F6E97',
  psychic: '#FF6568',
  rock: '#D4C294',
  steel: '#4C91B2',
  water: '#58ABF6',
}

function effectivenessColor(multiplier) {
  if (multiplier >= 4) return '#C62828'
  if (multiplier >= 2) return '#E65100'
  if (multiplier === 1) return '#E0E0E0'
  if (multiplier === 0.5) return '#90CAF9'
  if (multiplier === 0.25) return '#42A5F5'
  if (multiplier === 0) return '#424242'
  return '#E0E0E0'
}

module.exports = { TYPE_BG_COLOR, effectivenessColor }
