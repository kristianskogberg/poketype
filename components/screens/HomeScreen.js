import React, { useState, useEffect, useRef } from 'react'

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

import { SafeAreaView } from 'react-native-safe-area-context'
import commonStyles from '../../assets/styles/commonStyles'
import TypeCalc from '../typeCalculator'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'
import { textColor } from '../../assets/utils/colors'
import Card from '../card'
import { bgColor } from '../../assets/utils/colors'
import { allTypes } from '../../assets/utils/types'
import allPokemon from '../../assets/utils/pokemon.json'
import PokeBall from '../../assets/images/pokeball_grey.svg'
import { CapitalizeFirstLetter } from '../../assets/utils/capitalizeFirstLetter'
import { formatPokedexNumber } from '../../assets/utils/formatPokedexNumber'
import Footer from '../Footer'

// Main UI component
export default function HomeScreen() {
  const [selectedItem, setSelectedItem] = useState('')

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [types, setTypes] = useState([])
  const [pokedexNumber, setPokedexNumber] = useState('')
  const [name, setName] = useState('')
  const [pokemonData, setPokemonData] = useState([])

  const [error, setError] = useState(null)
  const searchRef = useRef(null)
  const [currentImage, setCurrentImage] = useState('')

  /**
   * when the app starts, get the names of all Pokemon from a JSON file
   */
  useEffect(() => {
    setData(null)
    setLoading(false)
    getPokemonNames()
  }, [])

  /**
   * get the names for each Pokemon and types and
   * set them as the pokemonData state (for the suggestions list)
   */
  function getPokemonNames() {
    // format the data first
    const formattedData = []

    allPokemon['results'].forEach((pokemon) => {
      // push all pokemon to the suggestions list

      formattedData.push({
        id: pokemon.url,
        title: CapitalizeFirstLetter(pokemon.name),
      })
    })

    // push types
    allTypes.forEach((type) => {
      formattedData.push({
        id: type,
        title: CapitalizeFirstLetter(type) + ' (Type)',
      })
    })

    setPokemonData(formattedData)
  }

  /**
   * set the type name so that TypeCalc can perform calculations
   * this function is only called when the user taps a type
   * (either from the dropdown menu or taps a type element)
   * @param {String} type
   */
  function calculateByType(typeName) {
    setName(CapitalizeFirstLetter(typeName))
    setCurrentImage(null)
    setPokedexNumber('Type')
    setTypes([typeName])
    setData(typeName)

    clearInputField()
    setLoading(false)
  }

  function clearInputField() {
    searchRef.current.clear()
  }

  /**
   * Fetch data for the selected Pokemon using PokeAPI
   * this function is only called when the user taps
   * a name of a Pokemon from the dropdown list
   * @returns data for the selected Pokemon
   */
  async function fetchPokemonData() {
    const url = selectedItem['id']
    setData(null)

    if (!selectedItem['id']) return

    // fetch data and catch possible errors
    try {
      setError(null)
      setLoading(true)
      const response = await axios.get(url)
      const result = response.data

      const speciesResponse = await axios.get(result.species.url)

      setCurrentImage(
        result['sprites']['other']['official-artwork']['front_default']
      )

      const pokedexNumber = formatPokedexNumber(
        speciesResponse.data.pokedex_numbers[0].entry_number
      )

      setPokedexNumber('#' + pokedexNumber)

      setName(CapitalizeFirstLetter(result['species']['name']))
      setTypes([])

      for (let i = 0; i < result.types.length; i++) {
        setTypes((types) => [...types, result.types[i].type.name])
      }
      setLoading(false)

      setData(result)
      clearInputField()
    } catch (error) {
      // error happened
      setError(error)
      setLoading(false)
    }
  }

  // execute every time the user taps a Pokemon or Type
  // drom the dropdown menu
  useEffect(() => {
    if (!selectedItem) return

    setError(null)

    // check if tapped item is a type
    // if it is, it can be calculated without the API
    if (allTypes.includes(selectedItem['id'])) {
      // input is type
      calculateByType(selectedItem['id'])
      return
    }

    // input is a Pokemon, call the API with tapped Pokemon
    fetchPokemonData()
  }, [selectedItem])

  // return null until the JSON file has been loaded
  // in getPokemonData()
  if (!pokemonData) return null

  return (
    <SafeAreaView style={styles.container}>
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

      {/* Pokemon Search / Dropdown menu */}
      <View
        style={{
          zIndex: 10,
          position: Platform.OS == 'ios' ? 'absolute' : 'relative',
          backgroundColor: !data ? '#fff' : bgColor[types[0]],
          width: Dimensions.get('window').width,
          paddingHorizontal: 16,
        }}>
        <AutocompleteDropdown
          dataSet={pokemonData}
          inputContainerStyle={{
            backgroundColor: 'transparent',
            //width: Dimensions.get('window').width - 60,
            borderRadius: 5,
            paddingVertical: 0,
            backgroundColor: '#F2F2F2',
          }}
          flatListProps={{ scrollEnabled: true }}
          listContainerStyle={{
            height: pokemonData.length * 70,
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
              //color: textColor.black,
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
              inputIsType={true}
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

      {/* BACKGROUND */}
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
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    //marginTop: StatusBar.currentHeight,
    //marginTop: 40,
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  maintext: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth: 1,
    padding: 8,
    margin: 8,
    width: '80%',
    borderRadius: 10,
    backgroundColor: '#F2F2F2',
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    color: '#424242',
    fontSize: 16,
  },
  flatList: {
    paddingLeft: 15,
    marginTop: 15,
    paddingBottom: 15,
    fontSize: 18,
    borderBottomColor: '#26a69a',
    borderBottomWidth: 1,
  },
})
