import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import HomeScreen from './components/screens/HomeScreen'

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" backgroundColor="white" />
      <HomeScreen />
    </SafeAreaView>
  )
}
