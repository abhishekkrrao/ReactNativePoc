import React, { Component } from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import detailstyle from './detailstyle'
import Loading from '../Loading'
import Headers from '../header/header'
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
        <Headers title="Details"></Headers>
        <View style={{ flex: 1, padding: 0, backgroundColor: '#ccc', borderRadius: 7, height: 350, }}>
          <TouchableHighlight style={{ maxHeight: 350, width: '100%', height: 350, margin: 0, borderRadius: 7, flex: 1, padding: 0 }} >
            <Image onLoadStart={() => this.setState({ isLoading: false })} source={{ uri: receivedValue.productPic }} style={{ maxHeight: 350, margin: 0, flex: 1, padding: 0 }} />
          </TouchableHighlight>
          {this.loadApp()}
          <Text style={{ fontFamily: "Montserrat-Medium", paddingTop: 5 }}>{receivedValue.productName}</Text>
          <Text style={{ fontFamily: "Montserrat-Medium", paddingTop: 5 }}>{receivedValue.productDesc}</Text>
        </View>
      </View>
    );

  }
}