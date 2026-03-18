import { Text, View } from 'react-native'
import commonStyles from '../assets/styles/commonStyles'

/**
 * renders a footer UI component
 * @returns footer
 */
export default function Footer() {
  return (
    <View style={{ alignItems: 'center', paddingVertical: 16 }}>
      <Text style={commonStyles.footer}>Powered by PokeAPI</Text>
    </View>
  )
}
