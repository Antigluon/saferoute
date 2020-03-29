import React from 'react'
import { StyleSheet, ScrollView, Dimensions, View, Text, TouchableOpacity } from 'react-native'
import {WebView} from 'react-native-webview'
import HTML from 'react-native-render-html';

const myHtmlFile = require("../../assets/mapquest.html");

//const htmlContent = ``;
function Map(props) {
  const { route, navigation } = props
  const { item } = route.params
  const { latitude, longitude, destination, mode_of_transit, loading, sessionID, dataSource} = route.params
  return (
    <WebView source={myHtmlFile} />
    //<ScrollView style={{ flex: 1 }}>
    //  <HTML html={htmlContent} imagesMaxWidth={Dimensions.get('window').width} />
    //</ScrollView>
    /*<View style={styles.container}>
      <Text style={styles.text}>Map</Text>
      <Text style={styles.cardText}>sessionID {sessionID}</Text>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.popToTop()}>
        <Text style={styles.buttonText}>Home {}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Input')}>
        <Text style={styles.buttonText}>Input new data</Text>
      </TouchableOpacity>
    </View>*/
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

export default Map