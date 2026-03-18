import { useState, useEffect, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEY = 'recentSearches'
const MAX_ENTRIES = 100

// Standalone write — no state update, no re-render
export async function addRecentSearch(entry) {
  const raw = await AsyncStorage.getItem(STORAGE_KEY)
  let list = []
  try {
    list = raw ? JSON.parse(raw) : []
  } catch {}
  const next = [entry, ...list.filter((e) => e.id !== entry.id)].slice(
    0,
    MAX_ENTRIES,
  )
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next))
}

// Hook — only use in screens that need to display the list
export function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState([])

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) {
        try {
          setRecentSearches(JSON.parse(raw))
        } catch {}
      }
    })
  }, [])

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([])
    AsyncStorage.removeItem(STORAGE_KEY)
  }, [])

  return { recentSearches, clearRecentSearches }
}
