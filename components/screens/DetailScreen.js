import { useState, useCallback } from 'react'
import { StyleSheet, View, ScrollView, Dimensions, Platform, StatusBar } from 'react-native'
import useReviewPrompt from '../../hooks/useReviewPrompt'
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

export default function DetailScreen({ route, navigation }) {
  const { kind, id } = route.params
  const isType = kind === 'type'
  const pokemon = isType ? null : pokemonByName[id]

  useReviewPrompt(!isType)

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

  const name = isType ? CapitalizeFirstLetter(id) : pokemon.displayName
  const pokedexNumber = isType
    ? 'Type'
    : '#' + formatPokedexNumber(pokemon.pokedexNumber)
  const forms = isType ? null : pokemon.forms || null

  const calculateByType = useCallback(
    (typeName) => {
      navigation.push('Detail', { kind: 'type', id: typeName })
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
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Card
        pokemonName={name}
        image={currentImage}
        types={types}
        pokedexNumber={pokedexNumber}
        forms={forms}
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
        <TypeCalc
          typeArray={types}
          selectedTypeIndex={selectedTypeIndex}
          onSelectType={setSelectedTypeIndex}
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
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  content: {
    paddingBottom: 48,
  },
})
