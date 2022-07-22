import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import HomeScreen from './components/screens/HomeScreen'
import commonStyles from './assets/styles/commonStyles'
import { maxScreenWidth, maxScreenHeight } from './assets/constants'
import TTT from './components/screens/testNewScreen'
import TestScreen from './components/screens/testScreen'
import { LocalDataSetExample } from './components/autoBold'

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <HomeScreen />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
})
