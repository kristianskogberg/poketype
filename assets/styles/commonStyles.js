import { StyleSheet } from 'react-native'
import { textColor } from '../utils/colors'
import { BORDER_RADIUS } from '../utils/constants'

export default StyleSheet.create({
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: textColor.black,
    padding: 5,
    textAlign: 'left',
  },
  headingNumber: {
    fontSize: 28,
    color: textColor.grey,
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 16,
    color: textColor.grey,
    alignItems: 'center',
    textAlign: 'left',
    padding: 10,
  },
  calcHeading: {
    fontSize: 16,
    paddingLeft: 18,
    paddingTop: 6,
    color: textColor.grey,
    alignItems: 'center',
    textAlign: 'left',
  },
  types: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    height: 50,
    borderRadius: BORDER_RADIUS,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 10,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: '#424242',
    fontSize: 16,
  },
  footer: {
    fontSize: 12,
    color: textColor.grey,
    textAlign: 'center',
  },
})
