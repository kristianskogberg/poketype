import { useMemo } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { color, textColor } from '../assets/utils/colors'

import Icon from './TypeIcon'
import Tooltip from './Tooltip'
import { allTypes, typeMatrix } from '../assets/utils/types'

const capitalize = (s) => s?.charAt(0).toUpperCase() + s?.slice(1)

const TypeCalc = ({ typeArray, calculateByType }) => {
  const { strengths, weaknesses, resistances, vulnerabilities } =
    useMemo(() => {
      const empty = {
        strengths: [],
        weaknesses: [],
        resistances: [],
        vulnerabilities: [],
      }
      if (!typeArray || typeArray.length === 0) return empty

      const primaryIdx = allTypes.indexOf(typeArray[0])
      const primaryEffectivenesses = typeMatrix[primaryIdx]
      const primaryReverseEffectivenesses = typeMatrix.map(
        (row) => row[primaryIdx],
      )

      const strengths = []
      const weaknesses = []
      const resistances = []
      const vulnerabilities = []

      for (let i = 0; i < allTypes.length; i++) {
        if (primaryEffectivenesses[i] >= 2) strengths.push(allTypes[i])
        else if (primaryEffectivenesses[i] < 1) weaknesses.push(allTypes[i])

        if (primaryReverseEffectivenesses[i] >= 2)
          vulnerabilities.push(allTypes[i])
        else if (primaryReverseEffectivenesses[i] < 1)
          resistances.push(allTypes[i])
      }

      return { strengths, weaknesses, resistances, vulnerabilities }
    }, [typeArray])

  const typeName = typeArray?.[0]

  return (
    <View
      style={{
        width: Dimensions.get('window').width,
      }}>
      <Tooltip
        style={styles.tooltipWrapper}
        text={
          <Text style={styles.tipText}>
            These types take super-effective{' '}
            <Text style={styles.tipPct}>(200%)</Text> damage from{' '}
            <Text style={[styles.tipType, { color: color[typeName] }]}>
              {capitalize(typeName)}
            </Text>{' '}
            attacks
          </Text>
        }>
        <Text style={styles.heading}>Strong against</Text>
      </Tooltip>

      <View style={styles.icon}>
        <Icon typeArray={strengths} calculateByType={calculateByType} />
      </View>
      <View style={styles.lineContainer}>
        <View style={styles.lineSeparator} />
      </View>

      <Tooltip
        style={styles.tooltipWrapper}
        text={
          <Text style={styles.tipText}>
            These types resist{' '}
            <Text style={[styles.tipType, { color: color[typeName] }]}>
              {capitalize(typeName)}
            </Text>{' '}
            attacks, taking reduced <Text style={styles.tipPct}>(50%)</Text>{' '}
            damage
          </Text>
        }>
        <Text style={styles.heading}>Weak against</Text>
      </Tooltip>

      <View style={styles.icon}>
        <Icon typeArray={weaknesses} calculateByType={calculateByType} />
      </View>
      <View style={styles.lineContainer}>
        <View style={styles.lineSeparator} />
      </View>
      <Tooltip
        style={styles.tooltipWrapper}
        text={
          <Text style={styles.tipText}>
            Attacks from these types deal reduced{' '}
            <Text style={styles.tipPct}>(50%)</Text> damage to{' '}
            <Text style={[styles.tipType, { color: color[typeName] }]}>
              {capitalize(typeName)}
            </Text>{' '}
            types
          </Text>
        }>
        <Text style={styles.heading}>Resistant to</Text>
      </Tooltip>

      <View style={styles.icon}>
        <Icon typeArray={resistances} calculateByType={calculateByType} />
      </View>
      <View style={styles.lineContainer}>
        <View style={styles.lineSeparator} />
      </View>
      <Tooltip
        style={styles.tooltipWrapper}
        text={
          <Text style={styles.tipText}>
            Attacks from these types deal super-effective{' '}
            <Text style={styles.tipPct}>(200%)</Text> damage to{' '}
            <Text style={[styles.tipType, { color: color[typeName] }]}>
              {capitalize(typeName)}
            </Text>{' '}
            types
          </Text>
        }>
        <Text style={styles.heading}>Vulnerable to</Text>
      </Tooltip>

      <View style={styles.icon}>
        <Icon typeArray={vulnerabilities} calculateByType={calculateByType} />
      </View>
    </View>
  )
}

export default TypeCalc

const styles = StyleSheet.create({
  heading: {
    fontSize: 16,
    color: textColor.grey,
    textAlign: 'left',
  },
  tooltipWrapper: {
    paddingLeft: 18,
    paddingTop: 6,
  },
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
  tipText: {
    color: textColor.white,
    fontSize: 13,
  },
  tipType: {
    fontWeight: 'bold',
  },
  tipPct: {
    color: textColor.lightGrey,
  },
})
