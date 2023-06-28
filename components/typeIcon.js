import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
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

const SCALE_MULTIPLIER = 1.3
const HEIGHT = 25

/**
 * renders UI elements for each type
 * @param {Array} typeArray
 * @param {Function} calculateByType
 * @returns
 */
const Icon = ({ typeArray, calculateByType }) => {
  const getTypeIcons = (type, i) => {
    switch (type) {
      case 'bug':
        return (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => calculateByType(type)}
            key={i}
            accessibilityLabel={type + ' Icon'}>
            <Bug
              width={SCALE_MULTIPLIER * 51}
              height={SCALE_MULTIPLIER * HEIGHT}
            />
          </TouchableOpacity>
        )

      case 'dark':
        return (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => calculateByType(type)}
            key={i}
            accessibilityLabel={type + ' Icon'}>
            <Dark
              width={SCALE_MULTIPLIER * 55}
              height={SCALE_MULTIPLIER * HEIGHT}
            />
          </TouchableOpacity>
        )

      case 'dragon':
        return (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => calculateByType(type)}
            key={i}
            accessibilityLabel={type + ' Icon'}>
            <Dragon
              width={SCALE_MULTIPLIER * 69}
              height={SCALE_MULTIPLIER * HEIGHT}
            />
          </TouchableOpacity>
        )

      case 'electric':
        return (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => calculateByType(type)}
            key={i}
            accessibilityLabel={type + ' Icon'}>
            <Electric
              width={SCALE_MULTIPLIER * 69}
              height={SCALE_MULTIPLIER * HEIGHT}
            />
          </TouchableOpacity>
        )

      case 'fairy':
        return (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => calculateByType(type)}
            key={i}
            accessibilityLabel={type + ' Icon'}>
            <Fairy
              width={SCALE_MULTIPLIER * 55}
              height={SCALE_MULTIPLIER * HEIGHT}
            />
          </TouchableOpacity>
        )

      case 'fighting':
        return (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => calculateByType(type)}
            key={i}
            accessibilityLabel={type + ' Icon'}>
            <Fighting
              width={SCALE_MULTIPLIER * 73}
              height={SCALE_MULTIPLIER * HEIGHT}
            />
          </TouchableOpacity>
        )

      case 'fire':
        return (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => calculateByType(type)}
            key={i}
            accessibilityLabel={type + ' Icon'}>
            <Fire
              width={SCALE_MULTIPLIER * 50}
              height={SCALE_MULTIPLIER * HEIGHT}
            />
          </TouchableOpacity>
        )

      case 'flying':
        return (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => calculateByType(type)}
            key={i}
            accessibilityLabel={type + ' Icon'}>
            <Flying
              width={SCALE_MULTIPLIER * 62}
              height={SCALE_MULTIPLIER * HEIGHT}
            />
          </TouchableOpacity>
        )

      case 'ghost':
        return (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => calculateByType(type)}
            key={i}
            accessibilityLabel={type + ' Icon'}>
            <Ghost
              width={SCALE_MULTIPLIER * 62}
              height={SCALE_MULTIPLIER * HEIGHT}
            />
          </TouchableOpacity>
        )

      case 'grass':
        return (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => calculateByType(type)}
            key={i}
            accessibilityLabel={type + ' Icon'}>
            <Grass
              width={SCALE_MULTIPLIER * 61}
              height={SCALE_MULTIPLIER * HEIGHT}
            />
          </TouchableOpacity>
        )

      case 'ground':
        return (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => calculateByType(type)}
            key={i}
            accessibilityLabel={type + ' Icon'}>
            <Ground
              width={SCALE_MULTIPLIER * 69}
              height={SCALE_MULTIPLIER * HEIGHT}
            />
          </TouchableOpacity>
        )

      case 'ice':
        return (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => calculateByType(type)}
            key={i}
            accessibilityLabel={type + ' Icon'}>
            <Ice
              width={SCALE_MULTIPLIER * 46}
              height={SCALE_MULTIPLIER * HEIGHT}
            />
          </TouchableOpacity>
        )

      case 'normal':
        return (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => calculateByType(type)}
            key={i}
            accessibilityLabel={type + ' Icon'}>
            <Normal
              width={SCALE_MULTIPLIER * 68}
              height={SCALE_MULTIPLIER * HEIGHT}
            />
          </TouchableOpacity>
        )

      case 'poison':
        return (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => calculateByType(type)}
            key={i}
            accessibilityLabel={type + ' Icon'}>
            <Poison
              width={SCALE_MULTIPLIER * 65}
              height={SCALE_MULTIPLIER * HEIGHT}
            />
          </TouchableOpacity>
        )

      case 'psychic':
        return (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => calculateByType(type)}
            key={i}
            accessibilityLabel={type + ' Icon'}>
            <Psychic
              width={SCALE_MULTIPLIER * 71}
              height={SCALE_MULTIPLIER * HEIGHT}
            />
          </TouchableOpacity>
        )

      case 'rock':
        return (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => calculateByType(type)}
            key={i}
            accessibilityLabel={type + ' Icon'}>
            <Rock
              width={SCALE_MULTIPLIER * 57}
              height={SCALE_MULTIPLIER * HEIGHT}
            />
          </TouchableOpacity>
        )

      case 'steel':
        return (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => calculateByType(type)}
            key={i}
            accessibilityLabel={type + ' Icon'}>
            <Steel
              width={SCALE_MULTIPLIER * 57}
              height={SCALE_MULTIPLIER * HEIGHT}
            />
          </TouchableOpacity>
        )

      case 'water':
        return (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => calculateByType(type)}
            key={i}
            accessibilityLabel={type + ' Icon'}>
            <Water
              width={SCALE_MULTIPLIER * 61}
              height={SCALE_MULTIPLIER * HEIGHT}
            />
          </TouchableOpacity>
        )

      default:
        return null
    }
  }

  /**
   *
   * @returns Array of TouchableOpacity components for types
   */
  const getComponents = () => {
    const typeComponents = []
    typeArray?.forEach((type, i) => {
      typeComponents.push(getTypeIcons(type, i))
    })

    return typeComponents
  }

  return <View style={styles.icon}>{getComponents()}</View>
}

export default Icon

const styles = StyleSheet.create({
  icon: {
    padding: 3,
    //margin: 3,
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})
