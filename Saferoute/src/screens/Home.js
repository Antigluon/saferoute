import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native'

import { LinearGradient } from 'expo-linear-gradient';

const character = {
  name: 'Luke Skywalker',
  home: 'Tatooine',
  species: 'human'
}

const data = {
  lat: "",
  long: "",
  destination: "",
  mode_of_transit: "",
  loading: true,
  dataSource: [],
}

function Home(props) {
  
  const [ lat, long, destination, mode_of_transit, loading, dataSource, setText] = useState('');
  const { navigation } = props
  return (
    <LinearGradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={{ flex: 1, alignItems: 'center' }, styles.container}>
          <TextInput
            
            style={styles.textInput}
            placeholder="Latitude"
            returnKeyType="next"
            onChangeText={text => setText(text)}
          />
          <TextInput
            
            style={styles.textInput}
            placeholder="Longitude"
            returnKeyType="next"
            onChangeText={text => setText(text)}
          />
          <TextInput
            
            style={styles.textInput}
            placeholder="Destination"
            returnKeyType="next"
            onChangeText={text => setText(text)}
          />
          <TextInput
            
            style={styles.textInput}
            placeholder="Mode of Transit"
            returnKeyType="done"
            onChangeText={text => setText(text)}
          />
          <Button
            title="Submit"
            onPress={() => navigation.navigate('Detail', { item: character })}
          />
        </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ebebeb'
  },
  text: {
    color: '#101010',
    fontSize: 24,
    fontWeight: 'bold'
  },
  buttonContainer: {
    backgroundColor: '#222',
    borderRadius: 5,
    padding: 10,
    margin: 20
  },
  buttonText: {
    fontSize: 20,
    color: '#fff'
  }
})

export default Home