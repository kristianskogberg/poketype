import React, { useState, useEffect } from 'react'

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Alert,
  ActivityIndicator,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import commonStyles from '../../assets/styles/commonStyles'
import { bgColor } from '../../assets/colors'
import Icon from '../typeIcon'
import TypeCalc from '../typeCalculator'
import Search from '../../assets/images/search.svg'
import PokemonImage from '../image'

const { height, width } = Dimensions.get('window')
export default function HomeScreen() {
  let [pokemonName, setInput] = useState('')
  let [isLoading, setLoading] = useState(0)
  let [searching, setSearching] = useState()
  let [data, setData] = useState(null)
  let [types, setTypes] = useState([])
  let [number, setNumber] = useState(null)
  let [isError, setError] = useState(false)
  let [name, setName] = useState('')
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

  const fetchImage = async (imgUrl) => {
    const res = await fetch(imgUrl)
    const imageBlob = await res.blob()
    const imageObjectURL = URL.createObjectURL(imageBlob)
    return imageObjectURL
  }

  useEffect(() => {
    if (searching) {
      const pokemon = pokemonName.toLowerCase()

      if (!pokemon.trim()) {
        return
      }

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

            setNumber(result['id'])
            setImageUrl(
              result['sprites']['other']['official-artwork']['front_default']
            )

            //console.log(result["sprites"]["other"])
            setImageUrlHome(result['sprites']['other']['home']['front_default'])
            //console.log(result["types"][0]["type"]["name"])
            //console.log(result.types)
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
      <Text style={[commonStyles.heading, { marginTop: 50 }]}>Pokédex</Text>
      <Text style={commonStyles.subHeading}>
        Search for a Pokémon by name or number
        {'\n'}
        to view its strengths and weaknesses.
      </Text>
      <View style={styles.searchContainer}>
        <Search width={20} height={20} paddingLeft={10} />
        <TextInput
          style={styles.input}
          placeholder="e.g. Bulbasaur"
          value={pokemonName}
          onChangeText={(value) => setInput(value)}
          onSubmitEditing={() => {
            setSearching(true)
          }}></TextInput>
      </View>

      {searching ? (
        <ActivityIndicator style={{ margin: 50 }}></ActivityIndicator>
      ) : null}
      {data ? (
        <View style={styles.container}>
          {searching ? null : (
            <View style={styles.container}>
              <TouchableOpacity>
                <PokemonImage imageUrl={currentImage} />
              </TouchableOpacity>

              <Text style={[commonStyles.heading, { marginBottom: 0 }]}>
                {CapitalizeFirstLetter(name)}
              </Text>

              <Icon typeName={types} typeEff={false} />

              <TypeCalc typeName={types} />
            </View>
          )}
        </View>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  image: {
    height: 200,
    width: 200,
  },
  pokemonBg: {
    width: '100%',
    height: 300,
    backgroundColor: bgColor.grass,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    padding: 8,
    paddingLeft: 12,
    width: '50%',
    borderRadius: 50,
    margin: 10,
    backgroundColor: '#F2F2F2',
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    color: '#424242',
  },
})
