import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { bgColor } from '../assets/colors';


const  Card = (props) => {
    return (
        <View style={styles.container}>
            <Text style={{backgroundColor: 'blue'}}>
                Bulbasaur
            </Text>
            <Image 
            style={styles.image}
            source={{uri:'https://cdn.traction.one/pokedex/pokemon/700.png'}} />
            <Text>
                props
            </Text>
        </View>
    )
  }

export default Card;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    flex: 1,
    marginTop: 25,
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    justifyContent: 'center'
  },
});
