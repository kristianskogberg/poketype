import { StyleSheet, View } from 'react-native'
import { Image } from 'expo-image'

function PokemonImage({ imageUrl, size = 180 }) {
  return (
    <View style={[styles.container, { height: size }]}>
      <Image
        style={{ height: size, width: size }}
        source={imageUrl}
        contentFit="contain"
        cachePolicy="memory-disk"
        recyclingKey={imageUrl}
        transition={200}
      />
    </View>
  )
}

export default PokemonImage

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})
