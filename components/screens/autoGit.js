import React from 'react'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Platform,
  KeyboardAvoidingView,
} from 'react-native'

import RemoteDataSetExample from '../autocomplete'

const AutoGit = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={'height'} enabled>
        <ScrollView
          nestedScrollEnabled
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{ paddingBottom: 200 }}
          style={styles.scrollContainer}>
          <View style={[styles.container]}>
            <Text style={styles.title}>Autocomplete dropdown</Text>
            <View
              style={[
                styles.section,
                Platform.select({ ios: { zIndex: 100 } }),
              ]}>
              <Text style={styles.sectionTitle}>Local list</Text>
              <RemoteDataSetExample />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    marginBottom: 50,
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 3,
  },
})

export default AutoGit
