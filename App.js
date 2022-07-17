import { StyleSheet, StatusBar, Text, ScrollView, View } from 'react-native'
import HomeScreen from './components/screens/HomeScreen'
import commonStyles from './assets/styles/commonStyles'
import { width, height } from './assets/constants'
import RemoteDataSetExample from './components/autocomplete'

export default function App() {
  return <HomeScreen />
  //return <Test />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
})
