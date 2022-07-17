import { StyleSheet } from 'react-native'
import { textColor } from '../colors'

export default StyleSheet.create({
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: textColor.black,
    padding: 5,
    textAlign: 'center',
  },
  headingNumber: {
    fontSize: 28,
    color: textColor.grey,
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 17,
    color: textColor.grey,
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
  },
  calcHeading: {
    fontSize: 17,
    padding: 6,
    color: textColor.grey,
    alignItems: 'center',
    textAlign: 'left',
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
    marginBottom: 14,
    position: 'absolute',
    bottom: 10,
  },
})
