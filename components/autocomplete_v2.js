import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'
import commonStyles from '../assets/styles/commonStyles'
import { textColor } from '../assets/colors'
import types from './types'

const Auto = () => {
  const [selectedItem, setSelectedItem] = useState(null)
  const [pokemonData, setPokemonData] = useState([])

  const CapitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
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
        types.forEach((type) => {
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

  useEffect(() => {
    fetchPokemonNames()
  }, [])

  useEffect(() => {
    if (selectedItem != null) {
      // console.log(selectedItem['id'])
    }
  }, [selectedItem])

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <AutocompleteDropdown
        inputContainerStyle={{
          backgroundColor: 'transparent',
          width: Dimensions.get('window').width - 60,
        }}
        listContainerStyle={{
          height: pokemonData.length * 70,
        }}
        clearOnFocus={false}
        closeOnBlur={false}
        showChevron={false}
        onSelectItem={setSelectedItem}
        textInputProps={{
          placeholder: 'Search for a Pokémon or Type',
          placeholderTextColor: textColor.grey,
          style: {
            borderRadius: 100,
            color: textColor.black,
          },
        }}
        dataSet={pokemonData}
        suggestionsListMaxHeight={500}
        renderItem={(item, text) => (
          <Text
            style={{
              color: textColor.black,
              padding: 10,
              textAlign: 'center',
              fontSize: 16,
            }}>
            {item.title}
          </Text>
        )}
      />
    </View>
  )
}
const styles = StyleSheet.create({})

export default Auto
