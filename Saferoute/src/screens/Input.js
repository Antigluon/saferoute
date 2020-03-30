import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import ModalDropdown from 'react-native-modal-dropdown';

class Input extends Component {
  constructor(props) {
    //constructor to set default state
    super(props);
    this.state = {      
      latitude: "",
      longitude: "",
      destination: "",
      mode_of_transit: "",
      loading: true,
      sessionID: '',
      dataSource: []
    };
  }
  render(){
    const { navigation } = this.props
    return (
     
    <View style={styles.container}>
        <TextInput

          style={styles.text}
          placeholder="Enter Destination"
          returnKeyType="next"
          onChangeText={destination => this.setState({ destination })}
        />

        <ModalDropdown 
        defaultValue={'walk'}
        textStyle	={styles.text}
        dropdownTextHighlightStyle={styles.text}
        dropdownTextStyle={styles.text}
        options={['walk', 'drive', 'bike']}
        onChangeText={mode_of_transit => this.setState({ mode_of_transit })}
        />

        <Button
          style={styles.buttonText}
          title="Submit"
          onPress={() => this.fetchAndNavigate()}
        />
      </View>
    )
  }

  fetchAndNavigate(){
    this.onFetchLoginRecords();
  }

  onFetchLoginRecords() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    alert("Allow Saferoute to use your current location?")
    //var raw = JSON.stringify({"lat":"41.785906","long":"-87.644919","destination":"59th Street & Princeton","mode_of_transit":"walk"});
    var raw = JSON.stringify({
      lat: "41.785906",
      long: "-87.644919",
      destination: this.state.destination,
      mode_of_transit: this.state.mode_of_transit});

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    try {
      fetch(
        "https://hoohacks-saferoute.appspot.com/", requestOptions)
        .then(response => response.json())
        .then((responseJson) => {
          setTimeout(function() {
            let sessionID = responseJson.sessionId
            if (sessionID != 0) {
              console.log(sessionID)
              console.log("https://www.mapquestapi.com/staticmap/v5/map?key=QwD7l7Q2gwYrsOuErXCMPpt3BBfZGVGv&size=1920,1920@2x&session=" + sessionID)
            }
            else{
              alert("Destination too far away or unable to generate safe route. Please enter destination with 200 miles of current location.");
            }
          }, 500)
        });
    } catch (errors) {

      alert(errors);
    }
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
    paddingTop: 10,
    fontSize: 50,
    fontWeight: 'bold',
    color: '#fff'
  }
})



export default Input