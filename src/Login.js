import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, TouchableHighlight,ImageBackground } from 'react-native'
import styles from './style'
import firebase from 'react-native-firebase'
export default class Login extends React.Component {
  state = { email: '', password: '', errorMessage: null }
  handleLogin = () => {
    // TODO: Firebase stuff...
    const { email, password } = this.state;
    const emailError = this.validateEmail(this.state.email)
    const passwordError = this.state.password
    if (!emailError && !passwordError) {
      alert('Details are not valid!')
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => this.props.navigation.navigate('Home'))
        .catch(error => this.setState({ errorMessage: error.message }))
    }
  }
  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  render() {
    return (
      <ImageBackground source={{ uri: 'https://facebook.github.io/react-native/img/header_logo.png' }} style={{ width: '100%', height: '100%' }}>
        <View style={styles.container}>
          <Text style={{ color: '#e93766', fontSize: 40, fontFamily: "Montserrat-Medium" }}>Log In</Text>
          {this.state.errorMessage &&
            <Text style={{ color: 'red', fontFamily: "Montserrat-Medium" }}>
              {this.state.errorMessage}
            </Text>}
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Email"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <TextInput
            secureTextEntry
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Password"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />

          <TouchableHighlight style={styles.buttonCss}>
            <Button style={{ fontFamily: "Montserrat-Medium", }} color="#000000" title="LogIn" onPress={this.handleLogin} />
          </TouchableHighlight>

          <View style={{marginTop:25}}>
            <Text style={{ fontFamily: "Montserrat-Medium" }}> Don't have an account? <Text onPress={() => this.props.navigation.navigate('signUp')} style={{ color: '#e93766', fontSize: 18, fontFamily: "Montserrat-Medium" }}> Sign Up </Text></Text>
          </View>
        </View>
      </ImageBackground>
    )
  }
}