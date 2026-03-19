import allPokemon from './pokemon.json'
import { formatPokedexNumber } from './formatPokedexNumber'

export const IMAGE_BASE =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork'
export const SHINY_IMAGE_BASE =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny'

export const GEN_LABELS = {
  'generation-i': 'I',
  'generation-ii': 'II',
  'generation-iii': 'III',
  'generation-iv': 'IV',
  'generation-v': 'V',
  'generation-vi': 'VI',
  'generation-vii': 'VII',
  'generation-viii': 'VIII',
  'generation-ix': 'IX',
}

export const pokemonByName = {}
allPokemon.results.forEach((p) => {
  pokemonByName[p.name] = p
})

export const allPokemonList = allPokemon.results

// Pre-computed card items for the home screen FlatList
export const allCardItems = allPokemon.results.map((p) => ({
  id: p.name,
  kind: 'pokemon',
  name: p.displayName,
  types: p.types,
  pokedexNumber: '#' + formatPokedexNumber(p.pokedexNumber),
  rawPokedexNumber: p.pokedexNumber,
  pokemonId: p.id,
  image: `${IMAGE_BASE}/${p.id}.png`,
  searchName: p.name,
  forms: p.forms || null,
}))

export function buildGenSegments(typeOverrides, currentTypes) {
  if (!typeOverrides || typeOverrides.length === 0) return null

  const sorted = [...typeOverrides].sort(
    (a, b) =>
      Object.keys(GEN_LABELS).indexOf(a.generation) -
      Object.keys(GEN_LABELS).indexOf(b.generation),
  )

  const segments = []
  let prevLabel = 'I'

  for (const override of sorted) {
    const endLabel = GEN_LABELS[override.generation]
    const label =
      prevLabel === endLabel
        ? `Gen ${endLabel}`
        : `Gen ${prevLabel}-${endLabel}`
    segments.push({ label, types: override.types })

    const genKeys = Object.keys(GEN_LABELS)
    const nextIndex = genKeys.indexOf(override.generation) + 1
    if (nextIndex < genKeys.length) {
      prevLabel = GEN_LABELS[genKeys[nextIndex]]
    }
  }

  segments.push({ label: `Gen ${prevLabel}+`, types: currentTypes })

  return segments
}
