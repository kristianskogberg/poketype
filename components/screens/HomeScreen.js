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
  StatusBar,
  Keyboard,
} from 'react-native'
import commonStyles from '../../assets/styles/commonStyles'
import TypeCalc from '../typeCalculator'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'
import { textColor } from '../../assets/colors'
import Card from '../card'

import { SafeAreaView } from 'react-native-safe-area-context'
import allTypes from '../types'
import { KeyboardAvoidingView } from 'react-native-web'

const { height, width } = Dimensions.get('window')
export default function HomeScreen() {
  let [selectedItem, setSelectedItem] = useState('')
  let [isLoading, setLoading] = useState(0)
  let [searching, setSearching] = useState(false)
  let [data, setData] = useState(null)
  let [types, setTypes] = useState([])
  let [pokedexNumber, setpokedexNumber] = useState(null)
  let [name, setName] = useState('')
  const [pokemonData, setPokemonData] = useState([])
  const [imageUrl, setImageUrl] = useState('')

  let [inputIsType, setInputIsType] = useState(false)

  const searchRef = useRef(null)
  const [currentImage, setCurrentImage] = useState('')

  const CapitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  const calculateByType = (type) => {
    setName(type)
    setTypes([type])
    setData(type)
    setInputIsType(true)
    searchRef.current.clear()
    setLoading(false)
    setSearching(false)
  }

  const pokemonFormConvert = {
    'deoxys-normal': 'Deoxys',
    'shaymin-land': 'Shaymin',
    'wormadam-plant': 'Wormadam',
    'giratina-altered': 'Giratina',
    'basculin-red-striped': 'Basculin',
    'darmanitan-standard': 'Darmanitan',
    'tornadus-incarnate': 'Tornadus',
    'thundurus-incarnate': 'Thundurus',
    'landorus-incarnate': 'Landorus',
    'keldeo-ordinary': 'Keldeo',
    'meloetta-aria': 'Meloetta',
    'meowstic-male': 'Meowstic',
    'aegislash-shield': 'Aegislash',
    'pumpkaboo-average': 'Pumpkaboo',
    'gourgeist-average': 'Gourgeist',
    'zygarde-50': 'Zygarde',
    'oricorio-baile': 'Oricorio',
    'lycanroc-midday': 'Lycanroc',
    'wishiwashi-solo': 'Wishiwashi',
    'minior-red-meteor': 'Minior',
    'mimikyu-disguised': 'Mimikyu',
    'toxtricity-amped': 'Toxtricity',
    'eiscue-ice': 'Eiscue',
    'indeedee-male': 'Indeedee',
    'morpeko-full-belly': 'Morpeko',
    'urshifu-single-strike': 'Urshifu',
  }

  const fetchPokemonNames = async () => {
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=898')
      .then((res) => {
        return res.json()
      })
      .then((result) => {
        const data = result['results']
        //console.log(a)
        convertedData = []

        data.forEach((pokemon) => {
          const number = pokemon.url.substr(34)
          const numberFinal = number.substr(0, number.length - 1)
          //console.log(numberFinal)

          // push all pokemon
          if (pokemon.name in pokemonFormConvert) {
            convertedData.push({
              id: pokemon.url,
              title: pokemonFormConvert[pokemon.name],
            })
          } else {
            convertedData.push({
              id: pokemon.url,
              title: CapitalizeFirstLetter(pokemon.name),
            })
          }
        })

        // push types
        allTypes.forEach((type) => {
          convertedData.push({
            id: type,
            title: CapitalizeFirstLetter(type) + ' (Type)',
          })
        })

        setPokemonData(convertedData)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const fetchPokemonData = (query) => {
    if (typeof query !== 'undefined') {
      setInputIsType(false)
      fetch(query)
        .then((res) => {
          return res.json()
        })
        .then(
          (result) => {
            setCurrentImage(
              result['sprites']['other']['official-artwork']['front_default']
            )

            setpokedexNumber('#' + result['id'])
            setImageUrl(
              result['sprites']['other']['official-artwork']['front_default']
            )

            let typeArray = []
            for (var i in result.types) typeArray.push([i, result.types[i]])

            setName(result['species']['name'])
            setTypes([])

            for (var i in typeArray) {
              //setTypes.push(result.types[i].type.name)
              setTypes((types) => [...types, result.types[i].type.name])
            }
            setSearching(false)
            setLoading(false)

            setData(result)
            searchRef.current.clear()
          },
          (error) => {
            Alert.alert('Oops!', 'Could not find that Pokémon.')
            setData('')
            setLoading(false)
            setSearching(false)
          }
        )
    }
  }

  useEffect(() => {
    setData('')
    setSearching(false)
    fetchPokemonNames()
  }, [])

  useEffect(() => {
    if (selectedItem !== null && typeof selectedItem !== 'string') {
      setSearching(true)
      const input = selectedItem['id']

      //check if input is a type
      if (allTypes.includes(input)) {
        calculateByType(input)
        return
      }
      fetchPokemonData(input)
    }
  }, [selectedItem])

  const getLabels = () => {
    if (!data) {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image
            style={{ width: 100, height: 100, margin: 10 }}
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

  return (
    <View style={styles.container}>
      {pokemonData ? (
        <>
          <View style={{ zIndex: 1 }}>{getLabels()}</View>

          <View
            style={{
              zIndex: 10,
              width: Dimensions.get('window').width - 40,
            }}>
            <AutocompleteDropdown
              dataSet={pokemonData}
              inputContainerStyle={{
                backgroundColor: 'transparent',
                //width: Dimensions.get('window').width - 60,
                marginVertical: 0,
                paddingVertical: 0,
              }}
              listContainerStyle={{
                height: pokemonData.length * 70,
                marginVertical: 0,
                paddingVertical: 0,
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
                          pokedexNumber={'Type:'}
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    //marginTop: StatusBar.currentHeight,
    marginTop: 50,
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
