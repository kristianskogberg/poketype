import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native'
import commonStyles from '../assets/styles/commonStyles'
import RNFadedScrollView from 'rn-faded-scrollview'
import ScrollViewIndicator from 'react-native-scroll-indicator'

import Icon from './typeIcon'
import typesInOrder from './types'

import { LinearGradient } from 'expo-linear-gradient'

const TypeCalc = (props) => {
  /*
    _ = neutral
    H = not very effective
    2 = super effective
  */
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

  let vulnerableArray = []
  let resistanceArray = []
  let strongAgainstArray = []
  let weakAgainstArray = []

  const createTypeArrays = (typeArray) => {
    let typeIndex
    let typeIndexSec
    let dualType

    typeArray.forEach((type, index) => {
      if (index == 0) {
        typeIndex = typesInOrder.indexOf(type)
      } else {
        typeIndexSec = typesInOrder.indexOf(type)
        dualType = true
      }
    })
    let typeA = typeTable[typeIndex]
    let typeAFlip = []

    for (let i = 0; i < typeTable.length; i++) {
      typeAFlip.push(typeTable[i][typeIndex])
    }

    for (let i = 0; i < typeA.length; i++) {
      let multiplier = typeA[i]
      if (multiplier >= 2) {
        strongAgainstArray.push(typesInOrder[i])
      } else if (multiplier < 1) {
        weakAgainstArray.push(typesInOrder[i])
      }
    }
    for (let i = 0; i < typeAFlip.length; i++) {
      let multiplier = typeAFlip[i]
      if (multiplier >= 2) {
        vulnerableArray.push(typesInOrder[i])
      } else if (multiplier < 1) {
        resistanceArray.push(typesInOrder[i])
      }
    }

    if (dualType) {
      let typeB = typeTable[typeIndexSec]
      let typeBFlip = []
      vulnerableArray = []
      resistanceArray = []
      strongAgainstArray = []
      weakAgainstArray = []

      for (let i = 0; i < typeTable.length; i++) {
        typeAFlip.push(typeTable[i][typeIndex])
        typeBFlip.push(typeTable[i][typeIndexSec])
      }

      for (let i = 0; i < typeA.length; i++) {
        let multiplier = typeA[i] * typeB[i]
        if (multiplier >= 2) {
          strongAgainstArray.push(typesInOrder[i])
        } else if (multiplier < 0.5) {
          weakAgainstArray.push(typesInOrder[i])
        }
      }
      for (let i = 0; i < typeAFlip.length; i++) {
        let multiplier = typeAFlip[i] * typeBFlip[i]
        if (multiplier >= 2) {
          vulnerableArray.push(typesInOrder[i])
        } else if (multiplier < 1) {
          resistanceArray.push(typesInOrder[i])
        }
      }
    }
  }

  return (
    <View
      style={{
        width: Dimensions.get('window').width,
      }}>
      {createTypeArrays(props.typeName)}

      <Text style={commonStyles.calcHeading}>Strong against</Text>

      <View style={styles.icon}>
        <Icon
          typeName={strongAgainstArray}
          calculateByType={props.calculateByType}
        />
      </View>
      <View style={styles.lineContainer}>
        <View style={styles.lineSeparator} />
      </View>

      <Text style={commonStyles.calcHeading}>Weak against</Text>

      <View style={styles.icon}>
        <Icon
          typeName={weakAgainstArray}
          calculateByType={props.calculateByType}
        />
      </View>
      <View style={styles.lineContainer}>
        <View style={styles.lineSeparator} />
      </View>
      <Text style={commonStyles.calcHeading}>Resistant to</Text>

      <View style={styles.icon}>
        <Icon
          typeName={resistanceArray}
          calculateByType={props.calculateByType}
        />
      </View>
      <View style={styles.lineContainer}>
        <View style={styles.lineSeparator} />
      </View>
      <Text style={commonStyles.calcHeading}>Vulnerable to</Text>

      <View style={styles.icon}>
        <Icon
          typeName={vulnerableArray}
          calculateByType={props.calculateByType}
        />
      </View>
    </View>
  )
}

export default TypeCalc

const styles = StyleSheet.create({
  icon: {
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  lineContainer: {
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  lineSeparator: {
    borderBottomColor: 'black',
    width: '100%',

    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 5,
  },
})
