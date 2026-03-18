import { useState, useEffect, useRef, useCallback } from 'react'

import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Platform,
} from 'react-native'

import axios from 'axios'

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

const pokemonSuggestions = [
  ...allPokemon.results.map((p) => ({
    id: p.url,
    title: CapitalizeFirstLetter(p.name),
  })),
  ...allTypes.map((t) => ({
    id: t,
    title: CapitalizeFirstLetter(t) + ' (Type)',
  })),
]

export default function HomeScreen() {
  const [selectedItem, setSelectedItem] = useState('')

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [types, setTypes] = useState([])
  const [pokedexNumber, setPokedexNumber] = useState('')
  const [name, setName] = useState('')

  const [error, setError] = useState(null)
  const searchRef = useRef(null)
  const [currentImage, setCurrentImage] = useState('')

  const calculateByType = useCallback((typeName) => {
    setName(CapitalizeFirstLetter(typeName))
    setCurrentImage(null)
    setPokedexNumber('Type')
    setTypes([typeName])
    setData(typeName)
    searchRef.current.clear()
    setLoading(false)
  }, [])

  useEffect(() => {
    if (!selectedItem) return

    setError(null)

    if (allTypes.includes(selectedItem['id'])) {
      calculateByType(selectedItem['id'])
      return
    }

    const fetchPokemonData = async () => {
      const url = selectedItem['id']
      setData(null)

      if (!url) return

      try {
        setError(null)
        setLoading(true)
        const response = await axios.get(url)
        const result = response.data

        const speciesResponse = await axios.get(result.species.url)

        setCurrentImage(
          result['sprites']['other']['official-artwork']['front_default'],
        )

        const pokedexNum = formatPokedexNumber(
          speciesResponse.data.pokedex_numbers[0].entry_number,
        )

        setPokedexNumber('#' + pokedexNum)
        setName(CapitalizeFirstLetter(result['species']['name']))

        const newTypes = result.types.map((t) => t.type.name)
        setTypes(newTypes)

        setLoading(false)
        setData(result)
        searchRef.current.clear()
      } catch (err) {
        setError(err)
        setLoading(false)
      }
    }

    fetchPokemonData()
  }, [selectedItem, calculateByType])

  return (
    <View style={styles.container}>
      {!data && !loading ? (
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
          onSelectItem={setSelectedItem}
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

      {loading ? (
        <ActivityIndicator style={{ margin: 50 }}></ActivityIndicator>
      ) : null}

      {error && !data && !loading ? (
        <Text style={{ margin: 10 }}>Error: {error?.message}</Text>
      ) : null}

      {data ? (
        <ScrollView style={{ zIndex: 1 }}>
          <>
            <Card
              pokemonName={name}
              image={currentImage}
              types={types}
              pokedexNumber={pokedexNumber}
              calculateByType={calculateByType}
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
