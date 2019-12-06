import React, { Component } from "react";
import { StyleSheet, View, TextInput, KeyboardAvoidingView, Button } from "react-native";
import { Header } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import chatstyle from './chatstyle'
export default class Chats extends Component {
  state = { message: '' }
  closeApp() {
    console.log('close App');
    this.props.navigation.goBack();
  }
  static navigationOptions = {
    title: 'Chats'
  };
  send(){
    console.log('messagemessage ',this.state.message)
  }
  render() {
    const receivedValue = this.props.navigation.getParam('item', () => { });
    console.log('receivedValue ', receivedValue);
    return (
      <View style={chatstyle.container}>
        <Header
          containerStyle={{ height: 75 }}
          ViewComponent={LinearGradient} // Don't forget this!
          centerComponent={{ text: 'Chat', style: { color: '#fff', fontFamily: "Montserrat-Medium" } }}
          leftComponent={{ icon: 'arrow-back', color: '#fff', onPress: () => this.closeApp() }}
          linearGradientProps={{
            colors: ['#E64A19', '#D84315'],
            start: { x: 0, y: 0.5 },
            end: { x: 1, y: 0.5 },
          }}
        />

        <View style={chatstyle.container}>
          <KeyboardAvoidingView
            style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}
            behavior="position"
          >
            <TextInput
              style={chatstyle.input}
              onChangeText={text => this.setState({ message: text })}
              placeholderTextColor='white'
              underlineColorAndroid='transparent'
            />
            <Button style={chatstyle.button} onPress={this.send()} title='SEND' />
          </KeyboardAvoidingView>
        </View>
      </View>
    );
  }
}