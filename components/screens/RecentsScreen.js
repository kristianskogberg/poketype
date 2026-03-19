import { useCallback } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Dimensions,
} from 'react-native'
import Card from '../Card'
import { IMAGE_BASE, pokemonByName } from '../../assets/utils/pokemonData'
import { formatPokedexNumber } from '../../assets/utils/formatPokedexNumber'
import { useRecentSearches } from '../../assets/utils/useRecentSearches'
import { textColor } from '../../assets/utils/colors'
import PokeBall from '../../assets/images/pokeball_grey.svg'

const ITEM_HEIGHT = 150
const noop = () => {}

export default function RecentsScreen({ navigation }) {
  const { recentSearches } = useRecentSearches()

  const renderItem = useCallback(
    ({ item }) => (
      <Pressable
        onPress={() =>
          navigation.navigate('Detail', { kind: item.kind, id: item.id })
        }>
        <Card
          pokemonName={item.name}
          image={
            item.pokemonId ? `${IMAGE_BASE}/${item.pokemonId}.png` : null
          }
          types={item.types}
          pokedexNumber={
            item.pokedexNumber
              ? '#' + formatPokedexNumber(item.pokedexNumber)
              : 'Type'
          }
          forms={
            item.kind === 'pokemon' && pokemonByName[item.id]
              ? pokemonByName[item.id].forms || null
              : null
          }
          calculateByType={noop}
          height={ITEM_HEIGHT}
        />
      </Pressable>
    ),
    [navigation],
  )

  const getItemLayout = useCallback(
    (_, index) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    [],
  )

  if (recentSearches.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <PokeBall fill={'black'} width={150} height={150} />
        <Text style={styles.emptyText}>No recent searches</Text>
      </View>
    )
  }

  return (
    <FlatList
      style={styles.container}
      data={recentSearches}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      getItemLayout={getItemLayout}
      removeClippedSubviews
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: textColor.grey,
  },
})
