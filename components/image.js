import { StyleSheet, View, Image, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { bgColor, color } from '../assets/utils/colors'

function PokemonImage(props) {
  ;[loading, setLoading] = useState(false)

  function onLoading(value) {
    setLoading(value)
  }

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.spinner}>
          <ActivityIndicator />
        </View>
      )}
      {
        <Image
          style={styles.image}
          source={{
            uri: props.imageUrl,
          }}
          onLoadStart={() => onLoading(true)}
          onLoadEnd={() => onLoading(false)}
          //tintColor={color.fire}
        />
      }
    </View>
  )
}

export default PokemonImage

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 200,
  },
  spinner: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    height: 200,
    width: 200,
  },
  image: {
    height: 180,
    width: 180,
  },
})
