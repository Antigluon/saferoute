import React, { Component } from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

class Home extends Component {
  constructor(props) {
    //constructor to set default state
    super(props);
    this.state = {
      latitude: "",
      longitude: "",
      destination: "",
      mode_of_transit: "",
    };
  }
  //const [ lat, long, destination, mode_of_transit, loading, dataSource, setText, onChangeText] = useState('');
  //const { navigation } = props
  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Input Screen</Text>
        <View style={styles.card}>
          <Text style={styles.cardText}>Latitude</Text>
          <Text style={styles.cardText}>Longitude</Text>
          <Text style={styles.cardText}>Destination</Text>
          <Text style={styles.cardText}>Mode of Transport</Text>
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('Input')}>
          <Text style={styles.buttonText}>Input data</Text>
        </TouchableOpacity>
      </View>
    )
  }
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
  card: {
    width: 350,
    height: 120,
    borderRadius: 10,
    backgroundColor: '#101010',
    margin: 10,
    padding: 10,
    alignItems: 'center'
  },
  cardText: {
    fontSize: 18,
    color: '#ffd700',
    marginBottom: 5
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