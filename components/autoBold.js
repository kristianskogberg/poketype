import React, { memo, useState } from 'react'
import { Text, View } from 'react-native'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'

const LocalDataSetExample = memo(() => {
  const [selectedItem, setSelectedItem] = useState(null)

  const data = [
    { id: '1', title: 'Alpha' },
    { id: '2', title: 'Beta' },
    { id: '3', title: 'gmm' },
  ]

  return (
    <View>
      <AutocompleteDropdown
        clearOnFocus={false}
        closeOnBlur={true}
        initialValue={{ id: '2' }} // or just '2'
        onSelectItem={setSelectedItem}
        dataSet={data}
      />
      <Text style={{ color: '#668', fontSize: 13 }}>
        Selected item: {JSON.stringify(selectedItem)}
      </Text>
    </View>
  )
})

export default LocalDataSetExample
