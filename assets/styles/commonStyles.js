import { StyleSheet } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { textColor } from '../colors'

const fontFamily = StyleSheet.create({
  bold: {
    fontFamily: 'SF-Pro-Display-Bold',
    //color: textColor.black,
  },
  regular: {
    fontFamily: 'SF-Pro-Display-Regular',
  },
})

export default StyleSheet.create({
  heading: {
    fontSize: 32,
    fontWeight: '700',
    color: textColor.black,
    padding: 5,
    //...fontFamily.bold,
  },
  subHeading: {
    fontSize: 16,
    padding: 5,
    color: textColor.grey,
    justifyContent: 'center',
    textAlign: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: textColor.grey,
    padding: 8,
    margin: 10,
    width: 200,
    borderRadius: 10,
    backgroundColor: '#F2F2F2',
    //...fontFamily.regular,
  },
  types: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footer: {
    fontSize: 12,
    padding: 5,
    color: textColor.grey,
    justifyContent: 'center',
    textAlign: 'center',
    //position: 'absolute',
    marginBottom: 14,
  },
})
