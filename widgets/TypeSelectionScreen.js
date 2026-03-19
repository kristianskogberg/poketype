import React, { useState } from 'react'
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { allTypes } from './widgetTypeCalc'
import { TYPE_BG_COLOR } from './widgetColors'
import TypeEffectivenessWidget from './TypeEffectivenessWidget'

const STORAGE_PREFIX = '@widget_type_'

function TypeButton({ typeName, selected, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.typeButton,
        { backgroundColor: TYPE_BG_COLOR[typeName] },
        selected && styles.typeButtonSelected,
      ]}
    >
      <Text style={styles.typeButtonText}>
        {typeName.charAt(0).toUpperCase() + typeName.slice(1)}
      </Text>
    </Pressable>
  )
}

function TypeSelectionScreen({ widgetInfo, renderWidget, setResult }) {
  const [type1, setType1] = useState(0)
  const [type2, setType2] = useState(0)

  const handleDone = async () => {
    await AsyncStorage.setItem(
      `${STORAGE_PREFIX}${widgetInfo.widgetId}`,
      JSON.stringify({ type1, type2 })
    )

    renderWidget(
      <TypeEffectivenessWidget type1={type1} type2={type2} />
    )
    setResult('ok')
  }

  const handleCancel = () => {
    setResult('cancel')
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>Select Defending Types</Text>

      <Text style={styles.label}>Type 1</Text>
      <View style={styles.typeGrid}>
        {allTypes.map((t, i) => (
          <TypeButton
            key={t}
            typeName={t}
            selected={type1 === i}
            onPress={() => setType1(i)}
          />
        ))}
      </View>

      <Text style={styles.label}>Type 2</Text>
      <View style={styles.typeGrid}>
        {allTypes.map((t, i) => (
          <TypeButton
            key={t}
            typeName={t}
            selected={type2 === i}
            onPress={() => setType2(i)}
          />
        ))}
      </View>

      <View style={styles.buttonRow}>
        <Pressable style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelText}>Cancel</Text>
        </Pressable>
        <Pressable style={styles.doneButton} onPress={handleDone}>
          <Text style={styles.doneText}>Done</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#17171B',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#17171B',
    marginBottom: 10,
    marginTop: 10,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  typeButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  typeButtonSelected: {
    borderColor: '#17171B',
  },
  typeButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#E0E0E0',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
  cancelText: {
    color: '#17171B',
    fontSize: 16,
    fontWeight: '600',
  },
  doneButton: {
    flex: 1,
    backgroundColor: '#17171B',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
  doneText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
})

export default TypeSelectionScreen
