import react from 'react'
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native'
import PokemonImage from './image'
import commonStyles from '../assets/styles/commonStyles'
import Icon from './typeIcon'
const { height, width } = Dimensions.get('window')
import { bgColor } from '../assets/colors'
import { LinearGradient } from 'expo-linear-gradient'
import TypeImage from './typeImage'

const Card = (props) => {
  const typeColor = props.types[0]

  const typeImages = {
    Bug: '../assets/images/type_images/bug.svg',
    Dark: '../assets/images/type_images/dark.svg',
  }

  return (
    <LinearGradient
      style={{
        justifyContent: 'center',
        width: width,
        height: 200,
        //borderRadius: 10,
        margin: 0,
        zIndex: 10,
      }}
      colors={[bgColor[typeColor], '#fff']}>
      <View style={styles.content}>
        <View style={styles.textAndTypes}>
          <Text
            style={[
              commonStyles.subheading,
              {
                marginBottom: 0,
                textAlign: 'left',
                paddingLeft: 8,
                paddingBottom: 0,
              },
            ]}>
            {props.pokedexNumber}
          </Text>
          <Text
            style={[
              commonStyles.heading,
              {
                marginBottom: 0,
                textAlign: 'left',
                paddingTop: 0,
              },
            ]}>
            {props.pokemonName}
          </Text>

          <Icon
            style={[{ paddingVertical: 0 }]}
            typeName={props.types}
            calculateByType={props.calculateByType}
          />
        </View>

        {props.inputIsType ? (
          <TouchableOpacity style={styles.typeImage}>
            <TypeImage type={props.types} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.pokemonImage}>
            <PokemonImage imageUrl={props.image} />
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  )
}

export default Card

const styles = StyleSheet.create({
  pokemonImage: {
    position: 'absolute',
    right: 6,
  },
  typeImage: { position: 'absolute', right: 0 },
  textAndTypes: {
    flexDirection: 'column',
    paddingLeft: 10,
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
  },
})
