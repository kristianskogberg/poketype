import { useState, useRef, useCallback } from 'react'

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Platform,
} from 'react-native'

import commonStyles from '../../assets/styles/commonStyles'
import TypeCalc from '../TypeCalculator'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'
import { bgColor, textColor } from '../../assets/utils/colors'
import Card from '../Card'
import { allTypes } from '../../assets/utils/types'
import allPokemon from '../../assets/utils/pokemon.json'
import PokeBall from '../../assets/images/pokeball_grey.svg'
import { CapitalizeFirstLetter } from '../../assets/utils/capitalizeFirstLetter'
import { formatPokedexNumber } from '../../assets/utils/formatPokedexNumber'
import Footer from '../Footer'

const GEN_LABELS = {
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

// Build generation segments from typeOverrides
// e.g. [{generation: "generation-v", types: ["normal"]}] with current types ["fairy"]
// => [{label: "Gen I-V", types: ["normal"]}, {label: "Gen VI+", types: ["fairy"]}]
function buildGenSegments(typeOverrides, currentTypes) {
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

const IMAGE_BASE =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork'
const SHINY_IMAGE_BASE =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny'

// Build a lookup map by pokemon name for instant access
const pokemonByName = {}
allPokemon.results.forEach((p) => {
  pokemonByName[p.name] = p
})

const pokemonSuggestions = [
  ...allPokemon.results.map((p) => ({
    id: p.name,
    title: CapitalizeFirstLetter(p.name),
  })),
  ...allTypes.map((t) => ({
    id: t,
    title: CapitalizeFirstLetter(t) + ' (Type)',
  })),
]

export default function HomeScreen() {
  const [data, setData] = useState(null)
  const [types, setTypes] = useState([])
  const [pokedexNumber, setPokedexNumber] = useState('')
  const [name, setName] = useState('')

  const searchRef = useRef(null)
  const [currentImage, setCurrentImage] = useState('')
  const [isShiny, setIsShiny] = useState(false)
  const [currentPokemonId, setCurrentPokemonId] = useState(null)
  const [genSegments, setGenSegments] = useState(null)
  const [activeSegment, setActiveSegment] = useState(null)

  const calculateByType = useCallback((typeName) => {
    setName(CapitalizeFirstLetter(typeName))
    setCurrentImage(null)
    setCurrentPokemonId(null)
    setIsShiny(false)
    setGenSegments(null)
    setActiveSegment(null)
    setPokedexNumber('Type')
    setTypes([typeName])
    setData(typeName)
    searchRef.current.clear()
  }, [])

  const selectPokemon = useCallback(
    (selectedItem) => {
      if (!selectedItem) return

      if (allTypes.includes(selectedItem.id)) {
        calculateByType(selectedItem.id)
        return
      }

      const pokemon = pokemonByName[selectedItem.id]
      if (!pokemon) return

      setCurrentPokemonId(pokemon.id)
      setIsShiny(false)
      setCurrentImage(`${IMAGE_BASE}/${pokemon.id}.png`)
      setPokedexNumber('#' + formatPokedexNumber(pokemon.pokedexNumber))
      setName(CapitalizeFirstLetter(pokemon.speciesName))
      setTypes(pokemon.types)

      const segments = buildGenSegments(pokemon.typeOverrides, pokemon.types)
      setGenSegments(segments)
      setActiveSegment(segments ? segments.length - 1 : null)

      setData(pokemon)
      searchRef.current.clear()
    },
    [calculateByType],
  )

  const onSelectGenSegment = useCallback(
    (index) => {
      if (!genSegments) return
      setActiveSegment(index)
      setTypes(genSegments[index].types)
    },
    [genSegments],
  )

  const toggleShiny = useCallback(() => {
    if (!currentPokemonId) return
    setIsShiny((prev) => {
      const next = !prev
      const base = next ? SHINY_IMAGE_BASE : IMAGE_BASE
      setCurrentImage(`${base}/${currentPokemonId}.png`)
      return next
    })
  }, [currentPokemonId])

  return (
    <View style={styles.container}>
      {!data ? (
        <>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={commonStyles.heading}>PokeType</Text>
            <Text style={commonStyles.subHeading}>
              Search for a Pokémon by name or type to view its strengths and
              weaknesses.
            </Text>
          </View>
          <Footer />
        </>
      ) : null}

      <View
        style={{
          zIndex: 10,
          position: Platform.OS == 'ios' ? 'absolute' : 'relative',
          backgroundColor: !data ? '#fff' : bgColor[types[0]],
          width: Dimensions.get('window').width,
          paddingHorizontal: 16,
          paddingTop: 8,
        }}>
        <AutocompleteDropdown
          dataSet={pokemonSuggestions}
          inputContainerStyle={{
            backgroundColor: '#F2F2F2',
            borderRadius: 5,
            paddingVertical: 0,
          }}
          flatListProps={{ scrollEnabled: true }}
          listContainerStyle={{
            height: pokemonSuggestions.length * 70,
            marginTop: 0,
          }}
          suggestionsListContainerStyle={{
            marginTop: 0,
          }}
          controller={(controller) => {
            searchRef.current = controller
          }}
          direction={'down'}
          clearOnFocus={false}
          closeOnBlur={false}
          showChevron={false}
          closeOnSubmit={false}
          onSelectItem={selectPokemon}
          textInputProps={{
            placeholder: 'Search for a Pokémon or Type...',
            placeholderTextColor: textColor.grey,
            style: {
              borderRadius: 100,
            },
          }}
          suggestionsListMaxHeight={Dimensions.get('window').height}
          EmptyResultComponent={
            <Text
              style={{
                color: textColor.black,
                padding: 10,
                textAlign: 'center',
                fontSize: 16,
              }}>
              Nothing found
            </Text>
          }
        />
      </View>

      {data ? (
        <ScrollView style={{ zIndex: 1 }}>
          <>
            <Card
              pokemonName={name}
              image={currentImage}
              types={types}
              pokedexNumber={pokedexNumber}
              calculateByType={calculateByType}
              onImagePress={toggleShiny}
              genSegments={genSegments}
              activeSegment={activeSegment}
              onSelectGenSegment={onSelectGenSegment}
            />

            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
                width: Dimensions.get('window').width,
              }}>
              <ScrollView>
                <TypeCalc typeArray={types} calculateByType={calculateByType} />
              </ScrollView>
            </View>
          </>
        </ScrollView>
      ) : null}

      {!data ? (
        <View
          style={{
            position: 'absolute',
            height: Dimensions.get('window').height,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <PokeBall fill={'black'} width={200} height={200} />
        </View>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
})
