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
import { bgColor, typeTextColor, textColor } from '../assets/utils/colors'
import { LinearGradient } from 'expo-linear-gradient'
import TypeImage from './TypeImage'

import PokeBall from '../assets/images/pokeball.svg'

const Card = ({
  pokemonName,
  image,
  types,
  pokedexNumber,
  calculateByType,
  onImagePress,
  genSegments,
  activeSegment,
  onSelectGenSegment,
}) => {
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
              color: typeTextColor[typeColor],
              opacity: 0.7,
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
                color: typeTextColor[typeColor],
              },
            ]}>
            {pokemonName}
          </Text>

          <Icon
            style={[{ margin: 0 }]}
            typeArray={types}
            calculateByType={calculateByType}
          />

          {genSegments ? (
            <View style={styles.genPills}>
              {genSegments.map((seg, i) => (
                <TouchableOpacity
                  key={seg.label}
                  onPress={() => onSelectGenSegment(i)}
                  style={[
                    styles.genPill,
                    {
                      backgroundColor:
                        i === activeSegment
                          ? bgColor[seg.types[0]]
                          : '#E0E0E0',
                    },
                  ]}>
                  <Text
                    style={[
                      styles.genPillText,
                      {
                        color:
                          i === activeSegment
                            ? textColor.white
                            : textColor.grey,
                      },
                    ]}>
                    {seg.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : null}
        </View>

        {image ? (
          <TouchableOpacity
            style={styles.pokemonImage}
            onPress={onImagePress}
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
  genPills: {
    flexDirection: 'row',
    marginTop: 6,
    paddingLeft: 8,
    gap: 6,
  },
  genPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  genPillText: {
    fontSize: 12,
    fontWeight: '600',
  },
})
