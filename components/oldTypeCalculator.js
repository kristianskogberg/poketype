import React, { Component } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import commonStyles from '../assets/styles/commonStyles'
import RNFadedScrollView from 'rn-faded-scrollview'
import ScrollViewIndicator from 'react-native-scroll-indicator'

import Icon from './typeIcon'
import { Line } from 'react-native-svg'

import { LinearGradient } from 'expo-linear-gradient'

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
      if (typeTable[i][typeIndexSec] == H || typeTable[i][typeIndexSec] == 0) {
        resistanceArraySec.push(typesInOrder[i])
      }
      if (typeTable[typeIndexSec][i] == 2) {
        strongAgainstArraySec.push(typesInOrder[i])
        //console.log(typesInOrder[i])
      }
      if (typeTable[typeIndexSec][i] == H || typeTable[i][typeIndexSec] == 0) {
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
    weakAgainstArray = [...new Set(weakArrayFinalTemp)]

    let strongArrayFinalTemp = strong.concat(strong2)
    strongAgainstArray = [...new Set(strongArrayFinalTemp)]

    let resistanceArrayFinalTemp = resistance.concat(resistance2)
    resistanceArray = [...new Set(resistanceArrayFinalTemp)]

    let vulnerableArrayFinalTemp = vulnerable.concat(vulnerable2)
    vulnerableArray = [...new Set(vulnerableArrayFinalTemp)]
  }
}

const getComponents = (typeArray, info) => {
  switch (info) {
    case 'Strong against':
      console.log(strongAgainstArray)
      return <Icon typeName={strongAgainstArray} typeEff={true} />
    case 'Weak against':
      return <Icon typeName={weakAgainstArray} typeEff={true} />
    case 'Resistant to':
      return <Icon typeName={resistanceArray} typeEff={true} />
    case 'Vulnerable to':
      return <Icon typeName={vulnerableArray} typeEff={true} />
  }
}

let AAA = []
export default class Test extends Component {
  constructor(props) {
    super(props)
    AAA = props.typeName
    createVulnerabilityArray(AAA)
  }

  render() {
    return (
      <View style={styles.typeEffectiveness}>
        <View style={styles.container}>
          <Text style={commonStyles.subHeading}>Strong {'\n'} against</Text>
          <ScrollView persistentScrollbar={true}>
            {getComponents(AAA, 'Strong against')}
          </ScrollView>
        </View>
        <View style={styles.container}>
          <Text style={commonStyles.subHeading}>Weak {'\n'} against</Text>
          <ScrollView persistentScrollbar={true}>
            {getComponents(AAA, 'Weak against')}
          </ScrollView>
        </View>
        <View style={styles.container}>
          <Text style={commonStyles.subHeading}>Resistant {'\n'} to</Text>
          <ScrollView persistentScrollbar={true}>
            {getComponents(AAA, 'Resistant to')}
          </ScrollView>
        </View>
        <View style={styles.container}>
          <Text style={commonStyles.subHeading}>Vulnerable {'\n'} to</Text>
          <ScrollView persistentScrollbar={true}>
            {getComponents(AAA, 'Vulnerable to')}
          </ScrollView>
        </View>
      </View>
    )
  }
}

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
