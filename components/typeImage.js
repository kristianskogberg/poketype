import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native'

import Bug from '../assets/images/type_images/bug.svg'
import Dark from '../assets/images/type_images/dark.svg'
import Dragon from '../assets/images/type_images/dragon.svg'
import Electric from '../assets/images/type_images/electric.svg'
import Fairy from '../assets/images/type_images/fairy.svg'
import Fighting from '../assets/images/type_images/fighting.svg'
import Fire from '../assets/images/type_images/fire.svg'
import Flying from '../assets/images/type_images/flying.svg'
import Ghost from '../assets/images/type_images/ghost.svg'
import Grass from '../assets/images/type_images/grass.svg'
import Ground from '../assets/images/type_images/ground.svg'
import Ice from '../assets/images/type_images/ice.svg'
import Normal from '../assets/images/type_images/normal.svg'
import Poison from '../assets/images/type_images/poison.svg'
import Psychic from '../assets/images/type_images/psychic.svg'
import Rock from '../assets/images/type_images/rock.svg'
import Steel from '../assets/images/type_images/steel.svg'
import Water from '../assets/images/type_images/water.svg'

const SIZE = 200

const TypeImage = (props) => {
  const getTypeImage = (type, i) => {
    switch (type[0]) {
      case 'Bug':
        return (
          <TouchableOpacity style={styles.icon} key={i}>
            <Bug width={SIZE} height={SIZE} />
          </TouchableOpacity>
        )
      case 'Dark':
        return (
          <TouchableOpacity style={styles.icon} key={i}>
            <Dark width={SIZE} height={SIZE} />
          </TouchableOpacity>
        )
      case 'Dragon':
        return (
          <TouchableOpacity style={styles.icon} key={i}>
            <Dragon width={SIZE} height={SIZE} />
          </TouchableOpacity>
        )
      case 'Electric':
        return (
          <TouchableOpacity style={styles.icon} key={i}>
            <Electric width={SIZE} height={SIZE} />
          </TouchableOpacity>
        )
      case 'Fairy':
        return (
          <TouchableOpacity style={styles.icon} key={i}>
            <Fairy width={SIZE} height={SIZE} />
          </TouchableOpacity>
        )
      case 'Fighting':
        return (
          <TouchableOpacity style={styles.icon} key={i}>
            <Fighting width={SIZE} height={SIZE} />
          </TouchableOpacity>
        )
      case 'Fire':
        return (
          <TouchableOpacity style={styles.icon} key={i}>
            <Fire width={SIZE} height={SIZE} />
          </TouchableOpacity>
        )
      case 'Flying':
        return (
          <TouchableOpacity style={styles.icon} key={i}>
            <Flying width={SIZE} height={SIZE} />
          </TouchableOpacity>
        )
      case 'Ghost':
        return (
          <TouchableOpacity style={styles.icon} key={i}>
            <Ghost width={SIZE} height={SIZE} />
          </TouchableOpacity>
        )
      case 'Grass':
        return (
          <TouchableOpacity style={styles.icon} key={i}>
            <Grass width={SIZE} height={SIZE} />
          </TouchableOpacity>
        )
      case 'Ground':
        return (
          <TouchableOpacity style={styles.icon} key={i}>
            <Ground width={SIZE} height={SIZE} />
          </TouchableOpacity>
        )
      case 'Ice':
        return (
          <TouchableOpacity style={styles.icon} key={i}>
            <Ice width={SIZE} height={SIZE} />
          </TouchableOpacity>
        )
      case 'Normal':
        return (
          <TouchableOpacity style={styles.icon} key={i}>
            <Normal width={SIZE} height={SIZE} />
          </TouchableOpacity>
        )
      case 'Poison':
        return (
          <TouchableOpacity style={styles.icon} key={i}>
            <Poison width={SIZE} height={SIZE} />
          </TouchableOpacity>
        )
      case 'Psychic':
        return (
          <TouchableOpacity style={styles.icon} key={i}>
            <Psychic width={SIZE} height={SIZE} />
          </TouchableOpacity>
        )
      case 'Rock':
        return (
          <TouchableOpacity style={styles.icon} key={i}>
            <Rock width={SIZE} height={SIZE} />
          </TouchableOpacity>
        )
      case 'Steel':
        return (
          <TouchableOpacity style={styles.icon} key={i}>
            <Steel width={SIZE} height={SIZE} />
          </TouchableOpacity>
        )
      case 'Water':
        return (
          <TouchableOpacity style={styles.icon} key={i}>
            <Water width={SIZE} height={SIZE} />
          </TouchableOpacity>
        )

      default:
        return null
    }
  }
  return <View>{getTypeImage(props.type)}</View>
}

export default TypeImage

const styles = StyleSheet.create({
  icon: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})
