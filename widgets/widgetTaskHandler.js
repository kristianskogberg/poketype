import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import TypeEffectivenessWidget from './TypeEffectivenessWidget'

const STORAGE_PREFIX = '@widget_type_'

async function getWidgetTypes(widgetId) {
  try {
    const data = await AsyncStorage.getItem(`${STORAGE_PREFIX}${widgetId}`)
    if (data) return JSON.parse(data)
  } catch {}
  return { type1: 0, type2: 0 }
}

async function widgetTaskHandler(props) {
  const { widgetInfo, widgetAction, renderWidget, clickAction } = props

  if (widgetInfo.widgetName !== 'TypeEffectiveness') return

  switch (widgetAction) {
    case 'WIDGET_ADDED':
    case 'WIDGET_UPDATE':
    case 'WIDGET_RESIZED': {
      const { type1, type2 } = await getWidgetTypes(widgetInfo.widgetId)
      renderWidget(
        <TypeEffectivenessWidget type1={type1} type2={type2} />
      )
      break
    }

    case 'WIDGET_DELETED':
      try {
        await AsyncStorage.removeItem(
          `${STORAGE_PREFIX}${widgetInfo.widgetId}`
        )
      } catch {}
      break

    case 'WIDGET_CLICK':
      // Custom click actions can be handled here
      break

    default:
      break
  }
}

export default widgetTaskHandler
