import React, { useState, useEffect } from 'react'

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
} from 'react-native'
import commonStyles from '../../assets/styles/commonStyles'
import { bgColor } from '../../assets/colors'
import Icon from '../typeIcon'
import TypeCalc from '../typeCalculator'
import Search from '../../assets/images/search.svg'
import PokemonImage from '../image'
import SearchBar from '../searchBar'
import Card from '../card'

import { SafeAreaView } from 'react-native-safe-area-context'

const { height, width } = Dimensions.get('window')
export default function HomeScreen() {
  let [pokemonName, setInput] = useState('')
  let [isLoading, setLoading] = useState(0)
  let [searching, setSearching] = useState()
  let [data, setData] = useState(null)
  let [types, setTypes] = useState([])
  let [pokedexNumber, setpokedexNumber] = useState(null)
  let [isError, setError] = useState(false)
  let [name, setName] = useState('')
  let [allPokemonNames, setAllPokemonNames] = useState([])

  const pokemonArray = []
  const [toggle, setToggle] = useState(false)
  const [currentImage, setCurrentImage] = useState('')

  let [imageUrl, setImageUrl] = useState('')
  let [imageUrlHome, setImageUrlHome] = useState('')

  let [imageLoading, setImageLoading] = useState(false)

  let CapitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  const changeArtwork = () => {
    if (toggle) {
      setCurrentImage(imageUrlHome)
      setToggle(false)
    } else {
      setCurrentImage(imageUrl)
      setToggle(true)
    }
  }

  const fetchPokemonNames = async () => {
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=898')
      .then((res) => {
        return res.json()
      })
      .then((result) => {
        const a = result['results']
        //console.log(a)

        a.forEach((pokemon) => {
          pokemonArray.push(CapitalizeFirstLetter(pokemon.name))
        })

        setAllPokemonNames(result['results'])
      })
      .catch((err) => {
        console.error(err)
      })
  }

  useEffect(() => {
    fetchPokemonNames()
  }, [])

  useEffect(() => {
    if (searching) {
      const pokemon = pokemonName.toLowerCase()

      const image1 = ''
      const image2 = ''

      setToggle(true)
      setLoading(true)
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then((res) => {
          return res.json()
        })
        .then(
          (result) => {
            setCurrentImage(
              result['sprites']['other']['official-artwork']['front_default']
            )

            setpokedexNumber(result['id'])
            setImageUrl(
              result['sprites']['other']['official-artwork']['front_default']
            )

            setImageUrlHome(result['sprites']['other']['home']['front_default'])

            let typeArray = []
            for (var i in result.types) typeArray.push([i, result.types[i]])

            setName(result.name)
            setTypes((types) => [])

            for (var i in typeArray) {
              //setTypes.push(result.types[i].type.name)
              setTypes((types) => [
                ...types,
                CapitalizeFirstLetter(result.types[i].type.name),
              ])
            }
            setSearching(false)
            setLoading(false)
            setError(false)
            setData(result)
          },
          (error) => {
            Alert.alert('Oops!', 'Could not find that Pokémon.')
            setData('')
            //console.error(error)
            setError(true)
            setLoading(false)
            setSearching(false)
          }
        )
    }
  }, [searching])

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Search width={16} height={16} marginLeft={4} />
        <TextInput
          style={styles.input}
          placeholder="Search for a Pokémon"
          value={pokemonName}
          onChangeText={(value) => setInput(value)}
          onSubmitEditing={() => {
            // check if input is not empty
            if (pokemonName.trim().length !== 0) {
              setSearching(true)
            }
          }}></TextInput>
      </View>

      {searching ? (
        <ActivityIndicator style={{ margin: 50 }}></ActivityIndicator>
      ) : null}
      {data ? (
        <>
          {searching ? null : (
            <>
              <Card
                pokemonName={CapitalizeFirstLetter(name)}
                image={currentImage}
                types={types}
                pokedexNumber={pokedexNumber}
              />

              <TypeCalc typeName={types} />
            </>
          )}
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
    marginTop: 60,
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
    width: '75%',
    borderRadius: 10,
    backgroundColor: '#F2F2F2',
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    color: '#424242',
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
