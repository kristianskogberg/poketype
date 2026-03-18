import { Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Ionicons } from '@expo/vector-icons'
import HomeScreen from './components/screens/HomeScreen'
import DetailScreen from './components/screens/DetailScreen'
import RecentsScreen from './components/screens/RecentsScreen'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="auto" backgroundColor="white" />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              freezeOnBlur: true,
            }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
              name="Detail"
              component={DetailScreen}
              options={({ navigation }) => ({
                headerShown: true,
                headerTitle: '',
                headerBackVisible: false,
                headerShadowVisible: false,
                headerTransparent: true,
                animation: 'fade',
                headerLeft: () => (
                  <Pressable
                    onPress={() => navigation.popToTop()}
                    hitSlop={8}>
                    <Ionicons name="search" size={22} color="#fff" />
                  </Pressable>
                ),
              })}
            />
            <Stack.Screen
              name="Recents"
              component={RecentsScreen}
              options={({ navigation }) => ({
                headerShown: true,
                headerTitle: 'Recent Searches',
                headerBackVisible: false,
                headerShadowVisible: false,
                animation: 'fade',
                headerLeft: () => (
                  <Pressable
                    onPress={() => navigation.popToTop()}
                    hitSlop={8}>
                    <Ionicons name="search" size={22} color="#333" />
                  </Pressable>
                ),
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}
