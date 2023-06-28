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
      case 'bug':
        return (
          <TouchableOpacity
            style={styles.icon}
            key={i}
            accessibilityLabel="bug type">
            <Bug width={SIZE} height={SIZE} />
          </TouchableOpacity>
        )
      case 'dark':
        return (
          <TouchableOpacity
            style={styles.icon}
            key={i}
            accessibilityLabel="dark type">
            <Dark width={SIZE} height={SIZE} />
          </TouchableOpacity>
        )
      case 'dragon':
        return (
          <TouchableOpacity
            style={styles.icon}
            key={i}
            accessibilityLabel="dragon type">
            <Dragon width={SIZE} height={SIZE} />
          </TouchableOpacity>
        )
      case 'electric':
        return (
          <TouchableOpacity
            style={styles.icon}
            key={i}
            accessibilityLabel="electric type">
            <Electric width={SIZE} height={SIZE} />
          </TouchableOpacity>
        )
      case 'fairy':
        return (
          <TouchableOpacity
            style={styles.icon}
            key={i}
            accessibilityLabel="fairy type">
            <Fairy width={SIZE} height={SIZE} />
          </TouchableOpacity>
        )
      case 'fighting':
        return (
          <TouchableOpacity
            style={styles.icon}
            key={i}
            accessibilityLabel="fighting type">
            <Fighting width={SIZE} height={SIZE} />
          </TouchableOpacity>
        )
      case 'fire':
        return (
          <TouchableOpacity
            style={styles.icon}
            key={i}
            accessibilityLabel="fire type">
            <Fire width={SIZE} height={SIZE} />
          </TouchableOpacity>
        )
      case 'flying':
        return (
          <TouchableOpacity
            style={styles.icon}
            key={i}
            accessibilityLabel="flying type">
            <Flying width={SIZE} height={SIZE} />
          </TouchableOpacity>
        )
      case 'ghost':
        return (
          <TouchableOpacity
            style={styles.icon}
            key={i}
            accessibilityLabel="ghost type">
            <Ghost width={SIZE} height={SIZE} />
          </TouchableOpacity>
        )
      case 'grass':
        return (
          <TouchableOpacity
            style={styles.icon}
            key={i}
            accessibilityLabel="grass type">
            <Grass width={SIZE} height={SIZE} />
          </TouchableOpacity>
        )
      case 'ground':
        return (
          <TouchableOpacity
            style={styles.icon}
            key={i}
            accessibilityLabel="ground type">
            <Ground width={SIZE} height={SIZE} />
          </TouchableOpacity>
        )
      case 'ice':
        return (
          <TouchableOpacity
            style={styles.icon}
            key={i}
            accessibilityLabel="ice type">
            <Ice width={SIZE} height={SIZE} />
          </TouchableOpacity>
        )
      case 'normal':
        return (
          <TouchableOpacity
            style={styles.icon}
            key={i}
            accessibilityLabel="normal type">
            <Normal width={SIZE} height={SIZE} />
          </TouchableOpacity>
        )
      case 'poison':
        return (
          <TouchableOpacity
            style={styles.icon}
            key={i}
            accessibilityLabel="poison type">
            <Poison width={SIZE} height={SIZE} />
          </TouchableOpacity>
        )
      case 'psychic':
        return (
          <TouchableOpacity
            style={styles.icon}
            key={i}
            accessibilityLabel="psychic type">
            <Psychic width={SIZE} height={SIZE} />
          </TouchableOpacity>
        )
      case 'rock':
        return (
          <TouchableOpacity
            style={styles.icon}
            key={i}
            accessibilityLabel="rock type">
            <Rock width={SIZE} height={SIZE} />
          </TouchableOpacity>
        )
      case 'steel':
        return (
          <TouchableOpacity
            style={styles.icon}
            key={i}
            accessibilityLabel="steel type">
            <Steel width={SIZE} height={SIZE} />
          </TouchableOpacity>
        )
      case 'water':
        return (
          <TouchableOpacity
            style={styles.icon}
            key={i}
            accessibilityLabel="water type">
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
