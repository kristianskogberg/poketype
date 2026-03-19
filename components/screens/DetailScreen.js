import { useState, useCallback } from 'react'
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native'
import Card from '../Card'
import TypeCalc from '../TypeCalculator'
import { CapitalizeFirstLetter } from '../../assets/utils/capitalizeFirstLetter'
import { formatPokedexNumber } from '../../assets/utils/formatPokedexNumber'
import {
  IMAGE_BASE,
  SHINY_IMAGE_BASE,
  pokemonByName,
  buildGenSegments,
} from '../../assets/utils/pokemonData'
import { addRecentSearch } from '../../assets/utils/useRecentSearches'

export default function DetailScreen({ route, navigation }) {
  const { kind, id } = route.params
  const isType = kind === 'type'
  const pokemon = isType ? null : pokemonByName[id]

  const initialTypes = isType ? [id] : pokemon.types
  const initialSegments = isType
    ? null
    : buildGenSegments(pokemon.typeOverrides, pokemon.types)

  const [types, setTypes] = useState(initialTypes)
  const [genSegments] = useState(initialSegments)
  const [activeSegment, setActiveSegment] = useState(
    initialSegments ? initialSegments.length - 1 : null,
  )
  const [selectedTypeIndex, setSelectedTypeIndex] = useState(0)
  const [isShiny, setIsShiny] = useState(false)
  const [currentImage, setCurrentImage] = useState(
    isType ? null : `${IMAGE_BASE}/${pokemon.id}.png`,
  )

  const name = isType
    ? CapitalizeFirstLetter(id)
    : CapitalizeFirstLetter(pokemon.speciesName)
  const pokedexNumber = isType
    ? 'Type'
    : '#' + formatPokedexNumber(pokemon.pokedexNumber)

  const calculateByType = useCallback(
    (typeName) => {
      navigation.push('Detail', { kind: 'type', id: typeName })
      addRecentSearch({
        kind: 'type',
        id: typeName,
        name: CapitalizeFirstLetter(typeName),
        types: [typeName],
        pokedexNumber: null,
        pokemonId: null,
      })
    },
    [navigation],
  )

  const onSelectGenSegment = useCallback(
    (index) => {
      if (!genSegments) return
      setActiveSegment(index)
      setTypes(genSegments[index].types)
      setSelectedTypeIndex(0)
    },
    [genSegments],
  )

  const toggleShiny = useCallback(() => {
    if (!pokemon) return
    setIsShiny((prev) => {
      const next = !prev
      const base = next ? SHINY_IMAGE_BASE : IMAGE_BASE
      setCurrentImage(`${base}/${pokemon.id}.png`)
      return next
    })
  }, [pokemon])

  return (
    <ScrollView style={styles.container}>
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
        selectedTypeIndex={selectedTypeIndex}
        onSelectType={setSelectedTypeIndex}
      />
      <View
        style={{
          flex: 1,
          alignItems: 'flex-start',
          width: Dimensions.get('window').width,
        }}>
        <TypeCalc
          typeArray={types.length > 1 ? [types[selectedTypeIndex]] : types}
          calculateByType={calculateByType}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})
