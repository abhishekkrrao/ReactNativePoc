import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableHighlight } from "react-native";
import { Header } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import detailstyle from './detailstyle'
export default class Details extends Component {
  closeApp() {
    console.log('close App');
    this.props.navigation.goBack();
  }
  render() {
    const receivedValue = this.props.navigation.getParam('item', () => { });
    console.log('receivedValue ', receivedValue);
    return (
      <View style={detailstyle.container}>
        <Header
          containerStyle={{ height: 75 }}
          ViewComponent={LinearGradient} // Don't forget this!
          centerComponent={{ text: 'Details', style: { color: '#fff', fontFamily: "Montserrat-Medium" } }}
          leftComponent={{ icon: 'arrow-back', color: '#fff', onPress: () => this.closeApp() }}
          linearGradientProps={{
            colors: ['#E64A19', '#D84315'],
            start: { x: 0, y: 0.5 },
            end: { x: 1, y: 0.5 },
          }}
        />
        <View style={{ flex: 1, padding: 15 }}>
          <TouchableHighlight style={{ maxHeight: 150, width: '100%', height: 150, margin: 0, borderRadius: 7, flex: 1, padding: 0 }} >
            <Image source={{ uri: receivedValue.sources }} style={{ maxHeight: 150, margin: 0, flex: 1, padding: 0 }} />
          </TouchableHighlight>
          <Text style={{ fontFamily: "Montserrat-Medium", paddingTop: 5 }}>{receivedValue.title}</Text>
          <Text style={{ fontFamily: "Montserrat-Medium", paddingTop: 5 }}>{receivedValue.description}</Text>
        </View>
      </View>
    );
  }
}