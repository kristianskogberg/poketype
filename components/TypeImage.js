import { StyleSheet, View } from 'react-native'

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

const TYPE_IMAGE_MAP = {
  bug: Bug,
  dark: Dark,
  dragon: Dragon,
  electric: Electric,
  fairy: Fairy,
  fighting: Fighting,
  fire: Fire,
  flying: Flying,
  ghost: Ghost,
  grass: Grass,
  ground: Ground,
  ice: Ice,
  normal: Normal,
  poison: Poison,
  psychic: Psychic,
  rock: Rock,
  steel: Steel,
  water: Water,
}

const TypeImage = ({ type }) => {
  const Component = TYPE_IMAGE_MAP[type]
  if (!Component) return null

  return (
    <View>
      <View style={styles.icon} accessibilityLabel={type + ' type'}>
        <Component width={SIZE} height={SIZE} />
      </View>
    </View>
  )
}

export default TypeImage

const styles = StyleSheet.create({
  icon: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})
