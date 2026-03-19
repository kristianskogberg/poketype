import { StyleSheet, Text, View } from 'react-native'
import { Pressable } from 'react-native'
import { textColor } from '../assets/utils/colors'

import Bug from '../assets/images/type_icons/bug.svg'
import Dark from '../assets/images/type_icons/dark.svg'
import Dragon from '../assets/images/type_icons/dragon.svg'
import Electric from '../assets/images/type_icons/electric.svg'
import Fairy from '../assets/images/type_icons/fairy.svg'
import Fighting from '../assets/images/type_icons/fighting.svg'
import Fire from '../assets/images/type_icons/fire.svg'
import Flying from '../assets/images/type_icons/flying.svg'
import Ghost from '../assets/images/type_icons/ghost.svg'
import Grass from '../assets/images/type_icons/grass.svg'
import Ground from '../assets/images/type_icons/ground.svg'
import Ice from '../assets/images/type_icons/ice.svg'
import Normal from '../assets/images/type_icons/normal.svg'
import Poison from '../assets/images/type_icons/poison.svg'
import Psychic from '../assets/images/type_icons/psychic.svg'
import Rock from '../assets/images/type_icons/rock.svg'
import Steel from '../assets/images/type_icons/steel.svg'
import Water from '../assets/images/type_icons/water.svg'

const SCALE_MULTIPLIER = 1.3
const HEIGHT = 25

const TYPE_ICON_MAP = {
  bug: { Component: Bug, width: 51 },
  dark: { Component: Dark, width: 55 },
  dragon: { Component: Dragon, width: 69 },
  electric: { Component: Electric, width: 69 },
  fairy: { Component: Fairy, width: 55 },
  fighting: { Component: Fighting, width: 73 },
  fire: { Component: Fire, width: 50 },
  flying: { Component: Flying, width: 62 },
  ghost: { Component: Ghost, width: 62 },
  grass: { Component: Grass, width: 61 },
  ground: { Component: Ground, width: 69 },
  ice: { Component: Ice, width: 46 },
  normal: { Component: Normal, width: 68 },
  poison: { Component: Poison, width: 65 },
  psychic: { Component: Psychic, width: 71 },
  rock: { Component: Rock, width: 57 },
  steel: { Component: Steel, width: 57 },
  water: { Component: Water, width: 61 },
}

const Icon = ({ typeArray, calculateByType }) => {
  if (!typeArray || typeArray.length === 0) {
    return (
      <View style={styles.icon}>
        <Text style={styles.noneText}>None</Text>
      </View>
    )
  }

  return (
    <View style={styles.icon}>
      {typeArray.map((type) => {
        const entry = TYPE_ICON_MAP[type]
        if (!entry) return null
        const { Component, width } = entry
        return (
          <Pressable
            style={styles.icon}
            onPress={() => calculateByType(type)}
            key={type}
            accessibilityLabel={type + ' Icon'}>
            <Component
              width={SCALE_MULTIPLIER * width}
              height={SCALE_MULTIPLIER * HEIGHT}
            />
          </Pressable>
        )
      })}
    </View>
  )
}

export default Icon

const styles = StyleSheet.create({
  icon: {
    padding: 3,
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  noneText: {
    height: SCALE_MULTIPLIER * HEIGHT + 6,
    lineHeight: SCALE_MULTIPLIER * HEIGHT + 6,
    fontSize: 14,
    color: textColor.grey,
    paddingHorizontal: 3,
  },
})
