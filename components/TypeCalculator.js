import { useMemo, useRef } from 'react'
import { StyleSheet, Text, View, Dimensions, Pressable } from 'react-native'
import { bgColor, color, textColor } from '../assets/utils/colors'
import { BORDER_RADIUS_SM, GAP_SM } from '../assets/utils/constants'

import Icon from './TypeIcon'
import Tooltip from './Tooltip'
import { allTypes, typeMatrix } from '../assets/utils/types'

const capitalize = (s) => s?.charAt(0).toUpperCase() + s?.slice(1)

const BOTH_INDEX = 2

const TypeCalc = ({
  typeArray,
  selectedTypeIndex,
  onSelectType,
  calculateByType,
}) => {
  const isDualType = typeArray && typeArray.length > 1
  const activeTab =
    isDualType && selectedTypeIndex != null ? selectedTypeIndex : 0

  const { strengths, weaknesses, resistances, vulnerabilities } =
    useMemo(() => {
      const empty = {
        strengths: [],
        weaknesses: [],
        resistances: [],
        vulnerabilities: [],
      }
      if (!typeArray || typeArray.length === 0) return empty

      if (isDualType && activeTab === BOTH_INDEX) {
        // Combined dual-type calculation
        const idx0 = allTypes.indexOf(typeArray[0])
        const idx1 = allTypes.indexOf(typeArray[1])
        const eff0 = typeMatrix[idx0]
        const eff1 = typeMatrix[idx1]
        const rev0 = typeMatrix.map((row) => row[idx0])
        const rev1 = typeMatrix.map((row) => row[idx1])

        const strengths = []
        const weaknesses = []
        const resistances = []
        const vulnerabilities = []

        for (let i = 0; i < allTypes.length; i++) {
          // Attacking: best multiplier from either type
          const bestAtk = Math.max(eff0[i], eff1[i])
          if (bestAtk >= 2) strengths.push(allTypes[i])
          else if (bestAtk < 1) weaknesses.push(allTypes[i])

          // Defending: multiply both types' defensive multipliers
          const combinedDef = rev0[i] * rev1[i]
          if (combinedDef >= 2) vulnerabilities.push(allTypes[i])
          else if (combinedDef < 1) resistances.push(allTypes[i])
        }

        return { strengths, weaknesses, resistances, vulnerabilities }
      }

      // Single type calculation
      const typeIdx = isDualType ? activeTab : 0
      const primaryIdx = allTypes.indexOf(typeArray[typeIdx])
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
    }, [typeArray, activeTab, isDualType])

  const isBoth = isDualType && activeTab === BOTH_INDEX
  const typeName = isBoth ? null : typeArray?.[isDualType ? activeTab : 0]

  const strengthsRef = useRef(null)
  const weaknessesRef = useRef(null)
  const resistancesRef = useRef(null)
  const vulnerabilitiesRef = useRef(null)

  const tooltipTypeName = isBoth ? (
    <Text>
      <Text style={[styles.tipType, { color: color[typeArray[0]] }]}>
        {capitalize(typeArray[0])}
      </Text>{' '}
      or{' '}
      <Text style={[styles.tipType, { color: color[typeArray[1]] }]}>
        {capitalize(typeArray[1])}
      </Text>
    </Text>
  ) : (
    <Text style={[styles.tipType, { color: color[typeName] }]}>
      {capitalize(typeName)}
    </Text>
  )

  return (
    <View
      style={{
        width: Dimensions.get('window').width,
      }}>
      {isDualType && onSelectType ? (
        <View style={styles.tabRow}>
          {typeArray.map((type, i) => (
            <Pressable
              key={type}
              onPress={() => onSelectType(i)}
              style={[
                styles.tab,
                {
                  backgroundColor: activeTab === i ? bgColor[type] : '#E0E0E0',
                },
              ]}>
              <Text
                style={[
                  styles.tabText,
                  {
                    color: activeTab === i ? textColor.white : textColor.grey,
                  },
                ]}>
                {capitalize(type)}
              </Text>
            </Pressable>
          ))}
          <Pressable
            onPress={() => onSelectType(BOTH_INDEX)}
            style={styles.bothTab}>
            <View
              style={[
                styles.bothTabHalf,
                styles.bothTabLeft,
                {
                  backgroundColor:
                    activeTab === BOTH_INDEX
                      ? bgColor[typeArray[0]]
                      : '#E0E0E0',
                },
              ]}>
              <Text
                style={[
                  styles.tabText,
                  {
                    color:
                      activeTab === BOTH_INDEX
                        ? textColor.white
                        : textColor.grey,
                  },
                ]}>
                {capitalize(typeArray[0])}
              </Text>
            </View>
            <View
              style={[
                styles.bothTabHalf,
                styles.bothTabRight,
                {
                  backgroundColor:
                    activeTab === BOTH_INDEX
                      ? bgColor[typeArray[1]]
                      : '#E0E0E0',
                },
              ]}>
              <Text
                style={[
                  styles.tabText,
                  {
                    color:
                      activeTab === BOTH_INDEX
                        ? textColor.white
                        : textColor.grey,
                  },
                ]}>
                {capitalize(typeArray[1])}
              </Text>
            </View>
          </Pressable>
        </View>
      ) : null}

      <View ref={strengthsRef}>
        <Tooltip
          style={styles.tooltipWrapper}
          highlightRef={strengthsRef}
          text={
            isBoth ? (
              <Text style={styles.tipText}>
                These types take super-effective damage from {tooltipTypeName}{' '}
                attacks
              </Text>
            ) : (
              <Text style={styles.tipText}>
                These types take super-effective{' '}
                <Text style={styles.tipPct}>(200%)</Text> damage from{' '}
                {tooltipTypeName} attacks
              </Text>
            )
          }>
          <Text style={styles.heading}>Strong against</Text>
        </Tooltip>

        <View style={styles.icon}>
          <Icon typeArray={strengths} calculateByType={calculateByType} />
        </View>
      </View>
      <View style={styles.lineContainer}>
        <View style={styles.lineSeparator} />
      </View>

      <View ref={weaknessesRef}>
        <Tooltip
          style={styles.tooltipWrapper}
          highlightRef={weaknessesRef}
          text={
            isBoth ? (
              <Text style={styles.tipText}>
                These types resist {tooltipTypeName} attacks, taking reduced
                damage
              </Text>
            ) : (
              <Text style={styles.tipText}>
                These types resist {tooltipTypeName} attacks, taking reduced{' '}
                <Text style={styles.tipPct}>(50%)</Text> damage
              </Text>
            )
          }>
          <Text style={styles.heading}>Weak against</Text>
        </Tooltip>

        <View style={styles.icon}>
          <Icon typeArray={weaknesses} calculateByType={calculateByType} />
        </View>
      </View>
      <View style={styles.lineContainer}>
        <View style={styles.lineSeparator} />
      </View>

      <View ref={resistancesRef}>
        <Tooltip
          style={styles.tooltipWrapper}
          highlightRef={resistancesRef}
          text={
            isBoth ? (
              <Text style={styles.tipText}>
                Attacks from these types deal reduced damage to{' '}
                {tooltipTypeName} Pokemon
              </Text>
            ) : (
              <Text style={styles.tipText}>
                Attacks from these types deal reduced{' '}
                <Text style={styles.tipPct}>(50%)</Text> damage to{' '}
                {tooltipTypeName} types
              </Text>
            )
          }>
          <Text style={styles.heading}>Resistant to</Text>
        </Tooltip>

        <View style={styles.icon}>
          <Icon typeArray={resistances} calculateByType={calculateByType} />
        </View>
      </View>
      <View style={styles.lineContainer}>
        <View style={styles.lineSeparator} />
      </View>

      <View ref={vulnerabilitiesRef}>
        <Tooltip
          style={styles.tooltipWrapper}
          highlightRef={vulnerabilitiesRef}
          text={
            isBoth ? (
              <Text style={styles.tipText}>
                Attacks from these types deal super-effective damage to{' '}
                {tooltipTypeName} Pokemon
              </Text>
            ) : (
              <Text style={styles.tipText}>
                Attacks from these types deal super-effective{' '}
                <Text style={styles.tipPct}>(200%)</Text> damage to{' '}
                {tooltipTypeName} types
              </Text>
            )
          }>
          <Text style={styles.heading}>Vulnerable to</Text>
        </Tooltip>

        <View style={styles.icon}>
          <Icon typeArray={vulnerabilities} calculateByType={calculateByType} />
        </View>
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
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 4,
    gap: GAP_SM,
  },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS_SM,
  },
  bothTab: {
    flexDirection: 'row',
  },
  bothTabHalf: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  bothTabLeft: {
    borderTopLeftRadius: BORDER_RADIUS_SM,
    borderBottomLeftRadius: BORDER_RADIUS_SM,
  },
  bothTabRight: {
    borderTopRightRadius: BORDER_RADIUS_SM,
    borderBottomRightRadius: BORDER_RADIUS_SM,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
  },
})
