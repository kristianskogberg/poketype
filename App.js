import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import HomeScreen from './components/screens/HomeScreen'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="auto" backgroundColor="white" />
        <HomeScreen />
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}
