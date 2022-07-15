import { StyleSheet, StatusBar, Text, ScrollView, View } from 'react-native'
import HomeScreen from './components/screens/HomeScreen'
import commonStyles from './assets/styles/commonStyles'
import { width, height } from './assets/constants'

import { SafeAreaView } from 'react-native-safe-area-context'

import Test from './components/screens/test'

export default function App() {
  return <HomeScreen />
  //return <Test />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
})
