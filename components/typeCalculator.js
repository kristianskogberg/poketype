import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import commonStyles from '../assets/styles/commonStyles'
import RNFadedScrollView from 'rn-faded-scrollview'
import ScrollViewIndicator from 'react-native-scroll-indicator'

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

import Icon from '../components/typeIcon'
import { Line } from 'react-native-svg'

import { LinearGradient } from 'expo-linear-gradient'

const MAX_WIDTH = 90
const MAX_HEIGHT = 40

const TypeCalc = (props) => {
  const typesInOrder = [
    'Normal',
    'Fire',
    'Water',
    'Electric',
    'Grass',
    'Ice',
    'Fighting',
    'Poison',
    'Ground',
    'Flying',
    'Psychic',
    'Bug',
    'Rock',
    'Ghost',
    'Dragon',
    'Dark',
    'Steel',
    'Fairy',
  ]
  const _ = 1
  const H = 1 / 2

  const typeTable = [
    [_, _, _, _, _, _, _, _, _, _, _, _, H, 0, _, _, H, _],
    [_, H, H, _, 2, 2, _, _, _, _, _, 2, H, _, H, _, 2, _],
    [_, 2, H, _, H, _, _, _, 2, _, _, _, 2, _, H, _, _, _],
    [_, _, 2, H, H, _, _, _, 0, 2, _, _, _, _, H, _, _, _],
    [_, H, 2, _, H, _, _, H, 2, H, _, H, 2, _, H, _, H, _],
    [_, H, H, _, 2, H, _, _, 2, 2, _, _, _, _, 2, _, H, _],
    [2, _, _, _, _, 2, _, H, _, H, H, H, 2, 0, _, 2, 2, H],
    [_, _, _, _, 2, _, _, H, H, _, _, _, H, H, _, _, 0, 2],
    [_, 2, _, 2, H, _, _, 2, _, 0, _, H, 2, _, _, _, 2, _],
    [_, _, _, H, 2, _, 2, _, _, _, _, 2, H, _, _, _, H, _],
    [_, _, _, _, _, _, 2, 2, _, _, H, _, _, _, _, 0, H, _],
    [_, H, _, _, 2, _, H, H, _, H, 2, _, _, H, _, 2, H, H],
    [_, 2, _, _, _, 2, H, _, H, 2, _, 2, _, _, _, _, H, _],
    [0, _, _, _, _, _, _, _, _, _, 2, _, _, 2, _, H, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, 2, _, H, 0],
    [_, _, _, _, _, _, H, _, _, _, 2, _, _, 2, _, H, _, H],
    [_, H, H, H, _, 2, _, _, _, _, _, _, 2, _, _, _, H, 2],
    [_, H, _, _, _, _, 2, H, _, _, _, _, _, _, 2, 2, H, _],
  ]

  let typeIndex
  let dualType
  let typeIndexSec
  let vulnerableArray = []
  let vulnerableArraySec = []
  let vulnerableArrayFinal = []

  let resistanceArray = []
  let resistanceArraySec = []
  let resistanceArrayFinal = []

  let strongAgainstArray = []
  let strongAgainstArraySec = []
  let strongAgainstArrayFinal = []

  let weakAgainstArray = []
  let weakAgainstArraySec = []
  let weakAgainstArrayFinal = []

  let weaknessArray = []
  let strenghtsArray = []

  const weakAgainst = (type) => {
    switch (type) {
      case 'Bug':
        return [
          'Fighting',
          'Flying',
          'Poison',
          'Ghost',
          'Steel',
          'Fire',
          'Fairy',
        ]
        break
      case 'Dark':
        return ['Fighting', 'Dark', 'Fairy']
        break
      case 'Dragon':
        return ['Steel', 'Fairy']
        break
      case 'Electric':
        return ['Ground', 'Grass', 'Electric', 'Dragon']
        break
      case 'Fairy':
        return ['Poison', 'Steel', 'Fire']
        break
      case 'Fighting':
        return ['Flying', 'Poison', 'Psychic', 'Bug', 'Ghost', 'Fairy']
        break
      case 'Fire':
        return ['Rock', 'Fire', 'Water', 'Dragon']
        break
      case 'Flying':
        return ['Rock', 'Steel', 'Electric']
        break
      case 'Ghost':
        return ['Normal', 'Dark']
        break
      case 'Grass':
        return ['Flying', 'Poison', 'Bug', 'Steel', 'Fire', 'Grass', 'Dragon']
        break
      case 'Ground':
        return ['Flying', 'Bug', 'Grass']
        break
      case 'Ice':
        return ['Steel', 'Fire', 'Water', 'Ice']
        break
      case 'Normal':
        return ['Rock', 'Ghost', 'Steel']
        break
      case 'Poison':
        return ['Poison', 'Ground', 'Rock', 'Ghost', 'Steel']
        break
      case 'Psychic':
        return ['Steel', 'Psychic', 'Dark']
        break
      case 'Rock':
        return ['Fighting', 'Ground', 'Steel']
        break
      case 'Steel':
        return ['Steel', 'Fire', 'Water', 'Electric']
        break
      case 'Water':
        return ['Water', 'Grass', 'Dragon']
        break
      default:
        return ['']
    }
  }

  const strongAgainst = (type) => {
    switch (type) {
      case 'Bug':
        return ['Grass', 'Psychic', 'Dark']
        break
      case 'Dark':
        return ['Ghost', 'Psychic']
        break
      case 'Dragon':
        return ['Dragon']
        break
      case 'Electric':
        return ['Flying', 'Water']
        break
      case 'Fairy':
        return ['Fighting', 'Dragon', 'Dark']
        break
      case 'Fighting':
        return ['Normal', 'Rock', 'Steel', 'Ice', 'Dark']
        break
      case 'Fire':
        return ['Bug', 'Steel', 'Grass', 'Ice']
        break
      case 'Flying':
        return ['Fighting', 'Bug', 'Grass']
        break
      case 'Ghost':
        return ['Ghost', 'Psychic']
        break
      case 'Grass':
        return ['Ground', 'Rock', 'Water']
        break
      case 'Ground':
        return ['Poison', 'Rock', 'Steel', 'Fire', 'Electric']
        break
      case 'Ice':
        return ['Flying', 'Ground', 'Grass', 'Dragon']
        break
      case 'Normal':
        return ['']
        break
      case 'Poison':
        return ['Grass', 'Fairy']
        break
      case 'Psychic':
        return ['Fighting', 'Poison']
        break
      case 'Rock':
        return ['Flying', 'Bug', 'Fire', 'Ice']
        break
      case 'Steel':
        return ['Rock', 'Ice', 'Fairy']
        break
      case 'Water':
        return ['Ground', 'Rock', 'Fire']
        break
      default:
        return ['']
    }
  }

  const resistantTo = (type) => {
    switch (type) {
      case 'Bug':
        return ['Fighting', 'Ground', 'Grass']
        break
      case 'Dark':
        return ['Ghost', 'Psychic', 'Dark']
        break
      case 'Dragon':
        return ['Ice', 'Dragon', 'Fairy']
        break
      case 'Electric':
        return ['Ground']
        break
      case 'Fairy':
        return ['Poison', 'Steel']
        break
      case 'Fighting':
        return ['Flying', 'Psychic', 'Fairy']
        break
      case 'Fire':
        return ['Ground', 'Rock', 'Water']
        break
      case 'Flying':
        return ['Rock', 'Electric', 'Ice']
        break
      case 'Ghost':
        return ['Ghost', 'Dark']
        break
      case 'Grass':
        return ['Flying', 'Poison', 'Bug', 'Fire', 'Ice']
        break
      case 'Ground':
        return ['Water', 'Grass', 'Ice']
        break
      case 'Ice':
        return ['Fighting', 'Rock', 'Steel', 'Fire']
        break
      case 'Normal':
        return ['Fighting']
        break
      case 'Poison':
        return ['Ground', 'Psychic']
        break
      case 'Psychic':
        return ['Bug', 'Ghost', 'Dark']
        break
      case 'Rock':
        return ['Fighting', 'Ground', 'Steel', 'Water', 'Grass']
        break
      case 'Steel':
        return ['Fighting', 'Ground', 'Fire']
        break
      case 'Water':
        return ['Grass', 'Electric']
        break
      default:
        return ['']
    }
  }

  const vulnerableTo = (type) => {
    switch (type) {
      case 'Bug':
        return ['Flying', 'Rock', 'Fire']
        break
      case 'Dark':
        return ['Fighting', 'Bug', 'Fairy']
        break
      case 'Dragon':
        return ['Ice', 'Dragon', 'Fairy']
        break
      case 'Electric':
        return ['Ground']
        break
      case 'Fairy':
        return ['Poison', 'Steel']
        break
      case 'Fighting':
        return ['Flying', 'Psychic', 'Fairy']
        break
      case 'Fire':
        return ['Ground', 'Rock', 'Water']
        break
      case 'Flying':
        return ['Rock', 'Electric', 'Ice']
        break
      case 'Ghost':
        return ['Ghost', 'Dark']
        break
      case 'Grass':
        return ['Flying', 'Poison', 'Bug', 'Fire', 'Ice']
        break
      case 'Ground':
        return ['Water', 'Grass', 'Ice']
        break
      case 'Ice':
        return ['Fighting', 'Rock', 'Steel', 'Fire']
        break
      case 'Normal':
        return ['Fighting']
        break
      case 'Poison':
        return ['Ground', 'Psychic']
        break
      case 'Psychic':
        return ['Bug', 'Ghost', 'Dark']
        break
      case 'Rock':
        return ['Fighting', 'Ground', 'Steel', 'Water', 'Grass']
        break
      case 'Steel':
        return ['Fighting', 'Ground', 'Fire']
        break
      case 'Water':
        return ['Grass', 'Electric']
        break
      default:
        return ['']
    }
  }

  const getWeaknesses = (typeArray) => {
    if (dualType) {
      return <Icon typeName={weakAgainstArrayFinal} typeEff={true} />
    }
    return <Icon typeName={weakAgainstArray} typeEff={true} />
  }

  const getStrenghts = (typeArray) => {
    createVulnerabilityArray(typeArray)
    /*
        const comps = [];

        typeArray.forEach((type, index) => {
            strenghtsArray = strongAgainst(type);
        });*/
    if (dualType) {
      return <Icon typeName={strongAgainstArrayFinal} typeEff={true} />
    }
    return <Icon typeName={strongAgainstArray} typeEff={true} />
  }

  const createVulnerabilityArray = (typeArray) => {
    typeArray.forEach((type, index) => {
      if (index == 0) {
        typeIndex = typesInOrder.indexOf(type)
      } else {
        typeIndexSec = typesInOrder.indexOf(type)
        dualType = true
      }
    })

    for (let i = 0; i < typeTable.length; i++) {
      //resistant to: console.log(typeTable[typeIndex][i])
      if (typeTable[i][typeIndex] == 2) {
        vulnerableArray.push(typesInOrder[i])
      }
      if (typeTable[i][typeIndex] == H || typeTable[i][typeIndex] == 0) {
        resistanceArray.push(typesInOrder[i])
        //console.log(typesInOrder[i])
      }
      if (typeTable[typeIndex][i] == 2) {
        strongAgainstArray.push(typesInOrder[i])
        //console.log(typesInOrder[i])
      }
      if (typeTable[typeIndex][i] == H || typeTable[typeIndex][i] == 0) {
        weakAgainstArray.push(typesInOrder[i])

        //console.log(typesInOrder[i])
      }
    }

    if (dualType) {
      for (let i = 0; i < typeTable.length; i++) {
        //resistant to: console.log(typeTable[typeIndex][i])
        if (typeTable[i][typeIndexSec] == 2) {
          vulnerableArraySec.push(typesInOrder[i])
          //console.log(typesInOrder[typeTable[typeIndex][i]])
        }
        if (
          typeTable[i][typeIndexSec] == H ||
          typeTable[i][typeIndexSec] == 0
        ) {
          resistanceArraySec.push(typesInOrder[i])
        }
        if (typeTable[typeIndexSec][i] == 2) {
          strongAgainstArraySec.push(typesInOrder[i])
          //console.log(typesInOrder[i])
        }
        if (
          typeTable[typeIndexSec][i] == H ||
          typeTable[i][typeIndexSec] == 0
        ) {
          weakAgainstArraySec.push(typesInOrder[i])
        }
      }

      //console.log('eka type strong: ', strongAgainstArray)
      //console.log('toka type strong: ', strongAgainstArraySec)

      //console.log('eka vulnerable strong: ', vulnerableArray)
      //console.log('toka vulnerable strong: ', vulnerableArraySec)

      let vulnerable = vulnerableArray.filter(
        (val) => !resistanceArraySec.includes(val)
      )
      let vulnerable2 = vulnerableArraySec.filter(
        (val) => !resistanceArray.includes(val)
      )

      let resistance = resistanceArray.filter(
        (val) => !vulnerableArraySec.includes(val)
      )
      let resistance2 = resistanceArraySec.filter(
        (val) => !vulnerableArray.includes(val)
      )

      let strong = strongAgainstArray.filter(
        (val) => !vulnerableArraySec.includes(val)
      )
      let strong2 = strongAgainstArraySec.filter(
        (val) => !vulnerableArray.includes(val)
      )

      let weak = weakAgainstArray.filter(
        (val) => !vulnerableArraySec.includes(val)
      )
      let weak2 = weakAgainstArraySec.filter(
        (val) => !vulnerableArray.includes(val)
      )

      let weakArrayFinalTemp = weak.concat(weak2)
      weakAgainstArrayFinal = [...new Set(weakArrayFinalTemp)]

      let strongArrayFinalTemp = strong.concat(strong2)
      strongAgainstArrayFinal = [...new Set(strongArrayFinalTemp)]

      let resistanceArrayFinalTemp = resistance.concat(resistance2)
      resistanceArrayFinal = [...new Set(resistanceArrayFinalTemp)]

      let vulnerableArrayFinalTemp = vulnerable.concat(vulnerable2)
      vulnerableArrayFinal = [...new Set(vulnerableArrayFinalTemp)]
    }
    //console.log(vulnerableArrayFinal)
  }

  const getVulnerabilities = (typeArray) => {
    if (dualType) {
      return <Icon typeName={vulnerableArrayFinal} typeEff={true} />
    }
    return <Icon typeName={vulnerableArray} typeEff={true} />
  }

  const getComponents = (typeArray, info) => {
    if (info == 'Strong against') {
    }
    if (dualType) {
      return <Icon typeName={vulnerableArrayFinal} typeEff={true} />
    }
    return <Icon typeName={vulnerableArray} typeEff={true} />
  }

  const getResistances = (typeArray) => {
    if (dualType) {
      return <Icon typeName={resistanceArrayFinal} typeEff={true} />
    }
    return <Icon typeName={resistanceArray} typeEff={true} />
  }

  return (
    <View style={styles.typeEffectiveness}>
      <View style={styles.container}>
        <Text style={commonStyles.subHeading}>Strong {'\n'} against</Text>
        <ScrollView persistentScrollbar={true}>
          {getStrenghts(props.typeName)}
        </ScrollView>
      </View>
      <View style={styles.container}>
        <Text style={commonStyles.subHeading}>Weak {'\n'} against</Text>
        <ScrollView persistentScrollbar={true}>
          {getWeaknesses(props.typeName)}
        </ScrollView>
      </View>
      <View style={styles.container}>
        <Text style={commonStyles.subHeading}>Resistant {'\n'} to</Text>
        <ScrollView>{getResistances(props.typeName)}</ScrollView>
      </View>
      <View style={styles.container}>
        <Text style={commonStyles.subHeading}>Vulnerable {'\n'} to</Text>
        <ScrollView persistentScrollbar={true}>
          {getVulnerabilities(props.typeName)}
        </ScrollView>
      </View>
    </View>
  )
}

export default TypeCalc

const styles = StyleSheet.create({
  icon: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  typeEffectiveness: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    shouldIndicatorHide: true,
    flexibleIndicator: false,
    scrollIndicatorStyle: { backgroundColor: 'gray' },
    scrollIndicatorContainerStyle: { backgroundColor: 'rgba(0, 0, 0, 0.1)' },
    useNativeDriver: true,
  },
  backgroundStyle: {
    flex: 1,
  },
})
