"use strict";

import React, { Component } from "react";
import { StatusBar, StyleSheet, View, TextInput, Image, Dimensions, Button } from 'react-native';
import { createAppContainer, NavigationActions } from 'react-navigation';
import { createStackNavigator, StackActions } from 'react-navigation-stack';
import {navigationContainer} from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: "",
      long: "",
      destination: "",
      mode_of_transit: "",
      loading: true,
      dataSource: [],
    };
  }

  onPressSubmitButton() {
    this.onFetchLoginRecords();
    this.toHome();
  }

  toHome = gestureState =>{
    this.props.navigation.dispatch(StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' })
      ],
    }))
  }

  toMap() {
    this.props.navigation.dispatch(StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Map' })
      ],
    }))
  }

  render() {
    return (
      //<NavigationContainer>
        <LinearGradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={{ flex: 1, alignItems: 'center' }, entryStyles.container}>
          <TextInput
            ref="txtLat"
            style={entryStyles.textInput}
            placeholder="Latitude"
            returnKeyType="next"
            onChangeText={text => this.setState({ lat: text })}
          />
          <TextInput
            ref="txtLong"
            style={entryStyles.textInput}
            placeholder="Longitude"
            returnKeyType="next"
            onChangeText={text => this.setState({ long: text })}
          />
          <TextInput
            ref="txtDest"
            style={entryStyles.textInput}
            placeholder="Destination"
            returnKeyType="next"
            onChangeText={text => this.setState({ destination: text })}
          />
          <TextInput
            ref="txtTransit"
            style={entryStyles.textInput}
            placeholder="Mode of Transit"
            returnKeyType="done"
            onChangeText={text => this.setState({ mode_of_transit: text })}
          />
          <Button
            title="Submit"
            onPress={() => this.props.navigation.navigate('Map')}
          />
        </LinearGradient>
     // </NavigationContainer>
    );
  }


  async onFetchLoginRecords() {
    var data = {
      lat: this.state.lat,
      long: this.state.long,
      destination: this.state.destination,
      mode_of_transit: this.state.mode_of_transit,
      loading: true,
      dataSource: [],
    };
    try {
      fetch(
        "http://yourdomain.com",
        {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then((responseJson) => {
          this.setState({
            loading: false,
            dataSource: responseJson
          })
        });
        if (this.state.dataSource.status >= 200 && this.state.dataSource.status < 300) {
          alert("Data sent successfully!!!");
        }
    } catch (errors) {

      alert(errors);
    }
  }
}

class Exploration extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      section: "outsideMainEntrance",
      id: 0,
      portrait: true,
    }
  }
  render(){
    return (
      <Button
        title="Back"
        onPress={() => {
          this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'Home' })
            ],
          }))
        }}
      />
    );
  }
}
const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Map: {
    screen: Map,
  },
}, {
  initialRouteName: 'Home',
  headerMode: 'none',
});

export default createAppContainer(AppNavigator);

const entryStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "#F5FCFF"
  },
  textInput: {
    height: 40,
    textAlign: "center",
    borderWidth: 1,
    width: "80%",
    backgroundColor: "#F5FCFF"
  },
  buttonSubmit: {
    backgroundColor: "#F5FCFF"
  }
});



import React, { Component } from 'react'
import { StyleSheet, ScrollView, Dimensions, View, Text, TouchableOpacity } from 'react-native'
import {WebView} from 'react-native-webview'
import DropdownAlert from 'react-native-dropdownalert';

const myHtmlFile = require("../../assets/mapquest.html");

//41.785906 -87.644919 59th Street & Princeton walk

//const htmlContent = ``;
/*
class Map extends Component {
  constructor(props) {
    //constructor to set default state
    super(props);
    //const { route, navigation } = props
    //const { item } = route.params    
    //const { latitude, longitude, destination, mode_of_transit, loading, sessionID, dataSource} = route.params
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
*/

class Map extends Component {
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
    
    //timerID = setInterval(this.clock, 2000);
  render (){
    //this.timerID;
    const { navigation } = this.props
    return (
      <WebView source={myHtmlFile} />
    )
  }
/*
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
  }*/
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