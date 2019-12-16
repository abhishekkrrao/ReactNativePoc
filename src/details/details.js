import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableHighlight } from "react-native";
import { Header } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import detailstyle from './detailstyle'
import Loading from '../Loading'
export default class Details extends Component {

  state = { isLoading: true }
  componentDidMount() {
    console.log('isLoading', this.state.isLoading);
  }
  closeApp() {
    console.log('close App');
    this.props.navigation.goBack();
  }

  loadApp() {
    if (this.state.isLoading == true) {
      return (
        <Loading></Loading>
      )
    }
  }
  render() {
    const receivedValue = this.props.navigation.getParam('item', () => { });
    console.log('receivedValue ', receivedValue);

    return (
      <View style={detailstyle.container}>
        <Header
          containerStyle={{ height: 75 }}
          ViewComponent={LinearGradient} // Don't forget this!
          centerComponent={{ text: 'Details', style: { color: '#fff', fontFamily: "Montserrat-Medium", paddingBottom: 20 } }}
          leftComponent={{ icon: 'arrow-back', color: '#fff', paddingBottom: 20, onPress: () => this.closeApp() }}
          linearGradientProps={{
            colors: ['#E64A19', '#D84315'],
            start: { x: 0, y: 0.5 },
            end: { x: 1, y: 0.5 },
          }}
        />
      
        <View style={{ flex: 1, padding: 0, backgroundColor: '#ccc', borderRadius: 7, height: 350, }}>
          <TouchableHighlight style={{ maxHeight: 350, width: '100%', height: 350, margin: 0, borderRadius: 7, flex: 1, padding: 0 }} >
            <Image onLoadStart={(e) => this.setState({ isLoading: false })} source={{ uri: receivedValue.productPic }} style={{ maxHeight: 350, margin: 0, flex: 1, padding: 0 }} />
          </TouchableHighlight>
          {this.loadApp()}
          <Text style={{ fontFamily: "Montserrat-Medium", paddingTop: 5 }}>{receivedValue.productName}</Text>
          <Text style={{ fontFamily: "Montserrat-Medium", paddingTop: 5 }}>{receivedValue.productDesc}</Text>
        </View>
      </View>
    );

  }
}