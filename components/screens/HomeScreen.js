import { useState, useCallback, useMemo, useRef, memo, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Pressable,
} from 'react-native'
import { BlurView, BlurTargetView } from 'expo-blur'
import { Ionicons } from '@expo/vector-icons'
import Card from '../Card'
import { allTypes } from '../../assets/utils/types'
import { allCardItems } from '../../assets/utils/pokemonData'
import { CapitalizeFirstLetter } from '../../assets/utils/capitalizeFirstLetter'
import { textColor } from '../../assets/utils/colors'
import { BORDER_RADIUS, GAP, GAP_SM } from '../../assets/utils/constants'
import { addRecentSearch } from '../../assets/utils/useRecentSearches'
import Footer from '../Footer'

const ITEM_HEIGHT = 150
const ITEM_GAP = GAP
const SEARCH_BAR_HEIGHT = 56
const noop = () => {}

// Type card items (pre-computed)
const typeCardItems = allTypes.map((t) => ({
  id: t,
  kind: 'type',
  name: CapitalizeFirstLetter(t),
  types: [t],
  pokedexNumber: 'Type',
  pokemonId: null,
  image: null,
  searchName: t,
}))

const allItems = [...allCardItems, ...typeCardItems]

const CardItem = memo(
  ({ item, onPress }) => (
    <Pressable onPress={() => onPress(item)}>
      <Card
        pokemonName={item.name}
        image={item.image}
        types={item.types}
        pokedexNumber={item.pokedexNumber}
        forms={item.forms}
        calculateByType={noop}
        height={ITEM_HEIGHT}
        variant="compact"
      />
    </Pressable>
  ),
  (prev, next) => prev.item.id === next.item.id,
)

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState('')
  const blurTargetRef = useRef(null)
  const listRef = useRef(null)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setSearch((prev) => (prev ? '' : prev))
    })
    return unsubscribe
  }, [navigation])

  const onChangeSearch = useCallback((text) => {
    setSearch(text)
    listRef.current?.scrollToOffset({ offset: 0, animated: false })
  }, [])

  const filteredItems = useMemo(() => {
    if (!search) return allItems
    const q = search.toLowerCase().replace(/\s+/g, '')
    return allItems.filter((item) => item.searchName.replace(/-/g, '').includes(q))
  }, [search])

  const onPressItem = useCallback(
    (item) => {
      const navId = item.kind === 'pokemon' ? item.searchName : item.id
      navigation.navigate('Detail', { kind: item.kind, id: navId })
      addRecentSearch({
        kind: item.kind,
        id: navId,
        name: item.name,
        types: item.types,
        pokedexNumber: item.rawPokedexNumber ?? null,
        pokemonId: item.pokemonId,
      })
    },
    [navigation],
  )

  const renderItem = useCallback(
    ({ item }) => <CardItem item={item} onPress={onPressItem} />,
    [onPressItem],
  )

  const getItemLayout = useCallback(
    (_, index) => ({
      length: ITEM_HEIGHT + ITEM_GAP,
      offset: (ITEM_HEIGHT + ITEM_GAP) * index,
      index,
    }),
    [],
  )

  return (
    <View style={styles.container}>
      <BlurTargetView ref={blurTargetRef} style={StyleSheet.absoluteFill}>
        <FlatList
          ref={listRef}
          data={filteredItems}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          getItemLayout={getItemLayout}
          contentContainerStyle={{
            paddingTop: SEARCH_BAR_HEIGHT,
            gap: ITEM_GAP,
          }}
          initialNumToRender={8}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={30}
          windowSize={5}
          removeClippedSubviews
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nothing found</Text>
          }
          ListFooterComponent={<Footer />}
        />
      </BlurTargetView>

      <View style={styles.searchOverlay}>
        <View style={styles.searchRow}>
          <BlurView
            blurTarget={blurTargetRef}
            intensity={36}
            tint="light"
            blurMethod="dimezisBlurView"
            style={styles.searchInputBlur}>
            <View style={styles.searchInputRow}>
              <Ionicons name="search" size={18} color={textColor.grey} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search for a Pokémon or Type..."
                placeholderTextColor={textColor.grey}
                value={search}
                onChangeText={onChangeSearch}
                autoCorrect={false}
              />
              {search ? (
                <Pressable onPress={() => setSearch('')} hitSlop={8}>
                  <Ionicons name="close" size={18} color={textColor.grey} />
                </Pressable>
              ) : null}
            </View>
          </BlurView>
          <BlurView
            blurTarget={blurTargetRef}
            intensity={36}
            tint="light"
            blurMethod="dimezisBlurView"
            style={styles.recentsButtonBlur}>
            <Pressable
              onPress={() => navigation.navigate('Recents')}
              style={styles.recentsButton}>
              <Ionicons name="time-outline" size={22} color={textColor.grey} />
            </Pressable>
          </BlurView>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 8,
  },
  searchInputBlur: {
    flex: 1,
    borderRadius: BORDER_RADIUS,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: GAP_SM,
  },
  searchInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: '#424242',
  },
  recentsButtonBlur: {
    borderRadius: BORDER_RADIUS,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  recentsButton: {
    padding: 10,
  },
  emptyText: {
    textAlign: 'center',
    padding: 20,
    fontSize: 16,
    color: textColor.grey,
  },
})
