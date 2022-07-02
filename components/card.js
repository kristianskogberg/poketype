import React, { useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { bgColor, textColor } from '../assets/colors'
import Icon from './typeIcon'
import commonStyles from '../assets/styles/commonStyles'

const Card = (props) => {
  let getType = (types) => {
    return types[0]
  }
  return (
    <View
      style={{
        ...styles.card,
        backgroundColor: bgColor[getType(props.types)],
      }}>
      <View>
        <Text style={styles.cardText}>
          <Text>{props.name}</Text>
        </Text>

        <Icon typeName={props.types} typeEff={false} />
      </View>
      <Image style={styles.image} source={{ uri: props.imageUrl }} />
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '30%',
  },
  image: {
    width: 150,
    height: 150,
    justifyContent: 'center',
  },
  bg: {
    position: 'absolute',
    backgroundColor: bgColor.rock,
    width: '90%',
    height: '30%',
    borderRadius: 15,
    bottom: '50%',
    alignItems: 'center',
    flexDirection: 'column',
  },
  nameAndTypes: {
    alignItems: 'baseline',
  },
  cardText: {
    fontSize: 32,
    fontWeight: '700',
    color: textColor.white,
    padding: 5,
    textAlign: 'center',
  },
})
