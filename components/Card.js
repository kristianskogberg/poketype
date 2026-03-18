import { View, Pressable, Text, StyleSheet, Dimensions } from 'react-native'
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
  height = 200,
}) => {
  const typeColor = types[0]
  const subtitle =
    pokedexNumber.toLowerCase() === 'type' ? 'Type' : pokedexNumber

  const SCALE = (height / 200) * 2

  return (
    <LinearGradient
      style={{
        justifyContent: 'center',
        width: width,
        height,
        margin: 0,
        zIndex: 10,
        overflow: 'hidden',
      }}
      colors={[bgColor[typeColor], '#fff']}>
      <View
        style={{
          position: 'absolute',
          right: 6 + (height - 16) / 2 - height * 0.6,
          top: height * 0.1,
          opacity: 0.25,
        }}>
        <PokeBall fill={'white'} width={height * 1.2} height={height * 1.2} />
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
              fontWeight: '600',
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
                <Pressable
                  key={seg.label}
                  onPress={() => onSelectGenSegment(i)}
                  style={[
                    styles.genPill,
                    {
                      backgroundColor:
                        i === activeSegment ? bgColor[seg.types[0]] : '#E0E0E0',
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
                </Pressable>
              ))}
            </View>
          ) : null}
        </View>

        {image ? (
          <Pressable
            style={[styles.pokemonImage, { height, justifyContent: 'center' }]}
            onPress={onImagePress}
            accessibilityLabel="pokemon image">
            <PokemonImage imageUrl={image} size={height - 16} />
          </Pressable>
        ) : (
          <Pressable
            style={[styles.typeImage, { height, justifyContent: 'center' }]}
            accessibilityLabel="type image">
            <TypeImage type={types[0]} size={height} />
          </Pressable>
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
