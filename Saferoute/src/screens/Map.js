import React, { Component } from 'react'
import { StyleSheet, ScrollView, Dimensions, View, Text, TouchableOpacity } from 'react-native'
import {WebView} from 'react-native-webview'
import DropdownAlert from 'react-native-dropdownalert';
import HTML from 'react-native-render-html';

//import DropdownAlert from 'react-native-dropdownalert';

const myHtmlFile = require("../../assets/mapquest.html");

//41.785906 -87.644919 59th Street & Princeton walk

//const htmlContent = ``;

class Map extends Component {
  constructor(props) {
    //constructor to set default state
    super(props);
    const { route, navigation } = props
    const { item } = route.params    
    const { latitude, longitude, destination, mode_of_transit, loading, sessionID, dataSource} = route.params
    this.state = {      
      latitude: latitude,
      longitude: longitude,
      destination: destination,
      mode_of_transit: mode_of_transit,
      loading: loading,
      sessionID: sessionID,
      dataSource: [],
      dangers:[],
    };
  }
    
    //timerID = setInterval(this.clock, 2000);
  render (){
    this.timerID;
    const { navigation } = this.props
    return (
      <WebView source={myHtmlFile} />
    )
  }

  clock = function() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      phone: "5551234567",
      username: "person",
      guardian: "MrPerson",
      destination: destination,
      sessionId: sessionID,
      lat: latitude,
      long: longitude,
      mode_of_transit: destination,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    fetch(
      "https://hoohacks-saferoute.appspot.com/update", requestOptions)
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          loading: false,
          dataSource: responseJson,
          sessionID: responseJson.sessionId,
          dangers: responseJson.dangers
        })
      });

      this.dropDownAlertRef.alertWithType('success', 'Success', 'Fetch data is complete.');
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

export default Map