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

const MAX_WIDTH = 80
const MAX_HEIGHT = 45

const Icon = (props) => {
  const renderType = (type) => {
    switch (type) {
      case 'Bug':
        return (
          <TouchableOpacity style={styles.icon}>
            <Bug width={MAX_WIDTH} height={MAX_HEIGHT} paddingHorizontal={10} />
          </TouchableOpacity>
        )
        break
      case 'Dark':
        return (
          <TouchableOpacity style={styles.icon}>
            <Dark width={MAX_WIDTH} height={MAX_HEIGHT} />
          </TouchableOpacity>
        )
        break
      case 'Dragon':
        return (
          <TouchableOpacity style={styles.icon}>
            <Dragon width={MAX_WIDTH} height={MAX_HEIGHT} />
          </TouchableOpacity>
        )
        break
      case 'Electric':
        return (
          <TouchableOpacity style={styles.icon}>
            <Electric width={MAX_WIDTH} height={MAX_HEIGHT} />
          </TouchableOpacity>
        )
        break
      case 'Fairy':
        return (
          <TouchableOpacity style={styles.icon}>
            <Fairy width={MAX_WIDTH} height={MAX_HEIGHT} />
          </TouchableOpacity>
        )
        break
      case 'Fighting':
        return (
          <TouchableOpacity style={styles.icon}>
            <Fighting width={MAX_WIDTH} height={MAX_HEIGHT} />
          </TouchableOpacity>
        )
        break
      case 'Fire':
        return (
          <TouchableOpacity style={styles.icon}>
            <Fire width={MAX_WIDTH} height={MAX_HEIGHT} />
          </TouchableOpacity>
        )
        break
      case 'Flying':
        return (
          <TouchableOpacity style={styles.icon}>
            <Flying width={MAX_WIDTH} height={MAX_HEIGHT} />
          </TouchableOpacity>
        )
        break
      case 'Ghost':
        return (
          <TouchableOpacity style={styles.icon}>
            <Ghost width={MAX_WIDTH} height={MAX_HEIGHT} />
          </TouchableOpacity>
        )
        break
      case 'Grass':
        return (
          <TouchableOpacity style={styles.icon}>
            <Grass width={MAX_WIDTH} height={MAX_HEIGHT} />
          </TouchableOpacity>
        )
        break
      case 'Ground':
        return (
          <TouchableOpacity style={styles.icon}>
            <Ground width={MAX_WIDTH} height={MAX_HEIGHT} />
          </TouchableOpacity>
        )
        break
      case 'Ice':
        return (
          <TouchableOpacity style={styles.icon}>
            <Ice width={MAX_WIDTH} height={MAX_HEIGHT} />
          </TouchableOpacity>
        )
        break
      case 'Normal':
        return (
          <TouchableOpacity style={styles.icon}>
            <Normal width={MAX_WIDTH} height={MAX_HEIGHT} />
          </TouchableOpacity>
        )
        break
      case 'Poison':
        return (
          <TouchableOpacity style={styles.icon}>
            <Poison width={MAX_WIDTH} height={MAX_HEIGHT} />
          </TouchableOpacity>
        )
        break
      case 'Psychic':
        return (
          <TouchableOpacity style={styles.icon}>
            <Psychic width={MAX_WIDTH} height={MAX_HEIGHT} />
          </TouchableOpacity>
        )
        break
      case 'Rock':
        return (
          <TouchableOpacity style={styles.icon}>
            <Rock width={MAX_WIDTH} height={MAX_HEIGHT} />
          </TouchableOpacity>
        )
        break
      case 'Steel':
        return (
          <TouchableOpacity style={styles.icon}>
            <Steel width={MAX_WIDTH} height={MAX_HEIGHT} />
          </TouchableOpacity>
        )
        break
      case 'Water':
        return (
          <TouchableOpacity style={styles.icon}>
            <Water width={MAX_WIDTH} height={MAX_HEIGHT} />
          </TouchableOpacity>
        )
        break
      default:
        return null
    }
  }

  const getComponents = (typeArray) => {
    const comps = []
    typeArray.forEach((type, index) => {
      comps.push(renderType(type))
    })
    return comps
  }

  if (props.typeEff) {
    return (
      <View style={styles.typeEffective}>{getComponents(props.typeName)}</View>
    )
  }

  return <View style={styles.icon}>{getComponents(props.typeName)}</View>
}

export default Icon

const styles = StyleSheet.create({
  icon: {
    paddingHorizontal: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  typeEffective: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
})
