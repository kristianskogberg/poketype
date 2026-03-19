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
const OVERLAY_COLOR = 'rgba(0,0,0,0.5)'

const Tooltip = ({ text, style, highlightRef, children }) => {
  const [visible, setVisible] = useState(false)
  const [iconPos, setIconPos] = useState(null)
  const [highlightPos, setHighlightPos] = useState(null)
  const [tooltipSize, setTooltipSize] = useState(null)
  const fadeAnim = useRef(new Animated.Value(0)).current
  const iconRef = useRef(null)

  const open = useCallback(() => {
    iconRef.current?.measureInWindow((x, y, w, h) => {
      setIconPos({ x, y, w, h })

      if (highlightRef?.current) {
        highlightRef.current.measureInWindow((hx, hy, hw, hh) => {
          setHighlightPos({ x: hx, y: hy, w: hw, h: hh })
          setVisible(true)
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }).start()
        })
      } else {
        setVisible(true)
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }).start()
      }
    })
  }, [fadeAnim, highlightRef])

  const close = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false)
      setTooltipSize(null)
      setHighlightPos(null)
    })
  }, [fadeAnim])

  const onTooltipLayout = useCallback((e) => {
    const { width, height } = e.nativeEvent.layout
    setTooltipSize({ width, height })
  }, [])

  const screenWidth = Dimensions.get('window').width
  const screenHeight = Dimensions.get('window').height

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
      <Pressable
        onPress={open}
        ref={iconRef}
        hitSlop={8}
        style={styles.infoIconPressable}>
        <Text style={styles.infoIcon}>{'\u24D8'}</Text>
      </Pressable>

      <Modal visible={visible} transparent animationType="none">
        <Pressable style={styles.backdrop} onPress={close}>
          {highlightPos ? (
            <Animated.View
              style={[styles.overlayContainer, { opacity: fadeAnim }]}
              pointerEvents="none">
              <View style={[styles.overlay, { height: highlightPos.y }]} />
              <View style={{ flexDirection: 'row', height: highlightPos.h }}>
                <View style={[styles.overlay, { width: highlightPos.x }]} />
                <View style={{ width: highlightPos.w }} />
                <View style={[styles.overlay, { flex: 1 }]} />
              </View>
              <View style={[styles.overlay, { flex: 1 }]} />
            </Animated.View>
          ) : (
            <Animated.View
              style={[
                styles.overlayContainer,
                styles.overlay,
                { opacity: fadeAnim },
              ]}
              pointerEvents="none"
            />
          )}

          <Animated.View style={[styles.container, containerStyle]}>
            <View style={styles.tooltip} onLayout={onTooltipLayout}>
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
  infoIconPressable: {
    marginLeft: 6,
  },
  infoIcon: {
    fontSize: 16,
    color: textColor.grey,
    opacity: 0.75,
    includeFontPadding: false,
  },
  backdrop: {
    flex: 1,
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    backgroundColor: OVERLAY_COLOR,
  },
  container: {
    position: 'absolute',
    maxWidth: 300,
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
