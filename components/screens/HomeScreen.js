import React, { useState, useEffect, useRef } from 'react'

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native'

import axios from 'axios'

import { SafeAreaView } from 'react-native-safe-area-context'
import commonStyles from '../../assets/styles/commonStyles'
import TypeCalc from '../typeCalculator'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'
import { textColor } from '../../assets/utils/colors'
import Card from '../card'

import allTypes from '../../assets/utils/types'
import formatPokemonForms from '../../assets/utils/formatPokemonForms.json'
import allPokemon from '../../assets/utils/pokemon.json'

import { CapitalizeFirstLetter } from '../../assets/utils/capitalizeFirstLetter'
import { formatPokedexNumber } from '../../assets/utils/formatPokedexNumber'

const { height, width } = Dimensions.get('window')
export default function HomeScreen() {
  const [selectedItem, setSelectedItem] = useState('')

  const [searching, setSearching] = useState(false)
  const [data, setData] = useState(null)
  const [types, setTypes] = useState([])
  const [pokedexNumber, setPokedexNumber] = useState('')
  const [name, setName] = useState('')
  const [pokemonData, setPokemonData] = useState([])

  const [inputIsType, setInputIsType] = useState(false)

  const searchRef = useRef(null)
  const [currentImage, setCurrentImage] = useState('')

  function calculateByType(type) {
    setName(type)
    setTypes([type])
    setData(type)
    setInputIsType(true)
    searchRef.current.clear()
    setSearching(false)
  }

  function getPokemonNames() {
    const convertedData = []

    allPokemon['results'].forEach((pokemon) => {
      // push all pokemon to the suggestions list
      convertedData.push({
        id: pokemon.url,
        title: CapitalizeFirstLetter(pokemon.name),
      })
    })

    // push types
    allTypes.forEach((type) => {
      convertedData.push({
        id: type,
        title: CapitalizeFirstLetter(type) + ' (Type)',
      })
    })

    setPokemonData(convertedData)
  }

  async function fetchPokemonData(query, name) {
    if (typeof query !== 'undefined') {
      setInputIsType(false)
      const response = await axios.get(query)
      const result = response.data

      const speciesResponse = await axios.get(result.species.url)

      setCurrentImage(
        result['sprites']['other']['official-artwork']['front_default']
      )

      const pokedexNumber = formatPokedexNumber(
        speciesResponse.data.pokedex_numbers[0].entry_number
      )

      setPokedexNumber('#' + pokedexNumber)

      setName(result['species']['name'])
      setTypes([])

      for (let i = 0; i < result.types.length; i++) {
        setTypes((types) => [...types, result.types[i].type.name])
      }
      setSearching(false)

      setData(result)
      searchRef.current.clear()
    }
  }

  useEffect(() => {
    setData('')
    setSearching(false)
    getPokemonNames()
  }, [])

  useEffect(() => {
    if (selectedItem !== null && typeof selectedItem !== 'string') {
      setSearching(true)
      const url = selectedItem['id']
      const name = selectedItem['title']

      //check if input is a type
      if (allTypes.includes(url)) {
        calculateByType(url)
        return
      }
      fetchPokemonData(url, name)
    }
  }, [selectedItem])

  const getLabels = () => {
    if (!data) {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image
            style={{ width: 120, height: 120, margin: 10 }}
            source={require('../../assets/icon-transparent.png')}
          />
          <Text style={commonStyles.heading}>PokeType</Text>
          <Text style={commonStyles.subHeading}>
            {' '}
            Search for a Pokémon by name or type to view its strengths and
            weaknesses.
          </Text>
        </View>
      )
    }
  }

  const getFooter = () => {
    if (!data) {
      return (
        <View style={{ position: 'absolute', bottom: 0, alignItems: 'center' }}>
          <Text style={commonStyles.footer}>Powered by PokeAPI</Text>
        </View>
      )
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {pokemonData ? (
        <>
          <View style={{ zIndex: 1 }}>{getLabels()}</View>

          <View
            style={{
              zIndex: 10,
              width: Dimensions.get('window').width - 60,
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
                placeholder: 'Search for a Pokémon or Type',
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

          <View style={{ zIndex: 1 }}>
            {searching ? (
              <ActivityIndicator style={{ margin: 50 }}></ActivityIndicator>
            ) : null}
            {data ? (
              <>
                {searching ? null : (
                  <>
                    {inputIsType ? (
                      <>
                        <Card
                          pokemonName={CapitalizeFirstLetter(name)}
                          //image={currentImage}
                          types={types}
                          pokedexNumber={'Type'}
                          inputIsType={true}
                          calculateByType={calculateByType}
                        />
                      </>
                    ) : (
                      <>
                        <Card
                          pokemonName={CapitalizeFirstLetter(name)}
                          image={currentImage}
                          types={types}
                          pokedexNumber={pokedexNumber}
                          inputIsType={false}
                          calculateByType={calculateByType}
                        />
                      </>
                    )}
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'flex-start',
                        width: Dimensions.get('window').width,
                      }}>
                      <ScrollView>
                        <TypeCalc
                          typeName={types}
                          calculateByType={calculateByType}
                        />
                        <View
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            flex: 1,
                          }}></View>
                      </ScrollView>
                    </View>
                  </>
                )}
              </>
            ) : null}
          </View>
        </>
      ) : null}
      {getFooter()}
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
