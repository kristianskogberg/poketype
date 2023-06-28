import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import commonStyles from '../assets/styles/commonStyles'

import Icon from './typeIcon'
import { allTypes, typeMatrix } from '../assets/utils/types'

const TypeCalc = ({ typeArray, calculateByType }) => {
  const [strengths, setStrengths] = useState([])
  const [weaknesses, setWeaknesses] = useState([])
  const [resistances, setResistances] = useState([])
  const [vulnerabilities, setVulnerabilities] = useState([])

  /**
   * Calculates strenghts, weaknesses, resistances
   * and vulnerabilities based on the Pokemon's type(s)
   */
  const calculateTypeEffectivenesses = () => {
    setStrengths([])
    setWeaknesses([])
    setResistances([])
    setVulnerabilities([])

    let secondaryTypeIndex
    const primaryTypeReverseEffectivenesses = []

    // set index from the matrix based on the Pokemon's types
    const primaryTypeIndex = allTypes.indexOf(typeArray[0])
    if (typeArray.length === 2) {
      // contains two types
      secondaryTypeIndex = allTypes.indexOf(typeArray[1])
    }

    const primaryTypeEffectivenesses = typeMatrix[primaryTypeIndex]

    // create another array for calculating strengths and weaknesses for the primary type
    for (let i = 0; i < typeMatrix.length; i++) {
      primaryTypeReverseEffectivenesses.push(typeMatrix[i][primaryTypeIndex])
    }

    // calculate strengths and weaknesses
    for (let i = 0; i < primaryTypeEffectivenesses?.length; i++) {
      let multiplier = primaryTypeEffectivenesses[i]
      if (multiplier >= 2) {
        setStrengths((current) => [...current, allTypes[i]])
      } else if (multiplier < 1) {
        setWeaknesses((current) => [...current, allTypes[i]])
      }
    }

    // calculate vulnerabilities and resistances
    for (let i = 0; i < primaryTypeReverseEffectivenesses.length; i++) {
      let multiplier = primaryTypeReverseEffectivenesses[i]
      if (multiplier >= 2) {
        setVulnerabilities((current) => [...current, allTypes[i]])
      } else if (multiplier < 1) {
        setResistances((current) => [...current, allTypes[i]])
      }
    }

    if (typeArray.length === 2) {
      // Pokemon has two types
      setStrengths([])
      setWeaknesses([])
      setResistances([])
      setVulnerabilities([])

      let secondaryTypeEffectivenesses = typeMatrix[secondaryTypeIndex]
      let secondaryTypeReverseEffectivenesses = []

      // create another array for calculating strengths and weaknesses for both types
      for (let i = 0; i < typeMatrix.length; i++) {
        primaryTypeReverseEffectivenesses.push(typeMatrix[i][primaryTypeIndex])
        secondaryTypeReverseEffectivenesses.push(
          typeMatrix[i][secondaryTypeIndex]
        )
      }

      // calculate strengths and weaknesses
      // considering both primary and secondary types
      for (let i = 0; i < primaryTypeEffectivenesses.length; i++) {
        let multiplier =
          primaryTypeEffectivenesses[i] * secondaryTypeEffectivenesses[i]
        if (multiplier >= 2) {
          setStrengths((current) => [...current, allTypes[i]])
        } else if (multiplier < 0.5) {
          setWeaknesses((current) => [...current, allTypes[i]])
        }
      }

      // calculate vulnerabilities and resistances
      // considering both primary and secondary types
      for (let i = 0; i < primaryTypeReverseEffectivenesses.length; i++) {
        let multiplier =
          primaryTypeReverseEffectivenesses[i] *
          secondaryTypeReverseEffectivenesses[i]
        if (multiplier >= 2) {
          setVulnerabilities((current) => [...current, allTypes[i]])
        } else if (multiplier < 1) {
          setResistances((current) => [...current, allTypes[i]])
        }
      }
    }
  }

  useEffect(() => {
    // return if typeArray is null
    if (!typeArray) return

    // otherwise calculate
    calculateTypeEffectivenesses()
  }, [typeArray])

  return (
    <View
      style={{
        width: Dimensions.get('window').width,
      }}>
      <Text style={commonStyles.calcHeading}>Strong against</Text>

      <View style={styles.icon}>
        <Icon typeArray={strengths} calculateByType={calculateByType} />
      </View>
      <View style={styles.lineContainer}>
        <View style={styles.lineSeparator} />
      </View>

      <Text style={commonStyles.calcHeading}>Weak against</Text>

      <View style={styles.icon}>
        <Icon typeArray={weaknesses} calculateByType={calculateByType} />
      </View>
      <View style={styles.lineContainer}>
        <View style={styles.lineSeparator} />
      </View>
      <Text style={commonStyles.calcHeading}>Resistant to</Text>

      <View style={styles.icon}>
        <Icon typeArray={resistances} calculateByType={calculateByType} />
      </View>
      <View style={styles.lineContainer}>
        <View style={styles.lineSeparator} />
      </View>
      <Text style={commonStyles.calcHeading}>Vulnerable to</Text>

      <View style={styles.icon}>
        <Icon typeArray={vulnerabilities} calculateByType={calculateByType} />
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
    borderBottomColor: 'gray',
    width: '100%',
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 5,
  },
})
