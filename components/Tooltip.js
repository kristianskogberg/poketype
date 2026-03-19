import { useState, useRef, useCallback } from 'react'
import {
  Text,
  View,
  Pressable,
  Modal,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native'
import { BORDER_RADIUS_SM, GAP_SM } from '../assets/utils/constants'
import { textColor } from '../assets/utils/colors'

const ARROW_SIZE = 6

const Tooltip = ({ text, style, children }) => {
  const [visible, setVisible] = useState(false)
  const [iconPos, setIconPos] = useState(null)
  const [tooltipSize, setTooltipSize] = useState(null)
  const fadeAnim = useRef(new Animated.Value(0)).current
  const iconRef = useRef(null)

  const open = useCallback(() => {
    iconRef.current?.measureInWindow((x, y, w, h) => {
      setIconPos({ x, y, w, h })
      setVisible(true)
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start()
    })
  }, [fadeAnim])

  const close = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false)
      setTooltipSize(null)
    })
  }, [fadeAnim])

  const onTooltipLayout = useCallback((e) => {
    const { width, height } = e.nativeEvent.layout
    setTooltipSize({ width, height })
  }, [])

  const screenWidth = Dimensions.get('window').width

  let containerStyle = {}
  let arrowLeft = 0
  if (iconPos && tooltipSize) {
    const iconCenterX = iconPos.x + iconPos.w / 2
    let left = iconCenterX - tooltipSize.width / 2
    left = Math.max(12, Math.min(left, screenWidth - tooltipSize.width - 12))
    const top = iconPos.y - tooltipSize.height - ARROW_SIZE - 4

    arrowLeft = iconCenterX - left - ARROW_SIZE
    containerStyle = { left, top, opacity: fadeAnim }
  } else {
    containerStyle = { opacity: 0 }
  }

  return (
    <View style={[styles.wrapper, style]}>
      {children}
      <Pressable onPress={open} ref={iconRef} hitSlop={8}>
        <Text style={styles.infoIcon}>{'\u24D8'}</Text>
      </Pressable>

      <Modal visible={visible} transparent animationType="none">
        <Pressable style={styles.backdrop} onPress={close}>
          <Animated.View
            style={[styles.container, containerStyle]}
            onLayout={onTooltipLayout}>
            <View style={styles.tooltip}>
              {text}
            </View>
            <View style={[styles.arrow, { marginLeft: arrowLeft }]} />
          </Animated.View>
        </Pressable>
      </Modal>
    </View>
  )
}

export default Tooltip

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    fontSize: 13,
    color: textColor.grey,
    opacity: 0.6,
    marginLeft: GAP_SM,
    includeFontPadding: false,
  },
  backdrop: {
    flex: 1,
  },
  container: {
    position: 'absolute',
    maxWidth: 240,
  },
  tooltip: {
    backgroundColor: '#333',
    borderRadius: BORDER_RADIUS_SM,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  arrow: {
    width: 0,
    height: 0,
    borderLeftWidth: ARROW_SIZE,
    borderRightWidth: ARROW_SIZE,
    borderTopWidth: ARROW_SIZE,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#333',
  },
})
