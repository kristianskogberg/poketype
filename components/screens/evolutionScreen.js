import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
} from 'react-native'
//import textColor from './assets/colors/colors';
import HomeScreen from './components/screens/HomeScreen'

import { useFonts } from 'expo-font'
import Pokeball from './assets/images/pokeball.png'
import commonStyles from './assets/styles/commonStyles'
import { width, height } from './assets/constants'

export default function EvolutionScreen() {
  return (
    <View style={styles.container}>
      <Text>Moi</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: height,
  },
  image: {
    width: '100%',
    height: 100,
    position: 'absolute',
    backgroundColor: 'red',
  },
})
