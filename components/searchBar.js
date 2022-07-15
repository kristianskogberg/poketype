import React, { useCallback, useState } from 'react'
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableHighlight,
  ScrollView,
  Text,
} from 'react-native'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'

import Search from '../assets/images/search.svg'
const SearchBar = (props) => {
  const [loading, setLoading] = useState(false)
  const [remoteDataSet, setRemoteDataSet] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)

  const getSuggestions = useCallback(async (q) => {
    const filterToken = q.toLowerCase()
    console.log('getSuggestions', filterToken)
    if (typeof q !== 'string' || q.length < 3) {
      setRemoteDataSet(null)
      return
    }
    setLoading(true)

    const response = await fetch(
      'https://pokeapi.co/api/v2/pokemon/?limit=898'
    ).then(
      (data) =>
        new Promise((res) => {
          setTimeout(() => res(data), 2000)
        })
    )
    const items = await response.json()

    console.log(items)

    const suggestions = items
      .filter((item) => item.title.toLowerCase().includes(filterToken))
      .map((item) => ({
        id: item.id,
        title: item.title,
      }))

    setRemoteDataSet(suggestions)
    setLoading(false)
  }, [])

  return (
    <>
      <AutocompleteDropdown
        dataSet={remoteDataSet}
        closeOnBlur={false}
        useFilter={false}
        clearOnFocus={false}
        textInputProps={{
          placeholder: 'Start typing est...',
        }}
        onSelectItem={setSelectedItem}
        loading={loading}
        onChangeText={getSuggestions}
        suggestionsListTextStyle={{
          color: '#8f3c96',
        }}
        EmptyResultComponent={
          <Text style={{ padding: 10, fontSize: 15 }}>Nothing found</Text>
        }
      />
      <Text style={{ color: '#668', fontSize: 13 }}>
        Selected item: {JSON.stringify(selectedItem)}
      </Text>
    </>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth: 1,
    padding: 8,
    marginTop: 50,
    width: '75%',
    borderRadius: 10,
    backgroundColor: '#F2F2F2',
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    color: '#424242',
  },
})
