import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
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
    let typeB = []
    let typeAFlip = []
    let typeBFlip = []

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
      typeB = typeTable[typeIndexSec]
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
        return <Icon typeName={strongAgainstArray} typeEff={true} />
      case 'Weak against':
        return <Icon typeName={weakAgainstArray} typeEff={true} />
      case 'Resistant to':
        return <Icon typeName={resistanceArray} typeEff={true} />
      case 'Vulnerable to':
        return <Icon typeName={vulnerableArray} typeEff={true} />
    }
  }

  return (
    <View style={styles.typeEffectiveness}>
      {createTypeArrays(props.typeName)}
      <View style={styles.container}>
        <Text style={commonStyles.subHeading}>Strong{'\n'}against</Text>
        <ScrollView persistentScrollbar={true}>
          {getComponents('Strong against')}
        </ScrollView>
      </View>
      <View style={styles.container}>
        <Text style={commonStyles.subHeading}>Weak{'\n'}against</Text>
        <ScrollView persistentScrollbar={true}>
          {getComponents('Weak against')}
        </ScrollView>
      </View>
      <View style={styles.container}>
        <Text style={commonStyles.subHeading}>Resistant{'\n'}to</Text>
        <ScrollView>{getComponents('Resistant to')}</ScrollView>
      </View>
      <View style={styles.container}>
        <Text style={commonStyles.subHeading}>Vulnerable{'\n'}to</Text>
        <ScrollView persistentScrollbar={true}>
          {getComponents('Vulnerable to')}
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
