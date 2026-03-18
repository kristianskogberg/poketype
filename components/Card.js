import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native'
import PokemonImage from './PokemonImage'
import commonStyles from '../assets/styles/commonStyles'
import Icon from './TypeIcon'
const { width } = Dimensions.get('window')
import { bgColor, textColor } from '../assets/utils/colors'
import { LinearGradient } from 'expo-linear-gradient'
import TypeImage from './TypeImage'

import PokeBall from '../assets/images/pokeball.svg'

const Card = ({ pokemonName, image, types, pokedexNumber, calculateByType }) => {
  const typeColor = types[0]
  const subtitle = pokedexNumber.toLowerCase() === 'type' ? 'Type' : pokedexNumber

  const SCALE = 2

  return (
    <LinearGradient
      style={{
        justifyContent: 'center',
        width: width,
        height: 200,
        margin: 0,
        zIndex: 10,
      }}
      colors={[bgColor[typeColor], '#fff']}>
      <View
        style={{
          position: 'absolute',
          left: 86,
          top: 22,
          opacity: 0.25,
        }}>
        <PokeBall fill={'white'} width={SCALE * 207} height={SCALE * 104} />
      </View>
      <View style={styles.content}>
        <View style={styles.textAndTypes}>
          <Text
            style={{
              marginBottom: 0,
              textAlign: 'left',
              paddingLeft: 8,
              paddingBottom: 0,
              fontSize: 16,
              color: textColor.grey,
            }}>
            {subtitle}
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
            {pokemonName}
          </Text>

          <Icon
            style={[{ margin: 0 }]}
            typeArray={types}
            calculateByType={calculateByType}
          />
        </View>

        {image ? (
          <TouchableOpacity
            style={styles.pokemonImage}
            accessibilityLabel="pokemon image">
            <PokemonImage imageUrl={image} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.typeImage}
            accessibilityLabel="type image">
            <TypeImage type={types[0]} />
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
