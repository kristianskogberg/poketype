import {
  View,
  Pressable,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native'
import PokemonImage from './PokemonImage'
import commonStyles from '../assets/styles/commonStyles'
import Icon from './TypeIcon'
const { width } = Dimensions.get('window')
import { bgColor, typeTextColor, textColor } from '../assets/utils/colors'
import {
  BORDER_RADIUS,
  BORDER_RADIUS_SM,
  GAP_XS,
} from '../assets/utils/constants'
import { LinearGradient } from 'expo-linear-gradient'
import TypeImage from './TypeImage'
import { Ionicons } from '@expo/vector-icons'

import PokeBall from '../assets/images/pokeball.svg'

const FORM_ICONS = {
  Mega: require('../assets/images/form_icons/mega.png'),
  'G-Max': require('../assets/images/form_icons/gmax.png'),
}

const REGION_FORMS = ['Galarian', 'Alolan', 'Hisuian', 'Paldean']

const Card = ({
  pokemonName,
  image,
  types,
  pokedexNumber,
  forms,
  calculateByType,
  onImagePress,
  genSegments,
  activeSegment,
  onSelectGenSegment,
  selectedTypeIndex,
  onSelectType,
  height = 200,
  variant,
}) => {
  const typeColor = types[0]
  const subtitle =
    pokedexNumber.toLowerCase() === 'type' ? 'Type' : pokedexNumber

  const SCALE = (height / 200) * 2

  const isCompact = variant === 'compact'

  const containerStyle = {
    justifyContent: 'center',
    width: isCompact ? width - 24 : width,
    height,
    margin: 0,
    zIndex: 10,
    overflow: 'hidden',
    ...(isCompact && {
      borderRadius: BORDER_RADIUS,
      alignSelf: 'center',
    }),
  }

  const inner = (
    <>
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 8,
              gap: 6,
            }}>
            <Text
              style={{
                marginBottom: 0,
                textAlign: 'left',
                paddingBottom: 0,
                fontSize: 16,
                color: typeTextColor[typeColor],
                opacity: 0.7,
                fontWeight: '600',
              }}>
              {subtitle}
            </Text>
            {forms
              ? forms.map((form) => {
                  const isMega = form.startsWith('Mega')
                  const isGMax = form.startsWith('G-Max')
                  const isRegion = REGION_FORMS.includes(form)
                  const icon = isMega
                    ? FORM_ICONS.Mega
                    : isGMax
                      ? FORM_ICONS['G-Max']
                      : null
                  return (
                    <View
                      key={form}
                      style={[
                        styles.formBadge,
                        { borderColor: typeTextColor[typeColor] },
                      ]}>
                      {isRegion ? (
                        <Ionicons
                          name="location"
                          size={10}
                          color={typeTextColor[typeColor]}
                        />
                      ) : icon ? (
                        <Image
                          source={icon}
                          style={[
                            styles.formIcon,
                            { tintColor: typeTextColor[typeColor] },
                          ]}
                        />
                      ) : null}
                      <Text
                        style={[
                          styles.formBadgeText,
                          { color: typeTextColor[typeColor] },
                        ]}>
                        {form}
                      </Text>
                    </View>
                  )
                })
              : null}
          </View>
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

          {onSelectType && types.length > 1 ? (
            <View style={{ flexDirection: 'row', padding: 3 }}>
              {types.map((type, i) => (
                <Pressable
                  key={type}
                  onPress={() => onSelectType(i)}
                  accessibilityLabel={type + ' Icon'}
                  style={{
                    opacity: i === selectedTypeIndex ? 1 : 0.5,
                  }}>
                  <Icon
                    typeArray={[type]}
                    calculateByType={() => onSelectType(i)}
                  />
                </Pressable>
              ))}
            </View>
          ) : (
            <Icon
              style={[{ margin: 0 }]}
              typeArray={types}
              calculateByType={() => {}}
            />
          )}

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
    </>
  )

  return (
    <LinearGradient
      pointerEvents={isCompact ? 'none' : 'auto'}
      style={containerStyle}
      colors={[
        bgColor[typeColor],
        isCompact ? bgColor[typeColor] + '80' : '#fff',
      ]}>
      {inner}
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
    gap: GAP_XS,
  },
  genPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS_SM,
  },
  genPillText: {
    fontSize: 12,
    fontWeight: '600',
  },
  formBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    gap: 4,
  },
  formBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  formIcon: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
  },
})
