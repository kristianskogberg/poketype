import { useMemo } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import commonStyles from '../assets/styles/commonStyles'

import Icon from './TypeIcon'
import { allTypes, typeMatrix } from '../assets/utils/types'

const TypeCalc = ({ typeArray, calculateByType }) => {
  const { strengths, weaknesses, resistances, vulnerabilities } = useMemo(() => {
    const empty = { strengths: [], weaknesses: [], resistances: [], vulnerabilities: [] }
    if (!typeArray || typeArray.length === 0) return empty

    const primaryIdx = allTypes.indexOf(typeArray[0])
    const primaryEffectivenesses = typeMatrix[primaryIdx]
    const primaryReverseEffectivenesses = typeMatrix.map((row) => row[primaryIdx])

    const strengths = []
    const weaknesses = []
    const resistances = []
    const vulnerabilities = []

    for (let i = 0; i < allTypes.length; i++) {
      if (primaryEffectivenesses[i] >= 2) strengths.push(allTypes[i])
      else if (primaryEffectivenesses[i] < 1) weaknesses.push(allTypes[i])

      if (primaryReverseEffectivenesses[i] >= 2) vulnerabilities.push(allTypes[i])
      else if (primaryReverseEffectivenesses[i] < 1) resistances.push(allTypes[i])
    }

    return { strengths, weaknesses, resistances, vulnerabilities }
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
