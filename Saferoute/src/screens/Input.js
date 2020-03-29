import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

class Input extends Component {
  //const { route, navigation } = props
  //const { item } = route.params
  //const { latitude, longitude, destination, mode_of_transit } = item
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
  render(){
    const { navigation } = this.props
    return (
     
    <View style={styles.container}>
        <TextInput
          style={styles.text}
          placeholder="Latitude"
          returnKeyType="next"
          onChangeText={latitude => this.setState({ latitude })}
        />
        <TextInput

          style={styles.text}
          placeholder="Longitude"
          returnKeyType="next"
          onChangeText={longitude => this.setState({ longitude })}
        />
        <TextInput

          style={styles.text}
          placeholder="Destination"
          returnKeyType="next"
          onChangeText={destination => this.setState({ destination })}
        />
        <TextInput

          style={styles.text}
          placeholder="Mode of Transit"
          returnKeyType="done"
          onChangeText={mode_of_transit => this.setState({ mode_of_transit })}
        />
        <Button
          style={styles.buttonText}
          title="Submit"
          onPress={() => navigation.navigate('Map', { item: this.state })}
        />
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



export default Input