import { useEffect } from 'react'
import * as StoreReview from 'expo-store-review'
import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEY = '@poketype_review'

export default function useReviewPrompt(shouldCount) {
  useEffect(() => {
    if (!shouldCount) return
    ;(async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY)
        const data = raw
          ? JSON.parse(raw)
          : { viewCount: 0, hasPrompted: false }

        if (data.hasPrompted) return

        data.viewCount += 1

        if (data.viewCount >= 20 && (await StoreReview.isAvailableAsync())) {
          await StoreReview.requestReview()
          data.hasPrompted = true
        }

        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      } catch (_) {}
    })()
  }, [shouldCount])
}
