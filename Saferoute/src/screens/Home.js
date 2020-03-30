import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native'

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
    const logo = require("../../assets/icon.png")
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Image source={logo}/>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('Input')}>
          <Text style={styles.buttonText}>Start Navigating</Text>
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
    backgroundColor: '#fff'
  },
  text: {
    color: '#101010',
    fontSize: 24,
    fontWeight: 'bold'
  },
  buttonContainer: {
    backgroundColor: '#003264',
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