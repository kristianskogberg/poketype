import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native'
import commonStyles from '../assets/styles/commonStyles'
import RNFadedScrollView from 'rn-faded-scrollview'
import ScrollViewIndicator from 'react-native-scroll-indicator'

import Icon from '../components/typeIcon'

import { LinearGradient } from 'expo-linear-gradient'

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

  const getComponents = (info) => {
    switch (info) {
      case 'Strong against':
        return (
          <View style={{ flexDirection: 'column' }}>
            <Icon typeName={strongAgainstArray} calc={true} />
          </View>
        )
      case 'Weak against':
        return <Icon typeName={weakAgainstArray} calc={true} />
      case 'Resistant to':
        return <Icon typeName={resistanceArray} calc={true} />
      case 'Vulnerable to':
        return <Icon typeName={vulnerableArray} calc={true} />
    }
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: 10 }}>
      <ScrollView persistentScrollbar={true}>
        {createTypeArrays(props.typeName)}

        <Text style={commonStyles.calcHeading}>Strong against</Text>

        <View style={styles.icon}>
          <Icon typeName={strongAgainstArray} typeEff={false} />
        </View>
        <View style={styles.lineSeparator} />
        <Text style={commonStyles.calcHeading}>Weak against</Text>

        <View style={styles.icon}>
          <Icon typeName={weakAgainstArray} typeEff={false} />
        </View>
        <View style={styles.lineSeparator} />
        <Text style={commonStyles.calcHeading}>Resistant to</Text>

        <View style={styles.icon}>
          <Icon typeName={resistanceArray} typeEff={false} />
        </View>
        <View style={styles.lineSeparator} />
        <Text style={commonStyles.calcHeading}>Vulnerable to</Text>

        <View style={styles.icon}>
          <Icon typeName={vulnerableArray} typeEff={false} />
        </View>
      </ScrollView>
    </View>
  )
}

export default TypeCalc

const styles = StyleSheet.create({
  icon: {
    marginBottom: 10,
  },
  lineSeparator: {
    borderBottomColor: 'black',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 5,
  },
})
