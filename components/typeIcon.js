import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native'

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

import { textColor } from '../assets/colors'

const SCALE_MULTIPLIER = 1.3
const HEIGHT = 25

const Icon = (props) => {
  const getTypeIcons = (type, i) => {
    switch (type) {
      case 'Bug':
        return (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => props.calculateByType(type)}
            key={i}>
            <Bug
              width={SCALE_MULTIPLIER * 51}
              height={SCALE_MULTIPLIER * HEIGHT}
            />
          </TouchableOpacity>
        )
        break
      case 'Dark':
        return (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => props.calculateByType(type)}
            key={i}>
            <Dark
              width={SCALE_MULTIPLIER * 55}
              height={SCALE_MULTIPLIER * HEIGHT}
            />
          </TouchableOpacity>
        )
        break
      case 'Dragon':
        return (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => props.calculateByType(type)}
            key={i}>
            <Dragon
              width={SCALE_MULTIPLIER * 69}
              height={SCALE_MULTIPLIER * HEIGHT}
            />
          </TouchableOpacity>
        )
        break
      case 'Electric':
        return (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => props.calculateByType(type)}
            key={i}>
            <Electric
              width={SCALE_MULTIPLIER * 69}
              height={SCALE_MULTIPLIER * HEIGHT}
            />
          </TouchableOpacity>
        )
        break
      case 'Fairy':
        return (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => props.calculateByType(type)}
            key={i}>
            <Fairy
              width={SCALE_MULTIPLIER * 55}
              height={SCALE_MULTIPLIER * HEIGHT}
            />
          </TouchableOpacity>
        )
        break
      case 'Fighting':
        return (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => props.calculateByType(type)}
            key={i}>
            <Fighting
              width={SCALE_MULTIPLIER * 73}
              height={SCALE_MULTIPLIER * HEIGHT}
            />
          </TouchableOpacity>
        )
        break
      case 'Fire':
        return (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => props.calculateByType(type)}
            key={i}>
            <Fire
              width={SCALE_MULTIPLIER * 50}
              height={SCALE_MULTIPLIER * HEIGHT}
            />
          </TouchableOpacity>
        )
        break
      case 'Flying':
        return (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => props.calculateByType(type)}
            key={i}>
            <Flying
              width={SCALE_MULTIPLIER * 62}
              height={SCALE_MULTIPLIER * HEIGHT}
            />
          </TouchableOpacity>
        )
        break
      case 'Ghost':
        return (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => props.calculateByType(type)}
            key={i}>
            <Ghost
              width={SCALE_MULTIPLIER * 62}
              height={SCALE_MULTIPLIER * HEIGHT}
            />
          </TouchableOpacity>
        )
        break
      case 'Grass':
        return (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => props.calculateByType(type)}
            key={i}>
            <Grass
              width={SCALE_MULTIPLIER * 61}
              height={SCALE_MULTIPLIER * HEIGHT}
            />
          </TouchableOpacity>
        )
        break
      case 'Ground':
        return (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => props.calculateByType(type)}
            key={i}>
            <Ground
              width={SCALE_MULTIPLIER * 69}
              height={SCALE_MULTIPLIER * HEIGHT}
            />
          </TouchableOpacity>
        )
        break
      case 'Ice':
        return (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => props.calculateByType(type)}
            key={i}>
            <Ice
              width={SCALE_MULTIPLIER * 46}
              height={SCALE_MULTIPLIER * HEIGHT}
            />
          </TouchableOpacity>
        )
        break
      case 'Normal':
        return (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => props.calculateByType(type)}
            key={i}>
            <Normal
              width={SCALE_MULTIPLIER * 68}
              height={SCALE_MULTIPLIER * HEIGHT}
            />
          </TouchableOpacity>
        )
        break
      case 'Poison':
        return (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => props.calculateByType(type)}
            key={i}>
            <Poison
              width={SCALE_MULTIPLIER * 65}
              height={SCALE_MULTIPLIER * HEIGHT}
            />
          </TouchableOpacity>
        )
        break
      case 'Psychic':
        return (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => props.calculateByType(type)}
            key={i}>
            <Psychic
              width={SCALE_MULTIPLIER * 71}
              height={SCALE_MULTIPLIER * HEIGHT}
            />
          </TouchableOpacity>
        )
        break
      case 'Rock':
        return (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => props.calculateByType(type)}
            key={i}>
            <Rock
              width={SCALE_MULTIPLIER * 57}
              height={SCALE_MULTIPLIER * HEIGHT}
            />
          </TouchableOpacity>
        )
        break
      case 'Steel':
        return (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => props.calculateByType(type)}
            key={i}>
            <Steel
              width={SCALE_MULTIPLIER * 57}
              height={SCALE_MULTIPLIER * HEIGHT}
            />
          </TouchableOpacity>
        )
        break
      case 'Water':
        return (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => props.calculateByType(type)}
            key={i}>
            <Water
              width={SCALE_MULTIPLIER * 61}
              height={SCALE_MULTIPLIER * HEIGHT}
            />
          </TouchableOpacity>
        )
        break
      default:
        return null
    }
  }

  const getComponents = (typeArray) => {
    const comps = []
    typeArray.forEach((type, i) => {
      comps.push(getTypeIcons(type, i))
    })
    return comps
  }
  /*
  if (props.typeName === undefined || props.typeName.length == 0) {
    return <Text>Joo</Text>
  }
  */
  return <View style={styles.icon}>{getComponents(props.typeName)}</View>
}

export default Icon

const styles = StyleSheet.create({
  icon: {
    padding: 3,
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})
