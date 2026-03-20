import { Pressable } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Ionicons } from '@expo/vector-icons'
import HomeScreen from './components/screens/HomeScreen'
import DetailScreen from './components/screens/DetailScreen'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="auto" backgroundColor="white" />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShadowVisible: false,
              headerBackVisible: false,
              freezeOnBlur: true,
            }}>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Detail"
              component={DetailScreen}
              options={({ navigation }) => ({
                headerTitle: '',
                headerTransparent: true,
                headerTopInsetEnabled: false,
                animation: 'fade',
                headerLeft: () => (
                  <Pressable onPress={() => navigation.popToTop()} hitSlop={8}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                  </Pressable>
                ),
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
