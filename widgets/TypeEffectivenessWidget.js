import React from 'react'
import { FlexWidget, TextWidget, ImageWidget } from 'react-native-android-widget'
import { allTypes, calculateDefensiveSpread } from './widgetTypeCalc'
import { TYPE_BG_COLOR, effectivenessColor } from './widgetColors'

const COLS = 6
const ROWS = 3

const typeIconMap = {
  normal: require('../assets/images/type_icons_png/normal.png'),
  fire: require('../assets/images/type_icons_png/fire.png'),
  water: require('../assets/images/type_icons_png/water.png'),
  electric: require('../assets/images/type_icons_png/electric.png'),
  grass: require('../assets/images/type_icons_png/grass.png'),
  ice: require('../assets/images/type_icons_png/ice.png'),
  fighting: require('../assets/images/type_icons_png/fighting.png'),
  poison: require('../assets/images/type_icons_png/poison.png'),
  ground: require('../assets/images/type_icons_png/ground.png'),
  flying: require('../assets/images/type_icons_png/flying.png'),
  psychic: require('../assets/images/type_icons_png/psychic.png'),
  bug: require('../assets/images/type_icons_png/bug.png'),
  rock: require('../assets/images/type_icons_png/rock.png'),
  ghost: require('../assets/images/type_icons_png/ghost.png'),
  dragon: require('../assets/images/type_icons_png/dragon.png'),
  dark: require('../assets/images/type_icons_png/dark.png'),
  steel: require('../assets/images/type_icons_png/steel.png'),
  fairy: require('../assets/images/type_icons_png/fairy.png'),
}

function TypeEffectivenessWidget({ type1 = 0, type2 = 0 }) {
  const spread = calculateDefensiveSpread(type1, type2)
  const defType1 = allTypes[type1]
  const defType2 = allTypes[type2]
  const isDualType = type1 !== type2

  return (
    <FlexWidget
      style={{
        height: 'match_parent',
        width: 'match_parent',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 6,
      }}
    >
      {/* Header */}
      <FlexWidget
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: 'match_parent',
          paddingHorizontal: 4,
          paddingBottom: 4,
        }}
      >
        {/* Defending type 1 badge */}
        <FlexWidget
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: TYPE_BG_COLOR[defType1],
            borderRadius: 12,
            paddingHorizontal: 6,
            paddingVertical: 2,
          }}
        >
          <ImageWidget
            image={typeIconMap[defType1]}
            imageWidth={16}
            imageHeight={16}
          />
          <TextWidget
            text={defType1.toUpperCase()}
            style={{
              fontSize: 10,
              color: '#FFFFFF',
              marginLeft: 3,
            }}
          />
        </FlexWidget>

        {/* Defending type 2 badge (if dual) */}
        {isDualType && (
          <FlexWidget
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: TYPE_BG_COLOR[defType2],
              borderRadius: 12,
              paddingHorizontal: 6,
              paddingVertical: 2,
              marginLeft: 4,
            }}
          >
            <ImageWidget
              image={typeIconMap[defType2]}
              imageWidth={16}
              imageHeight={16}
            />
            <TextWidget
              text={defType2.toUpperCase()}
              style={{
                fontSize: 10,
                color: '#FFFFFF',
                marginLeft: 3,
              }}
            />
          </FlexWidget>
        )}

        {/* Spacer */}
        <FlexWidget style={{ flex: 1 }} />

        {/* Config button */}
        <FlexWidget
          clickAction="OPEN_CONFIG"
          style={{
            backgroundColor: '#E0E0E0',
            borderRadius: 12,
            paddingHorizontal: 8,
            paddingVertical: 3,
          }}
        >
          <TextWidget
            text="⚙"
            style={{ fontSize: 14, color: '#424242' }}
          />
        </FlexWidget>
      </FlexWidget>

      {/* 6x3 Grid */}
      <FlexWidget
        style={{
          flex: 1,
          width: 'match_parent',
          flexDirection: 'column',
        }}
      >
        {Array.from({ length: ROWS }).map((__, rowIdx) => (
          <FlexWidget
            key={`row-${rowIdx}`}
            style={{
              flex: 1,
              flexDirection: 'row',
              width: 'match_parent',
            }}
          >
            {Array.from({ length: COLS }).map((__, colIdx) => {
              const typeIdx = rowIdx * COLS + colIdx
              const typeName = allTypes[typeIdx]
              const multiplier = spread[typeIdx]
              return (
                <FlexWidget
                  key={`cell-${typeIdx}`}
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: effectivenessColor(multiplier),
                    borderRadius: 6,
                    margin: 1,
                  }}
                >
                  <ImageWidget
                    image={typeIconMap[typeName]}
                    imageWidth={20}
                    imageHeight={20}
                  />
                </FlexWidget>
              )
            })}
          </FlexWidget>
        ))}
      </FlexWidget>
    </FlexWidget>
  )
}

export default TypeEffectivenessWidget
