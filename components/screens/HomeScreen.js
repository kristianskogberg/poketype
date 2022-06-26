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
} from 'react-native'
import commonStyles from '../../assets/styles/commonStyles'
import { bgColor } from '../../assets/colors'
import Icon from '../typeIcon'
import TypeCalc from '../typeCalculator'
import Search from '../../assets/images/search.svg'

export default function HomeScreen() {
  let [pokemonName, setInput] = useState('')
  let [isLoading, setLoading] = useState(false)
  let [data, setData] = useState(null)
  let [types, setTypes] = useState([])
  let [number, setNumber] = useState(null)
  let [isError, setError] = useState(false)
  let [name, setName] = useState('')
  const [toggle, setToggle] = useState(false)
  const [currentImage, setCurrentImage] = useState('')

  let [imageUrl, setImageUrl] = useState('')
  let [imageUrlHome, setImageUrlHome] = useState('')

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

  let loadData = (pokemon) => {
    if (!pokemon.trim()) {
      return
    }

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
          setData(result)
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

          setLoading(false)
          setError(false)
        },
        (error) => {
          Alert.alert('Oops!', 'Could not find that Pokémon.')
          setData('')
          //console.error(error)
          setError(true)
          setLoading(false)
        }
      )
  }

  return (
    <View style={styles.container}>
      <Text style={[commonStyles.heading, { marginTop: 50 }]}>Pokédex</Text>
      <Text style={commonStyles.subHeading}>
        Search for a Pokémon by name {'\n'} to view its strenghts and
        weaknesses.
      </Text>
      <View style={styles.searchContainer}>
        <Search width={20} height={20} paddingLeft={10} />
        <TextInput
          style={styles.input}
          placeholder="e.g. Bulbasaur"
          value={pokemonName}
          onChangeText={(value) => setInput(value)}
          onSubmitEditing={() => {
            ;<ActivityIndicator />
            loadData(pokemonName.toLowerCase())
            //setInput("")
          }}></TextInput>
      </View>

      {data ? (
        <View style={styles.container}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <View style={styles.container}>
              <TouchableWithoutFeedback
                onPress={() => {
                  if (toggle) {
                    setToggle(false)
                  } else {
                    setToggle(true)
                  }
                }}>
                {toggle ? (
                  <Image style={styles.image} source={{ uri: imageUrl }} />
                ) : (
                  <Image style={styles.image} source={{ uri: imageUrlHome }} />
                )}
              </TouchableWithoutFeedback>

              <Text style={[commonStyles.heading, { marginBottom: 0 }]}>
                {CapitalizeFirstLetter(name)}
              </Text>

              <Icon typeName={types} typeEff={false} />

              <TypeCalc typeName={types} />
            </View>
          )}
        </View>
      ) : (
        <Text></Text>
      )}
      <Text style={commonStyles.footer}>Powered by Pokédex API</Text>
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
    width: 200,
    height: 200,
    justifyContent: 'center',
    marginTop: 10,
  },
  pokemonBg: {
    width: '100%',
    height: 200,
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
